require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const upload = require("./middleware/upload");
const ProductModel = require("./model/Product");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("./model/Order");
const sendOrderMail = require("./SendMail");
const User = require("./model/User");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/Images"));
app.get("/", (req, res) => {
  res.send("Tira backend is running ");
});
mongoose.connect('mongodb://localhost:27017/tira')
  .then(() => console.log("MongoDB Local Connected - port 27017"))
  .catch((err) => {
    console.log("Local MongoDB Error - Install MongoDB first:", err.message);
    console.log("Run these:");
    console.log("mkdir data\\db");
    console.log("mongod --dbpath data\\db");
    console.log("(New terminal)");
    console.log("Double-click install-mongodb.bat if mongod not found");
  });
app.post("/register", async (req, res) => {
  try {

    const { email, phone, password } = req.body;

    if (!email || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      phone,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "Registered Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
});

/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login Successful",
      user: {
        email: user.email,
        phone: user.phone
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const newProduct = new ProductModel({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      file: req.file.filename,
    });

    await newProduct.save();
    res.send({ msg: "Product uploaded successfully" });
  } catch (error) {
    res.status(500).send({ error: "Error in product save" });
  }
});

app.get("/product", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/products/:id", upload.single("file"), async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
    };

    if (req.file) {
      updatedData.file = req.file.filename;
    }

    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_SECRET,
});

app.post("/create-razorpay-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const order = await razorpay.orders.create({
      amount: Number(amount),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/verify-payment", async (req, res) => {
  try {
    const { order_id, razorpay_payment_id, razorpay_signature, } = req.body;

    const body = order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({ success: false });
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status === "authorized") {
      await razorpay.payments.capture(
        razorpay_payment_id,
        payment.amount
      );
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});


app.post("/save-order", async (req, res) => {
  try {
    const { products, total, totalQty, user, paymentMethod } = req.body;

    const newOrder = new Order({
      products: products.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.qty || 1,
        file: item.file
      })),

      totalItems: totalQty,
      totalPrice: total,

      user: {
        fullName: user.name,
        email: user.email,
        number: user.phone,
        address: user.address,
        payment: paymentMethod
      }
    });

    await newOrder.save();

    res.json({ message: "Order saved successfully" });
  } catch (err) {
    console.log("SAVE ERROR:", err);
    res.status(500).json({ message: "Error saving order" });
  }
});


// ✅ GET ORDERS
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching orders" });
  }
});


// ✅ UPDATE STATUS
app.put("/orders/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});


// ✅ DELETE ORDER
app.delete("/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });


    res.json(users);
  } catch (err) {
    console.log(err); // ❗ add this
    res.status(500).json({ message: "Error fetching users" });
  }
});
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err); // ❗ add this
    res.status(500).json({ message: "Error deleting user" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
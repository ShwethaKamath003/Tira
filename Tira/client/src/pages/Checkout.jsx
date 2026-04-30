import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Checkout.css";
import {baseUrl} from "./pages/Urls";
function Checkout() {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1),
    0
  );

  const [form, setForm] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (
      !form.email ||
      !form.phone ||
      !form.name ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Fill all fields");
      return;
    }

    if (!form.payment) {
      alert("Select payment method");
      return;
    }

    // 🔥 COMMON USER OBJECT (FIXED)
    const userData = {
      name: form.name,
      phone: form.phone,
      city: form.city,
      email: form.email,
      address: form.address  
    };

    // ---------------- COD ----------------
    if (form.payment === "COD") {
      await fetch(`${baseUrl}/save-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: cart,
          total,
          totalQty,
          user: userData,
          paymentMethod: "COD",
          paymentId: null,
        }),
      });

      alert("Order placed successfully (COD)");
      localStorage.removeItem("cart");
      navigate("/");
      return;
    }

    if (form.payment === "ONLINE") {
      setLoading(true);

      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Razorpay SDK failed to load");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${baseUrl}/create-razorpay-order`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total * 100 }),
          }
        );

        const data = await response.json();

        const options = {
          key: "rzp_test_SgPiF2LpdqoDgs",
          amount: data.amount,
          currency: data.currency,
          order_id: data.id,
          name: "My Store",
          description: "Order Payment",

          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },

          handler: async function (response) {
            try {
              await fetch(`${baseUrl}/save-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  products: cart,
                  total,
                  totalQty,
                  user: userData,   
                  paymentMethod: "ONLINE",
                  paymentId: response.razorpay_payment_id,
                }),
              });

              alert("Payment Successful & Order Saved");

              localStorage.removeItem("cart");
              navigate("/");
            } catch (err) {
              console.log(err);
              alert("Order saving failed");
            }
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        console.log(err);
        alert("Something went wrong");
      }

      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h2>Checkout</h2>

        <form onSubmit={handleCheckout}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <input type="text" name="city" placeholder="City" onChange={handleChange} />
          <input type="text" name="state" placeholder="State" onChange={handleChange} />
          <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} />

          <select name="payment" onChange={handleChange}>
            <option value="">Select Payment Method</option>
            <option value="COD">Cash on Delivery</option>
            <option value="ONLINE">Online Payment</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>

      <div className="checkout-right">
        <h3>Order Summary</h3>

        {cart.map((item, i) => (
          <div key={i}>
            <img src={`${baseUrl}/images/${item.file}`} width="80" />
            <p>{item.name}</p>
            <p>Qty: {item.qty || 1}</p>
            <p>₹{item.price}</p>
          </div>
        ))}

        <h3>Total: ₹{total}</h3>
      </div>
    </div>
  );
}

export default Checkout;
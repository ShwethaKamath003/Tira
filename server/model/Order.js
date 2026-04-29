const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      name: String,
      price: Number,
      quantity: Number,
      file: String
    }
  ],

  user: {
    fullName: String,
    email: String,
    number: String,
    address: String,
    payment: String
  },

  totalItems: Number,
  totalPrice: Number,

  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
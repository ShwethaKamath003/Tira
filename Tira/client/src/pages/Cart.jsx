import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Cart.css";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (index) => {
    if (!window.confirm("Remove this item?")) return;

    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty = (updated[index].qty || 1) + 1;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if ((updated[index].qty || 1) > 1) {
      updated[index].qty -= 1;
    }
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1),
    0
  );
  
  const totalQty = cart.reduce(
    (sum, item) => sum + (item.qty || 1),
    0
  );

  const handleProceed = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h2>Total Items: {totalQty}</h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item, index) => (
            <div className="cart-item" key={index}>

              <img
                src={
                  item?.file
                    ? `http://localhost:3001/images/${item.file}`
                    : "https://via.placeholder.com/100"
                }
                alt=""
              />

              <div className="item-details">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <div className="qty-box">
                  <button onClick={() => decreaseQty(index)}>-</button>
                  <span>{item.qty || 1}</span>
                  <button onClick={() => increaseQty(index)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>

            </div>
          ))
        )}
      </div>
      <div className="cart-right">
        <h3>Price Summary</h3>
        <p>Total Items: {totalQty}</p>
        <h2>Total Amount: ₹{total}</h2>

        <button
          className="checkout-btn"
          onClick={handleProceed}
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>

    </div>
  );
}

export default Cart;
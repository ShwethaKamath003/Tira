import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/SingleProduct.css";
import { baseUrl } from "../Urls";
function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(
      (item) => item._id === product._id
    );

    if (index !== -1) {
      cart[index].qty = (cart[index].qty || 1) + 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Added to cart ");
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div>
      <img
        src={`${baseUrl}/images/${product.file}`}
        width="300"
      />

      <h2>{product.name}</h2>
      <p>₹{product.price}</p>

      <button onClick={addToCart}>ADD TO CART</button>
    </div>
  );
}

export default SingleProduct;

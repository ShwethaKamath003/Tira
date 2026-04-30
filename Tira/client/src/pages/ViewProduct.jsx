import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/ViewProduct.css";
import { baseUrl } from "../Urls";
function ViewProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseUrl}/product`)
      .then((res) => {
        console.log(res.data); 
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="add-viewProduct-container">
      <h2 className="add-viewProduct-title">View Products</h2>

      <div className="view-list">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="view-item">
              <img
                src={`${baseUrl}/images/${product.file}`}
                alt={product.name}
                className="product-image"
              />

              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Price:</strong> {product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Description:</strong> {product.description}</p>
            </div>
          ))
        )}
      </div>

      <button
        className="view-viewProduct-button"
        onClick={() => navigate("/addproduct")}
      >
        Add New Product
      </button>
    </div>
  );
}

export default ViewProduct;
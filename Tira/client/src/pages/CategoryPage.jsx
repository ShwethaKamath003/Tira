import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/CategoryPage.css";
import { baseUrl } from "../Urls";
function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

 useEffect(() => {
  axios
    .get(`${baseUrl}/product`)
    .then((res) => {
      console.log("API:", res.data); // 🔍 MUST CHECK THIS

      // ✅ ensure it's always an array
      const data = Array.isArray(res.data)
        ? res.data
        : [];

      const filtered = data.filter(
        (p) =>
          p?.category &&
          category &&
          p.category.toLowerCase().trim() === category.toLowerCase().trim()
      );

      setProducts(filtered);
    })
    .catch((err) => {
      console.log("Error:", err);
      setProducts([]);
    });
}, [category]);
  return (
    <div className="category-page">
      <h2>{category} Products</h2>

      <div className="product-row">
        {products.map((p) => (
          <div
            className="product-card"
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)} 
          >
            <img
              src={`${baseUrl}/images/${p.file}`}
              alt={p.name}
              style={{
                width: "120px", 
                height: "120px",
                objectFit: "contain",
              }}
            />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
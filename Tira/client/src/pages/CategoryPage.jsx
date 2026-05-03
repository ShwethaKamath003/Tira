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
        console.log("API:", res.data);
        console.log("URL category:", category);

        const data = Array.isArray(res.data) ? res.data : [];

        // ✅ FIXED FILTER (important)
        const filtered = data.filter(
          (p) =>
            p?.category &&
            category &&
            p.category.toLowerCase().includes(category.toLowerCase())
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
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((p) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
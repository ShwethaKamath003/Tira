import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/CategoryPage.css";
import {baseUrl} from "./urls";
function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/product`)
      .then((res) => {
        const filtered = res.data.filter(
          (p) =>
            p.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filtered);
      })
      .catch((err) => console.log(err));
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
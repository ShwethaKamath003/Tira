import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ProductRow.css";

import makeup from "../assets/makeup.jpg";
import skincare from "../assets/skincare.jpg";
import hair from "../assets/hair.jpg";
import fragrance from "../assets/Fragrance.jpg";
import men from "../assets/men.jpg";
import bathbody from "../assets/Bath&Body.jpg";
import wellness from "../assets/wellness.jpg";

function ProductRow() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);   // ⭐ IMPORTANT

  const categories = [
    { name: "Makeup", image: makeup },
    { name: "Skin", image: skincare },
    { name: "Hair", image: hair },
    { name: "Fragrance", image: fragrance },
    { name: "Men", image: men },
    { name: "BathandBody", image: bathbody },
    { name: "Wellness", image: wellness },
  ];

  // ⭐ SCROLL FUNCTIONS
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  return (
    <div className="product-row-container">
      <h2 className="heading">Top Categories</h2>

      {/* ⭐ WRAPPER (IMPORTANT) */}
      <div className="category-wrapper">

        {/* LEFT ARROW */}
        <button className="scroll-btn left" onClick={scrollLeft}>
          ❮
        </button>

        {/* CATEGORY ROW */}
        <div className="category-row" ref={scrollRef}>
          {categories.map((cat) => (
            <div className="category-card" key={cat.name}>
              <img
                src={cat.image}
                alt={cat.name}
                className="category-image"
                onClick={() => navigate(`/category/${cat.name}`)}
              />
              <p className="category-name">{cat.name}</p>
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button className="scroll-btn right" onClick={scrollRight}>
          ❯
        </button>

      </div>
    </div>
  );
}

export default ProductRow;

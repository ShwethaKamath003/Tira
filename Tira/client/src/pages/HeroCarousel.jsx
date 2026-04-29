import { useState, useEffect } from "react";
import slide5 from "../assets/slide5.jpg";
import slide6 from "../assets/slide6.jpg";
import slide7 from "../assets/slide7.jpg";

const slides2 = [slide5, slide6, slide7];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides2.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div className="slide-image">
        <img src={slides2[current]} alt="banner" />
      </div>

      <div className="dots">
        {slides2.map((_, i) => (
          <span
            key={i}
            className={current === i ? "dot active" : "dot"}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
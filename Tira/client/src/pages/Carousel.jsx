import { useState, useEffect } from "react";
import "../css/Home.css";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";

const slides = [slide1, slide2, slide3, slide4];

function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="home">
      
      <div className="slider">
        <div className="slide-image">
          <img src={slides[current]} alt="banner" />
        </div>

        <div className="dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={current === i ? "dot active" : "dot"}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

    </main>
  );
}

export default Carousel;

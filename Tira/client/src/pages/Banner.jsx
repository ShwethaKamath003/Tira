import "../css/Banner.css";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";

function Banner() {
  return (
    <div className="banner-wrapper">
      <div className="banner-box">
        <img src={banner1} alt="Birthday Offer" />
      </div>

      <div className="banner-box">
        <img src={banner2} alt="Gift Cards" />
      </div>
    </div>
  );
}

export default Banner;
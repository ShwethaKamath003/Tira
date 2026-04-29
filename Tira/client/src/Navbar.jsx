import './css/Navbar.css';
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="header">
            <div className="utility-container">
                <div className="inner-content flex-end">
                    <Link to="#">Track Order</Link>
                    <Link to="#">Help Centre</Link>
                </div>
            </div>

            <div className="main-nav-container">
                <div className="inner-content space-between">
                    <div className="logo-group">
                        <h1 className="logo">tira</h1>
                        <div className="welcome">Welcome<br />
                            <span>Login/Sign Up &gt;</span>
                        </div>
                    </div>

                    <nav className="middle-links">
                        <Link to="#">Brands</Link>
                        <Link to="#">Tira Red</Link>
                        <Link to="#">Offers</Link>
                        <Link to="#">Top Shelf</Link>
                        <Link to="#">For You</Link>
                    </nav>

                    <div className="search-group">
                        <div className="search-bar">
                            <input type="text" placeholder="Search" />
                        </div>

                        <div className="icons">

                            <Link to="/cart">
                                <img
                                    src="https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/organization/62d539deb767fec5c06847bd/theme/assets/268f6e200266b10dbd1b.svg"
                                    alt="Cart Icon"
                                />
                            </Link>

                            <Link to="/login">
                                <img
                                    src="https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/organization/62d539deb767fec5c06847bd/theme/assets/766fb4b4ed3d6bea725c.svg"
                                    alt="User Icon"
                                />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            <nav className="category-container">
                <div className="inner-content flex-center">
                    <Link to="#">What's New</Link>
                    <Link to="#">Makeup</Link>
                    <Link to="#">Skin</Link>
                    <Link to="#">Hair</Link>
                    <Link to="#">Fragrance</Link>
                    <Link to="#">Men</Link>
                    <Link to="#">Bath & Body</Link>
                    <Link to="#">Tools & Appliances</Link>
                    <Link to="#">Mom & Baby</Link>
                    <Link to="#">Wellness</Link>
                    <Link to="#">Minis</Link>
                    <Link to="#">Homegrown</Link>
                    <Link to="#">Gifts</Link>
                </div>
            </nav>

        </header>
    )
}

export default Navbar;
import React from "react";
import { NavLink } from "react-router-dom";
import { FaThList, FaShoePrints, FaTshirt, FaChild, FaHome, FaFire } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2 className="footer-title">About Us</h2>
          <p>We are committed to bringing you the best in footwear. Our exclusive collection features top brands and the latest trends.</p>
        </div>

        <div className="footer-section social">
          <h2 className="footer-title">Follow Us</h2>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>

        <div className="footer-section location">
          <h2 className="footer-title">Our Location</h2>
          <p>Dubai Merchant, Ronald Ngala Street</p>
          <p>Email: support@shoestore.com</p>
          <p>Phone: +1 800 123 4567</p>
          <p>
            <span className="map">
              <a 
                href="https://www.google.com/maps/dir//Dubai+Merchant+Mall+Merchant+mall,+Ronald+Ngala+St+Nairobi+Kenya/@-1.2851467,36.8281978,14z/data=!4m5!4m4!1m0!1m2!1m1!1s0x182f11e109f5919b:0xb6b1c2c247150905"
                target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-location-dot"></i> Directions
              </a>
            </span>
          </p>
        </div>

        <div className="footer-section categories">
          <h2 className="footer-title">Categories</h2>
          <div className="dropdown">
            <button className="dropdown-toggle btn" data-bs-toggle="dropdown">
              <FaThList size={18} className="me-1" /> Categories
            </button>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="/sneakers"><FaShoePrints className="me-2" /> Sneakers</NavLink></li>
              <li><NavLink className="dropdown-item" to="/womens"><FaTshirt className="me-2" /> Women's Collection</NavLink></li>
              <li><NavLink className="dropdown-item" to="/kids"><FaChild className="me-2" /> Kids</NavLink></li>
              <li><NavLink className="dropdown-item" to="/household"><FaHome className="me-2" /> Household</NavLink></li>
              <li><NavLink className="dropdown-item" to="/clothes"><FaTshirt className="me-2" /> Clothes</NavLink></li>
              <li><NavLink className="dropdown-item" to="/hotdeals"><FaFire className="me-2 text-danger" /> Hot Deals</NavLink></li>
            </ul>
          </div>
        </div>

        <div className="footer-section subscribe">
          <h2 className="footer-title">Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest arrivals and exclusive offers.</p>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 ShoeStore. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

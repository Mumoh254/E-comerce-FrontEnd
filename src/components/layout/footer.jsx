import React from "react";
import { NavLink } from "react-router-dom";
import { FaThList, FaShoePrints, FaTshirt, FaChild, FaHome, FaFire } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 🔹 Newsletter Subscription */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="input-group" style={{ display: "flex", alignItems: "stretch" }}>
              <input
                type="email"
                className="form-control"
                placeholder="Subscribe to our newsletter..."
                style={{ 
                  outline: "none", 
                  border: "1px solid #6B5B95", 
                  flex: "1", 
                  borderRight: "none", // Remove right border to blend with the button
                  borderRadius: "4px 0 0 4px" // Rounded corners on the left side
                }}
              />
              <button
                className="input-group-text fs-4"
                style={{ 
                  background: " linear-gradient(135deg, #c20030, #a00028)", 
                  border: "none", 
                  color: "#fff", 
                  borderRadius: "0 4px 4px 0", // Rounded corners on the right side
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 20px", // Add padding for better spacing
                  cursor: "pointer" // Add pointer cursor for better UX
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 Map */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="map-container">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.046541597535!2d36.8219468!3d-1.2851467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11e109f5919b%3A0xb6b1c2c247150905!2sDubai%20Merchant%20Mall!5e0!3m2!1sen!2ske!4v1692020309302"
                width="100%"
                height="300px"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Rest of the content */}
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="footer-section about">
              <h2 className="footer-title">About Us</h2>
              <p>We are committed to bringing you the best in footwear. Our exclusive collection features top brands and the latest trends.</p>
            </div>
          </div>
      

<div className="col-md-3 col-sm-6 mb-3">
  <div className="footer-section social">
    <h2 className="footer-title">Follow Us</h2>
    <div className="social-icons">
      <a href="#" className="social-icon px-2"><FaFacebookF size={20} color="#1877F2" /></a>
      <a href="#" className="social-icon px-2"><FaTwitter size={20} color="#1DA1F2" /></a>
      <a href="#" className="social-icon px-2"><FaInstagram size={20} color="#E4405F" /></a>
      <a href="#" className="social-icon px-2"><FaTiktok size={20} color="#000" /></a>
    </div>
  </div>
</div>


          <div className="col-md-3 col-sm-6 mb-3">
            <div className="footer-section location">
              <h2 className="footer-title">Our Location</h2>
              <p>Dubai Merchant, Ronald Ngala Street</p>
              <p>Email: support@shoestore.com</p>
              <p>Phone: +254740045355</p>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 mb-3">
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
          </div>
        </div>
      </div>

      <div className="footer-bottom mt-4">
        <p style={{color: "blue"}}>  | &copy; 2025 Majesty Collections Store | Privacy Policy | All Rights Reserved | Otherwise | protected by Welt Tallis  </p>
      </div>
    </footer>
  );
}
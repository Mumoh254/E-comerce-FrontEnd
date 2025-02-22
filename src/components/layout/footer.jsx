import React from "react";
import { NavLink } from "react-router-dom";
import { FaThList, FaShoePrints, FaTshirt, FaChild, FaHome, FaFire } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer  p-4" style={{ background: "#f8f9fa", color: "#2c3e50", padding: "40px 0" }}>
      <div className="footer-container container  ">
        {/* 🔹 Newsletter Subscription */}
        <div className="row mb-5 ">
          <div className="col-12  ">
            <div className="input-group" style={{ display: "flex", alignItems: "stretch", maxWidth: "600px", margin: "0 auto" }}>
              <input
                type="email"
                className="form-control"
                placeholder="Subscribe to our newsletter..."
                style={{ 
                  outline: "none", 
                  border: "1px solid #6B5B95", 
                  flex: "1", 
                  borderRight: "none", 
                  borderRadius: "4px 0 0 4px", 
                  backgroundColor: "#fff", 
                  color: "#2c3e50", 
                  padding: "10px 20px" 
                }}
              />
              <button
                className="input-group-text fs-4"
                style={{ 
                  background: "#6B5B95", 
                  border: "none", 
                  color: "#fff", 
                  borderRadius: "0 4px 4px 0", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 30px", 
                  cursor: "pointer",
                  transition: "background 0.3s ease" 
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 Map */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="map-container" style={{ borderRadius: "8px", overflow: "hidden" }}>
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
          {/* About Us */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="footer-section">
              <h2 className="footer-title" style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#6B5B95" }}>About Us</h2>
              <p style={{ color: "#2c3e50", lineHeight: "1.8" }}>We are committed to bringing you the best in footwear. Our exclusive collection features top brands and the latest trends.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="footer-section">
              <h2 className="footer-title" style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#6B5B95" }}>Quick Links</h2>
              <ul style={{ listStyle: "none", padding: "0" }}>
                <li><NavLink to="/sneakers" style={{ color: "#2c3e50", textDecoration: "none", display: "block", marginBottom: "10px", fontSize: "1rem" }}>Sneakers</NavLink></li>
                <li><NavLink to="/womens" style={{ color: "#2c3e50", textDecoration: "none", display: "block", marginBottom: "10px", fontSize: "1rem" }}>Women's Collection</NavLink></li>
                <li><NavLink to="/kids" style={{ color: "#2c3e50", textDecoration: "none", display: "block", marginBottom: "10px", fontSize: "1rem" }}>Kids</NavLink></li>
                <li><NavLink to="/household" style={{ color: "#2c3e50", textDecoration: "none", display: "block", marginBottom: "10px", fontSize: "1rem" }}>Household</NavLink></li>
                <li><NavLink to="/clothes" style={{ color: "#2c3e50", textDecoration: "none", display: "block", marginBottom: "10px", fontSize: "1rem" }}>Clothes</NavLink></li>
                <li><NavLink to="/hotdeals" style={{ color: "#2c3e50", textDecoration: "none", display: "block", marginBottom: "10px", fontSize: "1rem" }}>Hot Deals</NavLink></li>
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="footer-section">
              <h2 className="footer-title" style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#6B5B95" }}>Categories</h2>
              <ul style={{ listStyle: "none", padding: "0" }}>
                <li>
                  <NavLink to="/sneakers" style={{ color: "#2c3e50", textDecoration: "none", display: "flex", alignItems: "center", marginBottom: "10px", fontSize: "1rem" }}>
                    <FaShoePrints className="me-2" style={{ fontSize: "1.2rem" }} /> Sneakers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/womens" style={{ color: "#2c3e50", textDecoration: "none", display: "flex", alignItems: "center", marginBottom: "10px", fontSize: "1rem" }}>
                    <FaTshirt className="me-2" style={{ fontSize: "1.2rem" }} /> Women's Collection
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/kids" style={{ color: "#2c3e50", textDecoration: "none", display: "flex", alignItems: "center", marginBottom: "10px", fontSize: "1rem" }}>
                    <FaChild className="me-2" style={{ fontSize: "1.2rem" }} /> Kids
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/household" style={{ color: "#2c3e50", textDecoration: "none", display: "flex", alignItems: "center", marginBottom: "10px", fontSize: "1rem" }}>
                    <FaHome className="me-2" style={{ fontSize: "1.2rem" }} /> Household
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/clothes" style={{ color: "#2c3e50", textDecoration: "none", display: "flex", alignItems: "center", marginBottom: "10px", fontSize: "1rem" }}>
                    <FaTshirt className="me-2" style={{ fontSize: "1.2rem" }} /> Clothes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/hotdeals" style={{ color: "#2c3e50", textDecoration: "none", display: "flex", alignItems: "center", marginBottom: "10px", fontSize: "1rem" }}>
                    <FaFire className="me-2 text-danger" style={{ fontSize: "1.2rem" }} /> Hot Deals
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Follow Us */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="footer-section">
              <h2 className="footer-title" style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#6B5B95" }}>Follow Us</h2>
              <div className="social-icons">
                <a href="#" className="social-icon" style={{ display: "flex", alignItems: "center", color: "#2c3e50", textDecoration: "none", marginBottom: "10px", fontSize: "1rem" }}>
                  <FaFacebookF size={24} color="#1877F2" style={{ marginRight: "10px" }} /> Facebook
                </a>
                <a href="#" className="social-icon" style={{ display: "flex", alignItems: "center", color: "#2c3e50", textDecoration: "none", marginBottom: "10px", fontSize: "1rem" }}>
                  <FaTwitter size={24} color="#1DA1F2" style={{ marginRight: "10px" }} /> Twitter
                </a>
                <a href="#" className="social-icon" style={{ display: "flex", alignItems: "center", color: "#2c3e50", textDecoration: "none", marginBottom: "10px", fontSize: "1rem" }}>
                  <FaInstagram size={24} color="#E4405F" style={{ marginRight: "10px" }} /> Instagram
                </a>
                <a href="#" className="social-icon" style={{ display: "flex", alignItems: "center", color: "#2c3e50", textDecoration: "none", marginBottom: "10px", fontSize: "1rem" }}>
                  <FaTiktok size={24} color="#000" style={{ marginRight: "10px" }} /> TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom mt-5" style={{ borderTop: "1px solid #6B5B95", paddingTop: "20px", textAlign: "center" }}>
        <p style={{ color: "#2c3e50", margin: "0", fontSize: "1rem" }}>
          &copy; 2025 Majesty Collections Store | Privacy Policy | All Rights Reserved | Protected by Welt Tallis
        </p>
      </div>
    </footer>
  );
}
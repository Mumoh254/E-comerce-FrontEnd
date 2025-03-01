import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaShoePrints, 
  FaTshirt, 
  FaChild, 
  FaHome, 
  FaFire, 
  FaMapMarkerAlt,
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaTiktok 
} from "react-icons/fa";

export default function Footer() {
  // New color variables
  const primaryColor = "#2c3e50"; // Navy blue
  const accentColor = "#3498db";  // Royal blue
  const neutralGray = "#7f8c8d";  // Medium gray

  return (
    <footer className="footer p-4 font" style={{ 
      background: "#f8f9fa", 
      color: primaryColor,
      borderTop: `3px solid ${accentColor}`
    }}>
      <div className="container">
        {/* Newsletter Subscription */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h3 style={{ 
              fontSize: "1.8rem",
              color: primaryColor,
              marginBottom: "1.5rem",
              fontWeight: "600"
            }}>
              Stay Updated with Our Collections
            </h3>
            <div className="d-flex justify-content-center">
              <div style={{ 
                maxWidth: "600px", 
                width: "100%",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                borderRadius: "30px",
                overflow: "hidden"
              }}>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control border-0"
                    placeholder="Enter your email address..."
                    style={{ 
                      padding: "1rem 2rem",
                      fontSize: "1rem",
                      background: "rgba(255,255,255,0.9)"
                    }}
                  />
                  <button
                    className="btn"
                    style={{ 
                      padding: "0 2rem",
                      background: `linear-gradient(135deg, ${accentColor}, ${primaryColor})`,
                      color: "white",
                      border: "none",
                      borderRadius: "0 30px 30px 0",
                      transition: "all 0.3s ease"
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visit Showroom Section */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <div className="showroom-card p-4" style={{
              background: "#fff",
              borderRadius: "15px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              maxWidth: "600px",
              margin: "0 auto",
              border: `2px solid ${accentColor}`
            }}>
              <div className="d-flex align-items-start justify-content-start gap-3">
                <FaMapMarkerAlt size={24} color={accentColor} />
                <div>
                  <h4 style={{ margin: 0, color: primaryColor }}>Visit Our Showroom </h4>
                  <p style={{ margin: "0.5rem 0 0 0", color:" #000000" }}>
                    Dubai Merchant Mall,   <br />
                     We Are  Open Daily: 9AM Morning  - 9PM  Evening 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="map-container" style={{ 
              borderRadius: "15px", 
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                zIndex: 100,
                background: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "25px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                border: `1px solid ${accentColor}`
              }}>
                <FaMapMarkerAlt color={accentColor} />
                <span style={{ color: primaryColor }}>Our Location Nairobi  Kenya </span>
              </div>
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

        <hr style={{ borderColor: neutralGray }} />

        {/* Main Content Sections */}
        <div className="row">
          {/* About Us */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="footer-section">
              <h2 className="footer-title" style={{ 
                fontSize: "1.5rem", 
                marginBottom: "20px", 
                color: primaryColor
              }}>
                About Us
              </h2>
              <p style={{ 
                color: neutralGray, 
                lineHeight: "1.8", 
                fontWeight: "500"
              }}>
                We are committed to bringing you the best in footwear. Our exclusive collection features top brands and the latest trends.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="footer-section">
              <h2 className="footer-title" style={{ 
                fontSize: "1.5rem", 
                marginBottom: "20px", 
                color: primaryColor
              }}>
                Quick Links
              </h2>
              <ul style={{ 
                listStyle: "none", 
                padding: "0", 
                fontWeight: "500" 
              }}>
                {['Sneakers', "Women's Collection", 'Kids', 'Household', 'Clothes', 'Hot Deals'].map((link, index) => (
                  <li key={index} style={{ marginBottom: "12px" }}>
                    <NavLink 
                      to={`/${link.toLowerCase().replace(' ', '-')}`}
                      style={{ 
                        color: neutralGray, 
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <span style={{
                        width: "8px",
                        height: "8px",
                        background: accentColor,
                        borderRadius: "50%"
                      }}></span>
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="footer-section">
              <h2 className="footer-title" style={{ 
                fontSize: "1.5rem", 
                marginBottom: "20px", 
                color: primaryColor
              }}>
                Categories
              </h2>
              <ul style={{ listStyle: "none", padding: "0" }}>
                {[
                  { icon: <FaShoePrints color={accentColor} />, text: "Sneakers" },
                  { icon: <FaTshirt color={accentColor} />, text: "Women's Collection" },
                  { icon: <FaChild color={accentColor} />, text: "Kids" },
                  { icon: <FaHome color={accentColor} />, text: "Household" },
                  { icon: <FaTshirt color={accentColor} />, text: "Clothes" },
                  { icon: <FaFire color="#e74c3c" />, text: "Hot Deals" },
                ].map((item, index) => (
                  <li key={index} style={{ marginBottom: "12px" }}>
                    <NavLink
                      to={`/${item.text.toLowerCase().replace(' ', '-')}`}
                      style={{
                        color: neutralGray,
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {item.icon}
                      {item.text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Follow Us */}
          <div className="col-md-3 col-sm-6 mb-4  ">
            <div className="footer-section">
              <h2 className="footer-title" style={{ 
                fontSize: "1.5rem", 
                marginBottom: "20px", 
                color: primaryColor
              }}>
                Follow Us
              </h2>
              <div className="social-icons d-flex gap-3 ">
                
                {[
                  { icon: <FaFacebookF />, color: "#1877F2" },
                  { icon: <FaTwitter />, color: "#1DA1F2" },
                  { icon: <FaInstagram />, color: "#E4405F" },
                  { icon: <FaTiktok />, color: "#000000" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="social-icon"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      background: social.color,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      textDecoration: "none",
                      transition: "transform 0.3s ease",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
                
              </div>
              <hr />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom mt-5" style={{ 
          borderTop: `1px solid ${neutralGray}`, 
          paddingTop: "20px", 
          textAlign: "center"
        }}>
          <p style={{ 
            color: neutralGray, 
            margin: "0", 
            fontSize: "0.9rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem"
          }}>
            <span>&copy; 2025 Majesty Collections Store</span>
            <NavLink to="/privacy" style={{ color: neutralGray, textDecoration: "none" }}>
              Privacy Policy
            </NavLink>
            <span>All Rights Reserved</span>
            <span>Protected by Welt Tallis</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
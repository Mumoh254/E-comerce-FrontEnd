import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { GiClothes, GiRunningShoe, GiKidneys, GiFamilyHouse } from "react-icons/gi";

const Header = () => {
  const [cartCount, setCartCount] = useState(0); // State to manage cart count

  // Function to add a product to the cart (for demonstration purposes)
  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <>
      {/* 🔹 Top Header (Contact & Message) */}
      <header
        className="header-top-strip px-3 px-md-4 py-2"
        style={{
          background: "linear-gradient(45deg,rgb(231, 8, 8),rgb(235, 182, 58))",
          color: "#fff",
        }}
      >
        <div className="container-xxl d-flex justify-content-between align-items-center">
          <p className="mb-0 fw-bold "  style={{ fontSize: "12px"}}>🔥 Exclusive Discounts </p>
          <p className="mb-0"  style={{fontSize: "12px"}}>
            Hotline:{"   "}
            <a className="fw-bold" href="tel:+254740045355" style={{ color: "#6B5B95",  fontSize:  "12px"}}>
               +254 740 045 355
            </a>
          </p>
        </div>
      </header>

      {/* 🔹 Main Header (Logo, Search, Cart, Login) */}
      <header className="header-upper py-3" style={{ backgroundColor: "#F8F9FA", color: "#333" }}>
        <div className="container-xxl">
          <div className="row align-items-center g-3">
            {/* 🔹 Logo */}
            <div className="col-12 col-md-3 text-center text-md-start mb-3 mb-md-0">
              <h1 className="mb-0">
                <Link
                  className="text-decoration-none fw-bold fs-4"
                  to="/"
                  style={{ background: "linear-gradient(45deg, #6B5B95, #A593E0)", WebkitBackgroundClip: "text", color: "transparent" }}
                >
                  <span className="majesty-logo">MAJESTY</span> COLLECTIONS
                </Link>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="col-12 col-md-5 mb-3 mb-md-0">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products..."
                  style={{ outline: "none", border: "1px solid #6B5B95" }}
                />
                <span
                  className="input-group-text fs-4"
                  style={{ background: "linear-gradient(45deg, #6B5B95, #A593E0)", border: "none", color: "#fff" }}
                >
                  <BiSearch />
                </span>
              </div>
            </div>

            {/* 🔹 Cart, Login, Sign Up */}
            <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-center gap-3">
              {/*  Cart */}
              <Link to="/cart" className="text-dark d-flex align-items-center position-relative">
                <FaShoppingCart size={22} style={{ color: "#6B5B95" }} />
                {/* Cart Counter Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "linear-gradient(45deg, #FF6B6B, #FFD166)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {cartCount}
                </span>
                <span className="ms-1 fw-bold d-none d-md-inline" style={{ color: "#6B5B95" }}>
                  Cart
                </span>
              </Link>

              {/*  Login */}
              <Link to="/login" className="text-dark d-flex align-items-center">
                <FaSignInAlt size={20} style={{ color: "#6B5B95" }} />
                <span className="ms-1 fw-bold d-none d-md-inline" style={{ color: "#6B5B95" }}>
                  Login
                </span>
              </Link>

              {/* Sign Up */}
              <Link to="/signup" className="text-dark d-flex align-items-center">
                <FaUserPlus size={20} style={{ color: "#6B5B95" }} />
                <span className="ms-1 fw-bold d-none d-md-inline" style={{ color: "#6B5B95" }}>
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 🔹 Navigation Bar */}
      <header className="bg-white py-2 shadow-sm">
        <div className="container-xxl">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              {/* 🔹 Mobile Menu Button */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* 🔹 Navbar Items */}
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto gap-3">
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bold" to="/" style={{ color: "#333" }}>
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bold" to="/shop" style={{ color: "#333" }}>
                      Shop
                    </NavLink>
                  </li>

                  {/* 🏷️ Hot Deals */}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold"
                      to="/hot-deals"
                      style={{ background: "linear-gradient(45deg, #FF6B6B, #FFD166)", WebkitBackgroundClip: "text", color: "transparent" }}
                    >
                      🔥 Hot Deals
                    </NavLink>
                  </li>

                  {/* 👟 Sneakers */}
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bold" to="/sneakers" style={{ color: "#333" }}>
                      <GiRunningShoe size={18} className="me-1" /> Sneakers
                    </NavLink>
                  </li>

                  {/* 👗 Women's Collection */}
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bold" to="/womens" style={{ color: "#333" }}>
                      <GiClothes size={18} className="me-1" /> Women
                    </NavLink>
                  </li>

                  {/* 👶 Kids */}
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bold" to="/kids" style={{ color: "#333" }}>
                      <GiKidneys size={18} className="me-1" /> Kids
                    </NavLink>
                  </li>

                  {/* 🏠 Household */}
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bold" to="/household" style={{ color: "#333" }}>
                      <GiFamilyHouse size={18} className="me-1" /> Household
                    </NavLink>
                  </li>

                  {/* 👕 Clothes */}
                  <li className="nav-item">
                    <NavLink className="nav-link fw-bold" to="/clothes" style={{ color: "#333" }}>
                      <GiClothes size={18} className="me-1" /> Clothes
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
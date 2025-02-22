import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart, FaSignInAlt, FaUserPlus, FaThList } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { GiClothes, GiRunningShoe, GiKidneys, GiFamilyHouse } from "react-icons/gi";

const Header = () => {
  const [cartCount, setCartCount] = useState(0); // State to manage cart count

  return (
    <>
      {/* 🔹 Top Header (Contact & Message) */}
      <header
        className="header-top-strip px-3 px-md-4 py-2"
        style={{
          background: "var(--color-sample-4)",
          color: "#fff",
        }}
      >
        <div className="container-xxl d-flex justify-content-between align-items-center">
          <p className="mb-0 fw-bold" style={{ fontSize: "10px" }}>
            🔥 Exclusive Discounts @ MAJESTY COLECTIONS
          </p>
          <p className="mb-0" style={{ fontSize: "10px" }}>
            Hotline:{" "}
            <a className="fw-bold  text-text-decoration-none" href="tel:+254740045355" style={{ color: "var(--color-sample-1)", fontSize: "10px" }}>
               +254 740 045 355  |  +254740045355
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
                  style={{ 
                    background: "linear-gradient(45deg, var(--color-sample-3), var(--color-sample-4))", 
                    WebkitBackgroundClip: "text", 
                    color: "transparent" 
                  }}
                >
                  <span className="majesty-logo  p-1 " style={{backgroundColor: "#FF5C00"  ,  color:"#fff"  }} >MAJESTY</span> COLLECTIONS
                </Link>
              </h1>
            </div>

            {/* 🔹 Search Bar */}
            <div className="col-12 col-md-5 mb-3 mb-md-0">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products..."
                  style={{ outline: "none", border: "1px solid var(--color-sample-3)" }}
                />
                <span
                  className="input-group-text fs-4"
                  style={{ 
                    background: "linear-gradient(45deg, var(--color-sample-3), var(--color-sample-4))", 
                    border: "none", 
                    color: "#fff" 
                  }}
                >
                  <BiSearch />
                </span>
              </div>
            </div>

            {/* 🔹 Cart, Login, Sign Up */}
            <div className="col-12 col-md-4 d-flex justify-content-end align-items-center gap-4">
              {/* 🔹 Cart */}
              <Link to="/cart" className="text-dark d-flex align-items-center position-relative">
                <FaShoppingCart size={22} style={{ color: "var(--color-sample-3)" }} />
                {/* 🔹 Cart Counter Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "linear-gradient(45deg, var(--color-sample-2), var(--color-sample-1))",
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
                <span className="ms-1 fw-bold d-none d-md-inline" style={{ color: "var(--color-sample-3)" }}>
                  Cart
                </span>
              </Link>

              {/* 🔹 Login */}
              <Link to="/login" className="text-dark d-flex align-items-center">
                <FaSignInAlt size={20} style={{ color: "var(--color-sample-3)" }} />
                <span className="ms-1 fw-bold d-none d-md-inline" style={{ color: "var(--color-sample-3)" }}>
                  Login
                </span>
              </Link>

              {/* 🔹 Sign Up */}
              <Link to="/signup" className="text-dark d-flex align-items-center">
                <FaUserPlus size={20} style={{ color: "var(--color-sample-3)" }} />
                <span className="ms-1 fw-bold d-none d-md-inline" style={{ color: "var(--color-sample-3)" }}>
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
                className="navbar-toggler border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{ outline: "none", boxShadow: "none" }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* 🔹 Navbar Items */}
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto gap-3">
                  {/* 🔹 Categories */}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold d-flex align-items-center"
                      to="/categories"
                      style={({ isActive }) => ({
                        color: isActive ? "var(--color-sample-2)" : "#333",
                        borderBottom: isActive ? "2px solid var(--color-sample-2)" : "none",
                      })}
                    >
                      <FaThList size={20} className="me-1" /> Categories
                    </NavLink>
                  </li>

                  {/* 🔹 Home */}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold"
                      to="/"
                      style={({ isActive }) => ({
                        color: isActive ? "var(--color-sample-2)" : "#333",
                        borderBottom: isActive ? "2px solid var(--color-sample-2)" : "none",
                      })}
                    >
                      Home
                    </NavLink>
                  </li>

                  {/* 🔹 Shop */}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold"
                      to="/shop"
                      style={({ isActive }) => ({
                        color: isActive ? "var(--color-sample-2)" : "#333",
                        borderBottom: isActive ? "2px solid var(--color-sample-2)" : "none",
                      })}
                    >
                      Shop
                    </NavLink>
                  </li>

                  {/* 🔹 Hot Deals */}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold"
                      to="/hotdeals"
                      style={({ isActive }) => ({
                        background: isActive
                          ? "linear-gradient(45deg, var(--color-sample-2), var(--color-sample-1))"
                          : "linear-gradient(45deg, var(--color-sample-2), var(--color-sample-1))",
                        WebkitBackgroundClip: "text",
                        color: isActive ? "var(--color-sample-2)" : "transparent",
                        borderBottom: isActive ? "2px solid var(--color-sample-2)" : "none",
                      })}
                    >
                      🔥 Hot Deals
                    </NavLink>
                  </li>

                  {/* 🔹 Sneakers */}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold"
                      to="/sneakers"
                      style={({ isActive }) => ({
                        color: isActive ? "var(--color-sample-2)" : "#333",
                        borderBottom: isActive ? "2px solid var(--color-sample-2)" : "none",
                      })}
                    >
                      <GiRunningShoe size={18} className="me-1" /> Sneakers
                    </NavLink>
                  </li>

                  {/* 🔹 Women's Collection */}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold"
                      to="/womens"
                      style={({ isActive }) => ({
                        color: isActive ? "var(--color-sample-2)" : "#333",
                        borderBottom: isActive ? "2px solid var(--color-sample-2)" : "none",
                      })}
                    >
                      <GiClothes size={18} className="me-1" /> Women
                    </NavLink>
                  </li>

                  {/* 🔹 Kids */}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold"
                      to="/kids"
                      style={({ isActive }) => ({
                        color: isActive ? "var(--color-sample-2)" : "#333",
                        borderBottom: isActive ? "2px solid var(--color-sample-2)" : "none",
                      })}
                    >
                      <GiKidneys size={18} className="me-1" /> Kids
                    </NavLink>
                  </li>

                  {/* 🔹 Household */}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold"
                      to="/household"
                      style={({ isActive }) => ({
                        color: isActive ? "var(--color-sample-2)" : "#333",
                        borderBottom: isActive ? "2px solid var(--color-sample-2)" : "none",
                      })}
                    >
                      <GiFamilyHouse size={18} className="me-1" /> Household
                    </NavLink>
                  </li>

                  {/* 🔹 Clothes */}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold"
                      to="/clothes"
                      style={({ isActive }) => ({
                        color: isActive ? "var(--color-sample-2)" : "#333",
                        borderBottom: isActive ? "2px solid var(--color-sample-2)" : "none",
                      })}
                    >
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
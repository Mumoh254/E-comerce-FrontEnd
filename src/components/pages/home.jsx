import React from "react";
import { FaShoppingCart, FaTshirt, FaShoePrints, FaHome } from "react-icons/fa";
import { GiRunningShoe, GiClothes, GiFamilyHouse } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="landing-page">
      {/* 🔹 Hero Section */}
      <section
        className="hero-section text-center text-white py-5"
        style={{
          background: "linear-gradient(45deg, #6B5B95, #A593E0)",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to Majesty Collections</h1>
          <p className="lead">Your one-stop shop for shoes, clothes, and household items.</p>
          <div className="input-group mb-3 w-75 mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search for products..."
              aria-label="Search"
              aria-describedby="search-button"
            />
            <button className="btn btn-primary" type="button" id="search-button">
              <BiSearch size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 🔹 Categories Section */}
      <section className="categories-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Shop by Category</h2>
          <div className="row g-4">
            {/* 🔹 Shoes */}
            <div className="col-md-4">
              <Link to="/shoes" className="card text-decoration-none text-dark">
                <div className="card-body text-center">
                  <GiRunningShoe size={50} className="mb-3" />
                  <h5 className="card-title fw-bold">Shoes</h5>
                  <p className="card-text">Explore our latest shoe collections.</p>
                </div>
              </Link>
            </div>

            {/* 🔹 Clothes */}
            <div className="col-md-4">
              <Link to="/clothes" className="card text-decoration-none text-dark">
                <div className="card-body text-center">
                  <GiClothes size={50} className="mb-3" />
                  <h5 className="card-title fw-bold">Clothes</h5>
                  <p className="card-text">Discover trendy clothing for all occasions.</p>
                </div>
              </Link>
            </div>

            {/* 🔹 Household */}
            <div className="col-md-4">
              <Link to="/household" className="card text-decoration-none text-dark">
                <div className="card-body text-center">
                  <GiFamilyHouse size={50} className="mb-3" />
                  <h5 className="card-title fw-bold">Household</h5>
                  <p className="card-text">Find essentials for your home.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Featured Products Section */}
      <section className="featured-products-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Featured Products</h2>
          <div className="row g-4">
            {/* 🔹 Product 1 */}
            <div className="col-md-4">
              <div className="card">
                <img
                  src="https://via.placeholder.com/300x200"
                  className="card-img-top"
                  alt="Product 1"
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Running Shoes</h5>
                  <p className="card-text">$99.99</p>
                  <button className="btn btn-primary w-100">
                    <FaShoppingCart className="me-2" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* 🔹 Product 2 */}
            <div className="col-md-4">
              <div className="card">
                <img
                  src="https://via.placeholder.com/300x200"
                  className="card-img-top"
                  alt="Product 2"
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Casual T-Shirt</h5>
                  <p className="card-text">$29.99</p>
                  <button className="btn btn-primary w-100">
                    <FaShoppingCart className="me-2" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* 🔹 Product 3 */}
            <div className="col-md-4">
              <div className="card">
                <img
                  src="https://via.placeholder.com/300x200"
                  className="card-img-top"
                  alt="Product 3"
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Home Decor</h5>
                  <p className="card-text">$49.99</p>
                  <button className="btn btn-primary w-100">
                    <FaShoppingCart className="me-2" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Footer Section */}
      <footer className="footer-section py-4 bg-dark text-white">
        <div className="container text-center">
          <p className="mb-0">&copy; 2023 Majesty Collections. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
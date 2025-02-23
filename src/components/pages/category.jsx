import React, { useState, useEffect } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // API Call
  useEffect(() => {
    fetch("https://your-api-endpoint.com/categories") // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-wrapper py-5">
      <div className="container-xxl">
        <div className="row g-4"> {/* Adds uniform spacing between rows/columns */}
          {loading ? (
            <div className="col-12 text-center">
              <p className="fw-bold text-muted">Loading categories...</p>
            </div>
          ) : categories.length > 0 ? (
            categories.map((category, index) => (
              <div key={index} className="col-md-6 col-lg-4"> {/* Adjusts layout for different screen sizes */}
                <div className="category-card p-3 border rounded d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="mb-1 fw-semibold">{category.name}</h6>
                    <p className="text-muted">{category.items} items</p>
                  </div>
                  <img
                    src={category.img}
                    className="img-fluid rounded"
                    alt={category.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="fw-bold text-danger">No categories available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

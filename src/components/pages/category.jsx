import React, { useState, useEffect } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // API Call
  useEffect(() => {
    fetch("https://your-api-endpoint.com/categories") // Replace with your API URL
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
        <div className="row g-3"> {/* Add spacing between rows and columns */}
          {loading ? (
            <div className="col-12 text-center">
              <p>Loading categories...</p>
            </div>
          ) : categories.length > 0 ? (
            categories.map((category, index) => (
              <div key={index} className="col-md-6">
                <div className="h-100 p-3 border rounded d-flex flex-column justify-content-between"> {/* Ensure consistent height and flex layout */}
                  <div>
                    <h6 className="mb-2">{category.name}</h6>
                    <p className="mb-0">{category.items} items</p>
                  </div>
                  <div className="text-end">
                    <img
                      src={category.img}
                      className="img-fluid"
                      alt={category.name}
                      style={{ width: "30px" }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No categories available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
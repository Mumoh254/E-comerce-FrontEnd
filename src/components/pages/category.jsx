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
        <div className="row">
          {loading ? (
            <div className="col-12 text-center">
              <p>Loading categories...</p>
            </div>
          ) : categories.length > 0 ? (
            categories.map((category, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="row align-items-center categories p-3 justify-content-space-between border rounded">
                  <div className="col-6">
                    <h6>{category.name}</h6>
                    <p>{category.items} items</p>
                  </div>
                  <div className="col-6 text-end">
                    <img
                      src={category.img}
                      className="img-fluid"
                      alt={category.name}
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

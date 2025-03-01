import React, { useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";

const productsData = [
  {
    id: 1,
    image: "/images/shoes/woman.png",
    brand: "Exellent  Heels ",
    title: "Excellent Heels",
    description: "Comfortable Hells sneakers ",
    price: 1800,
    sizes: [  36  -  42 ],
    colors: ["#FF0000", "#000000", "#FFFFFF"],
  },
  {
    id: 2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbearQ-RH3Ulk5t6FDYL5Nk8BJMyv5WbEiKw&s",
    brand: "Vans",
    title: "Old Skool Skate Shoes",
    price: 5900,
    description: "Classic Vans Old Skool shoes for skaters and casual wear.",
    sizes: [38, 39, 40, 41, 42],
    colors: ["#000000", "#0000FF", "#808080"],
  },
  {
    id: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbearQ-RH3Ulk5t6FDYL5Nk8BJMyv5WbEiKw&s",
    brand: "Vans",
    title: "Old Skool Skate Shoes",
    price: 5900,
    description: "Classic Vans Old Skool shoes for skaters and casual wear.",
    sizes: [38, 39, 40, 41, 42],
    colors: ["#000000", "#0000FF", "#808080"],
  },
  {
    id: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbearQ-RH3Ulk5t6FDYL5Nk8BJMyv5WbEiKw&s",
    brand: "Vans",
    title: "Old Skool Skate Shoes",
    price: 5900,
    description: "Classic Vans Old Skool shoes for skaters and casual wear.",
    sizes: [38, 39, 40, 41, 42],
    colors: ["#000000", "#0000FF", "#808080"],
  }
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(price);
  };

  const ProductCard = ({ product }) => (
    <div className="col-6 col-md-4 col-lg-3 mb-3">
      <div className="product-card p-2 bg-white border rounded shadow-sm h-100">
        <div 
          className="product-img text-center mb-2"
          role="button" 
          tabIndex="0"
          onClick={() => setSelectedProduct(product)}
          onKeyPress={(e) => e.key === "Enter" && setSelectedProduct(product)}
        >
          <img
            src={product.image}
            alt={`${product.brand} ${product.title}`}
            className="img-fluid rounded hover-zoom"
            style={{ 
              height: "250px",
              width: "100%", 
              objectFit: "cover",
              transition: "transform 0.3s ease"
            }}
          />
        </div>
        <div className="product-details text-start px-1">
          <p className="text-muted mb-0 small text-truncate">{product.brand}</p>
          <h4 className="mb-1 small text-p">{product.title}</h4>
          <p className="color-text mb-0 small">{formatPrice(product.price)}</p>
        </div>
      </div>
    </div>
  );

  const ProductModal = ({ product, onClose }) => (
    <Modal show={true} onHide={onClose} centered size="lg" className="mw-100 mx-2">
      <Modal.Header closeButton className="p-3">
        <Modal.Title className="h6 mb-0">{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <div className="row g-3">
          <div className="col-12 col-md-6 text-center">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded"
              style={{ 
                height: "200px",
                objectFit: "contain" 
              }}
            />
          </div>
          <div className="col-12 col-md-6">
            <p className="text-muted small mb-1">{product.brand}</p>
            <h5 className="text-primary h6 mb-3">{formatPrice(product.price)}</h5>
            <p className="text-muted small">{product.description}</p>

            <div className="mt-3">
              <h6 className="fw-bold small">Available Sizes:</h6>
              <div className="d-flex flex-wrap gap-1 mt-2">
                {product.sizes.map(size => (
                  <Badge 
                    key={size} 
                    bg="light" 
                    className="border text-dark p-1 small"
                  >
                    EU {size}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <h6 className="fw-bold small">Available Colors:</h6>
              <div className="d-flex flex-wrap gap-1 mt-2">
                {product.colors.map(color => (
                  <div
                    key={color}
                    style={{
                      backgroundColor: color,
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      border: "1px solid #dee2e6"
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <Button 
              variant="primary" 
              size="sm"
              className="w-100 mt-3"
              onClick={() => {/* Add to cart logic */}}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );

  return (
    <div className="container py-3 py-md-5">
      <h2 className="h5 mb-3 text-start">Featured Products</h2>
      <div className="row g-2">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Products;
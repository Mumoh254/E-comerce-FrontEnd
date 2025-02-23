import React, { useState } from 'react';
import { Breadcrumb, Card, ListGroup, Form, Button, Modal } from 'react-bootstrap';

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 2500,
    description: "High-quality product description",
    image: "https://via.placeholder.com/300",
    sizes: ["S", "M", "L"],
    colors: ["#FF0000", "#00FF00", "#0000FF"],
    category: "Clothing",
    inStock: true
  },
  // Add more products as needed
];

export default function Store() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [priceRange, setPriceRange] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const ColorCircle = ({ color }) => (
    <div 
      className="color-circle me-2"
      style={{
        backgroundColor: color,
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        border: '2px solid #dee2e6',
        cursor: 'pointer'
      }}
      title={color}
    />
  );

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedProduct(null);
  };

  const filteredProducts = mockProducts.filter(product => {
    return (
      (!inStockOnly || product.inStock) &&
      (!priceRange || (
        product.price >= parseInt(priceRange.split('-')[0]) && 
        product.price <= parseInt(priceRange.split('-')[1])
      ))
    );
  });

  return (
    <div className="store-wrapper container-xxl py-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Majest Collections Store</Breadcrumb.Item>
      </Breadcrumb>

      {/* Product Details Modal */}
      <Modal show={showDetails} onHide={handleCloseDetails} centered size="lg">
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-4">
                <div className="col-md-6">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-md-6">
                  <h4 className="mb-3">{selectedProduct.name}</h4>
                  <h5 className="text-primary mb-4">Ksh {selectedProduct.price}</h5>
                  <p className="text-muted">{selectedProduct.description}</p>

                  <div className="my-4">
                    <h6>Available Sizes:</h6>
                    <div className="d-flex gap-2">
                      {selectedProduct.sizes.map(size => (
                        <Button variant="outline-secondary" key={size}>
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="my-4">
                    <h6>Available Colors:</h6>
                    <div className="d-flex gap-2">
                      {selectedProduct.colors.map(color => (
                        <ColorCircle key={color} color={color} />
                      ))}
                    </div>
                  </div>

                  <Button variant="primary" className="w-100">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>

      <div className="row g-4">
        {/* Filters Column */}
        <div className="col-md-3">
          <Card className="filter-card mb-4 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Shop by Categories</h5>
              <ListGroup variant="flush">
                <ListGroup.Item action>Clothing</ListGroup.Item>
                <ListGroup.Item action>Women's Fashion</ListGroup.Item>
                <ListGroup.Item action>Household Items</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="filter-card mb-4 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Product Filters</h5>
              
              <div className="mb-4">
                <Form.Check 
                  type="checkbox"
                  label="In Stock Only"
                  id="stock-check"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
              </div>

              <div className="mb-4">
                <h6 className="text-muted">Price Range</h6>
                <Form.Select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">All Prices</option>
                  <option value="200-300">Ksh 200 - 300</option>
                  <option value="1000-4000">Ksh 1,000 - 4,000</option>
                  <option value="5000-6000">Ksh 5,000 - 6,000</option>
                </Form.Select>
              </div>

              <div className="mb-4">
                <h6 className="text-muted">Colors</h6>
                <div className="d-flex flex-wrap">
                  <ColorCircle color="#FF0000" />
                  <ColorCircle color="#FFFFFF" />
                  <ColorCircle color="#000000" />
                  <ColorCircle color="#0000FF" />
                  <ColorCircle color="#008000" />
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="filter-card shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Featured Products</h5>
              <div className="row g-2">
                {mockProducts.slice(0, 3).map((product) => (
                  <div className="col-4" key={product.id}>
                    <img 
                      src={product.image}
                      alt="Featured product"
                      className="img-fluid rounded"
                    />
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Products Column */}
        <div className="col-md-9">
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-md-4" key={product.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img 
                    variant="top" 
                    src={product.image} 
                    className="p-3"
                  />
                  <Card.Body>
                    <Card.Title className="h6">{product.name}</Card.Title>
                    <Card.Text className="text-muted small">
                      Ksh {product.price}
                    </Card.Text>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleShowDetails(product)}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
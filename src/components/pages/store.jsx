import React, { useState, useEffect } from 'react';
import { Breadcrumb, Card, ListGroup, Form, Button, Modal, Spinner, Alert, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Store() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    color: '',
    minPrice: '',
    maxPrice: '',
    brand: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories] = useState(['women sneakers', 'household', 'kids', 'clothes', 'electronics', 'bata']);
  const [brands] = useState(['nike', 'adidas', 'puma', 'gucci', 'h&m', 'zara']);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });

        const url = `http://localhost:3000/apiV1/products/fetch${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(Array.isArray(data.products) ? data.products : []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handlePriceChange = (range) => {
    const [min, max] = range.split('-');
    setFilters(prev => ({ ...prev, minPrice: min || '', maxPrice: max || '' }));
  };
  const addToCart = async (productId, color = "Red", count = 1) => {
    try {
      const cartData = {
        cart: [{ _id: productId, count, color }]
      };
  
      const response = await axios.post(
        "http://localhost:8000/apiV1/majestycollections/user/cart",
        cartData
      );
  
      if (response.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to cart!",
          showConfirmButton: false,
          timer: 2000, // 2 seconds
        });
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to add to cart", "error");
    }
  };
  
  

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
      onClick={() => setFilters(prev => ({ ...prev, color: prev.color === color ? '' : color }))}
    />
  );

  return (
    <div className="store-wrapper container-xxl py-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Majesty Collections Store</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <div className="text-center"><Spinner animation="border" /></div>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-4">
        <Col md={3}>
          <Card className="filter-card mb-4 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Categories</h5>
              <ListGroup variant="flush">
                {categories.map(category => (
                  <ListGroup.Item 
                    key={category} 
                    action 
                    active={filters.category === category} 
                    onClick={() => setFilters(prev => ({ ...prev, category: prev.category === category ? '' : category }))}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="filter-card mb-4 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Filters</h5>
              <Form.Group className="mb-4">
                <Form.Label>Brand</Form.Label>
                <Form.Select value={filters.brand} onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}>
                  <option value="">All Brands</option>
                  {brands.map(brand => 
                    <option key={brand} value={brand}>
                      {brand.charAt(0).toUpperCase() + brand.slice(1)}
                    </option>
                  )}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Price Range (Ksh)</Form.Label>
                <Form.Select 
                  value={`${filters.minPrice}-${filters.maxPrice}`} 
                  onChange={(e) => handlePriceChange(e.target.value)}
                >
                  <option value="-">All Prices</option>
                  <option value="1-2000">1 - 2,000</option>
                  <option value="2000-3000">2,000 - 3,000</option>
                  <option value="3000-7000">3,000 - 7,000</option>
                  <option value="7000-10000">7,000 - 10,000</option>
                  <option value="10000-">10,000+</option>
                </Form.Select>
              </Form.Group>

              <div className="mb-4">
                <Form.Label>Colors</Form.Label>
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
        </Col>

        <Col md={9}>
          <Row className="g-4">
            {products.map(product => (
              <Col key={product._id} xs={12} sm={6} lg={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img 
                    variant="top" 
                    src={product.image} 
                    style={{ height: '200px', objectFit: 'contain', padding: '1rem' }} 
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="mt-auto">
                      <span className="text-primary fw-bold">Ksh {product.price}</span>
                      <br/>
                      <small className="text-muted">{product.brand}</small>
                    </Card.Text>
                    <Button 
                      variant="outline-primary" 
                      onClick={() => setSelectedProduct(product)}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Modal show={!!selectedProduct} onHide={() => setSelectedProduct(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Row>
              <Col md={6}>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="img-fluid rounded"
                />
              </Col>
              <Col md={6}>
                <p>{selectedProduct.description}</p>
                <p><strong>Brand:</strong> {selectedProduct.brand}</p>
                <p><strong>Category:</strong> {selectedProduct.category}</p>
                <p><strong>Color:</strong> {selectedProduct.color}</p>
                <p><strong>Price:</strong> Ksh {selectedProduct.price}</p>
                <Button 
                  variant="primary" 
                  className="mt-3"
                  onClick={() => {
                    addToCart(selectedProduct._id);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </Button>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
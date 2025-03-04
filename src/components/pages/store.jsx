import React, { useState, useEffect } from 'react';
import { 
  Breadcrumb, Card, Form, Button, 
  Modal, Spinner, Alert, Pagination, Row, Col
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

export default function Store() {
  // State Management
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({ category: '', price: '', page: 1, limit: 9 });
  const [totalProducts, setTotalProducts] = useState(0);
  const [showProductModal, setShowProductModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // Constants
  const categories = ['Shoes', 'Clothing', 'Electronics', 'Home', 'Beauty'];
  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under Ksh 1000', value: '0-1000' },
    { label: 'Ksh 1000 - 5000', value: '1000-5000' },
    { label: 'Ksh 5000 - 10000', value: '5000-10000' },
    { label: 'Over Ksh 10000', value: '10000-999999' }
  ];

  // Product Card Component
  const ProductCard = ({ product }) => (
    <Card className="h-100 border-0 shadow-sm product-card">
      <Card.Img
        variant="top"
        src={product.images?.[0] || '/placeholder.jpg'}
        className="product-image"
        alt={product.title}
      />
      <Card.Body className="d-flex flex-column p-3">
        <Card.Title className="fs-6 mb-2 line-clamp-2">{product.title}</Card.Title>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="text-primary fw-bold">Ksh {product.price}</span>
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={() => {
              setSelectedProduct(product);
              setShowProductModal(true);
            }}
          >
            Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  // Data Fetching
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams(filters);
        const response = await fetch(`https://majestycollections.onrender.com/products/fetch?${query}`);
        
        if (!response.ok) throw new Error('Failed to fetch products');
        const { data, total } = await response.json();
        
        setProducts(data || []);
        setTotalProducts(total || 0);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  // Responsive Handling
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cart Functionality
  const addToCart = async (product) => {
    try {
      const token = Cookies.get('userToken');
  
      const cartItem = {
        _id: product._id,  // Matches backend expectation
        count: 1,  // Backend expects 'count', not 'quantity'
        color: 'default'  // Optional
      };
  
      if (token) {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  
        // Check if the product is already in cart
        const updatedCart = existingCart.some(item => item._id === product._id)
          ? existingCart.map(item =>
              item._id === product._id ? { ...item, count: item.count + 1 } : item
            )
          : [...existingCart, cartItem];
  
        await fetch('https://majestycollections.onrender.com/user/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ cart: updatedCart })
        });
  
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
  
      Swal.fire({ icon: 'success', title: 'Added to cart!', timer: 1500 });
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };
  
  // Layout
  return (
    <div className="container-fluid px-3">
      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
          padding: 1rem 0;
        }
        
        .product-image {
          height: 220px;
          object-fit: contain;
          padding: 1rem;
          background: #f8f9fa;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .modal-image {
          max-height: 60vh;
          object-fit: contain;
        }
        
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr 1fr; gap: 0.5rem }
          .product-image { height: 160px }
        }
      `}</style>

      <Breadcrumb className="py-3">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Store</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        {/* Filters Sidebar */}
        <Col md={3} className="mb-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value, page: 1 }))}
              >
                <option value="">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price Range</Form.Label>
              <Form.Select
                value={filters.price}
                onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value, page: 1 }))}
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>

        {/* Products Grid */}
        <Col md={9}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : products.length === 0 ? (
            <Alert variant="info">No products found</Alert>
          ) : (
            <>
              <div className="product-grid">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  {Array.from({ length: Math.ceil(totalProducts/filters.limit) }, (_, i) => (
                    <Pagination.Item
                      key={i+1}
                      active={i+1 === filters.page}
                      onClick={() => setFilters(prev => ({ ...prev, page: i+1 }))}
                    >
                      {i+1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            </>
          )}
        </Col>
      </Row>

      {/* Product Modal */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)} size="lg" centered>
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <img
                    src={selectedProduct.images?.[0]}
                    alt={selectedProduct.title}
                    className="w-100 modal-image mb-3"
                  />
                </Col>
                <Col md={6}>
                  <p className="lead  text-black ">{selectedProduct.description}</p>
                  <h4 className="text-primary mb-4">Avalilable  sizes  {selectedProduct.sizes}</h4>
                  <h4 className="text-primary mb-4">Ksh {selectedProduct.price}</h4>
                  
                  <div className="d-grid gap-2">
                    <Button variant="success" size="lg" onClick={() => {
                      const message = `I want to purchase: ${selectedProduct.title} (Ksh ${selectedProduct.price})`;
                      window.open(`https://wa.me/254740045355?text=${encodeURIComponent(message)}`, '_blank');
                    }}>
                      WhatsApp Order
                    </Button>
                    
                    <Button variant="primary" size="lg" onClick={() => {
                      addToCart(selectedProduct);
                      setShowProductModal(false);
                    }}>
                      Add to Cart
                    </Button>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
}
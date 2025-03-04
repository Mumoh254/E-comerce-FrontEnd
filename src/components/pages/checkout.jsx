


  import React, { useState, useEffect } from 'react';
  import { 
    Container, Row, Col, Form, Button, Card, 
    ListGroup, Spinner, Alert, Image, Badge 
  } from 'react-bootstrap';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import { FaMobileAlt, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
  // import './Checkout.css'; // Create this CSS file
  
  const Checkout = () => {
    // ... existing state and logic ...


    
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: 'Nairobi',
    zip: '',
    country: 'Kenya',
    paymentMethod: 'mpesa'
  });




  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();





  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = Cookies.get('userToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:3000/apiV1/majestycollections/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartItems(response.data.cart?.products || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load cart');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [navigate]);




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    try {
      const token = Cookies.get('userToken');
      if (!token) {
        navigate('/login');
        return;
      }
      const orderData = {
        ...formData,
        items: cartItems.map(item => ({ product: item.product._id, quantity: item.count }))
      };
      const response = await axios.post('https://majestycollections.onrender.com/cart/order', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(response.ok){
        navigate('/confirmed')
      }
      if (formData.paymentMethod === 'mpesa') {
        navigate('/stk-push');
      } else {
        navigate(`/confirmed${response.data.order._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setProcessing(false);
    }
  };



  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price || 0) * (item.count || 1), 0);
  const shipping = 300;
  const total = subtotal + shipping;

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;


  
    return (
      <Container className="checkout-container my-5">
        <Row className="g-4">
          {/* Checkout Form Column */}
          <Col lg={8}>
            <Card className="checkout-card shadow-lg">
              <Card.Body>
                <h2 className="checkout-title mb-4">Checkout Details</h2>
                {error && <Alert variant="danger" className="animated fadeIn">{error}</Alert>}
                
                <Form onSubmit={handleSubmit} className="checkout-form">
                  {/* Shipping Information */}
                  <section className="mb-5">
                    <h4 className="section-title mb-4">🚚 Shipping Information</h4>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            name="firstName"
                            placeholder="John"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-control-lg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            name="lastName"
                            placeholder="Doe"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-control-lg"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
  
                    <Form.Group className="mt-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control-lg"
                      />
                    </Form.Group>
  
                    <Form.Group className="mt-3">
                      <Form.Label>Delivery Address</Form.Label>
                      <Form.Control
                        name="address"
                        placeholder="123 Main Street"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control-lg"
                      />
                    </Form.Group>
                  </section>
  
                  {/* Payment Method Section */}
                  <section className="payment-section">
                    <h4 className="section-title mb-4">💳 Payment Method</h4>
                    <Form.Select 
                      name="paymentMethod" 
                      value={formData.paymentMethod} 
                      onChange={handleChange} 
                      required
                      className="payment-select"
                    >
                      <option value="mpesa">
                        <FaMobileAlt className="me-2" /> M-Pesa
                      </option>
                      <option value="card">
                        <FaCreditCard className="me-2" /> Credit/Debit Card
                      </option>
                      <option value="cash">
                        <FaMoneyBillWave className="me-2" /> Cash on Delivery
                      </option>
                    </Form.Select>
  
                    {/* M-Pesa Payment Box */}
                    {formData.paymentMethod === 'mpesa' && (
                      <div className="mpesa-payment-box mt-4 p-4">
                        <div className="mpesa-header mb-3">
                          <img 
                            src="/mpesa-logo.png" 
                            alt="M-Pesa" 
                            className="mpesa-logo"
                            width="120"
                          />
                          <h5 className="text-success mb-0">Lipa na M-Pesa</h5>
                        </div>
                        
                        <ListGroup variant="flush" className="mpesa-instructions">
                          <ListGroup.Item className="d-flex justify-content-between">
                            <span>Paybill Number:</span>
                            <Badge bg="dark">400455</Badge>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between">
                            <span>Account Number:</span>
                            <Badge bg="dark">yryuuurru</Badge>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between">
                            <span>Account Name:</span>
                            <Badge bg="primary">Majesty</Badge>
                          </ListGroup.Item>
                        </ListGroup>
  
                        <div className="payment-status-buttons mt-4">
                          <Button variant="success" size="lg" className="w-100 mb-2">
                            I Have Paid ✅
                          </Button>
                          <Button variant="outline-success" size="lg" className="w-100">
                            Pay Later ⏳
                          </Button>
                        </div>
                      </div>
                    )}
                  </section>
  
                  {/* Submit Button */}
                  <Button 
                    variant="primary" 
                    size="lg" 
                    type="submit" 
                    className="checkout-button w-100 mt-5"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Processing Order...
                      </>
                    ) : (
                      `Complete Purchase - Ksh ${total.toFixed(2)}`
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
  
          {/* Order Summary Column */}
          <Col lg={4}>
            <Card className="order-summary-card shadow-lg sticky-top">
              <Card.Body>
                <h4 className="summary-title mb-4">🛒 Your Order</h4>
                <ListGroup variant="flush" className="summary-list">
                  {cartItems.map((item) => (
                    <ListGroup.Item 
                      key={item.product._id} 
                      className="summary-item d-flex align-items-center"
                    >
                      <Image 
                        src={item.product.image} 
                        alt={item.product.name}
                        width={60}
                        height={60}
                        className="product-image me-3"
                        thumbnail
                      />
                      <div className="flex-grow-1">
                        <h6 className="product-name mb-0">{item.product.name}</h6>
                        <small className="text-muted">Qty: {item.count}</small>
                      </div>
                      <div className="product-price">
                        Ksh {(item.product.price * item.count).toFixed(2)}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
  
                <div className="summary-totals mt-4 pt-3 border-top">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>Ksh {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Shipping:</span>
                    <span>Ksh {shipping.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between total-amount">
                    <strong>Total:</strong>
                    <strong>Ksh {total.toFixed(2)}</strong>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Checkout;
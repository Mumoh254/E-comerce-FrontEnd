// Checkout.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Checkout = () => {
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
        const token = Cookies.get('authToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(
          'http://localhost:8000/apiV1/majestycollections/cart',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCartItems(response.data.cartItems);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load cart');
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
    
    try {
      const token = Cookies.get('authToken');
      const orderData = {
        ...formData,
        items: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity
        }))
      };

      const response = await axios.post(
        'http://localhost:8000/apiV1/majestycollections/orders',
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/order-confirmation/${response.data.order._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setProcessing(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 300;
  const total = subtotal + shipping;

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;

  return (
    <Container className="my-5">
      <Row>
        <Col md={8} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="mb-4">Checkout</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                {/* Shipping Information */}
                <section className="mb-5">
                  <h4 className="mb-3">Shipping Information</h4>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3} className="mb-3">
                      <Form.Label>ZIP Code</Form.Label>
                      <Form.Control
                        name="zip"
                        required
                        value={formData.zip}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3} className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </section>

                {/* Payment Method */}
                <section className="mb-4">
                  <h4 className="mb-3">Payment Method</h4>
                  <Form.Group>
                    <Form.Select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      required
                    >
                      <option value="mpesa">M-Pesa</option>
                      <option value="card">Credit/Debit Card</option>
                      <option value="cash">Cash on Delivery</option>
                    </Form.Select>
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    size="lg" 
                    type="submit" 
                    className="w-100 mt-4"
                    disabled={processing}
                  >
                    {processing ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      `Complete Order (Ksh ${total.toFixed(2)})`
                    )}
                  </Button>
                </section>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card className="shadow-sm sticky-top">
            <Card.Body>
              <h4 className="mb-3">Order Summary</h4>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id} className="d-flex justify-content-between">
                    <div>
                      {item.name} <small>(x{item.quantity})</small>
                    </div>
                    <div>Ksh {(item.price * item.quantity).toFixed(2)}</div>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>Ksh {subtotal.toFixed(2)}</span>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>Ksh {shipping.toFixed(2)}</span>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span>Ksh {total.toFixed(2)}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
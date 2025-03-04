import React, { useEffect, useState } from "react";
import { 
  Container, Button, Card, ListGroup, Alert, Spinner,
  Row, Col, Image, Badge
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHome, FaCheckCircle, FaShoppingBag } from "react-icons/fa";
// import "./OrderConfirmation.css"; // Create this CSS file

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderAndClearCart = async () => {
      try {
        // Fetch order details
        const orderResponse = await axios.get(
          `https://majestycollections.onrender.com/orders/${orderId}`
        );
        
        // Clear user's cart
        await axios.delete(
          'https://majestycollections.onrender.com/cart',
          {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem("userToken")}` 
            }
          }
        );

        setOrder(orderResponse.data.order);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndClearCart();
  }, [orderId]);

  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Confirming your order...</p>
    </div>
  );

  if (error) return (
    <Container className="mt-5">
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
      <Button variant="primary" onClick={() => navigate('/')} className="mt-3">
        <FaHome className="me-2" /> Return Home
      </Button>
    </Container>
  );

  return (
    <Container className="confirmation-container my-5">
      <Card className="shadow-lg border-0">
        <Card.Body className="text-center">
          <FaCheckCircle className="text-success display-4 mb-4" />
          <h1 className="mb-4">🎉 Order Confirmed! 🎉</h1>
          <p className="lead">Thank you for shopping with Majesty Collections!</p>
          
          <div className="order-details mt-5">
            <Row className="g-4">
              <Col md={6}>
                <Card className="h-100">
                  <Card.Body>
                    <h4 className="mb-4"><FaShoppingBag /> Order Summary</h4>
                    <ListGroup variant="flush">
                      {order.products.map((item, index) => (
                        <ListGroup.Item key={index} className="d-flex align-items-center">
                          <Image 
                            src={item.product.images?.[0]} 
                            alt={item.product.name}
                            width={60}
                            height={60}
                            className="me-3"
                            thumbnail
                          />
                          <div className="flex-grow-1">
                            <h6>{item.product.name}</h6>
                            <div className="d-flex justify-content-between">
                              <span>Qty: {item.count}</span>
                              <span>Ksh {(item.product.price * item.count).toFixed(2)}</span>
                            </div>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="h-100">
                  <Card.Body>
                    <h4 className="mb-4">📦 Delivery Details</h4>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Order ID:</strong> {order._id}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Status:</strong>{" "}
                        <Badge bg={
                          order.orderStatus === 'Completed' ? 'success' : 'warning'
                        }>
                          {order.orderStatus}
                        </Badge>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Total Amount:</strong>{" "}
                        <span className="text-success">
                          Ksh {order.paymentIntent.amount.toFixed(2)}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Payment Method:</strong>{" "}
                        {order.paymentIntent.method}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Button 
              variant="primary" 
              size="lg" 
              className="mt-5"
              onClick={() => navigate('/')}
            >
              <FaHome className="me-2" /> Back to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderConfirmation;
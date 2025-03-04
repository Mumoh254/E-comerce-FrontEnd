import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert, Badge, Button, Modal } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const normalizeOrderData = (order) => ({
    _id: order._id || "N/A",
    updatedAt: order.updatedAt || new Date().toISOString(),
    user: {
      name: order.orderedBy?.name || "Unknown Customer",
      email: order.orderedBy?.email || "Unknown Email",
      _id: order.orderedBy?._id || "N/A"
    },
    
    products: Array.isArray(order.products)
      ? order.products.map((item) => ({
          title: item.product?.title || "Unnamed Product",
          count: item.count || 1,
          price: item.product?.price || 0,
          _id: item.product?._id || "N/A",
        }))
      : [],
    totalPrice: order.products.reduce((sum, item) => sum + item.product.price * item.count, 0),
  });

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Admin authentication required");

      const response = await axios.get("https://majestycollections.onrender.com/admin/getorders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const rawOrders = response.data.orders || response.data;
      console.log(rawOrders)
      if (!Array.isArray(rawOrders)) throw new Error("Invalid orders format");

      setOrders(rawOrders.map(normalizeOrderData));
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Order Management</h2>
      {loading ? (
        <Spinner animation="border" className="d-block mx-auto" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : orders.length === 0 ? (
        <Alert variant="info">No orders found</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total Price (KES)</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-6).toUpperCase()}</td>
                <td>{order.user.name}</td>
                <td>KES {order.totalPrice.toFixed(2)}</td>
                <td>{new Date(order.updatedAt).toLocaleString()}</td>
                <td>
                  <Button onClick={() => { setSelectedOrder(order); setShowDetails(true); }}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {selectedOrder && (
        <Modal show={showDetails} onHide={() => setShowDetails(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Customer: {selectedOrder.user.name}</h5>
            <p>Email: {selectedOrder.user.email}</p>
            <h5>Products:</h5>
            <Table striped>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price (KES)</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.products.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.count}</td>
                    <td>KES {item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h5>Total: KES {selectedOrder.totalPrice.toFixed(2)}</h5>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Orders;

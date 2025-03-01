import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Container, Table, Form, Spinner, Alert, Badge, Button 
} from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeOrderData = (order) => ({
    _id: order._id || 'N/A',
    status: order.status || order.orderStatus || 'Pending',
    totalPrice: order.totalPrice || order.paymentIntent?.amount || 0,
    shippingAddress: {
      name: order.shippingAddress?.name || order.user?.name || 'N/A',
      ...order.shippingAddress
    },
    user: {
      email: order.user?.email || order.email || 'N/A',
      ...order.user
    },
    products: order.products?.map(item => ({
      name: item.product?.name || item.name || 'Unknown Product',
      count: item.count || item.quantity || 1,
      ...item
    })) || [],
    createdAt: order.createdAt || new Date().toISOString()
  });

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("Admin authentication required. Please log in.");
      }

      const response = await axios.get(
        "http://localhost:3000/apiV1/majestycollections/admin/getorders",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const rawOrders = response.data.orders || response.data;
      
      if (!Array.isArray(rawOrders)) {
        throw new Error("Server returned invalid orders format");
      }

      const normalizedOrders = rawOrders.map(normalizeOrderData);
      setOrders(normalizedOrders);
      setError(null);

    } catch (error) {
      let errorMessage = "Failed to load orders. ";
      if (error.response) {
        errorMessage += `Server responded with ${error.response.status}: ${error.response.data.message || 'No error message'}`;
      } else {
        errorMessage += error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: "bg-secondary",
      Processing: "bg-primary",
      Shipped: "bg-info",
      Delivered: "bg-success",
      Cancelled: "bg-danger",
    };
    return statusStyles[status] || "bg-warning";
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Authentication required");

      await axios.put(
        `http://localhost:3000/apiV1/majestycollections/admin/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      setError(`Status update failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Order Management</h2>
      <div className="mb-3">
        <Button variant="secondary" onClick={fetchOrders}>
          Refresh Orders
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p className="mt-2">Loading orders...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="mt-4">
          <h5>Error Loading Orders</h5>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={fetchOrders}>
            Retry
          </Button>
        </Alert>
      ) : orders.length === 0 ? (
        <Alert variant="info" className="mt-4">
          No orders found in the system
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Items</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Badge bg="dark">
                      #{order._id.slice(-6).toUpperCase()}
                    </Badge>
                  </td>
                  <td>{order.shippingAddress.name}</td>
                  <td>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </td>
                  <td>KES {(order.totalPrice / 100).toFixed(2)}</td>
                  <td>
                    <Form.Select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      className={`text-white ${getStatusBadge(order.status)}`}
                    >
                      {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    {order.products.map((item, index) => (
                      <div key={index}>
                        <Badge bg="secondary" className="me-2">
                          {item.count}x
                        </Badge>
                        {item.name}
                      </div>
                    ))}
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                    <br />
                    <small>
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default Orders;
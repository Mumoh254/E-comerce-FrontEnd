import React, { useEffect, useState } from "react";
import {
  Container, Row, Col, Card, Navbar, Spinner, Alert, Button,
  Nav, Offcanvas, ListGroup, Badge
} from "react-bootstrap";
import {
  FaUsers, FaShoppingCart, FaBoxOpen, FaChartLine, FaBars,
  FaExclamationTriangle, FaHome, FaProductHunt, FaPlus,
  FaEdit, FaTrash, FaSignOutAlt, FaClock
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    totalInventory: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
    
      const [usersRes, ordersRes, productsRes] = await Promise.all([
        axios.get("http://localhost:3000/apiV1/majestycollections/allusers", {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        }),
        axios.get("http://localhost:3000/apiV1/majestycollections/admin/getorders", {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        }),
        axios.get("http://localhost:3000/apiV1/products/fetch"),
      ]);
  
      // Log raw responses
      console.log("Raw Users Response:", usersRes);
      console.log("Raw Orders Response:", ordersRes);
      console.log("Raw Products Response:", productsRes);
  
      // Extract data with proper error handling
      const users = usersRes.data?.data || [];
      const orders = ordersRes.data?.data || [];
      const products = productsRes.data?.data || []; // Update based on actual products response structure
  
      console.log("Processed Users:", users);
      console.log("Processed Orders:", orders);
      console.log("Processed Products:", products);
  
      setStats({
        users: users.length,
        orders: orders.length,
        products: products.length,
        totalInventory: products.reduce((acc, product) => {
          const price = Number(product?.price) || 0;
          const stock = Number(product?.stock) || 0;
          return acc + (price * stock);
        }, 0),
      });
  
      setLastUpdated(new Date());
      setLoading(false);
    } catch (error) {
      console.error("API Fetch Error:", error);
      setError(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const dataInterval = setInterval(fetchData, 30000);
    
    return () => {
      clearInterval(timer);
      clearInterval(dataInterval);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove token
    window.location.href = "/login"; // Redirect to login page
  };
  
  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" className="dashboard-navbar">
        <Container fluid>
          <Button variant="link" onClick={() => setShowSidebar(true)} className="d-md-none">
            <FaBars className="text-white" />
          </Button>
          <Navbar.Brand className="text-white ms-3">
            <span className="fw-bold">Welcome </span> to  Your  Store 😊😊
          </Navbar.Brand>
          <div className="d-none d-md-flex align-items-center ms-auto">
            <FaClock className="me-2 text-white" />
            <span className="text-white">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
          <Button variant="outline-light" onClick={handleLogout} className="ms-3">
            <FaSignOutAlt className="me-2" /> Logout
          </Button>
        </Container>
      </Navbar>

     

      {/* Main Content */}
      <main className="dashboard-content py-4 mt-5  ">
        <Container fluid>
          <h2 className="mb-4 px-3">Dashboard .. </h2>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="danger" className="mx-3">
              <FaExclamationTriangle className="me-2" />
              {error}
            </Alert>
          ) : (
            <>
              {/* Stats Cards */}
              <Row className="g-4 mb-4 px-3">
                <Col xs={12} sm={6} md={3}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body className="d-flex align-items-center">
                      <FaUsers className="text-primary me-3" size={40} />
                      <div>
                        <h2>{stats.users}</h2>
                        <Card.Text>Total Users</Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12} sm={6} md={3}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body className="d-flex align-items-center">
                      <FaShoppingCart className="text-success me-3" size={40} />
                      <div>
                        <h2>{stats.orders}</h2>
                        <Card.Text>Total Orders</Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12} sm={6} md={3}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body className="d-flex align-items-center">
                      <FaBoxOpen className="text-warning me-3" size={40} />
                      <div>
                        <h2>{stats.products}</h2>
                        <Card.Text>Total Products</Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12} sm={6} md={3}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body className="d-flex align-items-center">
                      <FaChartLine className="text-danger me-3" size={40} />
                      <div>
                        <h2>KES {stats.totalInventory.toLocaleString()}</h2>
                        <Card.Text>Inventory Value</Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </main>

   
    </div>
  );
};

export default Dashboard;
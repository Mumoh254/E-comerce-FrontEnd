import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:8000/apiV1/majestycollections/cart', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          Cookies.remove('authToken');
          navigate('/login');
          return;
        }
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();
      setCartItems(data.cartItems || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const token = Cookies.get('authToken');
      const response = await fetch(`http://localhost:8000/apiV1/majestycollections/user/cart/${productId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      
      if (!response.ok) throw new Error('Failed to remove item');
      await fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = Cookies.get('authToken');
      const response = await fetch('http://localhost:8000/apiV1/majestycollections/cart/order', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ COD: true }),
        credentials: 'include',
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to place order');

      Swal.fire({
        title: 'Success!',
        text: 'Order placed successfully!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      setCartItems([]);
      navigate('/orders');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('authToken');
      if (!token) {
        navigate('/login');
        return;
      }
      fetchCart();
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;

  return (
    <Container className="my-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your cart is empty</h4>
          <Button variant="primary" className="mt-3" onClick={() => navigate('/store')}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead className="bg-light">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>Ksh {item.price}</td>
                  <td>{item.quantity}</td>
                  <td>Ksh {(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="text-end w-100">
              <h4 className="mb-3">
                Total: Ksh {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
              </h4>
              <Button 
                variant="success" 
                onClick={handleCheckout}
                className="px-5 float-end"
              >
                Place Order (COD)
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
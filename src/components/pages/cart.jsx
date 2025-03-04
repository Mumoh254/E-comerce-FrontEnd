import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const API_BASE = 'https://majestycollections.onrender.com/majestycollections';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = Cookies.get('userToken');
      if (!token) return navigate('/login');

      const response = await fetch(`${API_BASE}/cart`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          Cookies.remove('userToken');
          return navigate('/login');
        }
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();
      setCartItems(data.cart?.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const updateCart = async (cartItems) => {
    try {
      const token = Cookies.get('userToken');
      if (!token) return navigate('/login');
  
      const response = await fetch(`${API_BASE}/user/cart`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: cartItems.map((item) => ({
            _id: item.product._id,
            count: item.count,
          })),
        }),
      });
  
      if (!response.ok) throw new Error('Cart update failed');
  
      const data = await response.json();
      setCartItems(data.cart.products);
    } catch (err) {
      setError(err.message);
    }
  };
  
const handleQuantityChange = (productId, newCount) => {
  if (newCount < 1) return;

  setCartItems((prevCart) =>
    prevCart.map((item) =>
      item.product._id === productId ? { ...item, count: newCount } : item
    )
  );

  updateCart(cartItems);
};


  const handleRemoveItem = async (productId) => {
    setLoading(true);
    try {
      const token = Cookies.get('userToken');
      const response = await fetch(`${API_BASE}/cart/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      fetchCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.count, 0).toFixed(2);

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
              {cartItems.map((item) => (
                <tr key={item.product._id}>
                  <td>{item.product.title}</td>
                  <td>
  <img src={item?.product?.image || "/placeholder.jpg"} alt={item?.product?.name || "Product"} width="50" />
</td>


                  <td>Ksh {item.price.toFixed(2)}</td>
                  <td>
                    <Button
                      size="sm"
                      onClick={() => handleQuantityChange(item.product._id, item.count - 1)}
                      disabled={loading || item.count <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.count}</span>
                    <Button
                      size="sm"
                      onClick={() => handleQuantityChange(item.product._id, item.count + 1)}
                      disabled={loading}
                    >
                      +
                    </Button>
                  </td>
                  <td>Ksh {(item.price * item.count).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveItem(item.product._id)}
                      disabled={loading}
                    >
                      {loading ? <Spinner size="sm" /> : 'Remove'}
                    </Button>
                  </td>
                  <td>
  <img src={item.product.image} alt={item.product.name} width="50" height="50" />
  {item.product.name}
</td>

                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="text-end w-100">
              <h4 className="mb-3">Total: Ksh {calculateTotal()}</h4>
              <Button
                variant="success"
                onClick={() => navigate('/checkout')}
                className="px-5 float-end"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;

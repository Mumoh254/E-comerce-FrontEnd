import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AdminRoute = ({ children }) => {
  // 1. Get token from localStorage (where you stored it after login)
  const token = localStorage.getItem('adminToken');
  
  // 2. Immediate redirect if no token
  if (!token) {
    console.log('No admin token found');
    return <Navigate to="/admin/login" replace />;
  }

  try {
    // 3. Decode and validate token
    const decoded = jwt_decode(token);
    console.log('Decoded admin token:', decoded);

    // 4. Check token expiration
    const isExpired = Date.now() >= decoded.exp * 1000;
    if (isExpired) {
      console.warn('Token expired at', new Date(decoded.exp * 1000));
      localStorage.removeItem('adminToken');
      return <Navigate to="/admin/login" replace />;
    }

    // 5. Verify admin role
    if (decoded.role !== 'admin') {
      console.warn('User is not admin, role:', decoded.role);
      return <Navigate to="/admin/login" replace />;
    }

    // 6. Return protected content
    return children;

  } catch (error) {
    console.error('Token verification failed:', error);
    localStorage.removeItem('adminToken');
    return <Navigate to="/admin/login" replace />;
  }
};

export default AdminRoute;
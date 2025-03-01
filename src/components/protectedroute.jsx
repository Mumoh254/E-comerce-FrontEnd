import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const authToken = Cookies.get('authToken');
  
  try {
    if (!authToken) return <Navigate to="/login" replace />;
    
    const decoded = jwtDecode(authToken);
    if (Date.now() >= decoded.exp * 1000) {
      Cookies.remove('authToken');
      return <Navigate to="/login" replace />;
    }
    
    return children;
  } catch (error) {
    Cookies.remove('authToken');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const user = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      setIsAuthenticated(user?.role === "admin");
    } catch (error) {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>; // Prevents flashing

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;

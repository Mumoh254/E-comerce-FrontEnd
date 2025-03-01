import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("No token found! Redirecting to login...");
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const user = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    console.log("Decoded User:", user);

    if (user?.role !== "admin") {
      console.log("User is not admin! Redirecting...");
      return <Navigate to="/admin/login" replace />;
    }

    console.log("Access granted!");
    return <Outlet />;
  } catch (error) {
    console.log("Token invalid or malformed! Redirecting...");
    return <Navigate to="/admin/login" replace />;
  }
};

export default AdminRoute;

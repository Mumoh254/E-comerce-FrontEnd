import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/apiV1/majestycollections/login/admin",
        credentials,
        {
          withCredentials: true, // Ensures refreshToken is stored in cookies
          headers: { "Content-Type": "application/json" },
        }
      );

      // Extract tokens correctly
      const { token, refreshToken } = response.data;
      console.log("Received Tokens:", { token, refreshToken });

      // Validate token structure
      if (!token || token.split(".").length !== 3) {
        throw new Error("Invalid token format received");
      }

      // Decode token
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded);

      if (decoded.role !== "admin") {
        throw new Error("Insufficient privileges");
      }

      // Store tokens securely
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminRefreshToken", refreshToken);

      console.log("Stored adminToken:", localStorage.getItem("adminToken"));
      console.log("Stored adminRefreshToken:", localStorage.getItem("adminRefreshToken"));

      // Set Axios default Authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Redirect after ensuring token is stored
      console.log("Redirecting to dashboard...");
      navigate("/admin/dashboard");

    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Admin Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({ ...credentials, password: e.target.value })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Authenticating...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

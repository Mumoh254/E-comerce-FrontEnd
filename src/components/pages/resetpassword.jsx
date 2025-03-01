import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(""); // Token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const resetToken = params.get("token");
    console.log("Extracted Token:", resetToken); // Debugging

    if (resetToken) {
      setToken(resetToken);
    } else {
      console.error("No reset token found in URL!");
    }
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    console.log("Form Data:", { email, token, newPassword });

    // Validation
    if (!token) {
      console.error("Error: Missing reset token!");
      setMessage({ type: "danger", text: "Invalid or missing reset token!" });
      return;
    }

    if (newPassword !== confirmPassword) {
      console.error("Error: Passwords do not match!");
      setMessage({ type: "danger", text: "Passwords do not match!" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/apiV1/majestycollections/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
         
        },
        body: JSON.stringify({ email, newPassword }),
      });

      console.log("API Response Status:", response.status); // Debugging
      const result = await response.json();
      console.log("API Response Data:", result); // Debugging

      if (response.ok) {
        setMessage({ type: "success", text: "Password reset successfully! Redirecting..." });
        setTimeout(() => navigate("/login"), 3000);
      } else {
        console.error("Server Error:", result.message);
        setMessage({ type: "danger", text: result.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessage({ type: "danger", text: "Server error. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg px-4" style={{ width: "80%" }}>
        <h3 className="text-center ">Reset Password</h3>

        {message.text && (
          <div className={`alert alert-${message.type} text-center`} role="alert">
            {message.text}
          </div>
        )}

        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input 
                type="email" 
                className="form-control" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input 
                type="password" 
                className="form-control" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input 
                type="password" 
                className="form-control" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-40" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

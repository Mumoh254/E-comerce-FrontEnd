import React, { useState } from "react";
import { FaEnvelope, FaLock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const validateForm = () => {
    return email.trim() !== "" && password.trim() !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({ text: "Email and password are required!", type: "error" });
      return;
    }
  
    setLoading(true);
    setMessage({ text: "", type: "" });
  
    try {
      const response = await axios.post(
        "http://localhost:3000/apiV1/majestycollections/login",
        { email, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
  
      console.log("API Response:", response.data);
  
      const token = response.data.token;

      if (!token || token.split(".").length !== 3) {
        throw new Error("Invalid token format received");
      }
  
      const decoded = jwt_decode(token);
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("Token has expired. Please log in again.");
      }
  
      // Store token securely
    Cookies.set("userToken", token, { expires: 7, sameSite: "Lax" });

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      // Redirect based on user role
      if (decoded.role === "admin") {
        window.location.replace("/admin");
      } else if (decoded.role === "user") {
        navigate("/store");
      } else {
        throw new Error("Unauthorized role access");
      }
  
    } catch (err) {
      console.error("Authentication error:", err);
      setMessage({ text: err.response?.data?.message || "Authentication failed. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative">
      {/* Enhanced Message Display */}
      {message.text && (
        <div
          className={`fixed top-4 right-4 flex items-center p-4 rounded-lg shadow-lg animate-slide-in
            ${message.type === "success" ?
              "bg-green-100 border border-green-400 text-green-700" :
              "bg-red-100 border border-red-400 text-red-700"}`}
          style={{ zIndex: 1000, color: "green", fontWeight: "bold" }}
        >
          <span className="mr-2">
            {message.type === "success" ?
              <FaCheckCircle className="text-green-600" /> :
              <FaTimesCircle className="text-red-600" />}
          </span>
          {message.text}
        </div>
      )}

      <section className="auth-section w-full max-w-md bg-white p-8 rounded-2xl shadow-xl mx-4 transition-all duration-300 hover:shadow-2xl">
        <form className="login-form space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome Back | Log-in
          </h2>

          {/* Email Input */}
          <div className="form-group relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaEnvelope className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3 w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400 text-gray-700"
              placeholder="Email Address"
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-group relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3 w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400 text-gray-700"
              placeholder="Password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className=" btn w-full bg-blue-800 text-white py-3.5 rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 transform hover:scale-[1.02] active:scale-95"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              "Log-In "
            )}


          </button>
          <span className="mt-3 ml-3  px-4 text-center">
            Don't have an account? <a href="/register" className="text-primary">Sign Up</a>
          </span>
          <span className="text-center">
            Forgot Password? <a href="/password/reset" className="text-danger">Reset</a>
          </span>

        </form>
      </section>

      {/* Add custom animation CSS */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
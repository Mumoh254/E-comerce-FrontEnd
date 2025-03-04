import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://majestycollections.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const result = await response.json();
      console.log("Response from backend:", result);

      if (response.ok) {
        setMessage({ type: "success", text: result.message || "Account created successfully!" });
        setTimeout(() => navigate("/"), 2000);
      } else {
        if (result.message.includes("already exists")) {
          setMessage({ type: "error", text: "User already exists! Redirecting to login..." });
          setTimeout(() => navigate("/login"), 4000);
        } else {
          setMessage({ type: "error", text: result.message || "Something went wrong. Try again!" });
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server error, please try again later." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
{message.text && (
  <div 
    className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} 
      fixed-top mx-auto text-center w-50 shadow-lg`}
    style={{ zIndex: 1050, fontWeight: "bold" }}>
    {message.text}
  </div>
)}




      <section className="auth-section w-full max-w-md bg-white p-8 rounded-2xl shadow-xl mx-4 transition-all duration-300 hover:shadow-2xl">
        <form onSubmit={handleSubmit} className="registration-form space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account | Register Here</h2>

          <div className="form-group relative group">
            <FaUser className="absolute inset-y-0 left-3 w-5 h-5 text-gray-400" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-3 w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400 text-gray-700" placeholder="Username" required />
          </div>

          <div className="form-group relative group">
            <FaEnvelope className="absolute inset-y-0 left-3 w-5 h-5 text-gray-400" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-3 w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400 text-gray-700" placeholder="Email Address" required />
          </div>

          <div className="form-group relative group">
            <FaLock className="absolute inset-y-0 left-3 w-5 h-5 text-gray-400" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-3 w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400 text-gray-700" placeholder="Password" required />
          </div>

          <div className="form-group relative group">
            <FaLock className="absolute inset-y-0 left-3 w-5 h-5 text-gray-400" />
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="mt-3 w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-400 text-gray-700" placeholder="Confirm Password" required />
          </div>

          <button type="submit" className="btn w-full bg-blue-600 text-white py-3.5 rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 transform hover:scale-[1.02] active:scale-95" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center text-black-600 mt-6">
            Already have an account? <a href="/login" className="text-blue-600 font-semibold hover:text-blue-700 underline underline-offset-4">Login here</a>
          </div>
        </form>
      </section>
    </div>
  );
}

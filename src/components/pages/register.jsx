import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <section className="auth-section w-full max-w-md bg-white p-8 rounded-2xl shadow-xl mx-4 transition-all duration-300 hover:shadow-2xl">
        <form className="registration-form space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Create Account
          </h2>

          {/* Username */}
          <div className="form-group relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaUser className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all
                       placeholder-gray-400 text-gray-700"
              placeholder="Username"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaEnvelope className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all
                       placeholder-gray-400 text-gray-700"
              placeholder="Email Address"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all
                       placeholder-gray-400 text-gray-700"
              placeholder="Password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all
                       placeholder-gray-400 text-gray-700"
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn w-full bg-blue-600 text-white py-3.5 rounded-lg
                     hover:bg-blue-700 transition-all duration-300
                     focus:outline-none focus:ring-4 focus:ring-blue-200
                     transform hover:scale-[1.02] active:scale-95"
          >
            Register
          </button>

          {/* Login Link */}
          <div className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a 
              href="/login" 
              className="text-blue-600 font-semibold hover:text-blue-700 
                         underline underline-offset-4 hover:underline-offset-[5px]
                         transition-all"
            >
              Login here
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}
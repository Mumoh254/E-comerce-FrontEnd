import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <section className="auth-section w-full max-w-md bg-white p-8 rounded-2xl shadow-xl mx-4 transition-all duration-300 hover:shadow-2xl">
        <form className="login-form space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome Back |  Log-in 
          </h2>

          {/* Email */}
          <div className="form-group relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaEnvelope className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-3 w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none 
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
              className="  mt-3  w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all
                       placeholder-gray-400 text-gray-700"
              placeholder="Password"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className=" w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-600 px-3  ">Remember me</span>
            </label>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-full bg-blue-800 text-white py-3.5 rounded-lg
                     hover:bg-blue-700 transition-all duration-300
                     focus:outline-none focus:ring-4 focus:ring-blue-200
                     transform hover:scale-[1.02] active:scale-95  "

                     style={{
                        marginTop:  "20px",
                        width:  "20%"
                     }}
          >
            Sign In
          </button>

          {/* Signup Link */}
          <div className="text-center text-black-600 mt-6 " 
          style={{
            fontWeight:  "bold"
          }}>
            Don't have an account?{" "}
            <a 
              href="/register" 
              className="text-blue-600 font-semibold hover:text-blue-700 
                         underline underline-offset-4 hover:underline-offset-[2px]
                         transition-all  "
                         style={{
                            marginLeft:  "10px",
                            color:    "#CC00FF",
                            fontSize:  "18px"
                         }}
            >
              Create account
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}
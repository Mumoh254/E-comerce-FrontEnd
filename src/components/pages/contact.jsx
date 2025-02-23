import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="contact-section bg-gray-100 py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Contact Information */}
          <div className="contact-info bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-5">Get in Touch</h2>
            <div className="info-item flex items-center gap-4 mb-4">
              <FaMapMarkerAlt className="text-xl text-blue-500" />
              <p>123 Business Street, New York, NY 10001</p>
            </div>
            <div className="info-item flex items-center gap-4 mb-4">
              <FaPhone className="text-xl text-blue-500" />
              <p>+254  -  740 - 045  -  355</p>  <br/>
              <p> +254  740  045  355 </p>
            </div>
            <div className="info-item flex items-center gap-4 mb-4">
              <FaEnvelope className="text-xl text-blue-500" />
              <p>  majestyshoe  collections </p>
            </div>

            {/* Social Links */}
            <div className="social-links flex gap-4 mt-6">
              <a href="#" className="text-blue-500 hover:text-blue-700 text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 text-2xl">
                <FaLinkedin />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 text-2xl">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form bg-white p-6 rounded-lg shadow-lg"  style={{
            marginTop:  "30px"
          }}>
            <h2 className="text-2xl font-semibold mb-5">Send a Message</h2>
            <form>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Your Message</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className=" btn w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

import { Outlet } from "react-router-dom";
import Header from "../layout/Header"; // Ensure it's correctly imported
import Footer from "../layout/footer"; // Ensure it's correctly imported
import React from "react";

export default function Layout() {
  return (
    <div>
      {/* 🔹 Header */}
      <Header />

      {/* 🔹 Main Content */}
      <main className="container my-4">
        <Outlet />
      </main>

      {/* 🔹 Footer */}
      <Footer />
    </div>
  );
}
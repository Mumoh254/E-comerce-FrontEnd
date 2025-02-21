import { Outlet } from "react-router-dom";
import Header from "../layout/Header"; // Ensure it's correctly imported
import Footer from "../layout/footer"; // Ensure it's correctly imported
import React from "react";

export default function Layout() {  // Capitalized 'Layout'
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

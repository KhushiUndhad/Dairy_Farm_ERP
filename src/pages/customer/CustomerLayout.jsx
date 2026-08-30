import { useState } from "react";
import { Outlet } from "react-router-dom";

import CustomerSidebar from "./CustomerSidebar";
import CustomerTopbar from "./CustomerTopbar";

import "./CustomerLayout.css";

const CustomerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div
      className={`customer-layout ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      {/* SIDEBAR */}

      <CustomerSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="customer-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* MAIN AREA */}

      <div className="customer-layout-content">

        {/* TOPBAR */}

        <CustomerTopbar
          onMenuClick={toggleSidebar}
        />

        {/* PAGE CONTENT */}

        <main className="customer-layout-main">
          <Outlet />
        </main>

        {/* FOOTER */}

        <footer className="customer-layout-footer">
          © 2026 Dairy Farm Management System
        </footer>

      </div>
    </div>
  );
};

export default CustomerLayout;
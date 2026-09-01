import { useState } from "react";
import { Outlet } from "react-router-dom";

import EmployeeSidebar from "./EmployeeSidebar";
import EmployeeTopbar from "./EmployeeTopbar";

import "./EmployeeLayout.css";
import "./EmployeeTopbar.css";

const EmployeeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`employee-layout ${
        sidebarOpen ? "" : "sidebar-collapsed"
      }`}
    >
      {/* SIDEBAR */}
      <EmployeeSidebar
        isOpen={sidebarOpen}
        onMenuClick={handleMenuClick}
      />

      {/* MOBILE OVERLAY */}
      {!sidebarOpen && (
        <div
          className="employee-sidebar-overlay"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* MAIN */}
      <main className="employee-main">

        {/* TOPBAR */}
        <EmployeeTopbar
          onMenuClick={handleMenuClick}
        />

        {/* PAGE CONTENT */}
        <section className="employee-content">
          <Outlet />
        </section>

      </main>
    </div>
  );
};

export default EmployeeLayout;
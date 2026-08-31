import { useState } from "react";
import { Outlet } from "react-router-dom";

import EmployeeSidebar from "./EmployeeSidebar";
import EmployeeTopbar from "./EmployeeTopbar";

import "./EmployeeLayout.css";

const EmployeeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div
      className={`employee-layout ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      {/* SIDEBAR */}
      <EmployeeSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* MAIN AREA */}
      <div className="employee-main-area">

        {/* TOPBAR */}
        <EmployeeTopbar
          onMenuClick={handleMenuClick}
        />

        {/* PAGE CONTENT */}
        <main className="employee-page-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default EmployeeLayout;
import { useState } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((current) => !current);
  };

  return (
    <div
      className={`admin-layout ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      {/* SIDEBAR */}
      <AdminSidebar sidebarOpen={sidebarOpen} />

      {/* MAIN AREA */}
      <div className="admin-content">

        {/* TOPBAR */}
        <AdminTopbar toggleSidebar={toggleSidebar} />

        {/* PAGE CONTENT */}
        <main className="admin-page-content">
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
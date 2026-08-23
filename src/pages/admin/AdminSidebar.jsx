import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTint,
  FaUserTie,
  FaUsers,
  FaRupeeSign,
  FaBox,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { GiCow } from "react-icons/gi";

import "./AdminSidebar.css";

const AdminSidebar = ({ sidebarOpen }) => {
  return (
    <aside
      className={`admin-sidebar ${
        sidebarOpen
          ? "sidebar-expanded"
          : "sidebar-collapsed"
      }`}
    >

      {/* BRAND */}
      <div className="sidebar-brand">

        <div className="brand-logo">
          <GiCow />
        </div>

        {sidebarOpen && (
          <div className="brand-text">
            <h2>Dairy Farm</h2>
            <span>ERP SYSTEM</span>
          </div>
        )}

      </div>


      {/* NAVIGATION */}
      <nav className="sidebar-nav">

        {sidebarOpen && (
          <p className="nav-title">
            ADMIN PANEL
          </p>
        )}


        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          title="Dashboard"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">
            <FaTachometerAlt />
          </span>

          {sidebarOpen && (
            <span>Dashboard</span>
          )}
        </NavLink>


        {/* Cow Management */}
        <NavLink
          to="/admin/cows"
          title="Cow Management"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">
            <GiCow />
          </span>

          {sidebarOpen && (
            <span>Cow Management</span>
          )}
        </NavLink>


        {/* Milk Production */}
        <NavLink
          to="/admin/milk-production"
          title="Milk Production"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">
            <FaTint />
          </span>

          {sidebarOpen && (
            <span>Milk Production</span>
          )}
        </NavLink>


        {/* Employees */}
        <NavLink
          to="/admin/employees"
          title="Employees"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">
            <FaUserTie />
          </span>

          {sidebarOpen && (
            <span>Employees</span>
          )}
        </NavLink>


        {/* Customers */}
        <NavLink
          to="/admin/customers"
          title="Customers"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">
            <FaUsers />
          </span>

          {sidebarOpen && (
            <span>Customers</span>
          )}
        </NavLink>


        {/* Sales */}
        <NavLink
          to="/admin/sales"
          title="Sales"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">
            <FaRupeeSign />
          </span>

          {sidebarOpen && (
            <span>Sales</span>
          )}
        </NavLink>


        {/* Inventory */}
        <NavLink
          to="/admin/inventory"
          title="Inventory"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">
            <FaBox />
          </span>

          {sidebarOpen && (
            <span>Inventory</span>
          )}
        </NavLink>


        {/* Reports */}
        <NavLink
          to="/admin/reports"
          title="Reports"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">
            <FaChartBar />
          </span>

          {sidebarOpen && (
            <span>Reports</span>
          )}
        </NavLink>


        {/* Settings */}
        <NavLink
          to="/admin/settings"
          title="Settings"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span className="sidebar-icon">
            <FaCog />
          </span>

          {sidebarOpen && (
            <span>Settings</span>
          )}
        </NavLink>

      </nav>


      {/* LOGOUT */}
      <div className="sidebar-bottom">

        <button
          className="logout-btn"
          title="Logout"
        >
          <span className="sidebar-icon">
            <FaSignOutAlt />
          </span>

          {sidebarOpen && (
            <span>Logout</span>
          )}
        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;
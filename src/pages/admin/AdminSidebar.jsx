import { NavLink, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaTint,
  FaUserTie,
  FaUsers,
  FaRupeeSign,
  FaSignOutAlt,
} from "react-icons/fa";

import { GiCow } from "react-icons/gi";

import "./AdminSidebar.css";

const AdminSidebar = ({ sidebarOpen }) => {

  const navigate = useNavigate();

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {

    // Remove admin login status
    localStorage.removeItem("adminLoggedIn");

    // Optional: remove admin token if you use one
    localStorage.removeItem("adminToken");

    // Go to Admin Login page
    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <aside
      className={`admin-sidebar ${
        sidebarOpen
          ? "sidebar-expanded"
          : "sidebar-collapsed"
      }`}
    >

      {/* ========================================
          SIDEBAR BRAND
      ======================================== */}

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


      {/* ========================================
          SIDEBAR NAVIGATION
      ======================================== */}

      <nav className="sidebar-nav">

        {sidebarOpen && (
          <p className="nav-title">
            ADMIN PANEL
          </p>
        )}


        {/* ========================================
            DASHBOARD
        ======================================== */}

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
            <span>
              Dashboard
            </span>
          )}
        </NavLink>


        {/* ========================================
            COW MANAGEMENT
        ======================================== */}

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
            <span>
              Cow Management
            </span>
          )}
        </NavLink>


        {/* ========================================
            MILK PRODUCTION
        ======================================== */}

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
            <span>
              Milk Production
            </span>
          )}
        </NavLink>


        {/* ========================================
            EMPLOYEES
        ======================================== */}

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
            <span>
              Employees
            </span>
          )}
        </NavLink>


        {/* ========================================
            CUSTOMERS
        ======================================== */}

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
            <span>
              Customers
            </span>
          )}
        </NavLink>


        {/* ========================================
            SALES
        ======================================== */}

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
            <span>
              Sales
            </span>
          )}
        </NavLink>

      </nav>


      {/* ========================================
          LOGOUT
      ======================================== */}

      <div className="sidebar-bottom">

        <button
          type="button"
          className="logout-btn"
          title="Logout"
          onClick={handleLogout}
        >

          <span className="sidebar-icon">
            <FaSignOutAlt />
          </span>

          {sidebarOpen && (
            <span>
              Logout
            </span>
          )}

        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;
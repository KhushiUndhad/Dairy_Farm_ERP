import { NavLink, useNavigate } from "react-router-dom";
import "./CustomerSidebar.css";

const CustomerSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    if (window.innerWidth <= 900) {
      onClose();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customerLoggedIn");
    navigate("/customer/login");
  };

  return (
    <aside
      className={`customer-sidebar ${
        isOpen
          ? "customer-sidebar-open"
          : "customer-sidebar-closed"
      }`}
    >
      {/* LOGO */}
      <div className="customer-sidebar-logo">

        <div className="customer-logo-icon">
          🐄
        </div>

        <div className="customer-logo-text">
          <strong>Dairy Farm</strong>
          <span>Customer Panel</span>
        </div>

      </div>


      {/* NAVIGATION */}
      <nav className="customer-sidebar-nav">

        <NavLink
          to="/customer"
          end
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `customer-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <span className="customer-nav-icon">
            🏠
          </span>

          <span className="customer-nav-text">
            Dashboard
          </span>
        </NavLink>


        <NavLink
          to="/customer/products"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `customer-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <span className="customer-nav-icon">
            🥛
          </span>

          <span className="customer-nav-text">
            Products
          </span>
        </NavLink>


        <NavLink
          to="/customer/orders"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `customer-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <span className="customer-nav-icon">
            📦
          </span>

          <span className="customer-nav-text">
            My Orders
          </span>
        </NavLink>


        <NavLink
          to="/customer/subscription"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `customer-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <span className="customer-nav-icon">
            🔄
          </span>

          <span className="customer-nav-text">
            Subscription
          </span>
        </NavLink>


        <NavLink
          to="/customer/payments"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `customer-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <span className="customer-nav-icon">
            💳
          </span>

          <span className="customer-nav-text">
            Payments
          </span>
        </NavLink>


        <NavLink
          to="/customer/profile"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `customer-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <span className="customer-nav-icon">
            👤
          </span>

          <span className="customer-nav-text">
            My Profile
          </span>
        </NavLink>

      </nav>


      {/* SIDEBAR BOTTOM */}
      <div className="customer-sidebar-footer">

        <div className="customer-support-box">

          <span className="support-icon">
            💬
          </span>

          <div>
            <strong>Need Help?</strong>
            <span>Contact support</span>
          </div>

        </div>


        <button
          type="button"
          className="customer-logout-button"
          onClick={handleLogout}
        >
          <span>🚪</span>
          Logout
        </button>

      </div>

    </aside>
  );
};

export default CustomerSidebar;
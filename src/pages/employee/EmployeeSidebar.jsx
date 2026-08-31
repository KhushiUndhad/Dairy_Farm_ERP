import {
  FaTachometerAlt,
  FaClipboardCheck,
  FaCalendarCheck,
  FaCalendarMinus,
  FaMoneyBillWave,
  FaUser,
  FaQuestionCircle,
  FaSignOutAlt,
  FaTractor
} from "react-icons/fa";

import {
  NavLink,
  useNavigate
} from "react-router-dom";

import "./EmployeeSidebar.css";

const EmployeeSidebar = ({
  isOpen,
  onClose
}) => {

  const navigate = useNavigate();


  /* =========================================
     CLOSE SIDEBAR ON MOBILE
  ========================================= */

  const handleLinkClick = () => {

    if (window.innerWidth <= 900) {
      onClose();
    }

  };


  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout = () => {

    localStorage.removeItem("employeeLoggedIn");

    navigate("/employee/login");

  };


  return (

    <aside
      className={`employee-sidebar ${
        isOpen
          ? "employee-sidebar-open"
          : "employee-sidebar-closed"
      }`}
    >

      {/* =====================================
          LOGO
      ===================================== */}

      <div className="employee-sidebar-logo">

        <div className="employee-logo-icon">
          <FaTractor />
        </div>

        <div className="employee-logo-text">

          <strong>
            Dairy Farm
          </strong>

          <span>
            Employee Panel
          </span>

        </div>

      </div>


      {/* =====================================
          NAVIGATION
      ===================================== */}

      <nav className="employee-sidebar-nav">

        {/* DASHBOARD */}

        <NavLink
          to="/employee"
          end
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `employee-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="employee-nav-icon">
            <FaTachometerAlt />
          </span>

          <span className="employee-nav-text">
            Dashboard
          </span>

        </NavLink>


        {/* MY WORK */}

        <NavLink
          to="/employee/work"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `employee-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="employee-nav-icon">
            <FaClipboardCheck />
          </span>

          <span className="employee-nav-text">
            My Work
          </span>

        </NavLink>


        {/* ATTENDANCE */}

        <NavLink
          to="/employee/attendance"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `employee-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="employee-nav-icon">
            <FaCalendarCheck />
          </span>

          <span className="employee-nav-text">
            Attendance
          </span>

        </NavLink>


        {/* LEAVE */}

        <NavLink
          to="/employee/leave"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `employee-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="employee-nav-icon">
            <FaCalendarMinus />
          </span>

          <span className="employee-nav-text">
            Leave
          </span>

        </NavLink>


        {/* SALARY */}

        <NavLink
          to="/employee/salary"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `employee-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="employee-nav-icon">
            <FaMoneyBillWave />
          </span>

          <span className="employee-nav-text">
            Salary
          </span>

        </NavLink>


        {/* PROFILE */}

        <NavLink
          to="/employee/profile"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `employee-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >

          <span className="employee-nav-icon">
            <FaUser />
          </span>

          <span className="employee-nav-text">
            My Profile
          </span>

        </NavLink>

      </nav>


      {/* =====================================
          SIDEBAR FOOTER
      ===================================== */}

      <div className="employee-sidebar-footer">

        {/* HELP */}

        <div className="employee-support-box">

          <div className="employee-support-icon">
            <FaQuestionCircle />
          </div>

          <div className="employee-support-text">

            <strong>
              Need Help?
            </strong>

            <span>
              Contact support
            </span>

          </div>

        </div>


        {/* LOGOUT */}

        <button
          type="button"
          className="employee-logout-button"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
};

export default EmployeeSidebar;
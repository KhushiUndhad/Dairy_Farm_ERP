import {
  FaTachometerAlt,
  FaClipboardCheck,
  FaCalendarCheck,
  FaCalendarMinus,
  FaMoneyBillWave,
  FaUser,
  FaQuestionCircle,
  FaSignOutAlt,
  FaTractor,
} from "react-icons/fa";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

const EmployeeSidebar = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    if (window.innerWidth <= 900) {
      onClose();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("employeeLoggedIn");
    navigate("/employee/login", {
      replace: true,
    });
  };

  const menuItems = [
    {
      path: "/employee",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
      end: true,
    },
    {
      path: "/employee/work",
      label: "My Work",
      icon: <FaClipboardCheck />,
    },
    {
      path: "/employee/attendance",
      label: "Attendance",
      icon: <FaCalendarCheck />,
    },
    {
      path: "/employee/leave",
      label: "Leave",
      icon: <FaCalendarMinus />,
    },
    {
      path: "/employee/salary",
      label: "Salary",
      icon: <FaMoneyBillWave />,
    },
    {
      path: "/employee/profile",
      label: "My Profile",
      icon: <FaUser />,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="employee-sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`employee-sidebar ${
          isOpen
            ? "employee-sidebar-open"
            : "employee-sidebar-closed"
        }`}
      >

        {/* LOGO */}

        <div className="employee-sidebar-logo">

          <div className="employee-logo-icon">
            <FaTractor />
          </div>

          <div className="employee-logo-text">
            <strong>Dairy Farm</strong>
            <span>Employee Panel</span>
          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="employee-sidebar-nav">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `employee-nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="employee-nav-icon">
                {item.icon}
              </span>

              <span className="employee-nav-text">
                {item.label}
              </span>
            </NavLink>
          ))}

        </nav>

        {/* FOOTER */}

        <div className="employee-sidebar-footer">

          <div className="employee-support-box">

            <div className="employee-support-icon">
              <FaQuestionCircle />
            </div>

            <div className="employee-support-text">
              <strong>Need Help?</strong>
              <span>Contact farm administrator</span>
            </div>

          </div>

          <button
            type="button"
            className="employee-logout-button"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </div>

      </aside>
    </>
  );
};

export default EmployeeSidebar;
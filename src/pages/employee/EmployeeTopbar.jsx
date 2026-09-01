import {
  FaBars,
  FaUserCircle,
} from "react-icons/fa";

import { useLocation } from "react-router-dom";

const EmployeeTopbar = ({
  onMenuClick,
}) => {
  const location = useLocation();

  const employee =
    JSON.parse(
      localStorage.getItem("employeeUser") || "null"
    ) || {
      name: "Employee",
      role: "Farm Employee",
    };

  const getTitle = () => {
    if (location.pathname === "/employee") {
      return "Employee Dashboard";
    }

    if (location.pathname.includes("/work")) {
      return "My Work";
    }

    if (location.pathname.includes("/attendance")) {
      return "Attendance";
    }

    if (location.pathname.includes("/leave")) {
      return "Leave Management";
    }

    if (location.pathname.includes("/salary")) {
      return "Salary Details";
    }

    if (location.pathname.includes("/profile")) {
      return "My Profile";
    }

    return "Employee Panel";
  };

  return (
    <header className="employee-topbar">

      <div className="employee-topbar-left">

        <button
          type="button"
          className="employee-menu-button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>

        <div className="employee-page-title">
          <h2>{getTitle()}</h2>
          <span>Dairy Farm Management System</span>
        </div>

      </div>

      <div className="employee-topbar-right">

        <div className="employee-topbar-profile">

          <div className="employee-topbar-avatar">
            <FaUserCircle />
          </div>

          <div className="employee-topbar-user">
            <strong>{employee.name}</strong>
            <span>{employee.role || "Employee"}</span>
          </div>

        </div>

      </div>

    </header>
  );
};

export default EmployeeTopbar;
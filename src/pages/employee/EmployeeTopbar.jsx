import {
  FaBars,
  FaUser
} from "react-icons/fa";

import "./EmployeeTopbar.css";

const EmployeeTopbar = ({ onMenuClick }) => {

  return (
    <header className="employee-topbar">

      {/* LEFT */}
      <div className="employee-topbar-left">

        {/* HAMBURGER */}
        <button
          type="button"
          className="employee-menu-button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>

        {/* TITLE */}
        <div className="employee-page-title">

          <h2>
            Employee Dashboard
          </h2>

          <span>
            Dairy Farm Management System
          </span>

        </div>

      </div>


      {/* RIGHT */}
      <div className="employee-topbar-right">

        <div className="employee-topbar-profile">

          <div className="employee-topbar-avatar">
            <FaUser />
          </div>

          <div className="employee-topbar-user">

            <strong>
              John Employee
            </strong>

            <span>
              Employee
            </span>

          </div>

          <span className="employee-profile-arrow">
            ▾
          </span>

        </div>

      </div>

    </header>
  );
};

export default EmployeeTopbar;
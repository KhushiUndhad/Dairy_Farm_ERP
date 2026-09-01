import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaCalendarCheck,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUser,
  FaSignOutAlt,
  FaUserTie,
  FaUserCircle,
} from "react-icons/fa";

import "./EmployeeLayout.css";

function EmployeeLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("employeeLoggedIn");
    navigate("/employee/login", { replace: true });
  };

  return (
    <div className="employee-layout">

      {/* ================= SIDEBAR ================= */}
      <aside className="employee-sidebar">

        <div className="employee-logo">
          <FaUserTie className="logo-icon" />
          <h2>Employee Panel</h2>
        </div>

        <nav className="employee-nav">

          <NavLink
            to="/employee"
            end
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/employee/work"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaBriefcase />
            <span>My Work</span>
          </NavLink>

          <NavLink
            to="/employee/attendance"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaCalendarCheck />
            <span>Attendance</span>
          </NavLink>

          <NavLink
            to="/employee/leave"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaCalendarAlt />
            <span>Leave</span>
          </NavLink>

          <NavLink
            to="/employee/salary"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaMoneyBillWave />
            <span>Salary</span>
          </NavLink>

          <NavLink
            to="/employee/profile"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FaUser />
            <span>Profile</span>
          </NavLink>

        </nav>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="employee-main">

        <header className="employee-header">

          <div>
            <h3>Employee Dashboard</h3>
            <p>Welcome back!</p>
          </div>

          <div className="header-profile">
            <FaUserCircle />
            <span>Employee</span>
          </div>

        </header>

        <section className="employee-content">

          {/* VERY IMPORTANT */}
          <Outlet />

        </section>

      </main>

    </div>
  );
}

export default EmployeeLayout;
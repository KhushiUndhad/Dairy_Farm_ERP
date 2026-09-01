import {
  FaBriefcase,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";

import "./EmployeeDashboard.css";

function EmployeeDashboard() {

  return (
    <div className="employee-dashboard">

      <div className="dashboard-title">

        <h1>Dashboard</h1>

        <p>
          Welcome back! Here's your work summary.
        </p>

      </div>


      {/* ================= CARDS ================= */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="card-icon">
            <FaBriefcase />
          </div>

          <div>
            <h3>12</h3>
            <p>Total Tasks</p>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            <FaCalendarCheck />
          </div>

          <div>
            <h3>24</h3>
            <p>Present Days</p>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            <FaClock />
          </div>

          <div>
            <h3>2</h3>
            <p>Pending Tasks</p>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            <FaMoneyBillWave />
          </div>

          <div>
            <h3>₹25,000</h3>
            <p>Monthly Salary</p>
          </div>

        </div>

      </div>


      {/* ================= RECENT WORK ================= */}

      <div className="dashboard-section">

        <h2>Recent Work</h2>

        <div className="work-table">

          <div className="table-header">
            <span>Task</span>
            <span>Status</span>
            <span>Date</span>
          </div>

          <div className="table-row">
            <span>Milk Collection</span>
            <span className="status completed">
              Completed
            </span>
            <span>01 Sep 2026</span>
          </div>

          <div className="table-row">
            <span>Cow Management</span>
            <span className="status pending">
              Pending
            </span>
            <span>01 Sep 2026</span>
          </div>

          <div className="table-row">
            <span>Inventory Check</span>
            <span className="status completed">
              Completed
            </span>
            <span>31 Aug 2026</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeDashboard;
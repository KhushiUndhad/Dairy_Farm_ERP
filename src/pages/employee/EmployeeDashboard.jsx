import {
  FaBriefcase,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaClock,
  FaTasks,
  FaUmbrellaBeach,
  FaArrowRight,
  FaCheckCircle,
  FaHourglassHalf,
  FaChartLine,
} from "react-icons/fa";

import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  return (
    <div className="employee-dashboard">

      {/* ================= HEADER ================= */}

      <div className="dashboard-title">
        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back! Here's your work summary.
          </p>
        </div>

        <div className="dashboard-date">
          <span>Today</span>
          <strong>01 September 2026</strong>
        </div>
      </div>


      {/* ================= SUMMARY CARDS ================= */}

      <div className="dashboard-cards">

        {/* TOTAL TASKS */}
        <div className="dashboard-card">
          <div className="card-icon">
            <FaBriefcase />
          </div>

          <div className="dashboard-card-content">
            <span>Total Tasks</span>
            <h3>12</h3>
            <small>
              <FaChartLine /> 8 completed
            </small>
          </div>
        </div>


        {/* PRESENT DAYS */}
        <div className="dashboard-card">
          <div className="card-icon">
            <FaCalendarCheck />
          </div>

          <div className="dashboard-card-content">
            <span>Present Days</span>
            <h3>24</h3>
            <small>Of 26 working days</small>
          </div>
        </div>


        {/* PENDING TASKS */}
        <div className="dashboard-card">
          <div className="card-icon">
            <FaClock />
          </div>

          <div className="dashboard-card-content">
            <span>Pending Tasks</span>
            <h3>2</h3>
            <small>Needs attention</small>
          </div>
        </div>


        {/* SALARY */}
        <div className="dashboard-card">
          <div className="card-icon">
            <FaMoneyBillWave />
          </div>

          <div className="dashboard-card-content">
            <span>Monthly Salary</span>
            <h3>₹25,000</h3>
            <small>September 2026</small>
          </div>
        </div>

      </div>


      {/* ================= SECOND ROW ================= */}

      <div className="dashboard-secondary-cards">

        {/* TODAY ATTENDANCE */}
        <div className="dashboard-small-card">

          <div className="small-card-header">
            <div className="small-card-icon">
              <FaCalendarCheck />
            </div>

            <span className="dashboard-badge success">
              Present
            </span>
          </div>

          <h3>Today's Attendance</h3>

          <div className="attendance-time">
            <div>
              <span>Check In</span>
              <strong>08:15 AM</strong>
            </div>

            <div>
              <span>Check Out</span>
              <strong>05:30 PM</strong>
            </div>
          </div>

        </div>


        {/* WORKING HOURS */}
        <div className="dashboard-small-card">

          <div className="small-card-header">
            <div className="small-card-icon">
              <FaClock />
            </div>

            <span className="dashboard-badge info">
              Today
            </span>
          </div>

          <h3>Working Hours</h3>

          <div className="working-hours">
            <strong>8h 15m</strong>
            <span>of 9 hours</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: "92%" }}
            ></div>
          </div>

        </div>


        {/* LEAVE BALANCE */}
        <div className="dashboard-small-card">

          <div className="small-card-header">
            <div className="small-card-icon">
              <FaUmbrellaBeach />
            </div>

            <span className="dashboard-badge warning">
              Available
            </span>
          </div>

          <h3>Leave Balance</h3>

          <div className="leave-balance">
            <strong>8 Days</strong>
            <span>Remaining this year</span>
          </div>

        </div>

      </div>


      {/* ================= MAIN GRID ================= */}

      <div className="dashboard-main-grid">


        {/* ================= RECENT WORK ================= */}

        <div className="dashboard-section">

          <div className="section-header">

            <div>
              <h2>Recent Work</h2>

              <p>
                Your latest completed and pending tasks
              </p>
            </div>

            <button className="view-all-btn">
              View All
              <FaArrowRight />
            </button>

          </div>


          <div className="work-table">

            {/* HEADER */}

            <div className="table-header">
              <span>Task</span>
              <span>Status</span>
              <span>Date</span>
            </div>


            {/* ROW 1 */}

            <div className="table-row">

              <div className="task-name">
                <div className="task-icon">
                  <FaTasks />
                </div>

                <span>Milk Collection</span>
              </div>

              <span className="status completed">
                <FaCheckCircle />
                Completed
              </span>

              <span>01 Sep 2026</span>

            </div>


            {/* ROW 2 */}

            <div className="table-row">

              <div className="task-name">
                <div className="task-icon">
                  <FaTasks />
                </div>

                <span>Cow Management</span>
              </div>

              <span className="status pending">
                <FaHourglassHalf />
                Pending
              </span>

              <span>01 Sep 2026</span>

            </div>


            {/* ROW 3 */}

            <div className="table-row">

              <div className="task-name">
                <div className="task-icon">
                  <FaTasks />
                </div>

                <span>Inventory Check</span>
              </div>

              <span className="status completed">
                <FaCheckCircle />
                Completed
              </span>

              <span>31 Aug 2026</span>

            </div>


            {/* ROW 4 */}

            <div className="table-row">

              <div className="task-name">
                <div className="task-icon">
                  <FaTasks />
                </div>

                <span>Feed Distribution</span>
              </div>

              <span className="status completed">
                <FaCheckCircle />
                Completed
              </span>

              <span>30 Aug 2026</span>

            </div>

          </div>

        </div>


        {/* ================= UPCOMING TASKS ================= */}

        <div className="dashboard-section upcoming-section">

          <div className="section-header">

            <div>
              <h2>Upcoming Tasks</h2>

              <p>
                Tasks assigned to you
              </p>
            </div>

          </div>


          <div className="upcoming-task">

            <div className="upcoming-task-icon">
              <FaTasks />
            </div>

            <div>
              <strong>Morning Milk Collection</strong>
              <span>Tomorrow · 08:00 AM</span>
            </div>

          </div>


          <div className="upcoming-task">

            <div className="upcoming-task-icon">
              <FaTasks />
            </div>

            <div>
              <strong>Animal Health Check</strong>
              <span>02 Sep · 10:30 AM</span>
            </div>

          </div>


          <div className="upcoming-task">

            <div className="upcoming-task-icon">
              <FaTasks />
            </div>

            <div>
              <strong>Feed Inventory</strong>
              <span>03 Sep · 02:00 PM</span>
            </div>

          </div>


          <button className="all-tasks-btn">
            View All Tasks
            <FaArrowRight />
          </button>

        </div>

      </div>


      {/* ================= QUICK ACTIONS ================= */}

      <div className="dashboard-quick-section">

        <div className="section-header">

          <div>
            <h2>Quick Actions</h2>

            <p>
              Quickly access your employee features
            </p>
          </div>

        </div>


        <div className="quick-actions">

          <button className="quick-action">
            <FaCalendarCheck />
            <span>Attendance</span>
          </button>

          <button className="quick-action">
            <FaBriefcase />
            <span>My Work</span>
          </button>

          <button className="quick-action">
            <FaUmbrellaBeach />
            <span>Apply Leave</span>
          </button>

          <button className="quick-action">
            <FaMoneyBillWave />
            <span>Salary Details</span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default EmployeeDashboard;
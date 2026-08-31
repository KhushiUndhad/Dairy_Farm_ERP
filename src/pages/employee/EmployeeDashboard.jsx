import {
  FaClipboardCheck,
  FaCircleCheck,
  FaCalendarCheck,
  FaClock,
  FaArrowRight,
  FaCheck,
  FaCow,
  FaBox,
  FaMoneyBillWave,
  FaTruck,
  FaChartLine
} from "react-icons/fa6";

import "./EmployeeDashboard.css";


const EmployeeDashboard = () => {

  return (

    <div className="employee-dashboard">


      {/* PAGE HEADER */}

      <div className="employee-welcome">

        <div>

          <h1>
            Welcome back, John! 👋
          </h1>

          <p>
            Manage your daily work and employee activities
            from your dashboard.
          </p>

        </div>

        <div className="employee-date-box">

          <span>
            Today
          </span>

          <strong>
            August 30, 2026
          </strong>

        </div>

      </div>


      {/* STAT CARDS */}

      <div className="employee-stats-grid">


        {/* TOTAL TASKS */}

        <div className="employee-stat-card">

          <div className="employee-stat-icon">
            <FaClipboardCheck />
          </div>

          <div className="employee-stat-info">

            <span>
              Total Tasks
            </span>

            <strong>
              18
            </strong>

            <small>
              +3 this week
            </small>

          </div>

        </div>


        {/* COMPLETED */}

        <div className="employee-stat-card">

          <div className="employee-stat-icon">
            <FaCircleCheck />
          </div>

          <div className="employee-stat-info">

            <span>
              Completed
            </span>

            <strong>
              14
            </strong>

            <small>
              78% completion
            </small>

          </div>

        </div>


        {/* ATTENDANCE */}

        <div className="employee-stat-card">

          <div className="employee-stat-icon">
            <FaCalendarCheck />
          </div>

          <div className="employee-stat-info">

            <span>
              Attendance
            </span>

            <strong>
              96%
            </strong>

            <small>
              This month
            </small>

          </div>

        </div>


        {/* LEAVE */}

        <div className="employee-stat-card">

          <div className="employee-stat-icon">
            <FaClock />
          </div>

          <div className="employee-stat-info">

            <span>
              Pending Leave
            </span>

            <strong>
              1
            </strong>

            <small>
              Awaiting approval
            </small>

          </div>

        </div>

      </div>


      {/* MAIN GRID */}

      <div className="employee-dashboard-grid">


        {/* TODAY WORK */}

        <section className="employee-panel">

          <div className="employee-panel-header">

            <div>

              <h2>
                Today's Work
              </h2>

              <p>
                Your assigned tasks for today
              </p>

            </div>

            <button>
              View All
              <FaArrowRight />
            </button>

          </div>


          <div className="employee-task-list">


            <div className="employee-task">

              <div className="employee-task-icon">
                <FaCow />
              </div>

              <div className="employee-task-info">

                <strong>
                  Check Cow Health
                </strong>

                <span>
                  Animal Care • 08:00 AM
                </span>

              </div>

              <span className="employee-task-status completed">
                Completed
              </span>

            </div>


            <div className="employee-task">

              <div className="employee-task-icon">
                <FaBox />
              </div>

              <div className="employee-task-info">

                <strong>
                  Update Inventory
                </strong>

                <span>
                  Inventory • 10:30 AM
                </span>

              </div>

              <span className="employee-task-status pending">
                Pending
              </span>

            </div>


            <div className="employee-task">

              <div className="employee-task-icon">
                <FaTruck />
              </div>

              <div className="employee-task-info">

                <strong>
                  Milk Delivery
                </strong>

                <span>
                  Delivery • 02:00 PM
                </span>

              </div>

              <span className="employee-task-status pending">
                Pending
              </span>

            </div>

          </div>

        </section>


        {/* ATTENDANCE */}

        <section className="employee-panel">

          <div className="employee-panel-header">

            <div>

              <h2>
                Attendance
              </h2>

              <p>
                This month's attendance
              </p>

            </div>

            <FaChartLine className="employee-chart-icon" />

          </div>


          <div className="employee-attendance">

            <div className="employee-attendance-circle">

              <strong>
                96%
              </strong>

              <span>
                Attendance
              </span>

            </div>


            <div className="employee-attendance-details">

              <div>
                <FaCheck />
                <span>
                  Present
                </span>
                <strong>
                  24 Days
                </strong>
              </div>

              <div>
                <FaClock />
                <span>
                  Late
                </span>
                <strong>
                  1 Day
                </strong>
              </div>

              <div>
                <FaCalendarCheck />
                <span>
                  Leave
                </span>
                <strong>
                  1 Day
                </strong>
              </div>

            </div>

          </div>

        </section>

      </div>


      {/* QUICK ACTIONS */}

      <section className="employee-quick-section">

        <div className="employee-section-heading">

          <h2>
            Quick Actions
          </h2>

          <p>
            Frequently used employee services
          </p>

        </div>


        <div className="employee-quick-grid">


          <div className="employee-quick-card">

            <div>
              <FaCalendarCheck />
            </div>

            <h3>
              Mark Attendance
            </h3>

            <p>
              Check in or check out for today
            </p>

          </div>


          <div className="employee-quick-card">

            <div>
              <FaClipboardCheck />
            </div>

            <h3>
              My Tasks
            </h3>

            <p>
              View and manage assigned tasks
            </p>

          </div>


          <div className="employee-quick-card">

            <div>
              <FaClock />
            </div>

            <h3>
              Apply Leave
            </h3>

            <p>
              Submit a new leave request
            </p>

          </div>


          <div className="employee-quick-card">

            <div>
              <FaMoneyBillWave />
            </div>

            <h3>
              Salary Details
            </h3>

            <p>
              View your salary information
            </p>

          </div>

        </div>

      </section>

    </div>

  );
};

export default EmployeeDashboard;

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaClipboardList,
} from "react-icons/fa";

import "./EmployeeMyWork.css";

const EmployeeWork = () => {
  const tasks = [
    {
      id: 1,
      title: "Morning Cow Feeding",
      description: "Feed cows according to the morning feeding schedule.",
      time: "06:00 AM",
      status: "Completed",
    },
    {
      id: 2,
      title: "Milk Collection",
      description: "Collect and record morning milk production.",
      time: "08:00 AM",
      status: "Completed",
    },
    {
      id: 3,
      title: "Animal Health Check",
      description: "Check the health condition of all assigned cows.",
      time: "11:00 AM",
      status: "Pending",
    },
    {
      id: 4,
      title: "Evening Feeding",
      description: "Complete evening feeding for assigned animals.",
      time: "05:00 PM",
      status: "Pending",
    },
  ];

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <div className="employee-work-page">

      {/* ================= HEADER ================= */}

      <div className="employee-work-header">

        <div>
          <h1>My Work</h1>

          <p>
            Manage and track your daily farm activities
          </p>
        </div>

        <div className="employee-work-date">
          <span>Today's Date</span>
          <strong>
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </strong>
        </div>

      </div>


      {/* ================= SUMMARY ================= */}

      <div className="employee-work-summary">

        <div className="work-summary-card">

          <div className="summary-icon">
            <FaClipboardList />
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>

        </div>


        <div className="work-summary-card">

          <div className="summary-icon completed-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>

        </div>


        <div className="work-summary-card">

          <div className="summary-icon pending-icon">
            <FaClock />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>

        </div>

      </div>


      {/* ================= TASK SECTION ================= */}

      <div className="employee-task-section">

        <div className="employee-task-title">

          <div>
            <h2>Today's Tasks</h2>

            <p>
              Your assigned work for today
            </p>
          </div>

          <div className="task-count">
            <FaTasks />
            <span>{tasks.length} Tasks</span>
          </div>

        </div>


        {/* ================= TASK LIST ================= */}

        <div className="employee-task-list">

          {tasks.map((task) => (

            <div
              className="employee-task-card"
              key={task.id}
            >

              <div className="employee-task-icon">
                <FaTasks />
              </div>


              <div className="employee-task-info">

                <h3>
                  {task.title}
                </h3>

                <p>
                  {task.description}
                </p>

                <small>
                  <FaClock />
                  {task.time}
                </small>

              </div>


              <div
                className={`employee-task-status ${
                  task.status.toLowerCase()
                }`}
              >

                {task.status === "Completed" ? (
                  <>
                    <FaCheckCircle />
                    Completed
                  </>
                ) : (
                  <>
                    <FaClock />
                    Pending
                  </>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default EmployeeWork;
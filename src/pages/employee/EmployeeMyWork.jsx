import { useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaTasks,
  FaSearch,
  FaFilter,
  FaCow,
  FaBoxes,
  FaTruck,
  FaClipboardCheck,
  FaCalendarAlt,
} from "react-icons/fa";

import "./EmployeeMyWork.css";

const EmployeeMyWork = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Check Cow Health",
      category: "Animal Care",
      time: "08:00 AM",
      status: "Completed",
      icon: <FaCow />,
      description: "Check health condition of assigned cows.",
    },
    {
      id: 2,
      title: "Update Inventory",
      category: "Inventory",
      time: "10:30 AM",
      status: "Pending",
      icon: <FaBoxes />,
      description: "Check and update dairy inventory stock.",
    },
    {
      id: 3,
      title: "Milk Delivery",
      category: "Delivery",
      time: "02:00 PM",
      status: "Pending",
      icon: <FaTruck />,
      description: "Deliver milk orders to assigned customers.",
    },
    {
      id: 4,
      title: "Daily Farm Inspection",
      category: "Inspection",
      time: "04:00 PM",
      status: "Completed",
      icon: <FaClipboardCheck />,
      description: "Complete daily farm inspection checklist.",
    },
    {
      id: 5,
      title: "Clean Milking Area",
      category: "Farm Work",
      time: "05:30 PM",
      status: "Pending",
      icon: <FaTasks />,
      description: "Clean and maintain the milking area.",
    },
  ]);

  const handleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: "Completed" }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "All" || task.status === filter;

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.category
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <div className="employee-work-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="employee-work-header">

        <div>
          <h1>My Work</h1>

          <p>
            View and manage your assigned tasks
          </p>
        </div>

        <div className="employee-work-date">
          <FaCalendarAlt />

          <div>
            <span>Today</span>
            <strong>August 30, 2026</strong>
          </div>
        </div>

      </div>


      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <div className="employee-work-summary">

        <div className="work-summary-card">

          <div className="work-summary-icon">
            <FaTasks />
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>

        </div>


        <div className="work-summary-card">

          <div className="work-summary-icon completed-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>

        </div>


        <div className="work-summary-card">

          <div className="work-summary-icon pending-icon">
            <FaClock />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>

        </div>

      </div>


      {/* =====================================
          TOOLBAR
      ===================================== */}

      <div className="employee-work-toolbar">

        <div className="employee-work-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="employee-work-filter">

          <FaFilter />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="All">All Tasks</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>

        </div>

      </div>


      {/* =====================================
          TASK LIST
      ===================================== */}

      <div className="employee-work-section">

        <div className="employee-work-section-header">

          <div>
            <h2>Assigned Tasks</h2>

            <p>
              Your work assigned for today
            </p>
          </div>

          <span className="task-count">
            {filteredTasks.length} Tasks
          </span>

        </div>


        <div className="employee-task-list">

          {filteredTasks.length > 0 ? (

            filteredTasks.map((task) => (

              <div
                className="employee-task-card"
                key={task.id}
              >

                {/* TASK ICON */}

                <div className="employee-task-icon">
                  {task.icon}
                </div>


                {/* TASK INFORMATION */}

                <div className="employee-task-content">

                  <div className="employee-task-title-row">

                    <h3>
                      {task.title}
                    </h3>

                    <span
                      className={`employee-task-status ${
                        task.status === "Completed"
                          ? "status-completed"
                          : "status-pending"
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
                    </span>

                  </div>


                  <p>
                    {task.description}
                  </p>


                  <div className="employee-task-meta">

                    <span>
                      <FaTasks />
                      {task.category}
                    </span>

                    <span>
                      <FaClock />
                      {task.time}
                    </span>

                  </div>

                </div>


                {/* ACTION */}

                <div className="employee-task-action">

                  {task.status === "Pending" ? (

                    <button
                      type="button"
                      onClick={() =>
                        handleComplete(task.id)
                      }
                    >
                      <FaCheckCircle />
                      Mark Complete
                    </button>

                  ) : (

                    <div className="completed-label">
                      <FaCheckCircle />
                      Done
                    </div>

                  )}

                </div>

              </div>

            ))

          ) : (

            <div className="employee-no-task">

              <FaTasks />

              <h3>
                No tasks found
              </h3>

              <p>
                Try changing your search or filter.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default EmployeeMyWork;
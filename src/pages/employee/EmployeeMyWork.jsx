import { useEffect, useState } from "react";

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaClipboardList,
  FaExclamationCircle,
} from "react-icons/fa";

import "./EmployeeMyWork.css";

const EmployeeWork = () => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ========================================
     LOAD WORK FROM BACKEND
  ======================================== */

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/work"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load work records"
        );
      }

      const data = await response.json();

      /*
       * Backend may return:
       * 
       * [
       *   {...},
       *   {...}
       * ]
       *
       * OR
       *
       * {
       *   success: true,
       *   data: [...]
       * }
       */

      const workData = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : [];

      setTasks(workData);

    } catch (err) {

      console.error(
        "Error loading work:",
        err
      );

      setError(
        "Unable to load work data from server."
      );

    } finally {

      setLoading(false);

    }
  };

  /* ========================================
     LOAD DATA WHEN PAGE OPENS
  ======================================== */

  useEffect(() => {
    loadTasks();
  }, []);

  /* ========================================
     TASK COUNTS
  ======================================== */

  const completedTasks = tasks.filter(
    (task) =>
      String(task.status).toLowerCase() ===
      "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) =>
      String(task.status).toLowerCase() ===
      "pending"
  ).length;

  /* ========================================
     FORMAT TIME
  ======================================== */

  const formatTime = (time) => {

    if (!time) {
      return "--";
    }

    return time;

  };

  /* ========================================
     FORMAT STATUS
  ======================================== */

  const getStatusIcon = (status) => {

    if (
      String(status).toLowerCase() ===
      "completed"
    ) {
      return <FaCheckCircle />;
    }

    return <FaClock />;

  };

  return (
    <div className="employee-work-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="employee-work-header">

        <div>

          <h1>
            My Work
          </h1>

          <p>
            Manage and track your daily farm activities
          </p>

        </div>


        <div className="employee-work-date">

          <span>
            Today's Date
          </span>

          <strong>

            {new Date().toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}

          </strong>

        </div>

      </div>


      {/* =====================================
          SUMMARY
      ===================================== */}

      <div className="employee-work-summary">

        {/* TOTAL TASKS */}

        <div className="work-summary-card">

          <div className="summary-icon">

            <FaClipboardList />

          </div>

          <div>

            <span>
              Total Tasks
            </span>

            <strong>
              {tasks.length}
            </strong>

          </div>

        </div>


        {/* COMPLETED */}

        <div className="work-summary-card">

          <div className="summary-icon completed-icon">

            <FaCheckCircle />

          </div>

          <div>

            <span>
              Completed
            </span>

            <strong>
              {completedTasks}
            </strong>

          </div>

        </div>


        {/* PENDING */}

        <div className="work-summary-card">

          <div className="summary-icon pending-icon">

            <FaClock />

          </div>

          <div>

            <span>
              Pending
            </span>

            <strong>
              {pendingTasks}
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================
          TASK SECTION
      ===================================== */}

      <div className="employee-task-section">

        <div className="employee-task-title">

          <div>

            <h2>
              Today's Tasks
            </h2>

            <p>
              Your assigned work for today
            </p>

          </div>


          <div className="task-count">

            <FaTasks />

            <span>
              {tasks.length} Tasks
            </span>

          </div>

        </div>


        {/* =================================
            LOADING
        ================================= */}

        {loading && (

          <div className="employee-task-list">

            <div className="employee-task-card">

              <div className="employee-task-icon">

                <FaClock />

              </div>

              <div className="employee-task-info">

                <h3>
                  Loading Tasks...
                </h3>

                <p>
                  Please wait while your work
                  records are loading.
                </p>

              </div>

            </div>

          </div>

        )}


        {/* =================================
            ERROR
        ================================= */}

        {!loading && error && (

          <div className="employee-task-list">

            <div className="employee-task-card">

              <div className="employee-task-icon">

                <FaExclamationCircle />

              </div>

              <div className="employee-task-info">

                <h3>
                  Unable to Load Tasks
                </h3>

                <p>
                  {error}
                </p>

              </div>

            </div>

          </div>

        )}


        {/* =================================
            NO DATA
        ================================= */}

        {!loading &&
          !error &&
          tasks.length === 0 && (

            <div className="employee-task-list">

              <div className="employee-task-card">

                <div className="employee-task-icon">

                  <FaClipboardList />

                </div>

                <div className="employee-task-info">

                  <h3>
                    No Tasks Found
                  </h3>

                  <p>
                    No work has been assigned to
                    you yet.
                  </p>

                </div>

              </div>

            </div>

          )}


        {/* =================================
            TASK LIST
        ================================= */}

        {!loading &&
          !error &&
          tasks.length > 0 && (

            <div className="employee-task-list">

              {tasks.map((task) => {

                const status =
                  task.status || "Pending";

                return (

                  <div
                    className="employee-task-card"
                    key={
                      task._id ||
                      task.id
                    }
                  >

                    {/* TASK ICON */}

                    <div className="employee-task-icon">

                      <FaTasks />

                    </div>


                    {/* TASK INFORMATION */}

                    <div className="employee-task-info">

                      <h3>
                        {task.title ||
                          task.taskName ||
                          "Untitled Task"}
                      </h3>


                      <p>
                        {task.description ||
                          "No description available."}
                      </p>


                      <small>

                        <FaClock />

                        {formatTime(
                          task.time
                        )}

                      </small>

                    </div>


                    {/* STATUS */}

                    <div
                      className={`employee-task-status ${
                        String(status).toLowerCase()
                      }`}
                    >

                      {getStatusIcon(
                        status
                      )}

                      {status}

                    </div>

                  </div>

                );

              })}

            </div>

          )}

      </div>

    </div>
  );
};

export default EmployeeWork;
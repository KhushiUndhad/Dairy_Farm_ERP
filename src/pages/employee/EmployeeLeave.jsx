import { useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaPlus,
} from "react-icons/fa";

import "./EmployeeLeave.css";

const EmployeeLeave = () => {
  const [showForm, setShowForm] = useState(false);

  const [leaveForm, setLeaveForm] = useState({
    leaveType: "Casual Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [leaves, setLeaves] = useState([
    {
      id: 1,
      type: "Casual Leave",
      from: "2026-08-10",
      to: "2026-08-11",
      days: 2,
      reason: "Personal work",
      status: "Approved",
    },
    {
      id: 2,
      type: "Sick Leave",
      from: "2026-08-20",
      to: "2026-08-20",
      days: 1,
      reason: "Not feeling well",
      status: "Pending",
    },
    {
      id: 3,
      type: "Casual Leave",
      from: "2026-07-15",
      to: "2026-07-16",
      days: 2,
      reason: "Family function",
      status: "Rejected",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLeaveForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateDays = () => {
    if (!leaveForm.fromDate || !leaveForm.toDate) {
      return 0;
    }

    const from = new Date(leaveForm.fromDate);
    const to = new Date(leaveForm.toDate);

    if (to < from) {
      return 0;
    }

    const difference =
      (to - from) / (1000 * 60 * 60 * 24);

    return difference + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !leaveForm.fromDate ||
      !leaveForm.toDate ||
      !leaveForm.reason
    ) {
      alert("Please fill all leave details.");
      return;
    }

    const days = calculateDays();

    if (days <= 0) {
      alert("Please select a valid date range.");
      return;
    }

    const newLeave = {
      id: Date.now(),
      type: leaveForm.leaveType,
      from: leaveForm.fromDate,
      to: leaveForm.toDate,
      days,
      reason: leaveForm.reason,
      status: "Pending",
    };

    setLeaves((prev) => [newLeave, ...prev]);

    setLeaveForm({
      leaveType: "Casual Leave",
      fromDate: "",
      toDate: "",
      reason: "",
    });

    setShowForm(false);

    alert("Leave application submitted successfully!");
  };

  const approvedLeaves = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const pendingLeaves = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const rejectedLeaves = leaves.filter(
    (leave) => leave.status === "Rejected"
  ).length;

  const totalLeaves = leaves.reduce(
    (total, leave) => total + leave.days,
    0
  );

  return (
    <div className="employee-leave-page">

      {/* ================= HEADER ================= */}

      <div className="employee-page-header">

        <div>
          <h1>Leave Management</h1>

          <p>
            Apply for leave and check your leave history
          </p>
        </div>

        <button
          type="button"
          className="apply-leave-btn"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPlus />

          {showForm ? "Close Form" : "Apply Leave"}
        </button>

      </div>


      {/* ================= SUMMARY ================= */}

      <div className="leave-summary">

        <div className="leave-card">

          <div className="leave-card-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <span>Total Leaves</span>

            <h2>{totalLeaves}</h2>
          </div>

        </div>


        <div className="leave-card">

          <div className="leave-card-icon approved-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Approved</span>

            <h2>{approvedLeaves}</h2>
          </div>

        </div>


        <div className="leave-card">

          <div className="leave-card-icon pending-icon">
            <FaClock />
          </div>

          <div>
            <span>Pending</span>

            <h2>{pendingLeaves}</h2>
          </div>

        </div>


        <div className="leave-card">

          <div className="leave-card-icon rejected-icon">
            <FaTimesCircle />
          </div>

          <div>
            <span>Rejected</span>

            <h2>{rejectedLeaves}</h2>
          </div>

        </div>

      </div>


      {/* ================= APPLY FORM ================= */}

      {showForm && (
        <div className="leave-form-card">

          <div className="leave-form-header">

            <div>
              <h2>Apply for Leave</h2>

              <p>
                Submit your leave request for approval
              </p>
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="leave-form-grid">

              {/* LEAVE TYPE */}

              <div className="leave-input-group">

                <label htmlFor="leaveType">
                  Leave Type
                </label>

                <select
                  id="leaveType"
                  name="leaveType"
                  value={leaveForm.leaveType}
                  onChange={handleChange}
                >
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Emergency Leave</option>
                  <option>Other Leave</option>
                </select>

              </div>


              {/* FROM DATE */}

              <div className="leave-input-group">

                <label htmlFor="fromDate">
                  From Date
                </label>

                <input
                  id="fromDate"
                  type="date"
                  name="fromDate"
                  value={leaveForm.fromDate}
                  onChange={handleChange}
                />

              </div>


              {/* TO DATE */}

              <div className="leave-input-group">

                <label htmlFor="toDate">
                  To Date
                </label>

                <input
                  id="toDate"
                  type="date"
                  name="toDate"
                  value={leaveForm.toDate}
                  onChange={handleChange}
                />

              </div>


              {/* DAYS */}

              <div className="leave-input-group">

                <label>
                  Total Days
                </label>

                <div className="leave-days-display">
                  {calculateDays() || 0} Day
                  {calculateDays() !== 1 ? "s" : ""}
                </div>

              </div>

            </div>


            {/* REASON */}

            <div className="leave-input-group">

              <label htmlFor="reason">
                Reason
              </label>

              <textarea
                id="reason"
                name="reason"
                rows="4"
                placeholder="Enter reason for leave..."
                value={leaveForm.reason}
                onChange={handleChange}
              />

            </div>


            {/* BUTTONS */}

            <div className="leave-form-actions">

              <button
                type="button"
                className="leave-cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="leave-submit-btn"
              >
                <FaCheckCircle />
                Submit Leave
              </button>

            </div>

          </form>

        </div>
      )}


      {/* ================= LEAVE HISTORY ================= */}

      <div className="leave-table-card">

        <div className="leave-table-header">

          <div>
            <h2>Leave History</h2>

            <p>
              View all your submitted leave requests
            </p>
          </div>

        </div>


        <div className="leave-table-wrapper">

          <table className="leave-table">

            <thead>

              <tr>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {leaves.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="no-leave-data"
                  >
                    No leave records found.
                  </td>
                </tr>

              ) : (

                leaves.map((leave) => (

                  <tr key={leave.id}>

                    <td>
                      <strong>{leave.type}</strong>
                    </td>

                    <td>{leave.from}</td>

                    <td>{leave.to}</td>

                    <td>
                      {leave.days}
                    </td>

                    <td>
                      {leave.reason}
                    </td>

                    <td>

                      <span
                        className={`leave-status ${leave.status.toLowerCase()}`}
                      >
                        {leave.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default EmployeeLeave;
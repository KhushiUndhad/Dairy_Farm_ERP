import { useEffect, useState } from "react";

import {
  FaUmbrellaBeach,
  FaPlus,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";

import {
  getLeaves,
  addLeave,
} from "../../services/api";

import "./EmployeeLeave.css";

function EmployeeLeave() {
  const [leaves, setLeaves] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ========================================
  // FORM
  // ========================================

  const [formData, setFormData] =
    useState({
      leaveType: "",
      from: "",
      to: "",
      reason: "",
    });

  // ========================================
  // GET EMPLOYEE
  // ========================================

  const getEmployee = () => {
    try {
      const data =
        localStorage.getItem(
          "employeeData"
        );

      if (!data) {
        return null;
      }

      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  };

  // ========================================
  // EMPLOYEE MATCH
  // ========================================

  const belongsToEmployee = (record) => {
    const employee = getEmployee();

    if (!employee) {
      return true;
    }

    if (
      !record.employeeId &&
      !record.employeeEmail &&
      !record.employeeName
    ) {
      return true;
    }

    const employeeId =
      employee._id ||
      employee.id ||
      employee.employeeId;

    return (
      String(record.employeeId || "") ===
        String(employeeId || "") ||
      String(record.employeeEmail || "")
        .toLowerCase() ===
        String(employee.email || "")
          .toLowerCase() ||
      String(record.employeeName || "")
        .toLowerCase() ===
        String(employee.name || "")
          .toLowerCase()
    );
  };

  // ========================================
  // LOAD LEAVES
  // ========================================

  const loadLeaves = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getLeaves();

      const records = Array.isArray(
        response
      )
        ? response
        : response.data || [];

      const employeeLeaves =
        records.filter(
          belongsToEmployee
        );

      employeeLeaves.sort(
        (a, b) =>
          new Date(b.from || 0) -
          new Date(a.from || 0)
      );

      setLeaves(employeeLeaves);
    } catch (error) {
      console.error(
        "Leave loading error:",
        error
      );

      setError(
        error.message ||
          "Unable to load leave records."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    loadLeaves();
  }, []);

  // ========================================
  // FORM CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========================================
  // CALCULATE DAYS
  // ========================================

  const calculateDays = (
    from,
    to
  ) => {
    if (!from || !to) {
      return 0;
    }

    const start =
      new Date(from);

    const end =
      new Date(to);

    if (end < start) {
      return 0;
    }

    const difference =
      end.getTime() -
      start.getTime();

    return (
      Math.floor(
        difference /
          (1000 *
            60 *
            60 *
            24)
      ) + 1
    );
  };

  // ========================================
  // SUBMIT LEAVE
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.leaveType ||
      !formData.from ||
      !formData.to ||
      !formData.reason.trim()
    ) {
      setError(
        "Please fill all leave details."
      );

      return;
    }

    const days =
      calculateDays(
        formData.from,
        formData.to
      );

    if (days <= 0) {
      setError(
        "Please select a valid date range."
      );

      return;
    }

    const employee =
      getEmployee();

    if (!employee) {
      setError(
        "Employee information not found. Please login again."
      );

      return;
    }

    try {
      setSubmitting(true);

      const employeeId =
        employee._id ||
        employee.id ||
        employee.employeeId ||
        "";

      const leaveData = {
        employeeId,

        employeeName:
          employee.name || "",

        employeeEmail:
          employee.email || "",

        type:
          formData.leaveType,

        from:
          formData.from,

        to:
          formData.to,

        days,

        reason:
          formData.reason.trim(),

        status: "Pending",
      };

      const response =
        await addLeave(
          leaveData
        );

      const newLeave =
        response.data ||
        response;

      setLeaves((prev) => [
        newLeave,
        ...prev,
      ]);

      setFormData({
        leaveType: "",
        from: "",
        to: "",
        reason: "",
      });

      setSuccess(
        "Leave application submitted successfully."
      );
    } catch (error) {
      console.error(
        "Leave submit error:",
        error
      );

      setError(
        error.message ||
          "Unable to submit leave application."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ========================================
  // STATUS ICON
  // ========================================

  const getStatusIcon = (
    status
  ) => {
    const value =
      String(status || "")
        .toLowerCase();

    if (value === "approved") {
      return <FaCheckCircle />;
    }

    if (value === "rejected") {
      return <FaTimesCircle />;
    }

    return <FaHourglassHalf />;
  };

  // ========================================
  // STATUS CLASS
  // ========================================

  const getStatusClass = (
    status
  ) => {
    const value =
      String(status || "")
        .toLowerCase();

    if (value === "approved") {
      return "approved";
    }

    if (value === "rejected") {
      return "rejected";
    }

    return "pending";
  };

  // ========================================
  // UI
  // ========================================

  return (
    <div className="employee-leave-page">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="page-header">

        <div>
          <h1>
            <FaUmbrellaBeach />
            Leave Management
          </h1>

          <p>
            Apply for leave and view your leave history
          </p>
        </div>

      </div>

      {/* ========================================
          SUCCESS
      ======================================== */}

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {/* ========================================
          ERROR
      ======================================== */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* ========================================
          APPLY LEAVE
      ======================================== */}

      <div className="leave-form-container">

        <div className="section-title">

          <h2>
            <FaPlus />
            Apply for Leave
          </h2>

        </div>

        <form
          onSubmit={handleSubmit}
          className="leave-form"
        >

          <div className="form-group">

            <label>
              Leave Type
            </label>

            <select
              name="leaveType"
              value={
                formData.leaveType
              }
              onChange={
                handleChange
              }
            >

              <option value="">
                Select Leave Type
              </option>

              <option value="Casual Leave">
                Casual Leave
              </option>

              <option value="Sick Leave">
                Sick Leave
              </option>

              <option value="Earned Leave">
                Earned Leave
              </option>

              <option value="Emergency Leave">
                Emergency Leave
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          <div className="form-group">

            <label>
              From Date
            </label>

            <input
              type="date"
              name="from"
              value={
                formData.from
              }
              onChange={
                handleChange
              }
            />

          </div>

          <div className="form-group">

            <label>
              To Date
            </label>

            <input
              type="date"
              name="to"
              value={
                formData.to
              }
              onChange={
                handleChange
              }
            />

          </div>

          <div className="form-group full-width">

            <label>
              Reason
            </label>

            <textarea
              name="reason"
              value={
                formData.reason
              }
              onChange={
                handleChange
              }
              placeholder="Enter reason for leave..."
              rows="4"
            />

          </div>

          <div className="leave-form-actions">

            <button
              type="submit"
              disabled={submitting}
              className="submit-btn"
            >

              <FaPlus />

              {submitting
                ? "Submitting..."
                : "Apply Leave"}

            </button>

          </div>

        </form>

      </div>

      {/* ========================================
          LEAVE HISTORY
      ======================================== */}

      <div className="leave-history-container">

        <div className="section-title">

          <h2>
            <FaCalendarAlt />
            Leave History
          </h2>

        </div>

        {loading ? (
          <div className="loading-message">
            Loading leave records...
          </div>
        ) : leaves.length === 0 ? (
          <div className="no-data">
            No leave records found.
          </div>
        ) : (
          <div className="leave-table-container">

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

                {leaves.map(
                  (leave) => (
                    <tr
                      key={
                        leave._id ||
                        leave.id
                      }
                    >

                      <td>
                        {leave.type ||
                          leave.leaveType ||
                          "-"}
                      </td>

                      <td>
                        {leave.from ||
                          "-"}
                      </td>

                      <td>
                        {leave.to ||
                          "-"}
                      </td>

                      <td>
                        <FaClock />
                        {" "}
                        {leave.days ||
                          0}
                      </td>

                      <td>
                        {leave.reason ||
                          "-"}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${getStatusClass(
                            leave.status
                          )}`}
                        >

                          {getStatusIcon(
                            leave.status
                          )}

                          {" "}

                          {leave.status ||
                            "Pending"}

                        </span>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default EmployeeLeave;
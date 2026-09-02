import { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUmbrellaBeach,
  FaSearch,
} from "react-icons/fa";

import { getAttendance } from "../../services/api";

import "./EmployeeAttendance.css";

function EmployeeAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchDate, setSearchDate] = useState("");

  // ========================================
  // GET LOGGED-IN EMPLOYEE
  // ========================================

  const getLoggedInEmployee = () => {
    try {
      const employeeData =
        localStorage.getItem("employeeData");

      if (!employeeData) {
        return null;
      }

      return JSON.parse(employeeData);
    } catch (error) {
      console.error(
        "Employee data error:",
        error
      );

      return null;
    }
  };

  // ========================================
  // CHECK EMPLOYEE RECORD
  // ========================================

  const belongsToEmployee = (record) => {
    const employee = getLoggedInEmployee();

    if (!employee) {
      return true;
    }

    // If backend record does not have employee information,
    // keep showing it for backward compatibility.
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

    const employeeEmail =
      employee.email;

    const employeeName =
      employee.name;

    return (
      String(record.employeeId || "") ===
        String(employeeId || "") ||
      String(record.employeeEmail || "")
        .toLowerCase() ===
        String(employeeEmail || "")
          .toLowerCase() ||
      String(record.employeeName || "")
        .toLowerCase() ===
        String(employeeName || "")
          .toLowerCase()
    );
  };

  // ========================================
  // LOAD ATTENDANCE
  // ========================================

  const loadAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAttendance();

      const records = Array.isArray(response)
        ? response
        : response.data || [];

      const employeeRecords =
        records.filter(belongsToEmployee);

      employeeRecords.sort((a, b) => {
        return (
          new Date(b.date || 0) -
          new Date(a.date || 0)
        );
      });

      setAttendanceData(employeeRecords);
    } catch (error) {
      console.error(
        "Attendance loading error:",
        error
      );

      setError(
        error.message ||
          "Unable to load attendance."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // USE EFFECT
  // ========================================

  useEffect(() => {
    loadAttendance();
  }, []);

  // ========================================
  // SEARCH
  // ========================================

  const filteredAttendance =
    attendanceData.filter((item) => {
      if (!searchDate) {
        return true;
      }

      return item.date === searchDate;
    });

  // ========================================
  // STATUS ICON
  // ========================================

  const getStatusIcon = (status) => {
    const value =
      String(status || "").toLowerCase();

    if (value === "present") {
      return <FaCheckCircle />;
    }

    if (value === "absent") {
      return <FaTimesCircle />;
    }

    if (value === "leave") {
      return <FaUmbrellaBeach />;
    }

    return <FaCalendarCheck />;
  };

  // ========================================
  // STATUS CLASS
  // ========================================

  const getStatusClass = (status) => {
    const value =
      String(status || "").toLowerCase();

    if (value === "present") {
      return "present";
    }

    if (value === "absent") {
      return "absent";
    }

    if (value === "leave") {
      return "leave";
    }

    if (value === "half day") {
      return "half-day";
    }

    return "";
  };

  // ========================================
  // CALCULATE SUMMARY
  // ========================================

  const presentCount =
    attendanceData.filter(
      (item) =>
        String(item.status).toLowerCase() ===
        "present"
    ).length;

  const absentCount =
    attendanceData.filter(
      (item) =>
        String(item.status).toLowerCase() ===
        "absent"
    ).length;

  const leaveCount =
    attendanceData.filter(
      (item) =>
        String(item.status).toLowerCase() ===
        "leave"
    ).length;

  // ========================================
  // UI
  // ========================================

  return (
    <div className="employee-attendance-page">

      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <div className="page-header">

        <div>
          <h1>
            <FaCalendarCheck />
            Attendance
          </h1>

          <p>
            View your attendance records
          </p>
        </div>

      </div>

      {/* ========================================
          SUMMARY
      ======================================== */}

      <div className="attendance-summary">

        <div className="summary-card">
          <FaCalendarCheck />

          <div>
            <h3>
              {attendanceData.length}
            </h3>

            <p>Total Records</p>
          </div>
        </div>

        <div className="summary-card">
          <FaCheckCircle />

          <div>
            <h3>
              {presentCount}
            </h3>

            <p>Present</p>
          </div>
        </div>

        <div className="summary-card">
          <FaTimesCircle />

          <div>
            <h3>
              {absentCount}
            </h3>

            <p>Absent</p>
          </div>
        </div>

        <div className="summary-card">
          <FaUmbrellaBeach />

          <div>
            <h3>
              {leaveCount}
            </h3>

            <p>Leave</p>
          </div>
        </div>

      </div>

      {/* ========================================
          SEARCH
      ======================================== */}

      <div className="attendance-filter">

        <FaSearch />

        <input
          type="date"
          value={searchDate}
          onChange={(e) =>
            setSearchDate(e.target.value)
          }
        />

        {searchDate && (
          <button
            type="button"
            onClick={() =>
              setSearchDate("")
            }
          >
            Clear
          </button>
        )}

      </div>

      {/* ========================================
          LOADING
      ======================================== */}

      {loading && (
        <div className="loading-message">
          Loading attendance...
        </div>
      )}

      {/* ========================================
          ERROR
      ======================================== */}

      {!loading && error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* ========================================
          ATTENDANCE TABLE
      ======================================== */}

      {!loading && !error && (
        <div className="attendance-table-container">

          <table className="attendance-table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Working Hours</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredAttendance.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="no-data"
                  >
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                filteredAttendance.map(
                  (item) => (
                    <tr
                      key={
                        item._id ||
                        item.id
                      }
                    >

                      <td>
                        {item.date || "-"}
                      </td>

                      <td>
                        {item.day || "-"}
                      </td>

                      <td>
                        <FaClock />
                        {" "}
                        {item.checkIn || "-"}
                      </td>

                      <td>
                        <FaClock />
                        {" "}
                        {item.checkOut || "-"}
                      </td>

                      <td>
                        {item.hours || "0"}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${getStatusClass(
                            item.status
                          )}`}
                        >
                          {getStatusIcon(
                            item.status
                          )}

                          {" "}

                          {item.status ||
                            "Pending"}
                        </span>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default EmployeeAttendance;
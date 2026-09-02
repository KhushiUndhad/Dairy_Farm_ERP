import { useEffect, useState } from "react";

import {
  FaMoneyBillWave,
  FaEye,
  FaDownload,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaCalendarAlt,
} from "react-icons/fa";

import { getSalaries } from "../../services/api";

import "./EmployeeSalary.css";

function EmployeeSalary() {
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSalary, setSelectedSalary] = useState(null);

  // ========================================
  // GET LOGGED-IN EMPLOYEE
  // ========================================

  const getEmployee = () => {
    try {
      const data = localStorage.getItem("employeeData");

      if (!data) {
        return null;
      }

      return JSON.parse(data);
    } catch (error) {
      console.error("Employee data error:", error);
      return null;
    }
  };

  // ========================================
  // CHECK SALARY BELONGS TO EMPLOYEE
  // ========================================

  const belongsToEmployee = (record) => {
    const employee = getEmployee();

    if (!employee) {
      return false;
    }

    const employeeId =
      employee._id ||
      employee.id ||
      employee.employeeId ||
      "";

    const employeeEmail =
      employee.email || "";

    const employeeName =
      employee.name || "";

    const recordEmployeeId =
      record.employeeId || "";

    const recordEmployeeEmail =
      record.employeeEmail || "";

    const recordEmployeeName =
      record.employeeName || "";

    // Match Employee ID
    if (
      recordEmployeeId &&
      employeeId &&
      String(recordEmployeeId) ===
        String(employeeId)
    ) {
      return true;
    }

    // Match Email
    if (
      recordEmployeeEmail &&
      employeeEmail &&
      String(recordEmployeeEmail).toLowerCase() ===
        String(employeeEmail).toLowerCase()
    ) {
      return true;
    }

    // Match Name
    if (
      recordEmployeeName &&
      employeeName &&
      String(recordEmployeeName).toLowerCase() ===
        String(employeeName).toLowerCase()
    ) {
      return true;
    }

    return false;
  };

  // ========================================
  // LOAD SALARY RECORDS
  // ========================================

  const loadSalaries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getSalaries();

      console.log("Salary API Response:", response);

      // Backend response:
      // {
      //   success: true,
      //   count: 2,
      //   salaries: [...]
      // }

      let records = [];

      if (Array.isArray(response)) {
        records = response;
      } else if (Array.isArray(response.salaries)) {
        records = response.salaries;
      } else if (Array.isArray(response.data)) {
        records = response.data;
      }

      console.log("All Salary Records:", records);

      // ========================================
      // FILTER LOGGED-IN EMPLOYEE
      // ========================================

      const employeeRecords =
        records.filter(belongsToEmployee);

      console.log(
        "Employee Salary Records:",
        employeeRecords
      );

      // ========================================
      // SORT BY PAYMENT DATE
      // ========================================

      employeeRecords.sort((a, b) => {
        const dateA = new Date(
          a.paymentDate || a.createdAt || 0
        );

        const dateB = new Date(
          b.paymentDate || b.createdAt || 0
        );

        return dateB - dateA;
      });

      setSalaryRecords(employeeRecords);
    } catch (error) {
      console.error(
        "Salary loading error:",
        error
      );

      setError(
        error.message ||
          "Unable to load salary records."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    loadSalaries();
  }, []);

  // ========================================
  // STATUS ICON
  // ========================================

  const getStatusIcon = (status) => {
    const value =
      String(status || "").toLowerCase();

    if (
      value === "paid" ||
      value === "completed"
    ) {
      return <FaCheckCircle />;
    }

    if (
      value === "pending" ||
      value === "processing"
    ) {
      return <FaClock />;
    }

    return <FaTimesCircle />;
  };

  // ========================================
  // STATUS CLASS
  // ========================================

  const getStatusClass = (status) => {
    const value =
      String(status || "").toLowerCase();

    if (
      value === "paid" ||
      value === "completed"
    ) {
      return "paid";
    }

    if (
      value === "pending" ||
      value === "processing"
    ) {
      return "pending";
    }

    return "unpaid";
  };

  // ========================================
  // VIEW SALARY
  // ========================================

  const handleView = (salary) => {
    setSelectedSalary(salary);
  };

  // ========================================
  // CLOSE MODAL
  // ========================================

  const closeModal = () => {
    setSelectedSalary(null);
  };

  // ========================================
  // DOWNLOAD SALARY
  // ========================================

  const handleDownload = (salary) => {
    alert(
      `Salary slip for ${
        salary.month || "selected month"
      } is ready for download.`
    );
  };

  // ========================================
  // TOTAL SALARY
  // ========================================

  const totalSalary =
    salaryRecords.reduce(
      (total, salary) =>
        total +
        Number(salary.netSalary || 0),
      0
    );

  // ========================================
  // UI
  // ========================================

  return (
    <div className="employee-salary-page">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="page-header">

        <div>

          <h1>
            <FaMoneyBillWave />
            Salary
          </h1>

          <p>
            View your salary and payment details
          </p>

        </div>

      </div>

      {/* ========================================
          SUMMARY
      ======================================== */}

      <div className="salary-summary">

        <div className="summary-card">

          <FaMoneyBillWave />

          <div>

            <h3>
              ₹
              {totalSalary.toLocaleString(
                "en-IN"
              )}
            </h3>

            <p>
              Total Salary
            </p>

          </div>

        </div>

        <div className="summary-card">

          <FaCalendarAlt />

          <div>

            <h3>
              {salaryRecords.length}
            </h3>

            <p>
              Salary Records
            </p>

          </div>

        </div>

      </div>

      {/* ========================================
          ERROR
      ======================================== */}

      {!loading && error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* ========================================
          LOADING
      ======================================== */}

      {loading && (
        <div className="loading-message">
          Loading salary records...
        </div>
      )}

      {/* ========================================
          SALARY TABLE
      ======================================== */}

      {!loading && !error && (
        <div className="salary-table-container">

          <table className="salary-table">

            <thead>

              <tr>
                <th>Month</th>
                <th>Basic Salary</th>
                <th>Allowances</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {salaryRecords.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="no-data"
                  >
                    No salary records found.
                  </td>

                </tr>

              ) : (

                salaryRecords.map((salary) => (

                  <tr
                    key={
                      salary._id ||
                      salary.id
                    }
                  >

                    <td>
                      {salary.month || "-"}
                    </td>

                    <td>
                      ₹
                      {Number(
                        salary.basicSalary || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>
                      ₹
                      {Number(
                        salary.allowances || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>
                      ₹
                      {Number(
                        salary.deductions || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>

                      <strong>
                        ₹
                        {Number(
                          salary.netSalary || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </td>

                    <td>
                      {salary.paymentDate || "-"}
                    </td>

                    <td>

                      <span
                        className={`status-badge ${getStatusClass(
                          salary.status
                        )}`}
                      >

                        {getStatusIcon(
                          salary.status
                        )}

                        {" "}

                        {salary.status ||
                          "Pending"}

                      </span>

                    </td>

                    <td>

                      <div className="salary-actions">

                        <button
                          type="button"
                          onClick={() =>
                            handleView(salary)
                          }
                          title="View Salary"
                        >
                          <FaEye />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDownload(
                              salary
                            )
                          }
                          title="Download Salary Slip"
                        >
                          <FaDownload />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
      )}

      {/* ========================================
          SALARY MODAL
      ======================================== */}

      {selectedSalary && (

        <div
          className="salary-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="salary-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="salary-modal-header">

              <h2>
                Salary Details
              </h2>

              <button
                type="button"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <div className="salary-modal-body">

              <div className="salary-detail-row">

                <span>
                  Employee
                </span>

                <strong>
                  {
                    selectedSalary.employeeName ||
                    getEmployee()?.name ||
                    "-"
                  }
                </strong>

              </div>

              <div className="salary-detail-row">

                <span>
                  Month
                </span>

                <strong>
                  {
                    selectedSalary.month ||
                    "-"
                  }
                </strong>

              </div>

              <div className="salary-detail-row">

                <span>
                  Basic Salary
                </span>

                <strong>
                  ₹
                  {Number(
                    selectedSalary.basicSalary ||
                      0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="salary-detail-row">

                <span>
                  Allowances
                </span>

                <strong>
                  ₹
                  {Number(
                    selectedSalary.allowances ||
                      0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="salary-detail-row">

                <span>
                  Deductions
                </span>

                <strong>
                  ₹
                  {Number(
                    selectedSalary.deductions ||
                      0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="salary-detail-row total-row">

                <span>
                  Net Salary
                </span>

                <strong>
                  ₹
                  {Number(
                    selectedSalary.netSalary ||
                      0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="salary-detail-row">

                <span>
                  Payment Date
                </span>

                <strong>
                  {
                    selectedSalary.paymentDate ||
                    "-"
                  }
                </strong>

              </div>

              <div className="salary-detail-row">

                <span>
                  Status
                </span>

                <strong>
                  {
                    selectedSalary.status ||
                    "Pending"
                  }
                </strong>

              </div>

            </div>

            <div className="salary-modal-footer">

              <button
                type="button"
                onClick={() =>
                  handleDownload(
                    selectedSalary
                  )
                }
              >
                <FaDownload />
                Download
              </button>

              <button
                type="button"
                onClick={closeModal}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default EmployeeSalary;
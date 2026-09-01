import { useState } from "react";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaEye,
} from "react-icons/fa";

import "./EmployeeSalary.css";

const EmployeeSalary = () => {
  const [selectedSalary, setSelectedSalary] = useState(null);

  const salaryRecords = [
    {
      id: 1,
      month: "August 2026",
      basicSalary: 18000,
      allowances: 3000,
      deductions: 1000,
      netSalary: 20000,
      paymentDate: "2026-08-31",
      status: "Paid",
    },
    {
      id: 2,
      month: "July 2026",
      basicSalary: 18000,
      allowances: 2500,
      deductions: 800,
      netSalary: 19700,
      paymentDate: "2026-07-31",
      status: "Paid",
    },
    {
      id: 3,
      month: "June 2026",
      basicSalary: 18000,
      allowances: 2500,
      deductions: 1000,
      netSalary: 19500,
      paymentDate: "2026-06-30",
      status: "Paid",
    },
    {
      id: 4,
      month: "May 2026",
      basicSalary: 18000,
      allowances: 2000,
      deductions: 900,
      netSalary: 19100,
      paymentDate: "2026-05-31",
      status: "Paid",
    },
  ];

  const latestSalary = salaryRecords[0];

  const totalPaid = salaryRecords.reduce(
    (total, salary) => total + salary.netSalary,
    0
  );

  const averageSalary = Math.round(
    totalPaid / salaryRecords.length
  );

  const handleView = (salary) => {
    setSelectedSalary(salary);
  };

  const handleClose = () => {
    setSelectedSalary(null);
  };

  const handleDownload = (salary) => {
    alert(
      `Salary slip for ${salary.month} will be downloaded.`
    );
  };

  return (
    <div className="employee-salary-page">

      {/* ================= HEADER ================= */}

      <div className="employee-salary-header">

        <div>
          <h1>Salary Details</h1>

          <p>
            View your salary details and payment history
          </p>
        </div>

        <div className="salary-month-box">

          <FaCalendarAlt />

          <div>
            <span>Current Salary</span>

            <strong>
              {latestSalary.month}
            </strong>
          </div>

        </div>

      </div>


      {/* ================= SUMMARY ================= */}

      <div className="salary-summary">

        <div className="salary-summary-card">

          <div className="salary-summary-icon">
            <FaMoneyBillWave />
          </div>

          <div>
            <span>Current Salary</span>

            <strong>
              ₹{latestSalary.netSalary.toLocaleString()}
            </strong>
          </div>

        </div>


        <div className="salary-summary-card">

          <div className="salary-summary-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Total Paid</span>

            <strong>
              ₹{totalPaid.toLocaleString()}
            </strong>
          </div>

        </div>


        <div className="salary-summary-card">

          <div className="salary-summary-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <span>Salary Records</span>

            <strong>
              {salaryRecords.length}
            </strong>
          </div>

        </div>


        <div className="salary-summary-card">

          <div className="salary-summary-icon">

            <FaClock />

          </div>

          <div>
            <span>Average Salary</span>

            <strong>
              ₹{averageSalary.toLocaleString()}
            </strong>
          </div>

        </div>

      </div>


      {/* ================= CURRENT SALARY ================= */}

      <div className="current-salary-card">

        <div className="current-salary-title">

          <div>
            <h2>Current Salary</h2>

            <p>
              Salary breakdown for {latestSalary.month}
            </p>
          </div>

          <span className="salary-paid-badge">
            <FaCheckCircle />
            {latestSalary.status}
          </span>

        </div>


        <div className="salary-breakdown">

          <div className="salary-breakdown-item">

            <span>Basic Salary</span>

            <strong>
              ₹{latestSalary.basicSalary.toLocaleString()}
            </strong>

          </div>


          <div className="salary-breakdown-item">

            <span>Allowances</span>

            <strong className="salary-green">
              + ₹{latestSalary.allowances.toLocaleString()}
            </strong>

          </div>


          <div className="salary-breakdown-item">

            <span>Deductions</span>

            <strong className="salary-red">
              - ₹{latestSalary.deductions.toLocaleString()}
            </strong>

          </div>


          <div className="salary-breakdown-item salary-net">

            <span>Net Salary</span>

            <strong>
              ₹{latestSalary.netSalary.toLocaleString()}
            </strong>

          </div>

        </div>

      </div>


      {/* ================= SALARY HISTORY ================= */}

      <div className="salary-history-card">

        <div className="salary-history-header">

          <div>
            <h2>Salary History</h2>

            <p>
              Your previous salary payment records
            </p>
          </div>

        </div>


        <div className="salary-table-wrapper">

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

              {salaryRecords.map((salary) => (

                <tr key={salary.id}>

                  <td>
                    <strong>
                      {salary.month}
                    </strong>
                  </td>

                  <td>
                    ₹{salary.basicSalary.toLocaleString()}
                  </td>

                  <td className="salary-green">
                    + ₹{salary.allowances.toLocaleString()}
                  </td>

                  <td className="salary-red">
                    - ₹{salary.deductions.toLocaleString()}
                  </td>

                  <td>
                    <strong>
                      ₹{salary.netSalary.toLocaleString()}
                    </strong>
                  </td>

                  <td>
                    {salary.paymentDate}
                  </td>

                  <td>

                    <span className="salary-status paid">

                      <FaCheckCircle />

                      {salary.status}

                    </span>

                  </td>

                  <td>

                    <div className="salary-actions">

                      <button
                        type="button"
                        className="salary-view-btn"
                        onClick={() => handleView(salary)}
                        title="View Salary"
                      >
                        <FaEye />
                      </button>

                      <button
                        type="button"
                        className="salary-download-btn"
                        onClick={() =>
                          handleDownload(salary)
                        }
                        title="Download Salary Slip"
                      >
                        <FaDownload />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* ================= SALARY MODAL ================= */}

      {selectedSalary && (

        <div
          className="salary-modal-overlay"
          onClick={handleClose}
        >

          <div
            className="salary-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="salary-modal-header">

              <div>
                <h2>Salary Slip</h2>

                <p>
                  {selectedSalary.month}
                </p>
              </div>

              <button
                type="button"
                className="salary-modal-close"
                onClick={handleClose}
              >
                ×
              </button>

            </div>


            <div className="salary-slip">

              <div className="salary-slip-row">

                <span>Basic Salary</span>

                <strong>
                  ₹
                  {selectedSalary.basicSalary.toLocaleString()}
                </strong>

              </div>


              <div className="salary-slip-row">

                <span>Allowances</span>

                <strong className="salary-green">
                  + ₹
                  {selectedSalary.allowances.toLocaleString()}
                </strong>

              </div>


              <div className="salary-slip-row">

                <span>Deductions</span>

                <strong className="salary-red">
                  - ₹
                  {selectedSalary.deductions.toLocaleString()}
                </strong>

              </div>


              <div className="salary-slip-divider"></div>


              <div className="salary-slip-row salary-slip-total">

                <span>Net Salary</span>

                <strong>
                  ₹
                  {selectedSalary.netSalary.toLocaleString()}
                </strong>

              </div>


              <div className="salary-payment-info">

                <span>Payment Date</span>

                <strong>
                  {selectedSalary.paymentDate}
                </strong>

              </div>


              <div className="salary-payment-info">

                <span>Status</span>

                <strong className="salary-green">
                  {selectedSalary.status}
                </strong>

              </div>

            </div>


            <button
              type="button"
              className="salary-modal-download"
              onClick={() =>
                handleDownload(selectedSalary)
              }
            >

              <FaDownload />

              Download Salary Slip

            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default EmployeeSalary;
import {
  FaMoneyBillWave,
  FaDownload,
} from "react-icons/fa";

function EmployeeSalary() {

  return (
    <div>

      <h1>Salary</h1>

      <p>View your salary information.</p>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          marginTop: "25px",
        }}
      >

        <h2>
          <FaMoneyBillWave /> September 2026
        </h2>

        <h1>₹25,000</h1>

        <p>
          Basic Salary: ₹20,000
        </p>

        <p>
          Allowances: ₹5,000
        </p>

        <p>
          Deductions: ₹0
        </p>

        <button
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "7px",
            background: "#16a34a",
            color: "white",
            cursor: "pointer",
          }}
        >
          <FaDownload /> Download Payslip
        </button>

      </div>

    </div>
  );
}

export default EmployeeSalary;
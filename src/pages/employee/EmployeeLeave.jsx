import {
  FaCalendarAlt,
  FaPaperPlane,
} from "react-icons/fa";

function EmployeeLeave() {

  return (
    <div>

      <h1>Leave Management</h1>

      <p>Apply for leave and check your leave status.</p>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          marginTop: "25px",
        }}
      >

        <h2>
          <FaCalendarAlt /> Leave Balance
        </h2>

        <p>
          Total Leaves: <strong>12</strong>
        </p>

        <p>
          Used Leaves: <strong>4</strong>
        </p>

        <p>
          Remaining Leaves: <strong>8</strong>
        </p>

        <button
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "7px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          <FaPaperPlane /> Apply Leave
        </button>

      </div>

    </div>
  );
}

export default EmployeeLeave;
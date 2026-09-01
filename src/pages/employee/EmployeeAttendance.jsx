import {
  FaCalendarCheck,
  FaClock,
} from "react-icons/fa";

function EmployeeAttendance() {

  return (
    <div>

      <h1>Attendance</h1>

      <p>Check your attendance records.</p>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          marginTop: "25px",
        }}
      >

        <h2>
          <FaCalendarCheck /> September 2026
        </h2>

        <p>
          <FaClock /> Present Days: <strong>24</strong>
        </p>

        <p>
          Absent Days: <strong>1</strong>
        </p>

        <p>
          Leave Days: <strong>2</strong>
        </p>

      </div>

    </div>
  );
}

export default EmployeeAttendance;
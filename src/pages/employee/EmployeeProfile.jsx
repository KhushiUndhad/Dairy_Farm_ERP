import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
} from "react-icons/fa";

function EmployeeProfile() {

  return (
    <div>

      <h1>My Profile</h1>

      <p>View your employee information.</p>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          marginTop: "25px",
          maxWidth: "700px",
        }}
      >

        <h2>
          <FaUser /> Employee Information
        </h2>

        <p>
          <FaUser /> <strong>Name:</strong> Employee Name
        </p>

        <p>
          <FaEnvelope /> <strong>Email:</strong> employee@gmail.com
        </p>

        <p>
          <FaPhone /> <strong>Phone:</strong> 9876543210
        </p>

        <p>
          <FaBriefcase /> <strong>Department:</strong> Dairy Management
        </p>

      </div>

    </div>
  );
}

export default EmployeeProfile;
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

function EmployeeMyWork() {

  return (
    <div>

      <h1>My Work</h1>

      <p>Manage your assigned work and tasks.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "25px",
        }}
      >

        <div className="dashboard-card">

          <FaTasks size={30} />

          <div>
            <h3>12</h3>
            <p>Total Tasks</p>
          </div>

        </div>


        <div className="dashboard-card">

          <FaCheckCircle size={30} />

          <div>
            <h3>8</h3>
            <p>Completed</p>
          </div>

        </div>


        <div className="dashboard-card">

          <FaClock size={30} />

          <div>
            <h3>4</h3>
            <p>Pending</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeMyWork;
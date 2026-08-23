import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">

      <h1>
        Dairy Farm Dashboard
      </h1>

      <p>
        Welcome to the Admin Dashboard
      </p>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Cows</h3>
          <strong>120</strong>
        </div>

        <div className="dashboard-card">
          <h3>Milk Production</h3>
          <strong>850 L</strong>
        </div>

        <div className="dashboard-card">
          <h3>Employees</h3>
          <strong>25</strong>
        </div>

        <div className="dashboard-card">
          <h3>Customers</h3>
          <strong>68</strong>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
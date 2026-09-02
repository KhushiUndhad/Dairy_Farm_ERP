import { useEffect, useState } from "react";

import { getDashboardSummary } from "../../services/api";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  // ========================================
  // DASHBOARD DATA
  // ========================================

  const [dashboardData, setDashboardData] = useState({
    totalCows: 0,
    totalMilkProduction: 0,
    totalEmployees: 0,
    totalCustomers: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ========================================
  // LOAD DASHBOARD DATA
  // ========================================

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboardSummary();

      console.log(
        "Dashboard API Response:",
        response
      );

      if (
        response &&
        response.success &&
        response.data
      ) {
        setDashboardData({
          totalCows:
            response.data.totalCows || 0,

          totalMilkProduction:
            response.data.totalMilkProduction || 0,

          totalEmployees:
            response.data.totalEmployees || 0,

          totalCustomers:
            response.data.totalCustomers || 0,
        });
      }
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );

      setError(
        "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // DASHBOARD
  // ========================================

  return (
    <div className="admin-dashboard">

      {/* ========================================
          PAGE TITLE
      ======================================== */}

      <h1>
        Dairy Farm Dashboard
      </h1>

      <p>
        Welcome to the Admin Dashboard
      </p>

      {/* ========================================
          ERROR MESSAGE
      ======================================== */}

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}

      {/* ========================================
          DASHBOARD CARDS
      ======================================== */}

      <div className="dashboard-cards">

        {/* ========================================
            TOTAL COWS
        ======================================== */}

        <div className="dashboard-card">

          <h3>
            Total Cows
          </h3>

          <strong>
            {loading
              ? "..."
              : dashboardData.totalCows}
          </strong>

        </div>

        {/* ========================================
            MILK PRODUCTION
        ======================================== */}

        <div className="dashboard-card">

          <h3>
            Milk Production
          </h3>

          <strong>
            {loading
              ? "..."
              : `${dashboardData.totalMilkProduction} L`}
          </strong>

        </div>

        {/* ========================================
            EMPLOYEES
        ======================================== */}

        <div className="dashboard-card">

          <h3>
            Employees
          </h3>

          <strong>
            {loading
              ? "..."
              : dashboardData.totalEmployees}
          </strong>

        </div>

        {/* ========================================
            CUSTOMERS
        ======================================== */}

        <div className="dashboard-card">

          <h3>
            Customers
          </h3>

          <strong>
            {loading
              ? "..."
              : dashboardData.totalCustomers}
          </strong>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
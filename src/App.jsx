import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import AdminLayout from "./pages/admin/AdminLayout";

// Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CowManagement from "./pages/admin/CowManagement";
import MilkProduction from "./pages/admin/MilkProduction";
import EmployeeManagement from "./pages/admin/EmployeeManagement";
import CustomerManagement from "./pages/admin/CustomerManagement";
import Sales from "./pages/admin/Sales";
import Inventory from "./pages/admin/Inventory";
import Reports from "./pages/admin/Reports";

// Login
import AdminLogin from "./pages/admin/AdminLogin";


// ========================================
// PROTECTED ADMIN
// ========================================

function ProtectedAdmin({ children }) {
  const isLoggedIn =
    localStorage.getItem("adminLoggedIn") === "true";

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/admin/login" replace />
  );
}


// ========================================
// ADMIN LAYOUT
// ========================================

function AdminPage({ children }) {
  return (
    <ProtectedAdmin>
      <AdminLayout>
        {children}
      </AdminLayout>
    </ProtectedAdmin>
  );
}


// ========================================
// APP
// ========================================

function App() {
  return (
    <Routes>

      {/* ===============================
          LOGIN
      =============================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* ===============================
          DASHBOARD
      =============================== */}

      <Route
        path="/"
        element={
          <AdminPage>
            <AdminDashboard />
          </AdminPage>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminPage>
            <AdminDashboard />
          </AdminPage>
        }
      />


      {/* ===============================
          COW MANAGEMENT
      =============================== */}

      <Route
        path="/admin/cows"
        element={
          <AdminPage>
            <CowManagement />
          </AdminPage>
        }
      />


      {/* ===============================
          MILK PRODUCTION
      =============================== */}

      <Route
        path="/admin/milk-production"
        element={
          <AdminPage>
            <MilkProduction />
          </AdminPage>
        }
      />


      {/* ===============================
          EMPLOYEE MANAGEMENT
      =============================== */}

      <Route
        path="/admin/employees"
        element={
          <AdminPage>
            <EmployeeManagement />
          </AdminPage>
        }
      />


      {/* ===============================
          CUSTOMER MANAGEMENT
      =============================== */}

      <Route
        path="/admin/customers"
        element={
          <AdminPage>
            <CustomerManagement />
          </AdminPage>
        }
      />


      {/* ===============================
          SALES
      =============================== */}

      <Route
        path="/admin/sales"
        element={
          <AdminPage>
            <Sales />
          </AdminPage>
        }
      />


      {/* ===============================
          INVENTORY
      =============================== */}

      <Route
        path="/admin/inventory"
        element={
          <AdminPage>
            <Inventory />
          </AdminPage>
        }
      />


      {/* ===============================
          REPORTS
      =============================== */}

      <Route
        path="/admin/reports"
        element={
          <AdminPage>
            <Reports />
          </AdminPage>
        }
      />


      {/* ===============================
          UNKNOWN URL
      =============================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/admin"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;
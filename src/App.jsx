
import { Routes, Route, Navigate } from "react-router-dom";


// ========================================
// ADMIN LAYOUT
// ========================================

import AdminLayout from "./pages/admin/AdminLayout";


// ========================================
// ADMIN PAGES
// ========================================

import AdminDashboard from "./pages/admin/AdminDashboard";
import CowManagement from "./pages/admin/CowManagement";
import MilkProduction from "./pages/admin/MilkProduction";
import EmployeeManagement from "./pages/admin/EmployeeManagement";
import CustomerManagement from "./pages/admin/CustomerManagement";
import Sales from "./pages/admin/Sales";
import Inventory from "./pages/admin/Inventory";
import Reports from "./pages/admin/Reports";


// ========================================
// ADMIN LOGIN
// ========================================

import AdminLogin from "./pages/admin/AdminLogin";


// ========================================
// CUSTOMER PAGES
// ========================================

import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerDashboard from "./pages/customer/CustomerDashboard";


// ========================================
// PROTECTED ADMIN
// ========================================

function ProtectedAdmin({ children }) {

  const isLoggedIn =
    localStorage.getItem("adminLoggedIn") === "true";

  return isLoggedIn ? (
    children
  ) : (
    <Navigate
      to="/admin/login"
      replace
    />
  );
}


// ========================================
// ADMIN PAGE
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
// PROTECTED CUSTOMER
// ========================================

function ProtectedCustomer({ children }) {

  const isLoggedIn =
    localStorage.getItem("customerLoggedIn") === "true";

  return isLoggedIn ? (
    children
  ) : (
    <Navigate
      to="/customer/login"
      replace
    />
  );
}


// ========================================
// CUSTOMER PAGE
// ========================================

function CustomerPage({ children }) {

  return (
    <ProtectedCustomer>
      {children}
    </ProtectedCustomer>
  );
}


// ========================================
// APP
// ========================================

function App() {

  return (

    <Routes>


      {/* =================================
          CUSTOMER LOGIN
      ================================= */}

      <Route
        path="/customer/login"
        element={
          <CustomerLogin />
        }
      />


      {/* =================================
          ADMIN LOGIN
      ================================= */}

      <Route
        path="/admin/login"
        element={
          <AdminLogin />
        }
      />


      {/* =================================
          DEFAULT URL
          
          "/" → CUSTOMER LOGIN
      ================================= */}

      <Route
        path="/"
        element={
          <Navigate
            to="/customer/login"
            replace
          />
        }
      />


      {/* =================================
          ADMIN DASHBOARD
      ================================= */}

      <Route
        path="/admin"
        element={
          <AdminPage>
            <AdminDashboard />
          </AdminPage>
        }
      />


      {/* =================================
          COW MANAGEMENT
      ================================= */}

      <Route
        path="/admin/cows"
        element={
          <AdminPage>
            <CowManagement />
          </AdminPage>
        }
      />


      {/* =================================
          MILK PRODUCTION
      ================================= */}

      <Route
        path="/admin/milk-production"
        element={
          <AdminPage>
            <MilkProduction />
          </AdminPage>
        }
      />


      {/* =================================
          EMPLOYEE MANAGEMENT
      ================================= */}

      <Route
        path="/admin/employees"
        element={
          <AdminPage>
            <EmployeeManagement />
          </AdminPage>
        }
      />


      {/* =================================
          CUSTOMER MANAGEMENT
      ================================= */}

      <Route
        path="/admin/customers"
        element={
          <AdminPage>
            <CustomerManagement />
          </AdminPage>
        }
      />


      {/* =================================
          SALES
      ================================= */}

      <Route
        path="/admin/sales"
        element={
          <AdminPage>
            <Sales />
          </AdminPage>
        }
      />


      {/* =================================
          INVENTORY
      ================================= */}

      <Route
        path="/admin/inventory"
        element={
          <AdminPage>
            <Inventory />
          </AdminPage>
        }
      />


      {/* =================================
          REPORTS
      ================================= */}

      <Route
        path="/admin/reports"
        element={
          <AdminPage>
            <Reports />
          </AdminPage>
        }
      />


      {/* =================================
          CUSTOMER DASHBOARD
      ================================= */}

      <Route
        path="/customer"
        element={
          <CustomerPage>
            <CustomerDashboard />
          </CustomerPage>
        }
      />


      {/* =================================
          UNKNOWN URL
          
          → CUSTOMER LOGIN
      ================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/customer/login"
            replace
          />
        }
      />

    </Routes>
  );
}


export default App;


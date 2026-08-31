import { Routes, Route, Navigate } from "react-router-dom";


// ========================================
// ADMIN
// ========================================

import AdminLayout from "./pages/admin/AdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CowManagement from "./pages/admin/CowManagement";
import MilkProduction from "./pages/admin/MilkProduction";
import EmployeeManagement from "./pages/admin/EmployeeManagement";
import CustomerManagement from "./pages/admin/CustomerManagement";
import Sales from "./pages/admin/Sales";
import Inventory from "./pages/admin/Inventory";
import Reports from "./pages/admin/Reports";

import AdminLogin from "./pages/admin/AdminLogin";


// ========================================
// CUSTOMER
// ========================================

import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerLayout from "./pages/customer/CustomerLayout";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerProducts from "./pages/customer/CustomerProducts";
import CustomerOrders from "./pages/customer/CustomerOrders";


// ========================================
// EMPLOYEE
// ========================================

import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EmployeeRegister from "./pages/employee/EmployeeRegister";
import EmployeeLayout from "./pages/employee/EmployeeLayout";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";


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
// PROTECTED EMPLOYEE
// ========================================

function ProtectedEmployee({ children }) {

  const isLoggedIn =
    localStorage.getItem("employeeLoggedIn") === "true";

  return isLoggedIn ? (
    children
  ) : (
    <Navigate
      to="/employee/login"
      replace
    />
  );
}


// ========================================
// APP
// ========================================

function App() {

  return (

    <Routes>


      {/* =====================================
          DEFAULT
      ===================================== */}

      <Route
        path="/"
        element={
          <Navigate
            to="/customer/login"
            replace
          />
        }
      />


      {/* =====================================
          ADMIN LOGIN
      ===================================== */}

      <Route
        path="/admin/login"
        element={
          <AdminLogin />
        }
      />


      {/* =====================================
          ADMIN DASHBOARD
      ===================================== */}

      <Route
        path="/admin"
        element={
          <AdminPage>
            <AdminDashboard />
          </AdminPage>
        }
      />


      <Route
        path="/admin/cows"
        element={
          <AdminPage>
            <CowManagement />
          </AdminPage>
        }
      />


      <Route
        path="/admin/milk-production"
        element={
          <AdminPage>
            <MilkProduction />
          </AdminPage>
        }
      />


      <Route
        path="/admin/employees"
        element={
          <AdminPage>
            <EmployeeManagement />
          </AdminPage>
        }
      />


      <Route
        path="/admin/customers"
        element={
          <AdminPage>
            <CustomerManagement />
          </AdminPage>
        }
      />


      <Route
        path="/admin/sales"
        element={
          <AdminPage>
            <Sales />
          </AdminPage>
        }
      />


      <Route
        path="/admin/inventory"
        element={
          <AdminPage>
            <Inventory />
          </AdminPage>
        }
      />


      <Route
        path="/admin/reports"
        element={
          <AdminPage>
            <Reports />
          </AdminPage>
        }
      />


      {/* =====================================
          CUSTOMER LOGIN
      ===================================== */}

      <Route
        path="/customer/login"
        element={
          <CustomerLogin />
        }
      />


      {/* =====================================
          CUSTOMER PANEL
      ===================================== */}

      <Route
        path="/customer"
        element={
          <ProtectedCustomer>
            <CustomerLayout />
          </ProtectedCustomer>
        }
      >

        <Route
          index
          element={
            <CustomerDashboard />
          }
        />

        <Route
          path="products"
          element={
            <CustomerProducts />
          }
        />

        <Route
          path="orders"
          element={
            <CustomerOrders />
          }
        />

      </Route>


      {/* =====================================
          EMPLOYEE LOGIN
      ===================================== */}

      <Route
        path="/employee/login"
        element={
          <EmployeeLogin />
        }
      />


      {/* =====================================
          EMPLOYEE REGISTER
      ===================================== */}

      <Route
        path="/employee/register"
        element={
          <EmployeeRegister />
        }
      />


      {/* =====================================
          EMPLOYEE PANEL
      ===================================== */}

      <Route
        path="/employee"
        element={
          <ProtectedEmployee>
            <EmployeeLayout />
          </ProtectedEmployee>
        }
      >

        {/* DASHBOARD */}

        <Route
          index
          element={
            <EmployeeDashboard />
          }
        />

      </Route>


      {/* =====================================
          UNKNOWN URL
      ===================================== */}

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
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
import CustomerLayout from "./pages/customer/CustomerLayout";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerProducts from "./pages/customer/CustomerProducts";
import CustomerOrders from "./pages/customer/CustomerOrders";
import CustomerPayments from "./pages/customer/CustomerPayments";
import CustomerProfile from "./pages/customer/CustomerProfile";


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
          CUSTOMER PANEL
      ================================= */}

      <Route
        path="/customer"
        element={
          <ProtectedCustomer>
            <CustomerLayout />
          </ProtectedCustomer>
        }
      >


        {/* =================================
            CUSTOMER DASHBOARD

            URL:
            /customer
        ================================= */}

        <Route
          index
          element={
            <CustomerDashboard />
          }
        />


        {/* =================================
            CUSTOMER PRODUCTS

            URL:
            /customer/products
        ================================= */}

        <Route
          path="products"
          element={
            <CustomerProducts />
          }
        />


        {/* =================================
            CUSTOMER ORDERS

            URL:
            /customer/orders
        ================================= */}

        <Route
          path="orders"
          element={
            <CustomerOrders />
          }
        />


        {/* =================================
            CUSTOMER PAYMENTS

            URL:
            /customer/payments
        ================================= */}

        <Route
          path="payments"
          element={
            <CustomerPayments />
          }
        />


        {/* =================================
            CUSTOMER PROFILE

            URL:
            /customer/profile
        ================================= */}

        <Route
          path="profile"
          element={
            <CustomerProfile />
          }
        />


      </Route>


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
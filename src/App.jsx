import { Navigate, Route, Routes } from "react-router-dom";

// ADMIN
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CowManagement from "./pages/admin/CowManagement";
import MilkProduction from "./pages/admin/MilkProduction";
import EmployeeManagement from "./pages/admin/EmployeeManagement";
import CustomerManagement from "./pages/admin/CustomerManagement";
import Sales from "./pages/admin/Sales";
import Inventory from "./pages/admin/Inventory";
import Reports from "./pages/admin/Reports";

// EMPLOYEE
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EmployeeRegister from "./pages/employee/EmployeeRegister";
import EmployeeLayout from "./pages/employee/EmployeeLayout";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeMyWork from "./pages/employee/EmployeeMyWork";
import EmployeeAttendance from "./pages/employee/EmployeeAttendance";
import EmployeeLeave from "./pages/employee/EmployeeLeave";
import EmployeeSalary from "./pages/employee/EmployeeSalary";
import EmployeeProfile from "./pages/employee/EmployeeProfile";

// CUSTOMER
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerLayout from "./pages/customer/CustomerLayout";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerProducts from "./pages/customer/CustomerProducts";
import CustomerOrders from "./pages/customer/CustomerOrders";
import CustomerPayments from "./pages/customer/CustomerPayments";
import CustomerProfile from "./pages/customer/CustomerProfile";


// ======================================================
// PROTECTION
// ======================================================

function ProtectedAdmin({ children }) {

  const loggedIn =
    localStorage.getItem("adminLoggedIn") === "true";

  return loggedIn
    ? children
    : <Navigate to="/admin/login" replace />;
}


function ProtectedEmployee({ children }) {

  const loggedIn =
    localStorage.getItem("employeeLoggedIn") === "true";

  return loggedIn
    ? children
    : <Navigate to="/employee/login" replace />;
}


function ProtectedCustomer({ children }) {

  const loggedIn =
    localStorage.getItem("customerLoggedIn") === "true";

  return loggedIn
    ? children
    : <Navigate to="/customer/login" replace />;
}


// ======================================================
// ADMIN PAGE
// ======================================================

function AdminPage({ children }) {

  return (
    <ProtectedAdmin>

      <AdminLayout>
        {children}
      </AdminLayout>

    </ProtectedAdmin>
  );
}


// ======================================================
// APP
// ======================================================

function App() {

  return (

    <Routes>

      {/* HOME */}

      <Route
        path="/"
        element={
          <Navigate
            to="/employee/login"
            replace
          />
        }
      />


      {/* ==================================================
          ADMIN
      ================================================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

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


      {/* ==================================================
          EMPLOYEE
      ================================================== */}

      <Route
        path="/employee/login"
        element={<EmployeeLogin />}
      />

      <Route
        path="/employee/register"
        element={<EmployeeRegister />}
      />


      <Route
        path="/employee"
        element={
          <ProtectedEmployee>
            <EmployeeLayout />
          </ProtectedEmployee>
        }
      >

        <Route
          index
          element={<EmployeeDashboard />}
        />

        <Route
          path="work"
          element={<EmployeeMyWork />}
        />

        <Route
          path="attendance"
          element={<EmployeeAttendance />}
        />

        <Route
          path="leave"
          element={<EmployeeLeave />}
        />

        <Route
          path="salary"
          element={<EmployeeSalary />}
        />

        <Route
          path="profile"
          element={<EmployeeProfile />}
        />

      </Route>


      {/* ==================================================
          CUSTOMER
      ================================================== */}

      <Route
        path="/customer/login"
        element={<CustomerLogin />}
      />

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
          element={<CustomerDashboard />}
        />

        <Route
          path="products"
          element={<CustomerProducts />}
        />

        <Route
          path="orders"
          element={<CustomerOrders />}
        />

        <Route
          path="payments"
          element={<CustomerPayments />}
        />

        <Route
          path="profile"
          element={<CustomerProfile />}
        />

      </Route>


      {/* 404 */}

      <Route
        path="*"
        element={
          <Navigate
            to="/employee/login"
            replace
          />
        }
      />

    </Routes>

  );
}

export default App;
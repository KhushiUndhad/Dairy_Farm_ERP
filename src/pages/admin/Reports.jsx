import { useMemo, useState } from "react";
import "./Reports.css";

const Reports = () => {
  const [reportType, setReportType] = useState("overview");

  const [dateRange, setDateRange] = useState("this-month");

  const [search, setSearch] = useState("");

  // ==========================================
  // SAMPLE DATA
  // ==========================================

  const milkData = [
    {
      date: "2026-08-01",
      morning: 420,
      evening: 390,
      total: 810,
      cows: 42,
    },
    {
      date: "2026-08-02",
      morning: 435,
      evening: 405,
      total: 840,
      cows: 43,
    },
    {
      date: "2026-08-03",
      morning: 440,
      evening: 410,
      total: 850,
      cows: 43,
    },
    {
      date: "2026-08-04",
      morning: 428,
      evening: 402,
      total: 830,
      cows: 42,
    },
    {
      date: "2026-08-05",
      morning: 450,
      evening: 420,
      total: 870,
      cows: 44,
    },
    {
      date: "2026-08-06",
      morning: 462,
      evening: 428,
      total: 890,
      cows: 44,
    },
    {
      date: "2026-08-07",
      morning: 470,
      evening: 435,
      total: 905,
      cows: 45,
    },
  ];

  const salesData = [
    {
      invoice: "INV-1001",
      date: "2026-08-01",
      customer: "Fresh Dairy Store",
      product: "Milk",
      quantity: 320,
      amount: 19200,
      status: "Paid",
    },
    {
      invoice: "INV-1002",
      date: "2026-08-03",
      customer: "City Supermarket",
      product: "Milk",
      quantity: 450,
      amount: 27000,
      status: "Paid",
    },
    {
      invoice: "INV-1003",
      date: "2026-08-05",
      customer: "Royal Hotel",
      product: "Milk",
      quantity: 280,
      amount: 16800,
      status: "Pending",
    },
    {
      invoice: "INV-1004",
      date: "2026-08-07",
      customer: "Fresh Dairy Store",
      product: "Milk",
      quantity: 360,
      amount: 21600,
      status: "Paid",
    },
  ];

  const inventoryData = [
    {
      item: "Cattle Feed",
      category: "Feed",
      quantity: 250,
      unit: "Kg",
      value: 8000,
      status: "In Stock",
    },
    {
      item: "Mineral Mixture",
      category: "Medicine",
      quantity: 45,
      unit: "Kg",
      value: 8100,
      status: "In Stock",
    },
    {
      item: "Milk Can 40L",
      category: "Equipment",
      quantity: 12,
      unit: "Pieces",
      value: 10200,
      status: "In Stock",
    },
    {
      item: "Cleaning Liquid",
      category: "Cleaning",
      quantity: 8,
      unit: "Litres",
      value: 960,
      status: "Low Stock",
    },
  ];

  const cowData = [
    {
      id: "COW-001",
      name: "Lakshmi",
      breed: "HF",
      age: 4,
      milk: 22,
      status: "Active",
    },
    {
      id: "COW-002",
      name: "Ganga",
      breed: "Jersey",
      age: 5,
      milk: 19,
      status: "Active",
    },
    {
      id: "COW-003",
      name: "Radha",
      breed: "HF",
      age: 3,
      milk: 24,
      status: "Active",
    },
    {
      id: "COW-004",
      name: "Sita",
      breed: "Jersey",
      age: 6,
      milk: 17,
      status: "Inactive",
    },
  ];

  const employeeData = [
    {
      id: "EMP-001",
      name: "Ramesh Kumar",
      role: "Farm Manager",
      attendance: 96,
      salary: 28000,
      status: "Active",
    },
    {
      id: "EMP-002",
      name: "Suresh",
      role: "Milking Staff",
      attendance: 92,
      salary: 18000,
      status: "Active",
    },
    {
      id: "EMP-003",
      name: "Priya",
      role: "Accountant",
      attendance: 98,
      salary: 22000,
      status: "Active",
    },
  ];

  const customerData = [
    {
      id: "CUS-001",
      name: "Fresh Dairy Store",
      phone: "9876543210",
      purchases: 124500,
      orders: 18,
      status: "Active",
    },
    {
      id: "CUS-002",
      name: "City Supermarket",
      phone: "9876501234",
      purchases: 98500,
      orders: 14,
      status: "Active",
    },
    {
      id: "CUS-003",
      name: "Royal Hotel",
      phone: "9876512345",
      purchases: 76200,
      orders: 11,
      status: "Active",
    },
  ];

  // ==========================================
  // SUMMARY
  // ==========================================

  const summary = useMemo(() => {
    const totalMilk = milkData.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const totalSales = salesData.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const paidSales = salesData
      .filter((item) => item.status === "Paid")
      .reduce((sum, item) => sum + item.amount, 0);

    const pendingSales = salesData
      .filter((item) => item.status === "Pending")
      .reduce((sum, item) => sum + item.amount, 0);

    const inventoryValue = inventoryData.reduce(
      (sum, item) => sum + item.value,
      0
    );

    const lowStock = inventoryData.filter(
      (item) => item.status === "Low Stock"
    ).length;

    const activeCows = cowData.filter(
      (item) => item.status === "Active"
    ).length;

    const activeEmployees = employeeData.filter(
      (item) => item.status === "Active"
    ).length;

    const customers = customerData.length;

    return {
      totalMilk,
      totalSales,
      paidSales,
      pendingSales,
      inventoryValue,
      lowStock,
      activeCows,
      activeEmployees,
      customers,
    };
  }, []);

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredSales = salesData.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.invoice.toLowerCase().includes(value) ||
      item.customer.toLowerCase().includes(value) ||
      item.product.toLowerCase().includes(value)
    );
  });

  const filteredInventory = inventoryData.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.item.toLowerCase().includes(value) ||
      item.category.toLowerCase().includes(value)
    );
  });

  const filteredCows = cowData.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.id.toLowerCase().includes(value) ||
      item.name.toLowerCase().includes(value) ||
      item.breed.toLowerCase().includes(value)
    );
  });

  const filteredEmployees = employeeData.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.id.toLowerCase().includes(value) ||
      item.name.toLowerCase().includes(value) ||
      item.role.toLowerCase().includes(value)
    );
  });

  const filteredCustomers = customerData.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.id.toLowerCase().includes(value) ||
      item.name.toLowerCase().includes(value)
    );
  });

  // ==========================================
  // FORMAT
  // ==========================================

  const currency = (value) => {
    return `₹${Number(value).toLocaleString("en-IN")}`;
  };

  const formatDate = (date) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // PRINT
  // ==========================================

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reports-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="reports-header">

        <div>
          <h1>Reports</h1>

          <p>
            View and analyze your dairy farm
            business performance.
          </p>
        </div>

        <button
          className="report-print-btn"
          onClick={handlePrint}
        >
          🖨️ Print Report
        </button>

      </div>

      {/* ======================================
          FILTER BAR
      ====================================== */}

      <div className="reports-filter-card">

        <div className="report-filter-group">

          <label>
            Report Type
          </label>

          <select
            value={reportType}
            onChange={(e) =>
              setReportType(e.target.value)
            }
          >
            <option value="overview">
              Overview
            </option>

            <option value="milk">
              Milk Production
            </option>

            <option value="sales">
              Sales
            </option>

            <option value="inventory">
              Inventory
            </option>

            <option value="cows">
              Cows
            </option>

            <option value="employees">
              Employees
            </option>

            <option value="customers">
              Customers
            </option>
          </select>

        </div>

        <div className="report-filter-group">

          <label>
            Date Range
          </label>

          <select
            value={dateRange}
            onChange={(e) =>
              setDateRange(e.target.value)
            }
          >
            <option value="today">
              Today
            </option>

            <option value="this-week">
              This Week
            </option>

            <option value="this-month">
              This Month
            </option>

            <option value="last-month">
              Last Month
            </option>

            <option value="this-year">
              This Year
            </option>
          </select>

        </div>

        <div className="report-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search report..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* ======================================
          OVERVIEW
      ====================================== */}

      {reportType === "overview" && (
        <>
          <div className="report-summary-grid">

            <div className="report-summary-card">

              <div className="report-card-icon milk">
                🥛
              </div>

              <div>
                <span>
                  Milk Production
                </span>

                <strong>
                  {summary.totalMilk} L
                </strong>

                <small>
                  This period
                </small>
              </div>

            </div>

            <div className="report-summary-card">

              <div className="report-card-icon sales">
                ₹
              </div>

              <div>
                <span>
                  Total Sales
                </span>

                <strong>
                  {currency(summary.totalSales)}
                </strong>

                <small>
                  Gross revenue
                </small>
              </div>

            </div>

            <div className="report-summary-card">

              <div className="report-card-icon cows">
                🐄
              </div>

              <div>
                <span>
                  Active Cows
                </span>

                <strong>
                  {summary.activeCows}
                </strong>

                <small>
                  Currently active
                </small>
              </div>

            </div>

            <div className="report-summary-card">

              <div className="report-card-icon inventory">
                📦
              </div>

              <div>
                <span>
                  Inventory Value
                </span>

                <strong>
                  {currency(
                    summary.inventoryValue
                  )}
                </strong>

                <small>
                  Current stock
                </small>
              </div>

            </div>

          </div>

          {/* FINANCIAL */}

          <div className="report-two-column">

            <div className="report-panel">

              <div className="report-panel-header">
                <div>
                  <h2>
                    Financial Summary
                  </h2>

                  <p>
                    Current financial performance
                  </p>
                </div>
              </div>

              <div className="financial-list">

                <div>
                  <span>
                    Total Sales
                  </span>

                  <strong>
                    {currency(
                      summary.totalSales
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Paid Amount
                  </span>

                  <strong className="positive">
                    {currency(
                      summary.paidSales
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Pending Amount
                  </span>

                  <strong className="warning">
                    {currency(
                      summary.pendingSales
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Inventory Value
                  </span>

                  <strong>
                    {currency(
                      summary.inventoryValue
                    )}
                  </strong>
                </div>

              </div>

            </div>

            {/* QUICK REPORTS */}

            <div className="report-panel">

              <div className="report-panel-header">

                <div>
                  <h2>
                    Quick Statistics
                  </h2>

                  <p>
                    Farm management overview
                  </p>
                </div>

              </div>

              <div className="quick-stats">

                <div>
                  <span>
                    🐄 Active Cows
                  </span>

                  <strong>
                    {summary.activeCows}
                  </strong>
                </div>

                <div>
                  <span>
                    👨‍🌾 Employees
                  </span>

                  <strong>
                    {summary.activeEmployees}
                  </strong>
                </div>

                <div>
                  <span>
                    👥 Customers
                  </span>

                  <strong>
                    {summary.customers}
                  </strong>
                </div>

                <div>
                  <span>
                    ⚠️ Low Stock
                  </span>

                  <strong className="warning">
                    {summary.lowStock}
                  </strong>
                </div>

              </div>

            </div>

          </div>

          {/* MILK CHART */}

          <div className="report-panel milk-chart-panel">

            <div className="report-panel-header">

              <div>
                <h2>
                  Milk Production
                </h2>

                <p>
                  Daily milk production
                </p>
              </div>

              <strong className="chart-total">
                {summary.totalMilk} L
              </strong>

            </div>

            <div className="milk-chart">

              {milkData.map((item) => {

                const max =
                  Math.max(
                    ...milkData.map(
                      (data) =>
                        data.total
                    )
                  );

                const height =
                  (item.total / max) * 100;

                return (
                  <div
                    className="chart-column"
                    key={item.date}
                  >

                    <div className="chart-value">
                      {item.total}
                    </div>

                    <div className="chart-bar-wrapper">

                      <div
                        className="chart-bar"
                        style={{
                          height: `${height}%`,
                        }}
                      />

                    </div>

                    <span>
                      {new Date(
                        `${item.date}T00:00:00`
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                        }
                      )}
                    </span>

                  </div>
                );
              })}

            </div>

          </div>
        </>
      )}

      {/* ======================================
          MILK REPORT
      ====================================== */}

      {reportType === "milk" && (
        <div className="report-panel">

          <div className="report-panel-header">

            <div>
              <h2>
                Milk Production Report
              </h2>

              <p>
                Daily morning and evening milk
                production.
              </p>
            </div>

            <strong className="report-total">
              {summary.totalMilk} L
            </strong>

          </div>

          <div className="report-table-wrapper">

            <table className="report-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Milking Cows</th>
                  <th>Morning</th>
                  <th>Evening</th>
                  <th>Total</th>
                  <th>Avg / Cow</th>
                </tr>
              </thead>

              <tbody>
                {milkData.map((item) => (
                  <tr key={item.date}>

                    <td>
                      {formatDate(item.date)}
                    </td>

                    <td>
                      {item.cows}
                    </td>

                    <td>
                      {item.morning} L
                    </td>

                    <td>
                      {item.evening} L
                    </td>

                    <td>
                      <strong>
                        {item.total} L
                      </strong>
                    </td>

                    <td>
                      {(
                        item.total /
                        item.cows
                      ).toFixed(1)}{" "}
                      L
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* ======================================
          SALES REPORT
      ====================================== */}

      {reportType === "sales" && (
        <div className="report-panel">

          <div className="report-panel-header">

            <div>
              <h2>
                Sales Report
              </h2>

              <p>
                Sales and customer transactions.
              </p>
            </div>

            <strong className="report-total">
              {currency(summary.totalSales)}
            </strong>

          </div>

          <div className="report-table-wrapper">

            <table className="report-table">

              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredSales.map((item) => (
                  <tr key={item.invoice}>

                    <td>
                      <strong>
                        {item.invoice}
                      </strong>
                    </td>

                    <td>
                      {formatDate(item.date)}
                    </td>

                    <td>
                      {item.customer}
                    </td>

                    <td>
                      {item.product}
                    </td>

                    <td>
                      {item.quantity} L
                    </td>

                    <td>
                      <strong>
                        {currency(item.amount)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`report-status ${
                          item.status === "Paid"
                            ? "success"
                            : "pending"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* ======================================
          INVENTORY REPORT
      ====================================== */}

      {reportType === "inventory" && (
        <div className="report-panel">

          <div className="report-panel-header">

            <div>
              <h2>
                Inventory Report
              </h2>

              <p>
                Current inventory and stock value.
              </p>
            </div>

            <strong className="report-total">
              {currency(
                summary.inventoryValue
              )}
            </strong>

          </div>

          <div className="report-table-wrapper">

            <table className="report-table">

              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Value</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredInventory.map((item) => (
                  <tr key={item.item}>

                    <td>
                      <strong>
                        {item.item}
                      </strong>
                    </td>

                    <td>
                      {item.category}
                    </td>

                    <td>
                      {item.quantity}
                    </td>

                    <td>
                      {item.unit}
                    </td>

                    <td>
                      <strong>
                        {currency(item.value)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`report-status ${
                          item.status ===
                          "In Stock"
                            ? "success"
                            : "pending"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* ======================================
          COW REPORT
      ====================================== */}

      {reportType === "cows" && (
        <div className="report-panel">

          <div className="report-panel-header">

            <div>
              <h2>
                Cow Report
              </h2>

              <p>
                Cow health and production overview.
              </p>
            </div>

            <strong className="report-total">
              {summary.activeCows} Active
            </strong>

          </div>

          <div className="report-table-wrapper">

            <table className="report-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Breed</th>
                  <th>Age</th>
                  <th>Daily Milk</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredCows.map((item) => (
                  <tr key={item.id}>

                    <td>
                      <strong>
                        {item.id}
                      </strong>
                    </td>

                    <td>
                      🐄 {item.name}
                    </td>

                    <td>
                      {item.breed}
                    </td>

                    <td>
                      {item.age} years
                    </td>

                    <td>
                      <strong>
                        {item.milk} L
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`report-status ${
                          item.status ===
                          "Active"
                            ? "success"
                            : "inactive"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* ======================================
          EMPLOYEE REPORT
      ====================================== */}

      {reportType === "employees" && (
        <div className="report-panel">

          <div className="report-panel-header">

            <div>
              <h2>
                Employee Report
              </h2>

              <p>
                Employee attendance and salary
                information.
              </p>
            </div>

            <strong className="report-total">
              {summary.activeEmployees} Active
            </strong>

          </div>

          <div className="report-table-wrapper">

            <table className="report-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>Attendance</th>
                  <th>Salary</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredEmployees.map(
                  (item) => (
                    <tr key={item.id}>

                      <td>
                        <strong>
                          {item.id}
                        </strong>
                      </td>

                      <td>
                        {item.name}
                      </td>

                      <td>
                        {item.role}
                      </td>

                      <td>
                        <strong>
                          {item.attendance}%
                        </strong>
                      </td>

                      <td>
                        {currency(item.salary)}
                      </td>

                      <td>
                        <span className="report-status success">
                          {item.status}
                        </span>
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* ======================================
          CUSTOMER REPORT
      ====================================== */}

      {reportType === "customers" && (
        <div className="report-panel">

          <div className="report-panel-header">

            <div>
              <h2>
                Customer Report
              </h2>

              <p>
                Customer purchase and order
                summary.
              </p>
            </div>

            <strong className="report-total">
              {summary.customers} Customers
            </strong>

          </div>

          <div className="report-table-wrapper">

            <table className="report-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Orders</th>
                  <th>Total Purchases</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredCustomers.map(
                  (item) => (
                    <tr key={item.id}>

                      <td>
                        <strong>
                          {item.id}
                        </strong>
                      </td>

                      <td>
                        {item.name}
                      </td>

                      <td>
                        {item.phone}
                      </td>

                      <td>
                        {item.orders}
                      </td>

                      <td>
                        <strong>
                          {currency(
                            item.purchases
                          )}
                        </strong>
                      </td>

                      <td>
                        <span className="report-status success">
                          {item.status}
                        </span>
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
};

export default Reports;
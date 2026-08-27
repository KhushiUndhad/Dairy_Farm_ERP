import { useState } from "react";

import CustomerSidebar from "./CustomerSidebar";
import CustomerTopbar from "./CustomerTopbar";

import "./CustomerDashboard.css";

const CustomerDashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  const orders = [
    {
      id: "#ORD-1001",
      product: "Fresh Cow Milk",
      quantity: "2 Litres",
      amount: "₹120",
      date: "24 Aug 2026",
      status: "Delivered",
    },
    {
      id: "#ORD-1002",
      product: "Buffalo Milk",
      quantity: "1 Litre",
      amount: "₹75",
      date: "23 Aug 2026",
      status: "Out for Delivery",
    },
    {
      id: "#ORD-1003",
      product: "Fresh Curd",
      quantity: "2 Cups",
      amount: "₹80",
      date: "22 Aug 2026",
      status: "Processing",
    },
  ];


  const comingSoon = (name) => {
    alert(`${name} page coming soon.`);
  };


  return (
    <div
      className={`customer-dashboard ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >

      {/* SIDEBAR */}

      <CustomerSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />


      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="customer-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}


      {/* CONTENT */}

      <div className="customer-dashboard-content">

        {/* TOPBAR */}

        <CustomerTopbar
          onMenuClick={toggleSidebar}
        />


        {/* MAIN */}

        <main className="customer-main">


          {/* WELCOME */}

          <section className="customer-welcome-section">

            <div>

              <h1>
                Welcome back, John! 👋
              </h1>

              <p>
                Manage your dairy orders and
                subscriptions from your customer
                dashboard.
              </p>

            </div>


            <button
              type="button"
              className="customer-order-button"
              onClick={() => comingSoon("New Order")}
            >
              + Place New Order
            </button>

          </section>


          {/* STATISTICS */}

          <section className="customer-stats-grid">


            <div className="customer-stat-card">

              <div className="customer-stat-icon">
                📦
              </div>

              <div>
                <span>Total Orders</span>

                <h2>24</h2>

                <small>
                  +4 this month
                </small>
              </div>

            </div>


            <div className="customer-stat-card">

              <div className="customer-stat-icon">
                🥛
              </div>

              <div>
                <span>Milk Delivered</span>

                <h2>48 L</h2>

                <small>
                  This month
                </small>
              </div>

            </div>


            <div className="customer-stat-card">

              <div className="customer-stat-icon">
                💰
              </div>

              <div>
                <span>Total Spent</span>

                <h2>₹3,840</h2>

                <small>
                  This month
                </small>
              </div>

            </div>


            <div className="customer-stat-card">

              <div className="customer-stat-icon">
                🚚
              </div>

              <div>
                <span>Next Delivery</span>

                <h2>Tomorrow</h2>

                <small>
                  7:00 AM - 9:00 AM
                </small>
              </div>

            </div>

          </section>


          {/* QUICK ACTIONS */}

          <section className="customer-section">

            <div className="customer-section-header">

              <div>

                <h2>
                  Quick Actions
                </h2>

                <p>
                  Frequently used customer services
                </p>

              </div>

            </div>


            <div className="customer-quick-actions">


              <button
                type="button"
                className="customer-action-card"
                onClick={() => comingSoon("Products")}
              >

                <div className="action-icon">
                  🥛
                </div>

                <strong>
                  Browse Products
                </strong>

                <small>
                  View available dairy products
                </small>

              </button>


              <button
                type="button"
                className="customer-action-card"
                onClick={() => comingSoon("Orders")}
              >

                <div className="action-icon">
                  📦
                </div>

                <strong>
                  My Orders
                </strong>

                <small>
                  Track and manage your orders
                </small>

              </button>


              <button
                type="button"
                className="customer-action-card"
                onClick={() => comingSoon("Subscription")}
              >

                <div className="action-icon">
                  🔄
                </div>

                <strong>
                  Subscription
                </strong>

                <small>
                  Manage your milk subscription
                </small>

              </button>


              <button
                type="button"
                className="customer-action-card"
                onClick={() => comingSoon("Profile")}
              >

                <div className="action-icon">
                  👤
                </div>

                <strong>
                  My Profile
                </strong>

                <small>
                  Update your personal information
                </small>

              </button>

            </div>

          </section>


          {/* RECENT ORDERS */}

          <section className="customer-orders-section">

            <div className="customer-section-header">

              <div>

                <h2>
                  Recent Orders
                </h2>

                <p>
                  Your latest dairy orders
                </p>

              </div>


              <button
                type="button"
                className="view-all-button"
                onClick={() => comingSoon("All Orders")}
              >
                View All
              </button>

            </div>


            <div className="customer-orders-table-wrapper">

              <table className="customer-orders-table">

                <thead>

                  <tr>
                    <th>Order</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>

                </thead>


                <tbody>

                  {orders.map((order) => (

                    <tr key={order.id}>

                      <td>
                        <strong>
                          {order.id}
                        </strong>
                      </td>

                      <td>
                        {order.product}
                      </td>

                      <td>
                        {order.quantity}
                      </td>

                      <td>
                        {order.amount}
                      </td>

                      <td>
                        {order.date}
                      </td>

                      <td>

                        <span
                          className={`order-status ${order.status
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                        >
                          {order.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>


          {/* PROFILE + DELIVERY */}

          <div className="customer-bottom-grid">


            {/* PROFILE */}

            <section className="customer-profile-section">

              <div className="customer-section-header">

                <div>

                  <h2>
                    My Profile
                  </h2>

                  <p>
                    Account information
                  </p>

                </div>

              </div>


              <div className="customer-profile-card">

                <div className="customer-profile-avatar">
                  👤
                </div>

                <div className="customer-profile-info">

                  <strong>
                    John Customer
                  </strong>

                  <span>
                    john@example.com
                  </span>

                  <span>
                    +91 98765 43210
                  </span>

                  <span>
                    Ahmedabad, Gujarat
                  </span>

                </div>


                <button
                  type="button"
                  className="edit-profile-button"
                  onClick={() => comingSoon("Edit Profile")}
                >
                  Edit Profile
                </button>

              </div>

            </section>


            {/* DELIVERY */}

            <section className="customer-delivery-card">

              <div className="customer-delivery-icon">
                🚚
              </div>

              <div className="customer-delivery-content">

                <h2>
                  Next Milk Delivery
                </h2>

                <p>
                  Fresh Cow Milk - 2 Litres
                </p>

                <span>
                  Tomorrow • 7:00 AM - 9:00 AM
                </span>

              </div>

              <span className="customer-delivery-status">
                ● Scheduled
              </span>

            </section>

          </div>


        </main>


        {/* FOOTER */}

        <footer className="customer-footer">

          © 2026 Dairy Farm Management System

        </footer>

      </div>

    </div>
  );
};

export default CustomerDashboard;
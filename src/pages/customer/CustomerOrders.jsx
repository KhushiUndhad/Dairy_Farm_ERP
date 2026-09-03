import { useEffect, useState } from "react";
import {
  FaBox,
  FaTruck,
  FaClock,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaShoppingBag,
} from "react-icons/fa";

import { getCustomerOrders } from "../../api/customerApi";
import "./CustomerOrders.css";

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // LOAD CUSTOMER ORDERS
  // ======================================================

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCustomerOrders();

      const orderData =
        response?.orders ||
        response?.data?.orders ||
        [];

      setOrders(
        Array.isArray(orderData)
          ? orderData
          : []
      );

    } catch (error) {
      console.error(
        "Customer Orders Error:",
        error
      );

      // ==================================================
      // NO CUSTOMER / NO ORDERS
      // ==================================================
      //
      // Do not show "Customer account not found"
      // on the customer page.
      //
      // Show empty order state instead.
      //

      const message =
        error?.message || "";

      if (
        message
          .toLowerCase()
          .includes("customer account not found") ||
        message
          .toLowerCase()
          .includes("customer profile not found") ||
        message
          .toLowerCase()
          .includes("customer login account not found")
      ) {
        setOrders([]);
        setError("");
        return;
      }

      setOrders([]);

      setError(
        message ||
          "Unable to load orders"
      );

    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // FILTER ORDERS
  // ======================================================

  const filteredOrders = orders.filter(
    (order) => {
      if (activeFilter === "All") {
        return true;
      }

      const status =
        String(
          order.status || ""
        ).toLowerCase();

      if (
        activeFilter === "Processing"
      ) {
        return (
          status === "processing" ||
          status === "pending"
        );
      }

      if (
        activeFilter === "Out for Delivery"
      ) {
        return (
          status === "out for delivery" ||
          status === "out_for_delivery" ||
          status === "shipped"
        );
      }

      if (
        activeFilter === "Delivered"
      ) {
        return status === "delivered";
      }

      if (
        activeFilter === "Cancelled"
      ) {
        return (
          status === "cancelled" ||
          status === "canceled"
        );
      }

      return true;
    }
  );

  // ======================================================
  // ORDER STATISTICS
  // ======================================================

  const totalOrders = orders.length;

  const activeOrders = orders.filter(
    (order) => {
      const status =
        String(
          order.status || ""
        ).toLowerCase();

      return (
        status !== "delivered" &&
        status !== "cancelled" &&
        status !== "canceled"
      );
    }
  ).length;

  const processingOrders =
    orders.filter((order) => {
      const status =
        String(
          order.status || ""
        ).toLowerCase();

      return (
        status === "processing" ||
        status === "pending"
      );
    }).length;

  const totalSpent = orders.reduce(
    (total, order) => {
      const amount =
        Number(
          order.totalAmount ??
            order.total ??
            order.amount ??
            0
        );

      return total + amount;
    },
    0
  );

  // ======================================================
  // FORMAT CURRENCY
  // ======================================================

  const formatCurrency = (amount) => {
    return `₹${Number(
      amount || 0
    ).toLocaleString("en-IN")}`;
  };

  // ======================================================
  // FORMAT DATE
  // ======================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ======================================================
  // STATUS CLASS
  // ======================================================

  const getStatusClass = (
    status
  ) => {
    const value =
      String(
        status || "Processing"
      )
        .toLowerCase()
        .replace(/\s+/g, "-");

    if (
      value === "delivered"
    ) {
      return "status-delivered";
    }

    if (
      value === "cancelled" ||
      value === "canceled"
    ) {
      return "status-cancelled";
    }

    if (
      value === "out-for-delivery" ||
      value === "shipped"
    ) {
      return "status-delivery";
    }

    return "status-processing";
  };

  // ======================================================
  // DISPLAY STATUS
  // ======================================================

  const getDisplayStatus = (
    status
  ) => {
    if (!status) {
      return "Processing";
    }

    const value =
      String(status)
        .toLowerCase()
        .replace(/_/g, " ");

    return value
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  // ======================================================
  // FILTER BUTTONS
  // ======================================================

  const filters = [
    "All",
    "Processing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="customer-orders-page">
        <div className="customer-orders-loading">
          <div className="orders-spinner"></div>

          <h3>Loading Orders...</h3>

          <p>
            Please wait while we load
            your orders.
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="customer-orders-page">

      {/* ==================================================
          PAGE HEADER
          ================================================== */}

      <div className="customer-orders-header">

        <div>
          <h1>My Orders</h1>

          <p>
            Track and manage your
            dairy orders.
          </p>
        </div>

        <div className="orders-count-badge">
          {totalOrders} Orders
        </div>

      </div>

      {/* ==================================================
          REAL SERVER ERROR
          ================================================== */}

      {error && (
        <div className="customer-orders-error">
          <FaExclamationTriangle />

          <span>{error}</span>
        </div>
      )}

      {/* ==================================================
          STATISTICS
          ================================================== */}

      <div className="customer-orders-stats">

        {/* TOTAL ORDERS */}

        <div className="order-stat-card">

          <div className="order-stat-icon green">
            <FaBox />
          </div>

          <div>
            <span>Total Orders</span>

            <strong>
              {totalOrders}
            </strong>
          </div>

        </div>

        {/* ACTIVE ORDERS */}

        <div className="order-stat-card">

          <div className="order-stat-icon blue">
            <FaTruck />
          </div>

          <div>
            <span>Active Orders</span>

            <strong>
              {activeOrders}
            </strong>
          </div>

        </div>

        {/* PROCESSING */}

        <div className="order-stat-card">

          <div className="order-stat-icon yellow">
            <FaClock />
          </div>

          <div>
            <span>Processing</span>

            <strong>
              {processingOrders}
            </strong>
          </div>

        </div>

        {/* TOTAL SPENT */}

        <div className="order-stat-card">

          <div className="order-stat-icon purple">
            <FaMoneyBillWave />
          </div>

          <div>
            <span>Total Spent</span>

            <strong>
              {formatCurrency(
                totalSpent
              )}
            </strong>
          </div>

        </div>

      </div>

      {/* ==================================================
          ORDER HISTORY
          ================================================== */}

      <div className="customer-order-history">

        {/* HISTORY HEADER */}

        <div className="order-history-header">

          <div>
            <h2>Order History</h2>

            <p>
              View your recent and
              previous orders.
            </p>
          </div>

          <div className="history-count">
            {filteredOrders.length} Orders
          </div>

        </div>

        {/* ==================================================
            FILTER BUTTONS
            ================================================== */}

        <div className="order-filters">

          {filters.map(
            (filter) => (
              <button
                key={filter}
                type="button"
                className={
                  activeFilter ===
                  filter
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveFilter(
                    filter
                  )
                }
              >
                {filter}
              </button>
            )
          )}

        </div>

        {/* ==================================================
            DIVIDER
            ================================================== */}

        <div className="order-history-divider"></div>

        {/* ==================================================
            ORDERS
            ================================================== */}

        {filteredOrders.length === 0 ? (

          <div className="no-orders">

            <div className="no-orders-icon">
              <FaShoppingBag />
            </div>

            <h3>
              No Orders Found
            </h3>

            <p>
              {activeFilter ===
              "All"
                ? "There are no orders in your account."
                : `There are no ${activeFilter.toLowerCase()} orders.`}
            </p>

          </div>

        ) : (

          <div className="orders-list">

            {filteredOrders.map(
              (order, index) => {

                const orderId =
                  order._id ||
                  order.id ||
                  index + 1;

                const orderAmount =
                  order.totalAmount ??
                  order.total ??
                  order.amount ??
                  0;

                const orderDate =
                  order.createdAt ||
                  order.orderDate ||
                  order.date;

                const status =
                  order.status ||
                  "Processing";

                return (
                  <div
                    className="order-item"
                    key={orderId}
                  >

                    {/* ORDER ICON */}

                    <div className="order-item-icon">
                      <FaBox />
                    </div>

                    {/* ORDER DETAILS */}

                    <div className="order-item-details">

                      <div className="order-item-top">

                        <h3>
                          Order #
                          {String(
                            orderId
                          ).slice(-8)}
                        </h3>

                        <span
                          className={`order-status ${getStatusClass(
                            status
                          )}`}
                        >
                          {getDisplayStatus(
                            status
                          )}
                        </span>

                      </div>

                      <div className="order-item-info">

                        <span>
                          Date:{" "}
                          {formatDate(
                            orderDate
                          )}
                        </span>

                        {order.items &&
                          Array.isArray(
                            order.items
                          ) && (
                            <span>
                              Items:{" "}
                              {
                                order
                                  .items
                                  .length
                              }
                            </span>
                          )}

                      </div>

                    </div>

                    {/* ORDER AMOUNT */}

                    <div className="order-item-amount">

                      <span>
                        Total
                      </span>

                      <strong>
                        {formatCurrency(
                          orderAmount
                        )}
                      </strong>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default CustomerOrders;
import { useState } from "react";
import "./CustomerOrders.css";

const CustomerOrders = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const orders = [
    {
      id: "ORD-1001",
      date: "28 Aug 2026",
      product: "Fresh Cow Milk",
      quantity: "2 Litres",
      amount: 120,
      payment: "Paid",
      status: "Delivered",
      delivery: "28 Aug 2026",
      icon: "🥛",
    },
    {
      id: "ORD-1002",
      date: "27 Aug 2026",
      product: "Buffalo Milk",
      quantity: "1 Litre",
      amount: 75,
      payment: "Paid",
      status: "Out for Delivery",
      delivery: "29 Aug 2026",
      icon: "🥛",
    },
    {
      id: "ORD-1003",
      date: "26 Aug 2026",
      product: "Fresh Curd",
      quantity: "2 Cups",
      amount: 80,
      payment: "Paid",
      status: "Processing",
      delivery: "30 Aug 2026",
      icon: "🥣",
    },
    {
      id: "ORD-1004",
      date: "24 Aug 2026",
      product: "Paneer",
      quantity: "250 Gram",
      amount: 90,
      payment: "Paid",
      status: "Delivered",
      delivery: "24 Aug 2026",
      icon: "🧀",
    },
    {
      id: "ORD-1005",
      date: "22 Aug 2026",
      product: "Pure Ghee",
      quantity: "500 Gram",
      amount: 280,
      payment: "Paid",
      status: "Delivered",
      delivery: "22 Aug 2026",
      icon: "🫙",
    },
    {
      id: "ORD-1006",
      date: "20 Aug 2026",
      product: "Fresh Butter",
      quantity: "250 Gram",
      amount: 120,
      payment: "Pending",
      status: "Cancelled",
      delivery: "-",
      icon: "🧈",
    },
  ];

  const filters = [
    "All",
    "Processing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter(
          (order) => order.status === activeFilter
        );

  const handleViewDetails = (order) => {
    alert(
      `Order Details\n\nOrder ID: ${order.id}\nProduct: ${order.product}\nQuantity: ${order.quantity}\nAmount: ₹${order.amount}\nStatus: ${order.status}`
    );
  };

  const handleTrackOrder = (order) => {
    alert(
      `Tracking Order: ${order.id}\n\nCurrent Status: ${order.status}\nExpected Delivery: ${order.delivery}`
    );
  };

  const handleReorder = (order) => {
    alert(
      `${order.product} added to your new order.`
    );
  };

  return (
    <div className="customer-orders-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="customer-orders-header">

        <div>
          <h1>My Orders</h1>

          <p>
            Track and manage all your dairy orders.
          </p>
        </div>

        <button
          type="button"
          className="customer-new-order-button"
          onClick={() =>
            alert("New order page coming soon.")
          }
        >
          + Place New Order
        </button>

      </div>


      {/* =========================================
          ORDER SUMMARY
      ========================================= */}

      <div className="customer-order-summary">

        <div className="customer-order-summary-card">

          <div className="order-summary-icon green">
            📦
          </div>

          <div>
            <span>Total Orders</span>
            <strong>24</strong>
          </div>

        </div>


        <div className="customer-order-summary-card">

          <div className="order-summary-icon blue">
            🚚
          </div>

          <div>
            <span>Active Orders</span>
            <strong>2</strong>
          </div>

        </div>


        <div className="customer-order-summary-card">

          <div className="order-summary-icon orange">
            ⏳
          </div>

          <div>
            <span>Processing</span>
            <strong>1</strong>
          </div>

        </div>


        <div className="customer-order-summary-card">

          <div className="order-summary-icon purple">
            💰
          </div>

          <div>
            <span>Total Spent</span>
            <strong>₹3,840</strong>
          </div>

        </div>

      </div>


      {/* =========================================
          ORDERS CONTAINER
      ========================================= */}

      <div className="customer-orders-container">

        {/* HEADER */}

        <div className="customer-orders-container-header">

          <div>
            <h2>Order History</h2>

            <p>
              View your recent and previous orders.
            </p>
          </div>

          <div className="customer-orders-count">
            {filteredOrders.length} Orders
          </div>

        </div>


        {/* =========================================
            FILTERS
        ========================================= */}

        <div className="customer-order-filters">

          {filters.map((filter) => (

            <button
              key={filter}
              type="button"
              className={
                activeFilter === filter
                  ? "order-filter active"
                  : "order-filter"
              }
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>

          ))}

        </div>


        {/* =========================================
            ORDER LIST
        ========================================= */}

        <div className="customer-order-list">

          {filteredOrders.length === 0 ? (

            <div className="customer-no-orders">

              <div>
                📦
              </div>

              <h3>
                No Orders Found
              </h3>

              <p>
                You don't have any orders in this category.
              </p>

            </div>

          ) : (

            filteredOrders.map((order) => (

              <div
                className="customer-order-card"
                key={order.id}
              >

                {/* PRODUCT ICON */}

                <div className="customer-order-product-icon">
                  {order.icon}
                </div>


                {/* ORDER INFORMATION */}

                <div className="customer-order-main">

                  <div className="customer-order-title-row">

                    <div>

                      <h3>
                        {order.product}
                      </h3>

                      <span className="customer-order-id">
                        #{order.id}
                      </span>

                    </div>

                    <span
                      className={`customer-order-status ${order.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {order.status}
                    </span>

                  </div>


                  <div className="customer-order-details">

                    <div>
                      <span>Order Date</span>
                      <strong>{order.date}</strong>
                    </div>

                    <div>
                      <span>Quantity</span>
                      <strong>{order.quantity}</strong>
                    </div>

                    <div>
                      <span>Amount</span>
                      <strong>₹{order.amount}</strong>
                    </div>

                    <div>
                      <span>Payment</span>

                      <strong
                        className={
                          order.payment === "Paid"
                            ? "payment-paid"
                            : "payment-pending"
                        }
                      >
                        {order.payment}
                      </strong>
                    </div>

                  </div>


                  {/* DELIVERY */}

                  {order.status !== "Cancelled" && (

                    <div className="customer-order-delivery">

                      <span>
                        🚚
                      </span>

                      <div>
                        <small>
                          Expected Delivery
                        </small>

                        <strong>
                          {order.delivery}
                        </strong>
                      </div>

                    </div>

                  )}


                  {/* ACTIONS */}

                  <div className="customer-order-actions">

                    <button
                      type="button"
                      className="order-details-button"
                      onClick={() =>
                        handleViewDetails(order)
                      }
                    >
                      View Details
                    </button>


                    {(
                      order.status ===
                        "Processing" ||
                      order.status ===
                        "Out for Delivery"
                    ) && (

                      <button
                        type="button"
                        className="order-track-button"
                        onClick={() =>
                          handleTrackOrder(order)
                        }
                      >
                        🚚 Track Order
                      </button>

                    )}


                    {order.status === "Delivered" && (

                      <button
                        type="button"
                        className="order-reorder-button"
                        onClick={() =>
                          handleReorder(order)
                        }
                      >
                        🔄 Reorder
                      </button>

                    )}

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
};

export default CustomerOrders;
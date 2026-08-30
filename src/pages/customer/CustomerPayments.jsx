import { useState } from "react";
import "./CustomerPayments.css";

const CustomerPayments = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const payments = [
    {
      id: "PAY-1001",
      orderId: "ORD-1001",
      date: "28 Aug 2026",
      amount: 120,
      method: "UPI",
      status: "Successful",
      transactionId: "TXN839201",
    },
    {
      id: "PAY-1002",
      orderId: "ORD-1002",
      date: "27 Aug 2026",
      amount: 75,
      method: "Credit Card",
      status: "Successful",
      transactionId: "TXN839202",
    },
    {
      id: "PAY-1003",
      orderId: "ORD-1003",
      date: "26 Aug 2026",
      amount: 80,
      method: "Cash on Delivery",
      status: "Pending",
      transactionId: "-",
    },
    {
      id: "PAY-1004",
      orderId: "ORD-1004",
      date: "24 Aug 2026",
      amount: 90,
      method: "UPI",
      status: "Successful",
      transactionId: "TXN839204",
    },
    {
      id: "PAY-1005",
      orderId: "ORD-1005",
      date: "22 Aug 2026",
      amount: 280,
      method: "Debit Card",
      status: "Successful",
      transactionId: "TXN839205",
    },
    {
      id: "PAY-1006",
      orderId: "ORD-1006",
      date: "20 Aug 2026",
      amount: 120,
      method: "UPI",
      status: "Failed",
      transactionId: "-",
    },
  ];

  const filters = [
    "All",
    "Successful",
    "Pending",
    "Failed",
  ];

  const filteredPayments =
    activeFilter === "All"
      ? payments
      : payments.filter(
          (payment) => payment.status === activeFilter
        );

  const totalPaid = payments
    .filter((payment) => payment.status === "Successful")
    .reduce((total, payment) => total + payment.amount, 0);

  const pendingAmount = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((total, payment) => total + payment.amount, 0);

  const handleViewDetails = (payment) => {
    alert(
      `Payment Details\n\nPayment ID: ${payment.id}\nOrder ID: ${payment.orderId}\nAmount: ₹${payment.amount}\nMethod: ${payment.method}\nStatus: ${payment.status}\nTransaction ID: ${payment.transactionId}`
    );
  };

  const handlePayNow = (payment) => {
    alert(
      `Proceeding with payment of ₹${payment.amount} for ${payment.orderId}.`
    );
  };

  const handleDownloadReceipt = (payment) => {
    alert(
      `Receipt for ${payment.id} is ready to download.`
    );
  };

  return (
    <div className="customer-payments-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="customer-payments-header">

        <div>
          <h1>Payments</h1>

          <p>
            View and manage your payment transactions.
          </p>
        </div>

        <div className="customer-payment-wallet">
          <span>💳</span>

          <div>
            <small>Payment History</small>
            <strong>{payments.length} Transactions</strong>
          </div>
        </div>

      </div>


      {/* =========================================
          SUMMARY
      ========================================= */}

      <div className="customer-payment-summary">

        <div className="customer-payment-summary-card">

          <div className="payment-summary-icon green">
            💰
          </div>

          <div>
            <span>Total Paid</span>
            <strong>₹{totalPaid}</strong>
          </div>

        </div>


        <div className="customer-payment-summary-card">

          <div className="payment-summary-icon blue">
            ✅
          </div>

          <div>
            <span>Successful</span>
            <strong>
              {
                payments.filter(
                  (payment) =>
                    payment.status === "Successful"
                ).length
              }
            </strong>
          </div>

        </div>


        <div className="customer-payment-summary-card">

          <div className="payment-summary-icon orange">
            ⏳
          </div>

          <div>
            <span>Pending Amount</span>
            <strong>₹{pendingAmount}</strong>
          </div>

        </div>


        <div className="customer-payment-summary-card">

          <div className="payment-summary-icon red">
            ❌
          </div>

          <div>
            <span>Failed</span>
            <strong>
              {
                payments.filter(
                  (payment) =>
                    payment.status === "Failed"
                ).length
              }
            </strong>
          </div>

        </div>

      </div>


      {/* =========================================
          PAYMENT HISTORY
      ========================================= */}

      <div className="customer-payment-container">

        <div className="customer-payment-container-header">

          <div>
            <h2>Payment History</h2>

            <p>
              Your recent payment transactions.
            </p>
          </div>

          <div className="customer-payment-count">
            {filteredPayments.length} Payments
          </div>

        </div>


        {/* =========================================
            FILTERS
        ========================================= */}

        <div className="customer-payment-filters">

          {filters.map((filter) => (

            <button
              key={filter}
              type="button"
              className={
                activeFilter === filter
                  ? "payment-filter active"
                  : "payment-filter"
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
            PAYMENT TABLE
        ========================================= */}

        <div className="customer-payment-table-wrapper">

          <table className="customer-payment-table">

            <thead>

              <tr>
                <th>Payment</th>
                <th>Order</th>
                <th>Date</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {filteredPayments.map((payment) => (

                <tr key={payment.id}>

                  {/* PAYMENT */}

                  <td>

                    <div className="payment-id">

                      <div className="payment-method-icon">
                        💳
                      </div>

                      <div>
                        <strong>
                          {payment.id}
                        </strong>

                        <span>
                          {payment.transactionId}
                        </span>
                      </div>

                    </div>

                  </td>


                  {/* ORDER */}

                  <td>
                    <span className="payment-order-id">
                      {payment.orderId}
                    </span>
                  </td>


                  {/* DATE */}

                  <td>
                    <span className="payment-date">
                      {payment.date}
                    </span>
                  </td>


                  {/* METHOD */}

                  <td>
                    <span className="payment-method">
                      {payment.method}
                    </span>
                  </td>


                  {/* AMOUNT */}

                  <td>
                    <strong className="payment-amount">
                      ₹{payment.amount}
                    </strong>
                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={`payment-status ${payment.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {payment.status}
                    </span>

                  </td>


                  {/* ACTION */}

                  <td>

                    <div className="payment-actions">

                      <button
                        type="button"
                        className="payment-view-button"
                        onClick={() =>
                          handleViewDetails(payment)
                        }
                      >
                        View
                      </button>


                      {payment.status === "Pending" && (

                        <button
                          type="button"
                          className="payment-pay-button"
                          onClick={() =>
                            handlePayNow(payment)
                          }
                        >
                          Pay Now
                        </button>

                      )}


                      {payment.status === "Successful" && (

                        <button
                          type="button"
                          className="payment-receipt-button"
                          onClick={() =>
                            handleDownloadReceipt(payment)
                          }
                        >
                          Receipt
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* =========================================
            EMPTY STATE
        ========================================= */}

        {filteredPayments.length === 0 && (

          <div className="customer-no-payments">

            <div>
              💳
            </div>

            <h3>
              No Payments Found
            </h3>

            <p>
              There are no payment transactions in this category.
            </p>

          </div>

        )}

      </div>


      {/* =========================================
          PAYMENT SECURITY
      ========================================= */}

      <div className="customer-payment-security">

        <div className="payment-security-icon">
          🔒
        </div>

        <div>

          <h3>
            Secure Payments
          </h3>

          <p>
            Your payment information is protected and
            securely processed. We never store your complete
            card details.
          </p>

        </div>

      </div>

    </div>
  );
};

export default CustomerPayments;
import {
  useEffect,
  useState,
} from "react";

import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaCreditCard,
  FaEye,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  getCustomerPayments,
} from "../../api/customerApi";

import "./CustomerPayments.css";

const CustomerPayments = () => {
  const [payments, setPayments] =
    useState([]);

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data =
          await getCustomerPayments();

        setPayments(
          data.payments ||
          data ||
          []
        );
      } catch (err) {
        console.error(
          "Payments Error:",
          err
        );

        setError(
          err.message ||
            "Unable to load payments."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  if (loading) {
    return (
      <div className="customer-payments-page">
        <h2>
          Loading payments...
        </h2>
      </div>
    );
  }

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
          (payment) =>
            payment.status ===
            activeFilter
        );

  const totalPaid =
    payments
      .filter(
        (payment) =>
          payment.status ===
          "Successful"
      )
      .reduce(
        (total, payment) =>
          total +
          Number(
            payment.amount || 0
          ),
        0
      );

  const pendingAmount =
    payments
      .filter(
        (payment) =>
          payment.status ===
          "Pending"
      )
      .reduce(
        (total, payment) =>
          total +
          Number(
            payment.amount || 0
          ),
        0
      );

  const successful =
    payments.filter(
      (payment) =>
        payment.status ===
        "Successful"
    ).length;

  const failed =
    payments.filter(
      (payment) =>
        payment.status ===
        "Failed"
    ).length;

  const viewDetails = (
    payment
  ) => {
    alert(
      `Payment Details\n\n` +
      `Payment ID: ${
        payment.paymentId ||
        payment._id ||
        "-"
      }\n` +
      `Order ID: ${
        payment.orderId ||
        "-"
      }\n` +
      `Amount: ₹${
        payment.amount ||
        0
      }\n` +
      `Method: ${
        payment.method ||
        payment.paymentMethod ||
        "-"
      }\n` +
      `Status: ${
        payment.status ||
        "-"
      }`
    );
  };

  return (
    <div className="customer-payments-page">

      {/* HEADER */}

      <div className="customer-payments-header">

        <div>
          <h1>
            Payments
          </h1>

          <p>
            View your payment transactions.
          </p>
        </div>

        <div className="customer-payment-wallet">

          <FaCreditCard />

          <div>
            <small>
              Payment History
            </small>

            <strong>
              {payments.length} Transactions
            </strong>
          </div>

        </div>

      </div>

      {/* ERROR */}

      {error && (
        <div className="customer-login-error">
          <FaExclamationTriangle />
          {error}
        </div>
      )}

      {/* SUMMARY */}

      <div className="customer-payment-summary">

        <div className="customer-payment-summary-card">

          <div className="payment-summary-icon green">
            <FaMoneyBillWave />
          </div>

          <div>
            <span>
              Total Paid
            </span>

            <strong>
              ₹{totalPaid}
            </strong>
          </div>

        </div>

        <div className="customer-payment-summary-card">

          <div className="payment-summary-icon blue">
            <FaCheckCircle />
          </div>

          <div>
            <span>
              Successful
            </span>

            <strong>
              {successful}
            </strong>
          </div>

        </div>

        <div className="customer-payment-summary-card">

          <div className="payment-summary-icon orange">
            <FaClock />
          </div>

          <div>
            <span>
              Pending Amount
            </span>

            <strong>
              ₹{pendingAmount}
            </strong>
          </div>

        </div>

        <div className="customer-payment-summary-card">

          <div className="payment-summary-icon red">
            <FaTimesCircle />
          </div>

          <div>
            <span>
              Failed
            </span>

            <strong>
              {failed}
            </strong>
          </div>

        </div>

      </div>

      {/* HISTORY */}

      <div className="customer-payment-container">

        <div className="customer-payment-container-header">

          <div>
            <h2>
              Payment History
            </h2>

            <p>
              Your recent payment transactions.
            </p>
          </div>

          <div className="customer-payment-count">
            {filteredPayments.length} Payments
          </div>

        </div>

        {/* FILTERS */}

        <div className="customer-payment-filters">

          {filters.map(
            (filter) => (
              <button
                key={filter}
                type="button"
                className={
                  activeFilter ===
                  filter
                    ? "payment-filter active"
                    : "payment-filter"
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

        {/* TABLE */}

        <div className="customer-payment-table-wrapper">

          <table className="customer-payment-table">

            <thead>
              <tr>

                <th>
                  Payment
                </th>

                <th>
                  Order
                </th>

                <th>
                  Date
                </th>

                <th>
                  Method
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredPayments.length ===
              0 ? (

                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign:
                        "center",
                      padding:
                        "30px",
                    }}
                  >
                    No payments found.
                  </td>
                </tr>

              ) : (

                filteredPayments.map(
                  (
                    payment,
                    index
                  ) => {

                    const paymentId =
                      payment.paymentId ||
                      payment._id ||
                      `PAY-${index + 1}`;

                    const status =
                      payment.status ||
                      "-";

                    return (
                      <tr
                        key={
                          paymentId
                        }
                      >

                        <td>

                          <div className="payment-id">

                            <div className="payment-method-icon">
                              <FaCreditCard />
                            </div>

                            <div>
                              <strong>
                                {paymentId}
                              </strong>

                              <span>
                                {payment.transactionId ||
                                  "-"}
                              </span>
                            </div>

                          </div>

                        </td>

                        <td>
                          <span className="payment-order-id">
                            {payment.orderId ||
                              "-"}
                          </span>
                        </td>

                        <td>
                          <span className="payment-date">
                            {payment.date ||
                              payment.paymentDate ||
                              "-"}
                          </span>
                        </td>

                        <td>
                          <span className="payment-method">
                            {payment.method ||
                              payment.paymentMethod ||
                              "-"}
                          </span>
                        </td>

                        <td>
                          <strong className="payment-amount">
                            ₹
                            {payment.amount ||
                              0}
                          </strong>
                        </td>

                        <td>
                          <span
                            className={`payment-status ${status
                              .toLowerCase()
                              .replaceAll(
                                " ",
                                "-"
                              )}`}
                          >
                            {status}
                          </span>
                        </td>

                        <td>

                          <button
                            type="button"
                            className="payment-view-button"
                            onClick={() =>
                              viewDetails(
                                payment
                              )
                            }
                          >
                            <FaEye />
                            View
                          </button>

                        </td>

                      </tr>
                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default CustomerPayments;
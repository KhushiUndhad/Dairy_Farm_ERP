const Customer =
  require("../models/Customer");

const Sale =
  require("../models/Sale");

const Payment =
  require("../models/Payment");

const Order =
  require("../models/Order");

const getCustomerDashboard = async (
  req,
  res
) => {
  try {
    const customer =
      await Customer.findOne({
        customerId:
          req.customerUser.customerId,
      });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message:
          "Customer profile not found",
      });
    }

    const sales =
      await Sale.find({
        $or: [
          {
            customer:
              customer.email,
          },
          {
            customer:
              customer.name,
          },
        ],
      });

    const payments =
      await Payment.find({
        $or: [
          {
            customer:
              customer.email,
          },
          {
            customer:
              customer.name,
          },
        ],
      });

    const orders =
      await Order.find({
        $or: [
          {
            customer:
              customer.email,
          },
          {
            customer:
              customer.name,
          },
        ],
      });

    const totalSalesAmount =
      sales.reduce(
        (sum, sale) =>
          sum +
          Number(
            sale.total ||
            sale.amount ||
            0
          ),
        0
      );

    const totalPaidAmount =
      payments.reduce(
        (sum, payment) =>
          sum +
          Number(
            payment.amount ||
            payment.paid ||
            0
          ),
        0
      );

    return res.status(200).json({
      success: true,

      customer: {
        customerId:
          customer.customerId,
        name:
          customer.name,
        email:
          customer.email,
        phone:
          customer.phone,
        balance:
          customer.balance,
      },

      statistics: {
        totalSales:
          sales.length,

        totalOrders:
          orders.length,

        totalPayments:
          payments.length,

        totalSalesAmount,

        totalPaidAmount,

        outstandingBalance:
          Math.max(
            0,
            totalSalesAmount -
              totalPaidAmount
          ),
      },
    });
  } catch (error) {
    console.error(
      "Customer Dashboard Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load customer dashboard",
      error: error.message,
    });
  }
};

module.exports = {
  getCustomerDashboard,
};
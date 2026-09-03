const Customer =
  require("../models/Customer");

const Payment =
  require("../models/Payment");

const getCustomerPayments = async (
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
      }).sort({
        paymentDate: -1,
        date: -1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error(
      "Customer Payments Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load customer payments",
      error: error.message,
    });
  }
};

module.exports = {
  getCustomerPayments,
};
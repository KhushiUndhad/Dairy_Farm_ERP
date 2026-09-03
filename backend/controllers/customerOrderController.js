const Customer =
  require("../models/Customer");

const Order =
  require("../models/Order");

const getCustomerOrders = async (
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
      }).sort({
        date: -1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(
      "Customer Orders Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load customer orders",
      error: error.message,
    });
  }
};

module.exports = {
  getCustomerOrders,
};
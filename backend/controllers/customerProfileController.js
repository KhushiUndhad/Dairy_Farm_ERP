const Customer =
  require("../models/Customer");

const CustomerPortalUser =
  require("../models/CustomerPortalUser");

// ==========================================
// GET PROFILE
// ==========================================

const getCustomerProfile = async (
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

    return res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    console.error(
      "Get Customer Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load customer profile",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE PROFILE
// ==========================================

const updateCustomerProfile = async (
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

    const {
      name,
      phone,
      address,
      city,
      state,
      pincode,
      customerType,
    } = req.body;

    if (name !== undefined)
      customer.name = name;

    if (phone !== undefined)
      customer.phone = phone;

    if (address !== undefined)
      customer.address = address;

    if (city !== undefined)
      customer.city = city;

    if (state !== undefined)
      customer.state = state;

    if (pincode !== undefined)
      customer.pincode = pincode;

    if (customerType !== undefined)
      customer.customerType =
        customerType;

    await customer.save();

    // ======================================
    // UPDATE USER DATABASE
    // ======================================

    await CustomerPortalUser.findOneAndUpdate(
      {
        customerId:
          customer.customerId,
      },
      {
        name:
          customer.name,
        phone:
          customer.phone,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Customer profile updated successfully",
      customer,
    });
  } catch (error) {
    console.error(
      "Update Customer Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update customer profile",
      error: error.message,
    });
  }
};

module.exports = {
  getCustomerProfile,
  updateCustomerProfile,
};
const express = require("express");

const Cow = require("../models/Cow");
const MilkProduction = require("../models/MilkProduction");
const Employee = require("../models/Employee");
const Customer = require("../models/Customer");
const Sale = require("../models/Sale");

const router = express.Router();

// ========================================
// DASHBOARD SUMMARY
// ========================================

router.get("/summary", async (req, res) => {
  try {
    // Total records
    const totalCows = await Cow.countDocuments();

    const totalEmployees = await Employee.countDocuments();

    const totalCustomers = await Customer.countDocuments();

    const totalSalesRecords = await Sale.countDocuments();

    // ========================================
    // TOTAL MILK PRODUCTION
    // ========================================

    const milkResult = await MilkProduction.aggregate([
      {
        $group: {
          _id: null,
          totalMilk: {
            $sum: {
              $add: [
                { $ifNull: ["$morning", 0] },
                { $ifNull: ["$evening", 0] },
              ],
            },
          },
        },
      },
    ]);

    const totalMilkProduction =
      milkResult.length > 0
        ? milkResult[0].totalMilk
        : 0;

    // ========================================
    // TOTAL SALES AMOUNT
    // ========================================

    const salesResult = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: {
              $ifNull: ["$total", 0],
            },
          },
        },
      },
    ]);

    const totalSalesAmount =
      salesResult.length > 0
        ? salesResult[0].totalSales
        : 0;

    // ========================================
    // RESPONSE
    // ========================================

    res.json({
      success: true,

      data: {
        totalCows,
        totalMilkProduction,
        totalEmployees,
        totalCustomers,
        totalSalesRecords,
        totalSalesAmount,
      },
    });
  } catch (error) {
    console.error(
      "Dashboard Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
      error: error.message,
    });
  }
});

module.exports = router;
const express = require("express");

const router = express.Router();

const Cow = require("../models/Cow");
const MilkProduction = require("../models/MilkProduction");
const Employee = require("../models/Employee");
const Customer = require("../models/Customer");
const Sale = require("../models/Sale");

// ========================================
// REPORTS OVERVIEW
// ========================================

router.get("/overview", async (req, res) => {
  try {
    // ========================================
    // GET DATA FROM DATABASE
    // ========================================

    const cows = await Cow.find();

    const milkProduction =
      await MilkProduction.find();

    const employees =
      await Employee.find();

    const customers =
      await Customer.find();

    const sales =
      await Sale.find();

    // ========================================
    // COW REPORT
    // ========================================

    const totalCows = cows.length;

    // ========================================
    // MILK REPORT
    // ========================================

    let totalMilk = 0;
    let morningMilk = 0;
    let eveningMilk = 0;

    milkProduction.forEach((item) => {
      const morning = Number(item.morning || 0);
      const evening = Number(item.evening || 0);

      morningMilk += morning;
      eveningMilk += evening;
    });

    totalMilk = morningMilk + eveningMilk;

    // ========================================
    // EMPLOYEE REPORT
    // ========================================

    const totalEmployees = employees.length;

    const activeEmployees =
      employees.filter(
        (employee) =>
          String(employee.status || "")
            .toLowerCase() === "active"
      ).length;

    // ========================================
    // CUSTOMER REPORT
    // ========================================

    const totalCustomers = customers.length;

    // ========================================
    // SALES REPORT
    // ========================================

    let totalSales = 0;
    let totalPaid = 0;
    let totalPending = 0;
    let totalLitresSold = 0;

    sales.forEach((sale) => {
      const total = Number(sale.total || 0);
      const paid = Number(sale.paid || 0);
      const quantity = Number(
        sale.quantity || 0
      );

      totalSales += total;
      totalPaid += paid;
      totalPending += Math.max(
        total - paid,
        0
      );

      totalLitresSold += quantity;
    });

    // ========================================
    // DATE-WISE SALES
    // ========================================

    const salesByDate = {};

    sales.forEach((sale) => {
      const date = sale.date || "Unknown";

      if (!salesByDate[date]) {
        salesByDate[date] = {
          date: date,
          totalSales: 0,
          totalPaid: 0,
          totalPending: 0,
          litresSold: 0,
        };
      }

      salesByDate[date].totalSales +=
        Number(sale.total || 0);

      salesByDate[date].totalPaid +=
        Number(sale.paid || 0);

      salesByDate[date].totalPending +=
        Math.max(
          Number(sale.total || 0) -
            Number(sale.paid || 0),
          0
        );

      salesByDate[date].litresSold +=
        Number(sale.quantity || 0);
    });

    const dateWiseSales =
      Object.values(salesByDate).sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      );

    // ========================================
    // PAYMENT STATUS
    // ========================================

    const paidSales = sales.filter(
      (sale) =>
        String(sale.paymentStatus || "")
          .toLowerCase() === "paid"
    ).length;

    const partialSales = sales.filter(
      (sale) =>
        String(sale.paymentStatus || "")
          .toLowerCase() === "partial"
    ).length;

    const pendingSales = sales.filter(
      (sale) =>
        String(sale.paymentStatus || "")
          .toLowerCase() === "pending"
    ).length;

    // ========================================
    // FINAL RESPONSE
    // ========================================

    res.status(200).json({
      success: true,

      cows: {
        total: totalCows,
      },

      milkProduction: {
        total: totalMilk,
        morning: morningMilk,
        evening: eveningMilk,
      },

      employees: {
        total: totalEmployees,
        active: activeEmployees,
      },

      customers: {
        total: totalCustomers,
      },

      sales: {
        totalSales: totalSales,
        totalPaid: totalPaid,
        totalPending: totalPending,
        totalLitresSold: totalLitresSold,
        totalInvoices: sales.length,
        paidInvoices: paidSales,
        partialInvoices: partialSales,
        pendingInvoices: pendingSales,
      },

      dateWiseSales: dateWiseSales,
    });
  } catch (error) {
    console.error(
      "REPORTS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load reports",
      error: error.message,
    });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();

const Leave = require("../models/Leave");

/* ========================================
   GET ALL LEAVES
======================================== */

router.get("/", async (req, res) => {
  try {
    const leaves = await Leave.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    console.error("GET LEAVES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch leave records.",
      error: error.message,
    });
  }
});

/* ========================================
   GET SINGLE LEAVE
======================================== */

router.get("/:id", async (req, res) => {
  try {
    const leave = await Leave.findById(
      req.params.id
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave record not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: leave,
    });
  } catch (error) {
    console.error(
      "GET SINGLE LEAVE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch leave record.",
      error: error.message,
    });
  }
});

/* ========================================
   ADD LEAVE
======================================== */

router.post("/", async (req, res) => {
  try {
    const {
      employeeId,
      employeeName,
      employeeEmail,
      type,
      from,
      to,
      days,
      reason,
      status,
    } = req.body;

    /* ------------------------------------
       VALIDATION
    ------------------------------------ */

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Leave type is required.",
      });
    }

    if (!from) {
      return res.status(400).json({
        success: false,
        message: "From date is required.",
      });
    }

    if (!to) {
      return res.status(400).json({
        success: false,
        message: "To date is required.",
      });
    }

    if (!reason || !reason.trim()) {
      return res.status(400).json({
        success: false,
        message: "Leave reason is required.",
      });
    }

    /* ------------------------------------
       DATE VALIDATION
    ------------------------------------ */

    const startDate = new Date(from);
    const endDate = new Date(to);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid leave dates.",
      });
    }

    if (endDate < startDate) {
      return res.status(400).json({
        success: false,
        message:
          "To date cannot be before From date.",
      });
    }

    /* ------------------------------------
       CALCULATE DAYS
    ------------------------------------ */

    const calculatedDays =
      Math.floor(
        (endDate.getTime() -
          startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    /* ------------------------------------
       CREATE LEAVE
    ------------------------------------ */

    const leave = await Leave.create({
      employeeId:
        employeeId || "",

      employeeName:
        employeeName || "",

      employeeEmail:
        employeeEmail || "",

      type,

      from,

      to,

      days:
        calculatedDays,

      reason:
        reason.trim(),

      status:
        status || "Pending",
    });

    /* ------------------------------------
       RESPONSE
    ------------------------------------ */

    res.status(201).json({
      success: true,
      message:
        "Leave application submitted successfully.",
      data: leave,
    });
  } catch (error) {
    console.error(
      "ADD LEAVE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to submit leave application.",
      error: error.message,
    });
  }
});

/* ========================================
   UPDATE LEAVE
======================================== */

router.put("/:id", async (req, res) => {
  try {
    const {
      type,
      from,
      to,
      reason,
      status,
    } = req.body;

    const updateData = {};

    if (type !== undefined) {
      updateData.type = type;
    }

    if (from !== undefined) {
      updateData.from = from;
    }

    if (to !== undefined) {
      updateData.to = to;
    }

    if (reason !== undefined) {
      updateData.reason =
        String(reason).trim();
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    /* ------------------------------------
       RECALCULATE DAYS
    ------------------------------------ */

    const finalFrom =
      from !== undefined
        ? from
        : undefined;

    const finalTo =
      to !== undefined
        ? to
        : undefined;

    if (finalFrom && finalTo) {
      const startDate =
        new Date(finalFrom);

      const endDate =
        new Date(finalTo);

      if (
        Number.isNaN(
          startDate.getTime()
        ) ||
        Number.isNaN(
          endDate.getTime()
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid leave dates.",
        });
      }

      if (endDate < startDate) {
        return res.status(400).json({
          success: false,
          message:
            "To date cannot be before From date.",
        });
      }

      updateData.days =
        Math.floor(
          (endDate.getTime() -
            startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;
    }

    const leave =
      await Leave.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message:
          "Leave record not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Leave updated successfully.",
      data: leave,
    });
  } catch (error) {
    console.error(
      "UPDATE LEAVE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to update leave.",
      error: error.message,
    });
  }
});

/* ========================================
   DELETE LEAVE
======================================== */

router.delete("/:id", async (req, res) => {
  try {
    const leave =
      await Leave.findByIdAndDelete(
        req.params.id
      );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message:
          "Leave record not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Leave deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE LEAVE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to delete leave.",
      error: error.message,
    });
  }
});

module.exports = router;
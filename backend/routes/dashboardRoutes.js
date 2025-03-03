const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { Op, Sequelize } = require("sequelize"); // Import Sequelize functions

router.get("/", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    // Get total counts
    const usersCount = await User.count();
    const jobPostsCount = await Job.count();
    const applicationsCount = await Application.count();

    // Get user growth (last 6 months)
    const userGrowth = await User.findAll({
        attributes: [
          [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("created_at")), "month"], // Use created_at
          [Sequelize.fn("COUNT", "*"), "count"],
        ],
        where: {
          created_at: {
            [Op.ne]: null, // Ensure created_at exists
          },
        },
        group: ["month"],
        order: [[Sequelize.literal("month"), "ASC"]],
        raw: true,
      });
      

    // Get application growth stats
    const applicationsStats = await Application.findAll({
        attributes: [
          [Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("created_at")), "month"], // Use created_at
          [Sequelize.fn("COUNT", "*"), "count"],
        ],
        where: {
          created_at: {
            [Op.ne]: null,
          },
        },
        group: ["month"],
        order: [[Sequelize.literal("month"), "ASC"]],
        raw: true,
      });
      

    // Format response
    res.json({
      usersCount,
      jobPostsCount,
      applicationsCount,
      userGrowth: {
        labels: userGrowth.map((d) => `Month ${new Date(d.month).getMonth() + 1}`),
        values: userGrowth.map((d) => d.count),
      },
      applicationStats: {
        labels: applicationsStats.map((d) => `Month ${new Date(d.month).getMonth() + 1}`),
        values: applicationsStats.map((d) => d.count),
      },
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
  }
});

module.exports = router;

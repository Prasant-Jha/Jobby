const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// ✅ Public Routes (Anyone can view jobs)
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// ✅ Protected Routes (Only Employers & Admins can manage jobs)
router.post("/", authMiddleware, roleMiddleware(["employer"]), upload.single("image"), createJob);
router.put("/:id", authMiddleware, roleMiddleware(["employer"]), upload.single("image"), updateJob);
router.delete("/:id", authMiddleware, roleMiddleware(["employer", "admin"]), deleteJob);

module.exports = router;

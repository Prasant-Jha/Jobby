const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  applyForJob,
  getApplicationsByUser,
  getApplicationsByEmployer,
  getAllApplications,
  updateApplicationStatus,
} = require("../controllers/appController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: "./uploads/resumes",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF and Word documents are allowed."), false);
    }
  },
});

// ✅ Job Seeker can apply for jobs with file upload
router.post("/", authMiddleware, roleMiddleware(["job_seeker"]), upload.single("resume"), applyForJob);

// ✅ Admin can view all applications (This must come before `/:userId` to avoid conflicts)
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllApplications);

// ✅ Employer can view applications for their jobs
router.get("/employer/:email", authMiddleware, roleMiddleware(["employer"]), getApplicationsByEmployer);

// ✅ Job Seeker can view their own applications (Move below `applications` route)
router.get("/:userId", authMiddleware, roleMiddleware(["job_seeker"]), getApplicationsByUser);

// ✅ Employer & Admin can update application status
router.put("/:id", authMiddleware, roleMiddleware(["employer"]), updateApplicationStatus);

module.exports = router;

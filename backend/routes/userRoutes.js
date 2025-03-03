const express = require("express");
const multer = require("multer");
const path = require("path");

const User = require("../models/User");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// ✅ Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Store files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter (allow images only)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

// ✅ Public Routes (Anyone can access)
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/request-otp", userController.requestOTP);
router.post("/verify-otp", userController.verifyOTP);
router.post("/reset-password", userController.resetPassword);

// ✅ Protected Routes (Require Authentication)
router.get("/", authMiddleware, roleMiddleware(["admin"]), userController.getAllUsers); // Admins can access all users
router.get("/:id", authMiddleware, userController.getUserById); // Any logged-in user can view their profile

// ✅ Update User Profile with File Upload
router.put("/:id", authMiddleware, upload.single("profilepic"), userController.updateUser);

// ✅ Delete User (Admin Only)
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), userController.deleteUser);

module.exports = router;

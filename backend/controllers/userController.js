const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const OTP_CACHE = new Map(); // Temporary OTP storage

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Helper: Send OTP Email
const sendOTPEmail = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
        });
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw new Error("Failed to send OTP email");
    }
};

// ✅ Register User
exports.register = async (req, res) => {
    console.log("Received Data:", req.body); 
    try {
        const { full_name, email, password, mobile, role } = req.body;

        if (!full_name || !email || !password || !mobile || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            full_name,
            email,
            mobile,
            password: hashedPassword,
            role,
        });

        res.status(201).json({ 
            success: true,  // ✅ Add this field
            message: "User registered successfully", 
            user 
        });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// ✅ Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ status: "error", message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: "error", message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                mobile: user.mobile,
                role: user.role,
                bio: user.bio,
                profilepic: user.profilepic
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // ✅ Return user details along with the token
        res.status(200).json({
            status: "success",
            message: "Login successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                bio: user.bio,
                profilepic: user.profilepic
            }
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};



// ✅ Request OTP for Password Reset
exports.requestOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = Date.now() + 10 * 60 * 1000; // Valid for 10 minutes

        OTP_CACHE.set(email, { otp, expires });

        // Send OTP Email
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("OTP request error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Get OTP data from cache
        const otpData = OTP_CACHE.get(email);

        // Validate OTP
        if (!otpData || otpData.otp !== otp || Date.now() > otpData.expires) {
            OTP_CACHE.delete(email);
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        OTP_CACHE.delete(email);
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("OTP verification error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Password reset error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Get all users error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Get user error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// ✅ Update User Profile with File Upload
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { full_name, email, mobile, bio } = req.body;
        let updateFields = { full_name, email, mobile, bio };

        // Handle profile picture upload
        if (req.file) {
            // Remove old profile picture if it exists
            if (user.profilepic) {
                const oldImagePath = path.resolve(__dirname, "..", "uploads", path.basename(user.profilepic));
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error("Failed to delete old profile picture:", err);
                });
            }

            // Save new file path
            updateFields.profilepic = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        // Perform update
        const [updated] = await User.update(updateFields, { where: { id: userId } });

        if (updated) {
            const updatedUser = await User.findByPk(userId);
            return res.status(200).json({ message: "User updated successfully", updatedUser });
        } else {
            return res.status(400).json({ message: "Update failed" });
        }
    } catch (error) {
        console.error("❌ Update Error:", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


// ✅ Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete user error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
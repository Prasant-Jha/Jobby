require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const appRoutes = require("./routes/appRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");

const app = express();

// ✅ Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", appRoutes);
app.use("/api/dashboard", dashboardRoutes)

// ✅ Database Connection
sequelize
  .sync({ force: false })
  .then(() => console.log("✅ Database connected!"))
  .catch((err) => console.error("❌ Error connecting to database:", err));

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: "File upload error", details: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

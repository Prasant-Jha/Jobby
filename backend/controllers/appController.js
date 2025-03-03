const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");
const path = require("path");

// Apply for a Job with Resume Upload
exports.applyForJob = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    console.log("Received file:", req.file);

    const { user_id, job_id } = req.body;

    // Ensure user_id and job_id are not undefined
    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ error: "Invalid or missing user_id" });
    }
    if (!job_id || isNaN(job_id)) {
      return res.status(400).json({ error: "Invalid or missing job_id" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required!" });
    }

    const resumePath = req.file.path.replace(/\\/g, "/");

    const application = await Application.create({
      user_id: parseInt(user_id),
      job_id: parseInt(job_id),
      resume: resumePath,
      status: "Pending",
    });

    res.status(201).json({ message: "Application submitted successfully!", application });
  } catch (error) {
    console.error("Error in applyForJob:", error);
    res.status(500).json({ error: error.message });
  }
};



// Get Applications by User ID
exports.getApplicationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const applications = await Application.findAll({ where: { user_id: userId } });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get applications by employer's email
exports.getApplicationsByEmployer = async (req, res) => {
  try {
    const { email } = req.params;

    // Find all jobs posted by this employer
    const jobs = await Job.findAll({ where: { employer_email: email } });
    const jobIds = jobs.map((job) => job.id);

    if (jobIds.length === 0) {
      return res.status(200).json([]);
    }

    // Find applications related to these jobs and include user details
    const applications = await Application.findAll({
      where: { job_id: jobIds },
      include: [{ model: User, attributes: ["full_name", "email"] }],
    });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid application ID" });
    }

    // Validate Status
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    // Find Application
    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Update Status
    application.status = status;
    await application.save();

    res.status(200).json({ message: "Application status updated successfully" });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


  

// Get All Applications (Admin)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



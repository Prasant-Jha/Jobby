const Job = require("../models/Job");

// Create a new job posting with image upload
const createJob = async (req, res) => {
  try {
    const {
      employer_email,
      job_title,
      company,
      location,
      salary,
      job_type,
      description,
      due_date,
    } = req.body;

    // Get uploaded image filename
    const image = req.file ? req.file.filename : null;

    // Create the job
    const newJob = await Job.create({
      employer_email,
      job_title,
      company,
      location,
      salary,
      job_type,
      description,
      image,
      due_date,
    });

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a job posting with image upload
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Get uploaded image filename if provided
    const image = req.file ? req.file.filename : job.image;

    await job.update({ ...req.body, image });
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a job posting
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.destroy();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };

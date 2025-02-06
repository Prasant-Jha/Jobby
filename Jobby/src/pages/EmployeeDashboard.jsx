import React, { useState } from "react";
import { FaSearch, FaUser, FaHome, FaBriefcase, FaTachometerAlt, FaSignOutAlt, FaChevronRight } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const EmployeeDashboard = () => {
  // Dummy data for user applications
  const [userApplications, setUserApplications] = useState([
    { id: "1", jobId: "job1", resumeName: "resume.pdf", status: "Pending" },
    { id: "2", jobId: "job2", resumeName: "cv.docx", status: "Selected" },
  ]);

  // Function to apply for a job (example)
  const applyForJob = (jobId) => {
    // Check if the user has already applied for the job
    const existingApplication = userApplications.find(app => app.jobId === jobId);
    if (existingApplication) {
      alert("You have already applied for this job.");
      return;
    }

    // Create a new application
    const newApplication = {
      id: `${Date.now()}`, // A unique ID for the application
      jobId: jobId,
      resumeName: "resume.pdf", // Assuming the employee has uploaded a resume
      status: "Pending", // Initially, the status will be Pending
    };

    // Add the new application to the state
    setUserApplications((prevApps) => [...prevApps, newApplication]);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <div className="flex w-full h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Applications Section */}
        <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8">
          <h2 className="text-2xl font-bold text-gray-800">Your Applications</h2>
          {userApplications.length === 0 ? (
            <p className="text-gray-600">You haven't applied for any jobs yet.</p>
          ) : (
            userApplications.map((app) => (
              <div key={app.id} className="bg-white w-11/12 p-6 border border-gray-300 rounded-lg shadow-md">
                <p className="text-gray-700"><strong>Job ID:</strong> {app.jobId}</p>
                <p className="text-gray-700"><strong>Resume:</strong> {app.resumeName}</p>
                <p className="text-gray-700"><strong>Status:</strong> <span className="text-blue-600">{app.status}</span></p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

import React, { useState } from "react";
import { FaSearch, FaUser, FaHome, FaBriefcase, FaTachometerAlt, FaSignOutAlt, FaChevronRight, FaDownload } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const EmployerDashboard = () => {
  // State to store applications
  const [applications, setApplications] = useState([
    { id: "1", userId: "user123", resumeName: "resume.pdf", resumeUrl: "/path/to/resume.pdf", status: "Pending" },
    { id: "2", userId: "user456", resumeName: "cv.docx", resumeUrl: "/path/to/cv.docx", status: "Pending" },
  ]);

  // Function to update application status
  const onUpdateStatus = (appId, newStatus) => {
    setApplications((prevApps) =>
      prevApps.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app
      )
    );
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
          <h2 className="text-2xl font-bold text-gray-800">Manage Job Applications</h2>
          {applications.length === 0 ? (
            <p className="text-gray-600">No applications yet.</p>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                className="bg-white w-11/12 p-6 border border-gray-300 rounded-lg shadow-md"
              >
                <p className="text-gray-700">
                  <strong>Candidate:</strong> {app.userId}
                </p>
                <p className="text-gray-700">
                  <strong>Resume:</strong> {app.resumeName}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong>{" "}
                  <span className="text-blue-600">{app.status}</span>
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => onUpdateStatus(app.id, "Selected")}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Select
                  </button>
                  <button
                    onClick={() => onUpdateStatus(app.id, "Pending")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => onUpdateStatus(app.id, "Rejected")}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Reject
                  </button>
                  {/* Download Resume Button */}
                  <a
                    href={app.resumeUrl} // path to the resume file
                    download={app.resumeName} // the name it should be downloaded as
                    className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                  >
                    <FaDownload className="text-white" />
                    <span>Download Resume</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;

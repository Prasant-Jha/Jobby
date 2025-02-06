import React, { useState } from "react";
import { FaSearch, FaUser, FaHome, FaBriefcase, FaPlus, FaTachometerAlt, FaSignOutAlt, FaChevronRight } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const ApplyJob = ({ jobId, onApply }) => {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!resume) {
      alert("Please upload a resume!");
      return;
    }

    const application = {
      id: Math.random().toString(36).substr(2, 9),
      jobId,
      userId: "user123",
      resumeName: resume.name,
      status: "Pending",
    };

    onApply(application);
    alert("Application submitted!");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <div className="flex w-full h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Apply Job Section */}
        <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8">
          <div className="bg-white w-11/12 p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Apply for Job</h2>
            <p className="text-[20px] text-gray-800 mb-4">Upload your resume</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="file" 
                onChange={handleFileChange} 
                required 
                className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 transition w-full"
              onClick={() => navigate("/employee-dashboard")}>
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;

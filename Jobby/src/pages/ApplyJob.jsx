import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    console.log("Selected Job ID:", jobId); // Debug log
    console.log("User:", JSON.parse(localStorage.getItem("user")));
  
    if (!resume) {
      alert("Please upload a resume!");
      return;
    }
  
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      alert("User not logged in!");
      return;
    }
  
    if (!jobId) {
      alert("Job ID is missing!");
      return;
    }
  
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("user_id", String(user.id));
    formData.append("job_id", String(jobId));  // Convert to string
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Application submitted successfully!");
        navigate("/employee-dashboard");
      } else {
        alert(data.error || "Failed to submit application");
      }
    } catch (error) {
      alert("Error submitting application: " + error.message);
    }
  };  
  

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Header />
      <div className="flex w-full h-[calc(100vh-80px)]">
        <Sidebar />
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
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;

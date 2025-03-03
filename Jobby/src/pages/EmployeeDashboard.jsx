import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const EmployeeDashboard = () => {
  const [userApplications, setUserApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/applications/${user.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const applications = await response.json();

        // Fetch job details for each application
        const jobDetailsPromises = applications.map(async (app) => {
          const jobResponse = await fetch(`http://localhost:5000/api/jobs/${app.job_id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!jobResponse.ok) {
            throw new Error(`Failed to fetch job details for job_id: ${app.job_id}`);
          }

          const jobData = await jobResponse.json();
          return { ...app, job: jobData };
        });

        const applicationsWithJobDetails = await Promise.all(jobDetailsPromises);
        setUserApplications(applicationsWithJobDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

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

          {loading ? (
            <p className="text-gray-600">Loading applications...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : userApplications.length === 0 ? (
            <p className="text-gray-600">You haven't applied for any jobs yet.</p>
          ) : (
            userApplications.map((app) => (
              <div key={app.id} className="bg-white w-11/12 p-6 border border-gray-300 rounded-lg shadow-md">
                <p className="text-gray-700"><strong>Job Title:</strong> {app.job?.job_title || "N/A"}</p>
                <p className="text-gray-700"><strong>Company:</strong> {app.job?.company || "N/A"}</p>
                <p className="text-gray-700"><strong>Location:</strong> {app.job?.location || "N/A"}</p>
                <p className="text-gray-700"><strong>Resume:</strong> {app.resume}</p>
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

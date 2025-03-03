import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Applicants = () => {
  const [applications, setApplications] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const loggedInEmail = storedUser?.email;

  useEffect(() => {
    if (!loggedInEmail) return;

    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        const { data } = await axios.get(
          `http://localhost:5000/api/applications/employer/${loggedInEmail}`,
          {
            headers: { Authorization: `Bearer ${token}` }, // Attach token
          }
        );

        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [loggedInEmail]);


  const onUpdateStatus = async (appId, newStatus) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token
  
      if (!token) {
        console.error("No token found. User may not be authenticated.");
        return;
      }
  
      await axios.put(
        `http://localhost:5000/api/applications/${appId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }, // Attach token here
        }
      );
  
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === appId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Header />
      <div className="flex w-full h-[calc(100vh-80px)]">
        <Sidebar />

        <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8">
          <h2 className="text-2xl font-bold text-gray-800">Manage Job Applications</h2>
          {applications.length === 0 ? (
            <p className="text-gray-600">No applications yet.</p>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="bg-white w-11/12 p-6 border border-gray-300 rounded-lg shadow-md">
                <p className="text-gray-700"><strong>Candidate:</strong> {app.User.full_name}</p>
                <p className="text-gray-700"><strong>Email:</strong> {app.User.email}</p>
                <p className="text-gray-700"><strong>Resume:</strong> {app.resume}</p>
                <p className="text-gray-700"><strong>Status:</strong> <span className="text-blue-600">{app.status}</span></p>
                <div className="flex space-x-4 mt-4">
                  <button onClick={() => onUpdateStatus(app.id, "Selected")} className="bg-green-500 text-white px-4 py-2 rounded-md">Select</button>
                  <button onClick={() => onUpdateStatus(app.id, "Rejected")} className="bg-red-500 text-white px-4 py-2 rounded-md">Reject</button>
                  <a
                    href={`http://localhost:5000/${app.resume}`}
                    download
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

export default Applicants;

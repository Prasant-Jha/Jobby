import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the employer's email from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const employerEmail = storedUser.email;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs/");
        const data = await response.json();
        if (response.ok) {
          // Filter jobs where employer_email matches the logged-in employer's email
          const filteredJobs = data.filter(job => job.employer_email === employerEmail);
          setJobPosts(filteredJobs);
        } else {
          throw new Error(data.message || "Failed to fetch job posts.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [employerEmail]); // Dependency added to refetch if email changes

  const onDeleteJobPost = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJobPosts(jobPosts.filter(job => job.id !== jobId));
      } else {
        throw new Error("Failed to delete job post.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const onUpdateJobPost = (jobId) => {
    navigate(`/update-job/${jobId}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Header />

      <div className="flex w-full h-[calc(100vh-80px)]">
        <Sidebar />

        <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8 scrollbar-hide">
          <h2 className="text-3xl font-bold text-gray-800">Employer Dashboard</h2>
          <div className="w-full bg-white p-6 rounded-xl shadow-lg">
            {loading && <p>Loading job posts...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && jobPosts.length === 0 && <p className="text-center text-gray-600">No job posts found.</p>}
            {!loading && jobPosts.length > 0 && (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Job Title</th>
                    <th className="p-3 text-left">Company</th>
                    <th className="p-3 text-left">Location</th>
                    <th className="p-3 text-left">Salary</th>
                    <th className="p-3 text-left">Job Type</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobPosts.map((job) => (
                    <tr key={job.id} className="border-b">
                      <td className="p-3">
                        <img
                          src={job.image && job.image.trim() ? `http://localhost:5000/uploads/${job.image}` : "/images/default-job.png"}
                          alt="Job"
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => { e.target.src = "/images/default-job.png"; }}
                        />
                      </td>

                      <td className="p-3">{job.job_title}</td>
                      <td className="p-3">{job.company}</td>
                      <td className="p-3">{job.location}</td>
                      <td className="p-3">{job.salary}</td>
                      <td className="p-3">{job.job_type}</td>
                      <td className="p-3 text-center flex justify-center gap-4">
                        <button onClick={() => onUpdateJobPost(job.id)} className="text-blue-600 hover:text-blue-800">
                          <FaEdit className="text-xl" />
                        </button>
                        <button onClick={() => onDeleteJobPost(job.id)} className="text-red-600 hover:text-red-800">
                          <FaTrash className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;

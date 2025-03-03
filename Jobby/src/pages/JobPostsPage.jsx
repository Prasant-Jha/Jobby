import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const JobPostsPage = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs/"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch job posts");
        }
        const data = await response.json();
        setJobPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobPosts();
  }, []);

  const onDeleteJobPost = async (jobId) => {
    try {
      await fetch(`http://localhost:5000/api/jobs//${jobId}`, {
        method: "DELETE",
      });
      setJobPosts(jobPosts.filter((job) => job.id !== jobId));
    } catch (err) {
      console.error("Error deleting job post:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Header />
      <div className="flex w-full h-[calc(100vh-80px)]">
        <Sidebar />
        <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8 scrollbar-hide">
          <h2 className="text-3xl font-bold text-gray-800">Manage Job Posts</h2>
          <div className="w-full bg-white p-6 rounded-xl shadow-lg">
            {loading ? (
              <p className="text-center text-gray-600">Loading job posts...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : jobPosts.length === 0 ? (
              <p className="text-center text-gray-600">No job posts found.</p>
            ) : (
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
                          src={job.image ? `http://localhost:5000/uploads/${job.image}` : "/images/default-job.png"}
                          alt="Job"
                          className="w-10 h-10 rounded-full object-cover"
                        />

                      </td>
                      <td className="p-3">{job.job_title}</td>
                      <td className="p-3">{job.company}</td>
                      <td className="p-3">{job.location}</td>
                      <td className="p-3">{job.salary}</td>
                      <td className="p-3">{job.job_type}</td>
                      <td className="p-3 text-center">
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

export default JobPostsPage;

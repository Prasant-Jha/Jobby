import React, { useState } from "react";
import { FaSearch, FaUser, FaHome, FaBriefcase, FaTachometerAlt, FaSignOutAlt, FaChevronRight, FaTrash } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const JobPostsPage = () => {
  const [jobPosts, setJobPosts] = useState([
    { id: 1, image: "https://via.placeholder.com/40", title: "Software Engineer", company: "TechCorp", location: "New York, USA", salary: "$80,000", jobType: "Full-Time" },
    { id: 2, image: "https://via.placeholder.com/40", title: "Product Manager", company: "Innovate Ltd", location: "San Francisco, USA", salary: "$100,000", jobType: "Part-Time" },
    { id: 1, image: "https://via.placeholder.com/40", title: "Software Engineer", company: "TechCorp", location: "New York, USA", salary: "$80,000", jobType: "Full-Time" },
    { id: 2, image: "https://via.placeholder.com/40", title: "Product Manager", company: "Innovate Ltd", location: "San Francisco, USA", salary: "$100,000", jobType: "Part-Time" },
    { id: 1, image: "https://via.placeholder.com/40", title: "Software Engineer", company: "TechCorp", location: "New York, USA", salary: "$80,000", jobType: "Full-Time" },
    { id: 2, image: "https://via.placeholder.com/40", title: "Product Manager", company: "Innovate Ltd", location: "San Francisco, USA", salary: "$100,000", jobType: "Part-Time" },
    { id: 1, image: "https://via.placeholder.com/40", title: "Software Engineer", company: "TechCorp", location: "New York, USA", salary: "$80,000", jobType: "Full-Time" },
    { id: 2, image: "https://via.placeholder.com/40", title: "Product Manager", company: "Innovate Ltd", location: "San Francisco, USA", salary: "$100,000", jobType: "Part-Time" },
    { id: 1, image: "https://via.placeholder.com/40", title: "Software Engineer", company: "TechCorp", location: "New York, USA", salary: "$80,000", jobType: "Full-Time" },
    { id: 2, image: "https://via.placeholder.com/40", title: "Product Manager", company: "Innovate Ltd", location: "San Francisco, USA", salary: "$100,000", jobType: "Part-Time" },
    { id: 1, image: "https://via.placeholder.com/40", title: "Software Engineer", company: "TechCorp", location: "New York, USA", salary: "$80,000", jobType: "Full-Time" },
    { id: 2, image: "https://via.placeholder.com/40", title: "Product Manager", company: "Innovate Ltd", location: "San Francisco, USA", salary: "$100,000", jobType: "Part-Time" }
  ]);

  const onDeleteJobPost = (jobId) => {
    setJobPosts(jobPosts.filter(job => job.id !== jobId));
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      <div className="flex w-full h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Job Posts Table Section */}
        <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8 scrollbar-hide">
          <h2 className="text-3xl font-bold text-gray-800">Manage Job Posts</h2>
          <div className="w-full bg-white p-6 rounded-xl shadow-lg">
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
                {jobPosts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-600">No job posts found.</td>
                  </tr>
                ) : (
                  jobPosts.map((job) => (
                    <tr key={job.id} className="border-b">
                      <td className="p-3"><img src={job.image} alt="Job" className="w-10 h-10 rounded-full" /></td>
                      <td className="p-3">{job.title}</td>
                      <td className="p-3">{job.company}</td>
                      <td className="p-3">{job.location}</td>
                      <td className="p-3">{job.salary}</td>
                      <td className="p-3">{job.jobType}</td>
                      <td className="p-3 text-center">
                        <button onClick={() => onDeleteJobPost(job.id)} className="text-red-600 hover:text-red-800">
                          <FaTrash className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostsPage;

import React from "react";
import { FaSearch, FaHome, FaBriefcase, FaPlus, FaUser, FaSignOutAlt, FaChevronRight } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const PostJob = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100">
            {/* Header Section */}
            <Header />

            {/* Main Content */}
            <div className="flex w-full h-[calc(100vh-80px)]">
                {/* Sidebar */}
                <Sidebar />

                {/* Post Job Section */}
                <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8">
                    <div className="bg-white w-11/12 p-8 border border-gray-300 rounded-lg shadow-lg">
                        {/* Job Form */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a Job</h2>
                        <form id="jobForm" className="w-full">
                            <label htmlFor="jobTitle" className="font-semibold text-gray-700">Job Title*</label>
                            <input 
                                type="text" 
                                id="jobTitle" 
                                name="jobTitle" 
                                placeholder="Enter job title" 
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                            />

                            <label htmlFor="company" className="font-semibold text-gray-700">Company Name*</label>
                            <input 
                                type="text" 
                                id="company" 
                                name="company" 
                                placeholder="Enter company name" 
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                            />

                            <label htmlFor="location" className="font-semibold text-gray-700">Location*</label>
                            <input 
                                type="text" 
                                id="location" 
                                name="location" 
                                placeholder="Enter job location" 
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                            />

                            <label htmlFor="salary" className="font-semibold text-gray-700">Salary</label>
                            <input 
                                type="text" 
                                id="salary" 
                                name="salary" 
                                placeholder="Enter salary (optional)"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                            />

                            <label htmlFor="jobType" className="font-semibold text-gray-700">Job Type</label>
                            <select 
                                id="jobType" 
                                name="jobType" 
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>

                            <label htmlFor="description" className="font-semibold text-gray-700">Job Description*</label>
                            <textarea 
                                id="description" 
                                name="description" 
                                placeholder="Enter job description" 
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                            />

                            <label htmlFor="image" className="font-semibold text-gray-700">Image*</label>
                            <input 
                                type="file" 
                                id="image" 
                                name="image" 
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                            />

                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
                            >
                                Post Job
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostJob;

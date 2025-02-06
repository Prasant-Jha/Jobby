import React from "react";
import Amazon from "../assets/amazon.png";
import { FaSearch, FaUser, FaHome, FaBriefcase, FaPlus, FaTachometerAlt, FaSignOutAlt, FaChevronRight } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const JobDetailsPage = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100">
            {/* Header Section */}
            <Header />

            {/* Main Content */}
            <div className="flex w-full h-[calc(100vh-80px)]">
                {/* Sidebar */}
                <Sidebar />

                {/* Job Details Section */}
                <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8">
                    <div className="bg-white w-11/12 p-8 border border-gray-300 rounded-lg shadow-lg">
                        {/* Job Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center space-x-4">
                                <img src={Amazon} alt="Company Logo" className="w-20 h-20 object-cover rounded-full border border-gray-300" />
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Frontend Developer</h2>
                                    <p className="text-gray-500">Google - California, USA</p>
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">Job Description</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We are looking for a talented Frontend Developer to join our team. You will be responsible for implementing visual elements that users see and interact with in a web application.
                        </p>

                        {/* Requirements */}
                        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Requirements</h3>
                        <ul className="list-disc ml-6 text-gray-600 space-y-2">
                            <li>Experience with HTML, CSS, JavaScript</li>
                            <li>Familiarity with React or Angular</li>
                            <li>Good understanding of UI/UX principles</li>
                            <li>Ability to work in a team environment</li>
                        </ul>

                        {/* Apply Button */}
                        <div className="mt-8 flex justify-center">
                            <Link to="/apply-job" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 transition">
                                Apply Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;

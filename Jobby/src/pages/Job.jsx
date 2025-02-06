import React from "react";
import { FaSearch, FaUser, FaBell, FaEye, FaLock, FaHeadphones, FaQuestionCircle, FaChevronRight } from 'react-icons/fa';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const Job = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100">
            {/* Upper Section */}
            <Header />
            
            {/* Hero Section */}
            <div className="flex w-full h-[calc(100vh-80px)]">
                {/* Sidebar */}
                <Sidebar />
                
                {/* Job Posts */}
                <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-5 space-y-6">
                    {["Frontend Developer - Google - California, USA", 
                      "Backend Developer - Microsoft - Redmond, USA", 
                      "UI/UX Designer - Apple - Cupertino, USA", "Frontend Developer - Google - California, USA", 
                      "Backend Developer - Microsoft - Redmond, USA", 
                      "UI/UX Designer - Apple - Cupertino, USA"].map((job, index) => (
                        <div key={index} className="bg-white w-11/12 p-5 border border-black rounded-md shadow-md transition-all hover:shadow-lg">
                            <div className="text-lg font-semibold">{job.split(" - ")[0]}</div>
                            <div className="text-gray-600 text-sm">{job.split(" - ")[1]}</div>
                            <div className="text-gray-500 text-sm mb-3">{job.split(" - ")[2]}</div>
                            <Link to="/job-details" className="bg-blue-600 text-white px-4 py-2 rounded-md inline-block hover:bg-blue-800">View details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Job;

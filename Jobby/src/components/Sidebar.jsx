import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaFileAlt,
    FaSearch,
    FaUser,
    FaBriefcase,
    FaTachometerAlt,
    FaSignOutAlt,
    FaChevronRight,
} from "react-icons/fa";

const Sidebar = () => {
    const location = useLocation();
    const [openSection, setOpenSection] = useState(null);

    // Define the section mappings
    const sectionMapping = {
        admin: ["/admin-dashboard", "/users", "/job-posts"],
        employer: ["/employer-dashboard", "/post-job"],
    };

    // Keep section open if any child link is active
    useEffect(() => {
        Object.entries(sectionMapping).forEach(([section, links]) => {
            if (links.includes(location.pathname)) {
                setOpenSection(section);
            }
        });
    }, [location.pathname]);

    // Toggle function
    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="w-1/4 h-full bg-gray-200 p-5 border-r border-gray-300">
            {/* Search Bar */}
            <div className="flex items-center bg-white border border-gray-400 px-4 py-2 w-full mb-6 rounded-lg">
                <FaSearch className="text-gray-500 text-lg" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="ml-3 w-full outline-none text-lg bg-transparent"
                />
            </div>

            {/* Sidebar Items */}
            <ul className="space-y-4 text-lg font-medium">
                {/* Admin Section */}
                <li>
                    <div
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
                        onClick={() => toggleSection("admin")}
                    >
                        <div className="flex items-center space-x-3">
                            <FaTachometerAlt className="text-xl text-gray-600" />
                            <span>Admin</span>
                        </div>
                        <FaChevronRight
                            className={`text-gray-400 text-lg transform ${openSection === "admin" ? "rotate-90" : ""}`}
                        />
                    </div>
                    {openSection === "admin" && (
                        <ul className="pl-8 mt-2 space-y-2">
                            {sectionMapping.admin.map((path) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={`block p-2 rounded-md ${location.pathname === path ? "bg-blue-500 text-white" : "hover:text-blue-600"}`}
                                    >
                                        {path === "/admin-dashboard" && "Admin Dashboard"}
                                        {path === "/users" && "Users Page"}
                                        {path === "/job-posts" && "JobPosts Page"}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>

                {/* Employer Section */}
                <li>
                    <div
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
                        onClick={() => toggleSection("employer")}
                    >
                        <div className="flex items-center space-x-3">
                            <FaBriefcase className="text-xl text-gray-600" />
                            <span>Employer</span>
                        </div>
                        <FaChevronRight
                            className={`text-gray-400 text-lg transform ${openSection === "employer" ? "rotate-90" : ""}`}
                        />
                    </div>
                    {openSection === "employer" && (
                        <ul className="pl-8 mt-2 space-y-2">
                            {sectionMapping.employer.map((path) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={`block p-2 rounded-md ${location.pathname === path ? "bg-blue-500 text-white" : "hover:text-blue-600"}`}
                                    >
                                        {path === "/employer-dashboard" && "Employer Dashboard"}
                                        {path === "/post-job" && "Post a Job"}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>

                {/* Other Sections */}
                <li>
                    <Link
                        to="/jobs"
                        className={`flex items-center bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 ${location.pathname === "/jobs" ? "bg-blue-500 text-white font-bold" : "text-gray-700 hover:text-blue-600"
                            }`}
                    >
                        <FaBriefcase className={`text-xl mr-3 ${location.pathname === "/jobs" ? "text-white" : "text-gray-600"}`} />
                        <span className={location.pathname === "/jobs" ? "text-white" : "text-gray-700"}>Jobs</span>
                    </Link>

                </li>

                <li>
                    <Link
                        to="/profile"
                        className={`flex items-center bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 ${location.pathname === "/profile" ? "bg-blue-500 text-white font-bold" : "text-gray-700 hover:text-blue-600"
                            }`}
                    >
                        <FaUser className={`text-xl mr-3 ${location.pathname === "/profile" ? "text-white" : "text-gray-600"}`} />
                        <span className={location.pathname === "/profile" ? "text-white" : "text-gray-700"}>Profile</span>
                    </Link>

                </li>

                <li>
                    <Link
                        to="/employee-dashboard"
                        className={`flex items-center bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 ${location.pathname === "/employee-dashboard" ? "bg-blue-500 text-white font-bold" : "text-gray-700 hover:text-blue-600"
                            }`}
                    >
                        <FaFileAlt className={`text-xl mr-3 ${location.pathname === "/employee-dashboard" ? "text-white" : "text-gray-600"}`} />
                        <span className={location.pathname === "/employee-dashboard" ? "text-white" : "text-gray-700"}>Applications</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/logout"
                        className="flex items-center bg-white p-4 rounded-lg shadow-md text-red-600 hover:bg-gray-100"
                    >
                        <FaSignOutAlt className="text-xl mr-3" />
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

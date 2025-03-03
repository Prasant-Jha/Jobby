import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const [openSection, setOpenSection] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const [userRole, setUserRole] = useState(user?.role || "");



    const sectionMapping = {
        admin: ["/admin-dashboard", "/users", "/job-posts"],
        employer: ["/employer-dashboard", "/applicants", "/post-job"],
    };

    useEffect(() => {
        // Check if a section should be expanded
        Object.entries(sectionMapping).forEach(([section, links]) => {
            if (links.includes(location.pathname)) {
                setOpenSection(section);
            }
        });
    }, [location.pathname]);

    const toggleSection = (section) => {
        const newSection = openSection === section ? null : section;
        setOpenSection(newSection);
    };

    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="w-1/4 h-full p-5 border-r border-gray-300">
            {/* Search Bar */}
            <div className="flex items-center bg-white border border-gray-400 px-4 py-2 w-full mb-6">
                <FaSearch className="text-gray-500 text-lg" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="ml-3 w-full outline-none text-lg bg-transparent"
                />
            </div>

            {/* Sidebar Items */}
            <ul className="space-y-4 text-lg font-medium">
                {userRole === "admin" && (
                    <li>
                        <div
                            className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-100"
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
                                            {path.replace("/", "").replace("-", " ")}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                )}

                {userRole === "employer" && (
                    <li>
                        <div
                            className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-100"
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
                                            {path.replace("/", "").replace("-", " ")}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                )}

                {/* Common Links */}
                <li>
                    <Link
                        to="/jobs"
                        className={`flex items-center p-4 rounded-lg ${location.pathname === "/jobs" ? "bg-blue-500 text-white font-bold" : "hover:text-blue-600"}`}
                    >
                        <FaBriefcase className="text-xl mr-3" />
                        <span>Jobs</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/profile"
                        className={`flex items-center p-4 rounded-lg ${location.pathname === "/profile" ? "bg-blue-500 text-white font-bold" : "hover:text-blue-600"}`}
                    >
                        <FaUser className="text-xl mr-3" />
                        <span>Profile</span>
                    </Link>
                </li>

                {userRole === "job_seeker" && (
                    <li>
                        <Link
                            to="/employee-dashboard"
                            className={`flex items-center p-4 rounded-lg ${location.pathname === "/employee-dashboard" ? "bg-blue-500 text-white font-bold" : "hover:text-blue-600"}`}
                        >
                            <FaFileAlt className="text-xl mr-3" />
                            <span>Applications</span>
                        </Link>
                    </li>
                )}

                {/* Logout */}
                <li>
                    <button
                        onClick={handleLogout}
                        className="flex items-center p-4 rounded-lg text-red-600 w-full text-left"
                    >
                        <FaSignOutAlt className="text-xl mr-3" />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

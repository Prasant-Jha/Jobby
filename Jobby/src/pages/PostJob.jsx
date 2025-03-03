import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const PostJob = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    const [formData, setFormData] = useState({
        jobTitle: "",
        company: "",
        location: "",
        salary: "",
        jobType: "Full-time",
        description: "",
        image: null,
        dueDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const employerEmail = storedUser?.email;
    
        if (!token || !employerEmail) {
            toast.error("User is not authenticated.");
            return;
        }
    
        // Use a new variable to store form data
        const jobData = new FormData();
        jobData.append("job_title", formData.jobTitle);
        jobData.append("company", formData.company);
        jobData.append("location", formData.location);
        jobData.append("salary", formData.salary);
        jobData.append("job_type", formData.jobType);
        jobData.append("description", formData.description);
        jobData.append("due_date", formData.dueDate);
        jobData.append("employer_email", employerEmail);
    
        if (formData.image) {
            jobData.append("image", formData.image);
        }
    
        try {
            const response = await fetch("http://localhost:5000/api/jobs/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // Token required for authentication
                },
                body: jobData, // Use the correct variable
                credentials: "include",
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.success("Job posted successfully!");
                navigate("/jobs");
            } else {
                toast.error(result.message || "Failed to post job.");
            }
        } catch (error) {
            console.error("Error posting job:", error);
            toast.error("Internal Server Error.");
        }
    };
    

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <Header />
            <div className="flex w-full h-[calc(100vh-80px)]">
                <Sidebar />
                <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8">
                    <div className="bg-white w-11/12 p-8 border border-gray-300 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a Job</h2>
                        <form onSubmit={handleSubmit} className="w-full">
                            <label className="font-semibold text-gray-700">Job Title*</label>
                            <input
                                type="text"
                                name="jobTitle"
                                placeholder="Enter job title"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                onChange={handleChange}
                            />

                            <label className="font-semibold text-gray-700">Company Name*</label>
                            <input
                                type="text"
                                name="company"
                                placeholder="Enter company name"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                onChange={handleChange}
                            />

                            <label className="font-semibold text-gray-700">Location*</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Enter job location"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                onChange={handleChange}
                            />

                            <label className="font-semibold text-gray-700">Salary</label>
                            <input
                                type="text"
                                name="salary"
                                placeholder="Enter salary (optional)"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                onChange={handleChange}
                            />

                            <label className="font-semibold text-gray-700">Job Type</label>
                            <select
                                name="jobType"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                onChange={handleChange}
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>

                            <label className="font-semibold text-gray-700">Job Description*</label>
                            <textarea
                                name="description"
                                placeholder="Enter job description"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                onChange={handleChange}
                            />

                            <label className="font-semibold text-gray-700">Application Deadline*</label>
                            <input
                                type="date"
                                name="dueDate"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                onChange={handleChange}
                            />

                            <label className="font-semibold text-gray-700">Image*</label>
                            <input
                                type="file"
                                name="image"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                onChange={handleFileChange}
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

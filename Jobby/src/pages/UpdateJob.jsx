import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const UpdateJob = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        job_title: "",
        company: "",
        location: "",
        salary: "",
        job_type: "",
        description: "",
        image: "" // Added image field
    });
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch job data when component mounts
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        };
        fetchJob();
    }, [jobId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const formDataToSend = new FormData();

            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            if (selectedImage) {
                formDataToSend.append("image", selectedImage);
            }

            await axios.put(
                `http://localhost:5000/api/jobs/${jobId}`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Job updated successfully!");
            navigate("/employer-dashboard");
        } catch (error) {
            console.error("Error updating job:", error);
            alert("Failed to update job. Please try again.");
        }
    };


    return (
        <div className="w-full min-h-screen bg-gray-100">
            <Header />
            <div className="flex w-full h-[calc(100vh-80px)]">
                <Sidebar />
                <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8">
                    <div className="bg-white w-11/12 p-8 border border-gray-300 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Job</h2>
                        <form onSubmit={handleSubmit} className="w-full">
                            <label className="font-semibold text-gray-700">Job Title*</label>
                            <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg mb-4" />

                            <label className="font-semibold text-gray-700">Company Name*</label>
                            <input type="text" name="company" value={formData.company} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg mb-4" />

                            <label className="font-semibold text-gray-700">Location*</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg mb-4" />

                            <label className="font-semibold text-gray-700">Salary</label>
                            <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg mb-4" />

                            <label className="font-semibold text-gray-700">Job Type</label>
                            <select name="job_type" value={formData.job_type} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg mb-4">
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>

                            <label className="font-semibold text-gray-700">Job Description*</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg mb-4" />

                            {/* Image Upload Field */}
                            <label className="font-semibold text-gray-700">Job Image</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border border-gray-300 rounded-lg mb-4" />
                            {formData.image && (
                                <img
                                    src={formData.image.startsWith("http") ? formData.image : `http://localhost:5000/uploads/${formData.image}`}
                                    alt="Job"
                                    className="w-32 h-32 object-cover rounded-lg mb-4"
                                />
                            )}




                            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-green-700 transition">
                                Update Job
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateJob;

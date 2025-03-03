import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const JobDetailsPage = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            const token = localStorage.getItem("token"); // Get token from localStorage

            try {
                const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to request headers
                    },
                });

                setJob(response.data);
            } catch (error) {
                setError("Failed to load job details");
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <Header />
            <div className="flex w-full h-[calc(100vh-80px)]">
                <Sidebar />
                <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8">
                    <div className="bg-white w-11/12 p-8 border border-gray-300 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={job?.image ? `http://localhost:5000/uploads/${job.image}` : "/images/default-job.png"}
                                    alt="Job Image"
                                    className="w-[80px] h-[80px] object-cover rounded-[40px]"
                                />

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{job?.job_title}</h2>
                                    <p className="text-gray-500">{job?.company} - {job?.location}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <h2 className="text-[18px] font-semibold text-gray-700">Job Type: </h2>
                            <p className="text-gray-600 leading-relaxed">{job?.job_type}</p>
                        </div><br />
                        <div className="flex items-center gap-4">
                            <h2 className="text-[18px] font-semibold text-gray-700">Salary: </h2>
                            <p className="text-gray-600 leading-relaxed">Rs. {job?.salary}</p>
                        </div><br />
                        <h3 className="text-[18px] font-semibold text-gray-700 mb-3">Job Description:</h3>
                        <p className="text-gray-600 leading-relaxed">{job?.description}</p>
                        <ul className="list-disc ml-6 text-gray-600 space-y-2">
                            {job?.requirements?.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                        <div className="mt-8 flex justify-center">
                            <Link to={`/apply-job/${job.id}`} className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 transition">
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

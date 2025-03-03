import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Job = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/jobs/");
                const data = await response.json();
                if (response.ok) {
                    setJobs(data);  // Assuming `data` is an array of jobs
                } else {
                    throw new Error(data.message || "Failed to fetch jobs");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-100">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <div className="flex w-full h-[calc(100vh-80px)]">
                {/* Sidebar */}
                <Sidebar />

                {/* Job Posts */}
                <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-5 space-y-6">
                    {loading && <p>Loading jobs...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {jobs.length === 0 && !loading && <p>No jobs available.</p>}
                    
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white w-11/12 p-5 border border-black rounded-md shadow-md transition-all hover:shadow-lg">
                            <div className="text-lg font-semibold">{job.job_title}</div>
                            <div className="text-gray-600 text-sm">{job.company}</div>
                            <div className="text-gray-500 text-sm mb-3">{job.location}</div>
                            <Link to={`/job-details/${job.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md inline-block hover:bg-blue-800">View details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Job;

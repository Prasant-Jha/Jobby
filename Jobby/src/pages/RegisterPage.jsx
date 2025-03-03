import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Micky from "../assets/micky.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    mobile: "",
    role: "",
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Form Data being sent:", formData); // ✅ Check if `role` is set

    if (!formData.role) {
        return setError("Please select a role.");
    }

    try {
        const response = await axios.post("http://localhost:5000/api/users/register", formData);
        if (response.status === 201) {
            navigate("/login");
        }
    } catch (err) {
        console.error("Error Response:", err.response?.data); // ✅ Log error details
        setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
};




  return (
    <>
      {/* Header Section */}
      <div className="w-full h-20 flex items-center justify-between bg-white shadow-md px-16">
        <div className="text-2xl font-bold text-blue-600 cursor-pointer">Jobby</div>
        <p className="text-lg">
          Already Registered?{" "}
          <Link to="/login" className="font-bold text-blue-600 border-b-2 border-transparent hover:border-green-500">
            Login
          </Link>{" "}
          here
        </p>
      </div>

      {/* Main Container */}
      <div className="flex justify-evenly bg-gray-100 min-h-screen p-10">
        {/* Benefits Card */}
        <div className="flex flex-col items-center justify-evenly h-[50vh] w-[40vh] bg-white rounded-lg shadow-md p-5">
          <img src={Micky} alt="Micky" className="h-24 w-20" />
          <h3 className="text-lg font-semibold">On registering, you can</h3>
          <ul className="list-none space-y-3">
            <li className="flex items-start">
              <FaCheckCircle className="text-green-600 mr-2 mt-1" size={20} />
              <span>Build your profile and let recruiters find you</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-green-600 mr-2 mt-1" size={18} />
              <span>Get job postings delivered to your email</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-green-600 mr-2 mt-1" size={16} />
              <span>Find a job and grow your career</span>
            </li>
          </ul>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg max-w-2xl w-full p-8 shadow-md">
          <h1 className="text-2xl font-bold mb-2">Create your profile</h1>
          <p className="text-gray-600 text-sm mb-4">Search & apply to jobs from India's No.1 Job Site</p>
          {error && <p className="text-red-600">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-semibold">Full name*</label>
              <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="What is your name?" className="w-full p-2 border rounded mt-1" required />
            </div>

            <div>
              <label className="font-semibold">Email ID*</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Tell us your Email ID" className="w-full p-2 border rounded mt-1" required />
            </div>

            <div>
              <label className="font-semibold">Password*</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="(Minimum 6 characters)" className="w-full p-2 border rounded mt-1" required />
            </div>

            <div>
              <label className="font-semibold">Mobile number*</label>
              <div className="flex items-center border rounded overflow-hidden">
                <span className="bg-gray-200 px-4 py-2">+91</span>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter your mobile number" className="w-full p-2 border-l" required />
              </div>
            </div>

            <div>
              <label className="font-semibold">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded mt-1" required>
                <option value="">Select a role</option>
                <option value="job_seeker">job_seeker</option>
                <option value="employer">employer</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">By clicking Register, you agree to the <a href="#" className="text-blue-600">Terms and Conditions</a> & <a href="#" className="text-blue-600">Privacy Policy</a></p>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-3">Register now</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;

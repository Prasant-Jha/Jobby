import React, { useState, useEffect, useCallback } from "react";
import LoginImg from "../assets/login-img.png";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate("/jobs"); // Redirect to jobs page if already logged in
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate input fields
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return false;
    }
    return true;
  };

  // Handle login
  const handleLogin = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);

      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/jobs");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }, [formData, navigate]);


  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full flex items-center justify-between px-10 py-4 shadow-md bg-white">
        <div className="text-2xl font-bold text-blue-600 cursor-pointer">Jobby</div>
        <div className="space-x-4">
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-gray-100" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-green-500" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </header>

      <div className="flex justify-center items-center mt-10 w-3/4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-1/2">
          <h2 className="text-2xl font-semibold mb-6">New to Job-Portal</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center">
              <FaCheck className="text-green-500 text-xl mr-2" /> One click apply using Naukri profile.
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 text-xl mr-2" /> Get relevant job recommendations.
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 text-xl mr-2" /> Showcase profile to top companies.
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 text-xl mr-2" /> Know application status on applied jobs.
            </li>
          </ul>
          <button className="mt-6 px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-gray-100" onClick={() => navigate("/register")}>
            Register for Free
          </button>
          <img src={LoginImg} alt="Login" className="w-40 mt-6 mx-auto" />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 w-1/3">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

          {/* Show error message */}
          {error && <p className="text-red-500 text-center mb-3">{error}</p>}

          <label className="block text-gray-700 font-semibold">Email ID / Username</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email ID / Username" className="w-full p-2 mt-2 border rounded-md" />

          <label className="block text-gray-700 font-semibold mt-4">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full p-2 mt-2 border rounded-md"
            />
            <span className="absolute right-3 top-3 text-blue-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <Link to="/forgot-password" className="block text-right text-blue-600 text-sm mt-2">
            Forgot Password?
          </Link>
          <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;

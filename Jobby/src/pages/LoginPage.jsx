import React from "react";
import Google from "../assets/google.png";
import LoginImg from "../assets/login-img.png";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full flex items-center justify-between px-10 py-4 shadow-md bg-white">
        <div className="text-2xl font-bold text-blue-600 cursor-pointer">Jobby</div>
        <div className="space-x-4">
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-gray-100"  onClick={() => navigate("/login")}>Login</button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-green-500"  onClick={() => navigate("/register")}>Register</button>
        </div>
      </header>
      
      <div className="flex justify-center items-center mt-10 w-3/4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-1/2">
          <h2 className="text-2xl font-semibold mb-6">New to Job-Portal</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center"><FaCheck className="text-green-500 text-xl mr-2"/> One click apply using Naukri profile.</li>
            <li className="flex items-center"><FaCheck className="text-green-500 text-xl mr-2"/> Get relevant job recommendations.</li>
            <li className="flex items-center"><FaCheck className="text-green-500 text-xl mr-2"/> Showcase profile to top companies.</li>
            <li className="flex items-center"><FaCheck className="text-green-500 text-xl mr-2"/> Know application status on applied jobs.</li>
          </ul>
          <button className="mt-6 px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-gray-100" onClick={() => navigate("/register")}>Register for Free</button>
          <img src={LoginImg} alt="Login" className="w-40 mt-6 mx-auto"/>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-8 w-1/3">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <label className="block text-gray-700 font-semibold">Email ID / Username</label>
          <input type="text" placeholder="Enter Email ID / Username" className="w-full p-2 mt-2 border rounded-md" />
          
          <label className="block text-gray-700 font-semibold mt-4">Password</label>
          <div className="relative">
            <input type="password" placeholder="Enter Password" className="w-full p-2 mt-2 border rounded-md" />
            <span className="absolute right-3 top-3 text-blue-600 cursor-pointer">Show</span>
          </div>
          
          <Link to="/forgot-password" className="block text-right text-blue-600 text-sm mt-2">Forgot Password?</Link>
          <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={() => navigate("/jobs")}>Login</button>
          
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-gray-500">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <button className="w-full flex items-center justify-center py-2 border rounded-md hover:border-black">
            <img src={Google} alt="Google" className="w-6 mr-2"/> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Micky from "../assets/micky.png";
import Google from "../assets/google.png";
import { Link } from "react-router-dom";

function RegisterPage() {
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
          <form action="/login" className="space-y-4">
            <div>
              <label className="font-semibold">Full name*</label>
              <input type="text" placeholder="What is your name?" className="w-full p-2 border rounded mt-1" />
            </div>

            <div>
              <label className="font-semibold">Email ID*</label>
              <input type="email" placeholder="Tell us your Email ID" className="w-full p-2 border rounded mt-1" />
              <small className="text-gray-500">We'll send relevant jobs and updates to this email</small>
            </div>

            <div>
              <label className="font-semibold">Password*</label>
              <input type="password" placeholder="(Minimum 6 characters)" className="w-full p-2 border rounded mt-1" />
              <small className="text-gray-500">This helps your account stay protected</small>
            </div>

            <div>
              <label className="font-semibold">Mobile number*</label>
              <div className="flex items-center border rounded overflow-hidden">
                <span className="bg-gray-200 px-4 py-2">+91</span>
                <input type="text" placeholder="Enter your mobile number" className="w-full p-2 border-l" />
              </div>
              <small className="text-gray-500">Recruiters will contact you on this number</small>
            </div>

            <div>
              <label className="font-semibold">Role</label>
              <select className="w-full p-2 border rounded mt-1">
                <option value="Job Seeker">Job Seeker</option>
                <option value="Employer">Employer</option>
              </select>
              <small className="text-gray-500">Select if you are job seeker or employer</small>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="updates" className="mr-2" />
              <label htmlFor="updates" className="text-sm">Send me important updates & promotions via email.</label>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">By clicking Register, you agree to the <a href="#" className="text-blue-600">Terms and Conditions</a> & <a href="#" className="text-blue-600">Privacy Policy</a> of Naukri.com</p>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-3">Register now</button>
            </div>
          </form>

          {/* Google Login */}
          <div className="text-center mt-6 flex justify-center">
            <div>
              <span className="block text-gray-500 mb-2">Or</span>
              <button className="flex items-center justify-center gap-2 border px-4 py-2 rounded hover:border-black">
                <img src={Google} alt="Google" className="w-6" />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;

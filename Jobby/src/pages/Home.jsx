import React from 'react';
import JobImage from '../assets/job-image.png';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden">
      {/* Header */}
      <div className="w-full h-[60px] flex items-center bg-gradient-to-r from-blue-500 to-indigo-600">
        <p className="text-white text-[30px] font-bold ml-[15vh]">Jobby</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-wrap items-center justify-evenly min-h-[92vh] bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="flex flex-col justify-center space-y-6 text-white max-w-[40%]">
          <h4 className="text-[36px] font-semibold sm:w-3/4 lg:w-2/3 xl:w-3/4">
            Explore our site for a better experience with job searching
          </h4>
          <p className="text-lg sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-2/3">
            You will surely find your ideal job choice with ease.
          </p>
          <button className="h-[45px] w-[180px] sm:w-[220px] bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-300" onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>
        <div className="hidden md:block lg:w-1/2 xl:w-1/3 max-w-[40%]">
          <img
            src={JobImage}
            alt="Job search"
            className="w-full h-auto object-cover rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

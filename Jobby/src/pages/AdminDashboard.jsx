import React from "react";
import { FaSearch, FaUser, FaHome, FaBriefcase, FaTachometerAlt, FaSignOutAlt, FaChevronRight } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      <div className="flex w-full h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8">
          <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
          <div className="grid grid-cols-3 gap-6 w-full">
            <StatCard title="Users" value="562" color="bg-purple-500" />
            <StatCard title="Job Posts" value="1,200" color="bg-green-500" />
            <StatCard title="Applications" value="7,514" color="bg-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-6 w-full">
            <ChartCard title="User Growth" data={userGrowthData} />
            <ChartCard title="Applications Over Time" data={applicationsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  return (
    <div className={`${color} p-6 text-white rounded-xl shadow-lg text-center`}> 
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

const ChartCard = ({ title, data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <Line data={data} />
    </div>
  );
};

const userGrowthData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Users",
      data: [10, 20, 30, 40, 50, 60],
      borderColor: "#6b46c1",
      backgroundColor: "rgba(107, 70, 193, 0.2)",
    },
  ],
};

const applicationsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Applications",
      data: [5, 15, 25, 35, 45, 55],
      borderColor: "#3182ce",
      backgroundColor: "rgba(49, 130, 206, 0.2)",
    },
  ],
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, jobPosts: 0, applications: 0 });
  const [userGrowthData, setUserGrowthData] = useState(null);
  const [applicationsData, setApplicationsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
  
        const data = await response.json();
        setStats({
          users: data.usersCount,
          jobPosts: data.jobPostsCount,
          applications: data.applicationsCount,
        });
  
        setUserGrowthData({
          labels: data.userGrowth.labels,
          datasets: [
            {
              label: "Users",
              data: data.userGrowth.values,
              borderColor: "#6b46c1",
              backgroundColor: "rgba(107, 70, 193, 0.2)",
            },
          ],
        });
  
        setApplicationsData({
          labels: data.applicationStats.labels,
          datasets: [
            {
              label: "Applications",
              data: data.applicationStats.values,
              borderColor: "#3182ce",
              backgroundColor: "rgba(49, 130, 206, 0.2)",
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, []);
  
    

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Header />
      <div className="flex w-full h-[calc(100vh-80px)]">
        <Sidebar />
        <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8">
          <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
          {loading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-6 w-full">
                <StatCard title="Users" value={stats.users} color="bg-purple-500" />
                <StatCard title="Job Posts" value={stats.jobPosts} color="bg-green-500" />
                <StatCard title="Applications" value={stats.applications} color="bg-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-6 w-full">
                {userGrowthData && <ChartCard title="User Growth" data={userGrowthData} />}
                {applicationsData && <ChartCard title="Applications Over Time" data={applicationsData} />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`${color} p-6 text-white rounded-xl shadow-lg text-center`}> 
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const ChartCard = ({ title, data }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg w-full">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <Line data={data} />
  </div>
);

export default Dashboard;

import React, { useState } from "react";
import { FaSearch, FaUser, FaHome, FaBriefcase, FaTachometerAlt, FaSignOutAlt, FaChevronRight, FaTrash } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, profilePic: "https://via.placeholder.com/40", name: "John Doe", email: "john@example.com", contact: "123-456-7890", role: "Admin" },
    { id: 2, profilePic: "https://via.placeholder.com/40", name: "Jane Smith", email: "jane@example.com", contact: "987-654-3210", role: "User" },
    { id: 1, profilePic: "https://via.placeholder.com/40", name: "John Doe", email: "john@example.com", contact: "123-456-7890", role: "Admin" },
    { id: 2, profilePic: "https://via.placeholder.com/40", name: "Jane Smith", email: "jane@example.com", contact: "987-654-3210", role: "User" },
    { id: 1, profilePic: "https://via.placeholder.com/40", name: "John Doe", email: "john@example.com", contact: "123-456-7890", role: "Admin" },
    { id: 2, profilePic: "https://via.placeholder.com/40", name: "Jane Smith", email: "jane@example.com", contact: "987-654-3210", role: "User" },
    { id: 1, profilePic: "https://via.placeholder.com/40", name: "John Doe", email: "john@example.com", contact: "123-456-7890", role: "Admin" },
    { id: 2, profilePic: "https://via.placeholder.com/40", name: "Jane Smith", email: "jane@example.com", contact: "987-654-3210", role: "User" },
    { id: 1, profilePic: "https://via.placeholder.com/40", name: "John Doe", email: "john@example.com", contact: "123-456-7890", role: "Admin" },
    { id: 2, profilePic: "https://via.placeholder.com/40", name: "Jane Smith", email: "jane@example.com", contact: "987-654-3210", role: "User" },
    { id: 1, profilePic: "https://via.placeholder.com/40", name: "John Doe", email: "john@example.com", contact: "123-456-7890", role: "Admin" },
    { id: 2, profilePic: "https://via.placeholder.com/40", name: "Jane Smith", email: "jane@example.com", contact: "987-654-3210", role: "User" }
  ]);

  const onDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      <div className="flex w-full h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Users Table Section */}
        <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8 scrollbar-hide">
          <h2 className="text-3xl font-bold text-gray-800">Manage Users</h2>
          <div className="w-full bg-white p-6 rounded-xl shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Profile</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Contact</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-600">No users found.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-3"><img src={user.profilePic} alt="Profile" className="w-10 h-10 rounded-full" /></td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.contact}</td>
                      <td className="p-3">{user.role}</td>
                      <td className="p-3 text-center">
                        <button onClick={() => onDeleteUser(user.id)} className="text-red-600 hover:text-red-800">
                          <FaTrash className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
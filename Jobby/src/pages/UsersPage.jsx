import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized: No token found.");
        }

        const response = await fetch("http://localhost:5000/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          throw new Error("Unauthorized! Please log in again.");
        }

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const onDeleteUser = async (userId) => {
    try {
      setDeletingUserId(userId);
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err.message);
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Header />
      <div className="flex w-full h-[calc(100vh-80px)]">
        <Sidebar />
        <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8 scrollbar-hide">
          <h2 className="text-3xl font-bold text-gray-800">Manage Users</h2>

          <div className="w-full bg-white p-6 rounded-xl shadow-lg">
            {loading ? (
              <p className="text-center text-gray-600">Loading users...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : users.length === 0 ? (
              <p className="text-center text-gray-600">No users found.</p>
            ) : (
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
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-3">
                        <img
                          src={user.profilepic || "/default-avatar.png"}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.mobile}</td>
                      <td className="p-3">{user.role}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => onDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                          disabled={deletingUserId === user.id}
                        >
                          {deletingUserId === user.id ? "Deleting..." : <FaTrash className="text-xl" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileImage from "../assets/profile.png";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        full_name: "",
        bio: "",
        email: "",
        mobile: "",
        profilepic: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser || !storedUser.id || !token) {
            navigate("/login");
            return;
        }

        axios.get(`http://localhost:5000/api/users/${storedUser.id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        })
            .then((response) => {
                setProfileData(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
                if (error.response?.status === 401) navigate("/login");
            });
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    };

    const handleSaveClick = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const formData = new FormData();
        formData.append("full_name", profileData.full_name);
        formData.append("bio", profileData.bio);
        formData.append("email", profileData.email);
        formData.append("mobile", profileData.mobile);
        if (selectedFile) formData.append("profilepic", selectedFile);

        axios.put(`http://localhost:5000/api/users/${profileData.id}`, formData, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        })
            .then((response) => {
                setProfileData(response.data.updatedUser);
                localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
                setIsEditing(false);
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                if (error.response?.status === 401) navigate("/login");
            });
    };

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <Header />
            <div className="flex w-full h-[calc(100vh-80px)]">
                <Sidebar />
                <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8">
                    <div className="bg-white w-11/12 p-8 border border-gray-300 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Profile</h2>

                        <div className="flex items-center justify-center mb-6">
                            {isEditing ? (
                                <input type="file" accept="image/*" onChange={handleFileChange} className="border h-[20vh] w-[20vh] rounded-full" />
                            ) : (
                                <img
                                    src={
                                        profileData.profilepic
                                            ? profileData.profilepic.startsWith("http") || profileData.profilepic.startsWith("/")
                                                ? profileData.profilepic
                                                : `http://localhost:5000/${profileData.profilepic}`
                                            : ProfileImage
                                    }
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full"
                                />

                            )}
                        </div>

                        <div className="space-y-4">
                            {["full_name", "bio", "email", "mobile"].map((field, index) => (
                                <div key={index}>
                                    <label className="block text-gray-700 font-medium capitalize">{field.replace("_", " ")}:</label>
                                    {isEditing ? (
                                        <input
                                            type={field === "email" ? "email" : "text"}
                                            name={field}
                                            value={profileData[field]}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                        />
                                    ) : (
                                        <span className="block text-gray-800">{profileData[field] || "N/A"}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            {isEditing ? (
                                <button
                                    onClick={handleSaveClick}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

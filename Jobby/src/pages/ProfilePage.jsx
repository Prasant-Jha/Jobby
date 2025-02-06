import React, { useState } from 'react';
import { FaSearch, FaHome, FaBriefcase, FaPlus, FaUser, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';
import ProfileImage from "../assets/profile.png";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        bio: 'Not Available',
        email: 'john.doe@example.com',
        contact: '6352238384',
        role: 'Admin',
        profilePicture: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData((prevData) => ({
                    ...prevData,
                    profilePicture: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        console.log('Saved profile data:', profileData);
    };

    return (
        <div className="w-full min-h-screen bg-gray-100">
            {/* Header Section */}
            <Header />

            <div className="flex w-full h-[calc(100vh-80px)]">
                {/* Sidebar */}
                <Sidebar />

                {/* Profile Page Content */}
                <div className="w-3/4 h-full flex flex-col items-center overflow-y-auto py-10 space-y-6 px-8">
                    <div className="bg-white w-11/12 p-8 border border-gray-300 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>

                        <div className="flex items-center justify-center">
                            {isEditing ? (
                                <input
                                    type="file"
                                    name="profilePicture"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    className="mb-6"
                                />
                            ) : (
                                <div>
                                    {profileData.profilePicture ? (
                                        <img
                                            src={profileData.profilePicture}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full"
                                        />
                                    ) : (
                                        <img
                                            src={ProfileImage}
                                            alt="Default Profile"
                                            className="w-32 h-32 rounded-full"
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label>Name: </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                    />
                                ) : (
                                    <span>{profileData.name}</span>
                                )}
                            </div>

                            <div>
                                <label>Bio: </label>
                                {isEditing ? (
                                    <textarea
                                        name="bio"
                                        rows={4}
                                        cols={50}
                                        value={profileData.bio}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                    />
                                ) : (
                                    <span>{profileData.bio}</span>
                                )}
                            </div>

                            <div>
                                <label>Email: </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                    />
                                ) : (
                                    <span>{profileData.email}</span>
                                )}
                            </div>

                            <div>
                                <label>Contact: </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="contact"
                                        value={profileData.contact}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                    />
                                ) : (
                                    <span>{profileData.contact}</span>
                                )}
                            </div>

                            <div>
                                <label>Role: </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="role"
                                        value={profileData.role}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                    />
                                ) : (
                                    <span>{profileData.role}</span>
                                )}
                            </div>
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
                                    onClick={handleEditClick}
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

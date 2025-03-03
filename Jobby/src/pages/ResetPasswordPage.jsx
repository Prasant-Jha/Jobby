import { useState } from "react";
import { FaLock } from "react-icons/fa";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "your email";
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("❌ Passwords do not match!");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/users/reset-password", { email, newPassword: password });
            setMessage("✅ Password reset successful!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setMessage("❌ Error resetting password.");
        }
    };
    

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <Header />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-[18vh]">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Reset Password</h2>
                <p className="text-gray-600 text-center mt-2">Enter a new password for <strong className="text-blue-600">{email}</strong></p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="relative">
                        <FaLock className="absolute left-4 top-3 text-gray-500 text-lg" />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-4 top-3 text-gray-500 text-lg" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition">Reset Password</button>
                </form>
                {message && <p className={`mt-4 text-center font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
            </div>
        </div>
    );
};

export default ResetPasswordPage;

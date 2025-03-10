import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/users/request-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                navigate("/verify-otp", { state: { email } });
            } else {
                setMessage(data.message || "Error sending OTP.");
            }
        } catch (error) {
            setMessage("Server error. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <Header />
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 mt-[20vh] border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Forgot Password?</h2>
                <p className="text-gray-600 text-center mt-2">Enter your email to receive an OTP.</p>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md mt-4 font-medium shadow-md hover:bg-blue-700 transition">
                        Send OTP
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;

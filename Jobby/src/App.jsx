import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Job from "./pages/Job";
import JobDetailsPage from "./pages/JobDetailsPage";
import PostJob from "./pages/PostJob";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyOTPPage from "./pages/VerifyOTPPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ApplyJob from "./pages/ApplyJob";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UsersPage from "./pages/UsersPage";
import JobPostsPage from "./pages/JobPostsPage";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Applicants from "./pages/Applicants";
import UpdateJob from "./pages/UpdateJob";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default page */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/job-details/:jobId" element={<JobDetailsPage />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/apply-job/:jobId" element={<ApplyJob />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/job-posts" element={<JobPostsPage />} />
        <Route path="/update-job/:jobId" element={<UpdateJob />} />
      </Routes>
    </Router>
  );
}

export default App;

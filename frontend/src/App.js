import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import JobBoard from "./pages/JobBoard";
import Apply from "./pages/Apply";
import MyApplications from "./MyApplications";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-admin" element={<AdminLogin />} />
        <Route path="/login-user" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/my-applications" element={<MyApplications />} />
      </Routes>
    </Router>
  );
}

export default App;


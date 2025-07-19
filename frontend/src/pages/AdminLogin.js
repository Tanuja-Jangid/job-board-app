import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      alert("✅ Admin login successful!");
      navigate("/admin");
    } catch (error) {
      alert("❌ Login failed: " + (error.response?.data?.detail || "Unknown error"));
    }
  };

  const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage:
        "url('https://content.yourcareer.gov.au/sites/default/files/2025-06/Career-pathways-card.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      zIndex: 0,
    },
    form: {
      backgroundColor: "#fff",
      padding: "2.5rem",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      position: "relative",
      zIndex: 1,
    },
    heading: {
      textAlign: "center",
      color: "#2c3e50",
      marginBottom: "1.5rem",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "1rem",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "1rem",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#2c3e50",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <Header />
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>🛡️ Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1a252f")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2c3e50")}
        >
          🚀 Login
        </button>
      </form>
    </div>
  );
}


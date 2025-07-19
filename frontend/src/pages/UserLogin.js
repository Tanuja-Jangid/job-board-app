import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/users/login", {
        email,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      console.log("🪪 Token stored:", token);

      alert("✅ Login successful!");
      navigate("/jobs");
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
      backgroundImage: "url('https://content.yourcareer.gov.au/sites/default/files/2025-06/Career-pathways-card.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      zIndex: 1,
    },
    formWrapper: {
      zIndex: 2,
      width: "100%",
      maxWidth: "420px",
    },
    form: {
      background: "#ffffff",
      padding: "2.5rem",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    },
    heading: {
      textAlign: "center",
      marginBottom: "1.5rem",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "1rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "1rem",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "1rem",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <Header />
      <div style={styles.formWrapper}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.heading}>🔐 User Login</h2>
          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            🚀 Login
          </button>
        </form>
      </div>
    </div>
  );
}

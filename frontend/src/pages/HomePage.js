import { useNavigate } from "react-router-dom";
import { FaUserShield, FaUser, FaUserPlus } from "react-icons/fa";
import { useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();

  // Load custom font and remove scroll
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "url('https://miro.medium.com/v2/resize:fit:3840/format:webp/1*25jwdH0rbcIUfd5hCaT-og.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontFamily: "'Poppins', sans-serif",
      padding: "20px",
      textAlign: "center",
    },
    heading: {
      fontSize: "3.5rem",
      fontWeight: "700",
      marginBottom: "0.5rem",
      color: "#fff",
      textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
      letterSpacing: "1px",
    },
    subheading: {
      fontSize: "1.4rem",
      fontWeight: "400",
      marginBottom: "2.5rem",
      color: "#f8f9fa",
      textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      padding: "12px 24px",
      margin: "10px",
      fontSize: "1rem",
      fontWeight: "600",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s",
      width: "220px",
      letterSpacing: "0.5px",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
    styleTag: `
      @media (max-width: 600px) {
        h1 { font-size: 2rem !important; }
        p { font-size: 1rem !important; }
        button { font-size: 0.9rem !important; width: 90% !important; }
      }
    `,
  };

  const handleHover = (e, isHovering) => {
    e.target.style.backgroundColor = isHovering
      ? styles.buttonHover.backgroundColor
      : styles.button.backgroundColor;
    e.target.style.transform = isHovering
      ? styles.buttonHover.transform
      : "scale(1)";
  };

  return (
    <div style={styles.container}>
      <style>{styles.styleTag}</style>

      <h1 style={styles.heading}>👋 Welcome to Job Board</h1>
      <p style={styles.subheading}>Your gateway to exciting career opportunities 🚀</p>

      <button
        style={styles.button}
        onMouseOver={(e) => handleHover(e, true)}
        onMouseOut={(e) => handleHover(e, false)}
        onClick={() => navigate("/login-admin")}
      >
        <FaUserShield />
        Login as Admin
      </button>

      <button
        style={styles.button}
        onMouseOver={(e) => handleHover(e, true)}
        onMouseOut={(e) => handleHover(e, false)}
        onClick={() => navigate("/login-user")}
      >
        <FaUser />
        Login as User
      </button>

      <button
        style={styles.button}
        onMouseOver={(e) => handleHover(e, true)}
        onMouseOut={(e) => handleHover(e, false)}
        onClick={() => navigate("/register")}
      >
        <FaUserPlus />
        Register
      </button>
    </div>
  );
}

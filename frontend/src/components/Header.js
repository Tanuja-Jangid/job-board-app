// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi"; // professional home icon

function Header() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <HiOutlineHome
        onClick={() => navigate("/")}
        style={styles.icon}
        title="Back to Home"
      />
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: "15px",
    left: "20px",
    zIndex: 1000,
  },
  icon: {
    fontSize: "2rem",
    cursor: "pointer",
    color: "#333",
  },
};

export default Header;

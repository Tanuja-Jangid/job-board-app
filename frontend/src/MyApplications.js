import React, { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("⚠️ No token found. User might not be logged in.");
          return;
        }

        const res = await axios.get("http://localhost:8000/applications/my-applications/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        <h2 style={styles.heading}>📂 My Applications</h2>

        {applications.length === 0 ? (
          <p style={styles.noData}>🚫 You haven't submitted any applications yet.</p>
        ) : (
          <div style={styles.cardContainer}>
            {applications.map((app, index) => (
              <div key={app.id || index} style={styles.card}>
                <h3 style={styles.jobTitle}>{app.job?.title || "Untitled Role"}</h3>
                <p>
                  <strong>Status:</strong>{" "}
                  <span style={styles.status}>{app.status || "N/A"}</span>
                </p>
                <p>
                  <strong>Applied on:</strong>{" "}
                  {app.created_at
                    ? new Date(app.created_at).toLocaleString()
                    : "Unknown"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    backgroundImage:
      "url('https://content.yourcareer.gov.au/sites/default/files/2025-06/Career-pathways-card.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 0,
  },
  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem",
    color: "#2c3e50",
  },
  noData: {
    textAlign: "center",
    fontSize: "1.1rem",
    color: "#888",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s",
  },
  jobTitle: {
    margin: 0,
    marginBottom: "0.5rem",
    color: "#007bff",
  },
  status: {
    fontWeight: "600",
    color: "#28a745",
  },
};

export default MyApplications;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ location: "", minSalary: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/jobs/").then((response) => {
      setJobs(response.data);
    });
  }, []);

  const handleFilter = async () => {
    try {
      const res = await axios.get("http://localhost:8000/jobs/");
      const filtered = res.data.filter((job) => {
        const matchesLocation =
          filters.location === "" ||
          job.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesSalary =
          filters.minSalary === "" || job.salary >= parseFloat(filters.minSalary);
        return matchesLocation && matchesSalary;
      });
      setJobs(filtered);
    } catch (err) {
      console.error("Failed to fetch or filter jobs", err);
    }
  };

  const styles = {
    page: {
      maxWidth: "900px",
      margin: "auto",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', sans-serif",
      background: "#f6f9fc",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "2rem",
      color: "#2c3e50",
    },
    viewButton: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "10px 16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "1rem",
    },
    filters: {
      display: "flex",
      gap: "12px",
      marginBottom: "30px",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "6px",
      flex: "1",
    },
    searchButton: {
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "10px 16px",
      cursor: "pointer",
      fontSize: "1rem",
    },
    jobCard: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      padding: "20px",
      marginBottom: "20px",
      transition: "transform 0.2s",
    },
    applyButton: {
      backgroundColor: "#343a40",
      color: "#fff",
      padding: "10px 16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "1rem",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.page}>
      <Header />
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🚀 Available Jobs</h1>
        <button style={styles.viewButton} onClick={() => navigate("/my-applications")}>
          📄 View My Applications
        </button>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Minimum salary"
          value={filters.minSalary}
          onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleFilter} style={styles.searchButton}>🔍 Search</button>
      </div>

      {/* Job Listings */}
      {jobs.length === 0 ? (
        <p style={{ color: "#666", fontStyle: "italic" }}>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            style={styles.jobCard}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h2>{job.title}</h2>
            <p><strong>📍 Location:</strong> {job.location}</p>
            <p><strong>💰 Salary:</strong> ₹{job.salary}</p>
            <p><strong>📝 Description:</strong> {job.description}</p>
            <p><strong>📌 Status:</strong> {job.status}</p>
            <button
              onClick={() => window.location.href = `/apply/${job.id}`}
              style={styles.applyButton}
            >
              ✍️ Apply
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobBoard;

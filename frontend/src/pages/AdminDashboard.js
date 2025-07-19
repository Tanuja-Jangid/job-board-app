import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showApplications, setShowApplications] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs/");
      setJobs(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/all-applications/");
      setApplications(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch applications:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      salary: parseFloat(form.salary),
    };

    try {
      if (editId) {
        await API.put(`/jobs/${editId}/`, payload);
        setEditId(null);
      } else {
        await API.post("/jobs/", payload);
      }
      setForm({ title: "", description: "", location: "", salary: "", status: "Active" });
      fetchJobs();
    } catch (err) {
      alert(editId ? "Failed to update job" : "Failed to add job");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  const handleEdit = (job) => {
    setEditId(job.id);
    setForm({
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      status: job.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ title: "", description: "", location: "", salary: "", status: "Active" });
  };

  const toggleApplications = async () => {
    const newShowState = !showApplications;
    setShowApplications(newShowState);
    if (newShowState) {
      await fetchApplications();
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <h2 style={styles.heading}>🛠️ Admin Dashboard</h2>

      {/* Job Form */}
      <div style={styles.formContainer}>
        <h3 style={styles.sectionHeading}>{editId ? "✏️ Edit Job" : "➕ Add New Job"}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" required style={styles.input} />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Job Description" required rows="3" style={styles.textarea} />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required style={styles.input} />
          <input type="number" name="salary" value={form.salary} onChange={handleChange} placeholder="Salary (₹)" required style={styles.input} />
          <select name="status" value={form.status} onChange={handleChange} style={styles.input}>
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" style={styles.primaryButton}>
              {editId ? "Update Job" : "Add Job"}
            </button>
            {editId && (
              <button type="button" onClick={handleCancelEdit} style={styles.secondaryButton}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Job List */}
      <h3 style={styles.sectionHeading}>📋 All Job Listings</h3>
      <div style={styles.cardGrid}>
        {jobs.map((job) => (
          <div key={job.id} style={styles.card}>
            <h4 style={styles.jobTitle}>{job.title}</h4>
            <p><strong>📍 Location:</strong> {job.location}</p>
            <p><strong>💰 Salary:</strong> ₹{job.salary}</p>
            <p><strong>📌 Status:</strong> {job.status}</p>
            <p style={{ marginTop: "0.5rem" }}>{job.description}</p>
            <div style={styles.buttonGroup}>
              <button onClick={() => handleEdit(job)} style={styles.smallButton}>✏️ Edit</button>
              <button onClick={() => handleDelete(job.id)} style={styles.deleteButton}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle Applications */}
      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <button onClick={toggleApplications} style={styles.toggleButton}>
          {showApplications ? "🔽 Hide Applications" : "📨 View Applications"}
        </button>
      </div>

      {/* Applications Table */}
      {showApplications && (
        <>
          <h3 style={styles.sectionHeading}>📄 User Applications</h3>
          {applications.length === 0 ? (
            <p style={styles.noData}>No applications submitted yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: "#f1f1f1" }}>
                    <th>Job Title</th>
                    <th>Applicant</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Applied On</th>
                    <th>Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={app.id} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                      <td>{app.job?.title || "N/A"}</td>
                      <td>{app.name || "Anonymous"}</td>
                      <td>{app.email}</td>
                      <td>{app.status}</td>
                      <td>
                        {new Date(app.created_at).toLocaleString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td>
                        {app.resume_url ? (
                          <a href={app.resume_url} target="_blank" rel="noopener noreferrer">📎 View</a>
                        ) : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#fefefe",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1.5rem",
    color: "#2c3e50",
    textAlign: "center",
  },
  sectionHeading: {
    fontSize: "1.75rem",
    color: "#333",
    marginTop: "2rem",
    marginBottom: "1rem",
    borderBottom: "2px solid #ccc",
    paddingBottom: "0.5rem",
  },
  formContainer: {
    background: "#ffffff",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "100%",
  },
  textarea: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    resize: "vertical",
    width: "100%",
  },
  primaryButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginTop: "1rem",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    padding: "1.25rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    transition: "transform 0.2s ease",
  },
  jobTitle: {
    marginBottom: "0.5rem",
    color: "#007bff",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  smallButton: {
    padding: "0.4rem 0.8rem",
    backgroundColor: "#ffc107",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  deleteButton: {
    padding: "0.4rem 0.8rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonGroup: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "flex-start",
    gap: "0.5rem",
  },
  toggleButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#17a2b8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  },
  noData: {
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
    marginTop: "1rem",
  },
};

export default AdminDashboard;


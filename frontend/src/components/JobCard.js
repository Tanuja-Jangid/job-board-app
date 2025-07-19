import React from "react";
import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div className="job-card" style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, marginBottom: 16 }}>
      <h2>{job.title}</h2>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> ₹{job.salary}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <Link to={`/apply/${job.id}`}>
        <button>Apply</button>
      </Link>
    </div>
  );
}

export default JobCard;

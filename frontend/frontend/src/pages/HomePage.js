import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome 🌟</h1>
      <p>
        This is your Project Management App. Use the navigation to view or add projects.
      </p>

      <div style={{ marginTop: 20 }}>
        <Link to="/projects" className="btn btn-primary me-2">View Projects</Link>
        <Link to="/add" className="btn btn-outline-primary">Add Project</Link>
      </div>
    </div>
  );
}


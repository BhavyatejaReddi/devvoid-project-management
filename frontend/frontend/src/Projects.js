import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const navigate = useNavigate();

  // Fetch all projects from backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch("http://localhost:5000/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  };

  // Add new project
  const handleAddProject = () => {
    if (!newProjectName || !newProjectDesc) return;
    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newProjectName, description: newProjectDesc }),
    })
      .then((res) => res.json())
      .then(() => {
        setNewProjectName("");
        setNewProjectDesc("");
        fetchProjects();
      })
      .catch((err) => console.error(err));
  };

  // Delete project
  const handleDelete = (projectId) => {
    fetch(`http://localhost:5000/projects/${projectId}`, { method: "DELETE" })
      .then(() => fetchProjects())
      .catch((err) => console.error(err));
  };

  // Edit project name
  const handleEdit = (project) => {
    const newName = prompt("Enter new project name:", project.name);
    const newDesc = prompt("Enter new project description:", project.description);
    if (newName && newDesc) {
      fetch(`http://localhost:5000/projects/${project._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, description: newDesc }),
      })
        .then(() => fetchProjects())
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">My Projects</h2>

      {/* Add new project form */}
      <div className="card mb-4 p-3 shadow-sm">
        <h5 className="mb-3">Create New Project</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Project Name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Project Description"
          value={newProjectDesc}
          onChange={(e) => setNewProjectDesc(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddProject}>
          Add Project
        </button>
      </div>

      {/* Project List */}
      {projects.length === 0 ? (
        <p className="text-center text-muted">No projects found</p>
      ) : (
        projects.map((project) => (
          <div
            key={project._id}
            className="card mb-3 shadow-sm"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/tasks/${project._id}`)}
          >
            <div className="card-body">
              <h4 className="card-title">{project.name}</h4>
              <p className="card-text text-muted">{project.description}</p>
              <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                Created on: {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(project);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(project._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Projects;

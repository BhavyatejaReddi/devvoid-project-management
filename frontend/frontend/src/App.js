import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "./Projects";
import Tasks from "./Tasks";

function App() {
  const [projects, setProjects] = useState([]);

  // Fetch projects from backend
  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center mb-4 text-primary">Project Management System</h1>

        <Routes>
          {/* Pass setProjects so Projects page can update project names */}
          <Route path="/" element={<Projects projects={projects} setProjects={setProjects} />} />
          <Route path="/tasks/:projectId" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
import projectRoutes from "./routes/projectRoutes.js";
app.use("/api/projects", projectRoutes);


// --- Temporary route to test ---
app.get("/", (req, res) => {
  res.send("Backend is working fine ");
});

// --- MongoDB connection ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/devvoidDB";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch((err) => console.error(" MongoDB connection error:", err));
import Project from "./models/Project.js"; // add at top with other imports

// --- Create a new project ---
app.post("/projects", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newProject = new Project({ name, description });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// --- Get all projects ---
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find(); // get all projects from DB
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// --- Get a single project by ID ---
app.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// --- Update a project by ID ---
app.put("/projects/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true } // return the updated project
    );
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// --- Delete a project by ID ---
app.delete("/projects/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
import Task from "./models/Task.js"; // make sure this import is at the top

// --- Create a new task ---
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, status, projectId } = req.body;
    const newTask = new Task({ title, description, status, projectId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// --- Get all tasks for a project ---
app.get("/tasks/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// --- Update a task ---
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// --- Delete a task ---
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

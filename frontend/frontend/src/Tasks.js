import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Tasks() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const STATUSES = ["To Do", "In Progress", "Done"];

  // Fetch tasks
  const fetchTasks = () => {
    fetch(`http://localhost:5000/tasks/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setEditingTaskId(null);
        setTitle("");
        setDescription("");
        setStatus("To Do");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!projectId) return;
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleAddTask = () => {
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status, projectId }),
    })
      .then((res) => res.json())
      .then(() => fetchTasks())
      .catch((err) => console.error(err));
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  };

  const handleUpdateTask = () => {
    fetch(`http://localhost:5000/tasks/${editingTaskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status }),
    })
      .then((res) => res.json())
      .then(() => fetchTasks())
      .catch((err) => console.error(err));
  };

  const handleDelete = (taskId) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => fetchTasks())
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">Tasks</h2>
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/")}
      >
        ← Back to Projects
      </button>

      {/* Task Form */}
      <div className="card mb-4 p-3 shadow-sm">
        <h5 className="mb-3">{editingTaskId ? "Edit Task" : "Add New Task"}</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-select mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        {editingTaskId ? (
          <>
            <button className="btn btn-success me-2" onClick={handleUpdateTask}>
              Update Task
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setEditingTaskId(null);
                setTitle("");
                setDescription("");
                setStatus("To Do");
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-success" onClick={handleAddTask}>
            Add Task
          </button>
        )}
      </div>

      {/* Task Columns */}
      <div className="row">
        {STATUSES.map((s) => (
          <div className="col-md-4" key={s}>
            <h5 className="text-center">{s}</h5>
            <div className="card p-2 mb-3 shadow-sm" style={{ minHeight: "200px" }}>
              {tasks.filter((t) => t.status === s).length === 0 && (
                <p className="text-muted text-center">No tasks</p>
              )}
              {tasks
                .filter((t) => t.status === s)
                .map((task) => (
                  <div className="card mb-2 p-2" key={task._id}>
                    <strong>{task.title}</strong>
                    <p className="mb-1">{task.description}</p>
                    <div>
                      <button
                        className="btn btn-sm btn-primary me-1"
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;

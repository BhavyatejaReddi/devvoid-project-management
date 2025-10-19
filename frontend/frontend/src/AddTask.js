import React, { useState } from "react";

function AddTask({ projectId, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        status: "To Do",
        projectId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        onTaskAdded(data);
        setTitle("");
        setDescription("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <h5 className="mb-3 text-primary">Add New Task</h5>
      
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <textarea
          className="form-control"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-success">
        Add Task
      </button>
    </form>
  );
}

export default AddTask;

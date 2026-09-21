import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask({ addTask }) {
  const navigate = useNavigate();
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Academic");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (header.trim() === "" || description.trim() === "") {
      alert("Please fill all required fields.");
      return;
    }

    addTask({
      header: header.trim(),
      description: description.trim(),
      priority,
      category
    });
    navigate("/tasks");
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Add New Task</h1>
          <p>Create a new task for your task manager.</p>
        </div>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Header</label>
          <input type="text" placeholder="Enter task header" value={header} onChange={e => setHeader(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Task Description</label>
          <textarea rows="5" placeholder="Enter task description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Academic">Academic</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
        </div>

        <div className="automatic-info">
          <h3>Task Information</h3>
          <div className="info-grid">
            <div>
              <span>Raised Date & Time</span>
              <strong>Automatically Generated</strong>
            </div>
            <div>
              <span>Due Date</span>
              <strong>28 Aug 2026</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>Raised</strong>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-btn" onClick={() => navigate("/tasks")}>Cancel</button>
          <button type="submit" className="primary-btn">Create Task</button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;

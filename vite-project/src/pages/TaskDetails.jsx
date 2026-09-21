import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TaskDetails({ tasks, updateTask, deleteTask, completeTask }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find(task => task.id === Number(id));

  const [editing, setEditing] = useState(false);
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  if (!task) {
    return (
      <div className="page">
        <div className="empty">
          <div className="empty-icon">❌</div>
          <h2>Task Not Found</h2>
          <p>The task with ID {id} does not exist.</p>
          <br />
          <button className="primary-btn" onClick={() => navigate("/tasks")}>Back to Tasks</button>
        </div>
      </div>
    );
  }

  const startEditing = () => {
    setHeader(task.header);
    setDescription(task.description);
    setPriority(task.priority);
    setCategory(task.category);
    setEditing(true);
  };

  const handleUpdate = () => {
    if (header.trim() === "" || description.trim() === "") {
      alert("Header and description are required.");
      return;
    }

    updateTask({
      ...task,
      header: header.trim(),
      description: description.trim(),
      priority,
      category
    });
    setEditing(false);
    alert("Task updated successfully.");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      deleteTask(task.id);
      navigate("/tasks");
    }
  };

  const handleComplete = () => {
    completeTask(task.id);
    navigate("/completed");
  };

  return (
    <div className="page">
      <div className="details-top">
        <button className="back-btn" onClick={() => navigate("/tasks")}>← Back to Tasks</button>
        <span>Task ID: {task.id}</span>
      </div>

      {editing ? (
        <div className="details-card">
          <h1>Edit Task</h1>
          <div className="task-form edit-form">
            <div className="form-group">
              <label>Task Header</label>
              <input value={header} onChange={e => setHeader(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Task Description</label>
              <textarea rows="5" value={description} onChange={e => setDescription(e.target.value)} />
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
            <div className="form-actions">
              <button className="secondary-btn" onClick={() => setEditing(false)}>Cancel</button>
              <button className="primary-btn" onClick={handleUpdate}>Save Changes</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="details-card">
          <div className="details-title">
            <div>
              <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span>
              <h1>{task.header}</h1>
            </div>
          </div>
          <div className="description-box">
            <h3>Task Description</h3>
            <p>{task.description}</p>
          </div>
          <div className="details-grid">
            <div className="detail-item"><span>🎯 Priority</span><strong>{task.priority}</strong></div>
            <div className="detail-item"><span>📂 Category</span><strong>{task.category}</strong></div>
            <div className="detail-item"><span>🕒 Raised Date & Time</span><strong>{task.raisedDate}</strong></div>
            <div className="detail-item"><span>📅 Due Date</span><strong>{task.dueDate}</strong></div>
            <div className="detail-item"><span>📌 Status</span><strong>{task.status}</strong></div>
          </div>
          <div className="details-actions">
            <button className="edit-btn" onClick={startEditing}>✏ Edit Task</button>
            {task.status !== "Closed" && (
              <button className="complete-btn" onClick={handleComplete}>✓ Mark Completed</button>
            )}
            <button className="delete-btn" onClick={handleDelete}>🗑 Delete Task</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskDetails;

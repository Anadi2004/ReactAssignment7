import { useState } from "react";
import { Link } from "react-router-dom";

function Tasks({ tasks, deleteTask, completeTask }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredTasks = tasks.filter(task => {
    const statusMatch = statusFilter === "All" || task.status === statusFilter;
    const priorityMatch = priorityFilter === "All" || task.priority === priorityFilter;
    const categoryMatch = categoryFilter === "All" || task.category === categoryFilter;
    return statusMatch && priorityMatch && categoryMatch;
  });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>All Tasks</h1>
          <p>View, manage and update your tasks.</p>
        </div>
        <Link to="/add-task" className="primary-btn">+ Add Task</Link>
      </div>

      <div className="filters">
        <div>
          <label>Status</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Raised">Raised</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div>
          <label>Priority</label>
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label>Category</label>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            <option value="All">All Category</option>
            <option value="Academic">Academic</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">📭</div>
            <h2>No Tasks Found</h2>
            <p>Try changing your filters or add a new task.</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div className="task-card" key={task.id}>
              <div className="task-main">
                <div className="task-title-row">
                  <h2>{task.header}</h2>
                  <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span>
                </div>
                <p className="task-description">{task.description}</p>
                <div className="task-meta">
                  <span>🎯 Priority: <strong>{task.priority}</strong></span>
                  <span>📂 Category: <strong>{task.category}</strong></span>
                  <span>📅 Due: <strong>{task.dueDate}</strong></span>
                </div>
              </div>
              <div className="task-actions">
                <Link to={`/tasks/${task.id}`} className="view-btn">View Details</Link>
                {task.status !== "Closed" && (
                  <button className="complete-btn" onClick={() => completeTask(task.id)}>✓ Complete</button>
                )}
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑 Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tasks;

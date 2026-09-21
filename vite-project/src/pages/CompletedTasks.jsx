import { Link } from "react-router-dom";

function CompletedTasks({ tasks, deleteTask }) {
  const completedTasks = tasks.filter(task => task.status === "Closed");

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Completed Tasks</h1>
          <p>All the tasks you have completed.</p>
        </div>
      </div>

      {completedTasks.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🎯</div>
          <h2>No Completed Tasks</h2>
          <p>Complete a task and it will appear here.</p>
        </div>
      ) : (
        <div className="task-list">
          {completedTasks.map(task => (
            <div className="task-card completed-card" key={task.id}>
              <div className="task-main">
                <div className="task-title-row">
                  <h2>✓ {task.header}</h2>
                  <span className="status closed">Closed</span>
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
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompletedTasks;

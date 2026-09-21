import { Link } from "react-router-dom";

function Dashboard({ tasks }) {
  const totalTasks = tasks.length;
  const raisedTasks = tasks.filter(task => task.status === "Raised").length;
  const pendingTasks = tasks.filter(task => task.status === "Pending").length;
  const completedTasks = tasks.filter(task => task.status === "Closed").length;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Manage all your tasks from one place.</p>
        </div>
        <Link to="/add-task" className="primary-btn">+ Add Task</Link>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">📋</div>
          <div>
            <h2>{totalTasks}</h2>
            <p>Total Tasks</p>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-icon">🟡</div>
          <div>
            <h2>{raisedTasks}</h2>
            <p>Raised Tasks</p>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-icon">🔵</div>
          <div>
            <h2>{pendingTasks}</h2>
            <p>Pending Tasks</p>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-icon">🟢</div>
          <div>
            <h2>{completedTasks}</h2>
            <p>Completed Tasks</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-heading">
          <h2>Recent Tasks</h2>
          <Link to="/tasks">View All</Link>
        </div>
        {tasks.length === 0 ? (
          <div className="empty">No tasks available.</div>
        ) : (
          <div className="recent-list">
            {tasks.slice(-4).reverse().map(task => (
              <div className="recent-task" key={task.id}>
                <div>
                  <h3>{task.header}</h3>
                  <p>{task.category} • {task.priority}</p>
                </div>
                <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

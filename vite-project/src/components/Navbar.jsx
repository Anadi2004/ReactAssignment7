import { Link, useNavigate, Outlet } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">📝 Task Manager</div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/add-task">Add Task</Link>
          <Link to="/completed">Completed</Link>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;

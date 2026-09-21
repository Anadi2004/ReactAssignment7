import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useParams
} from "react-router-dom";

import "./App.css";


/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute() {

  const token =
    localStorage.getItem("jwt_token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}


/* =========================================================
   NAVBAR
========================================================= */

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

        <div className="logo">
          📝 Task Manager
        </div>

        <div className="nav-links">

          <Link to="/">
            Dashboard
          </Link>

          <Link to="/tasks">
            Tasks
          </Link>

          <Link to="/add-task">
            Add Task
          </Link>

          <Link to="/completed">
            Completed
          </Link>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </nav>

      <Outlet />

    </>
  );
}


/* =========================================================
   LOGIN PAGE
========================================================= */

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("StrongPassword123!");
  const [rememberMe, setRememberMe] = useState(false);

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score < 2) return { text: "Weak", color: "red" };
    if (score < 4) return { text: "Medium", color: "orange" };
    return { text: "Strong", color: "green" };
  };

  const strength = calculateStrength(password);

  const login = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Username and Password are required!");
      return;
    }

    const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.simulated_payload.simulated_signature";

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("jwt_token", fakeToken);

    if (rememberMe) {
      localStorage.setItem("username", username);
    }

    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-icon">📝</div>
        <h1>Task Manager</h1>
        <p>Login to manage your tasks</p>

        <form onSubmit={login} className="login-form">
          <div className="form-group">
            <label>Username (Required)</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label>Password (Required)</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            {password && (
              <div style={{ marginTop: '5px', fontSize: '12px', color: strength.color }}>
                Password Strength: {strength.text}
              </div>
            )}
          </div>

          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              id="remember" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
              style={{ width: 'auto' }}
            />
            <label htmlFor="remember" style={{ margin: 0, fontWeight: 'normal' }}>Remember Me</label>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ tasks }) {

  const totalTasks =
    tasks.length;

  const raisedTasks =
    tasks.filter(
      task => task.status === "Raised"
    ).length;

  const pendingTasks =
    tasks.filter(
      task => task.status === "Pending"
    ).length;

  const completedTasks =
    tasks.filter(
      task => task.status === "Closed"
    ).length;

  return (

    <div className="page">

      <div className="page-header">

        <div>
          <h1>
            Dashboard
          </h1>

          <p>
            Manage all your tasks from one place.
          </p>
        </div>

        <Link
          to="/add-task"
          className="primary-btn"
        >
          + Add Task
        </Link>

      </div>


      {/* STATISTICS */}

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <div className="card-icon">
            📋
          </div>

          <div>
            <h2>
              {totalTasks}
            </h2>

            <p>
              Total Tasks
            </p>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            🟡
          </div>

          <div>
            <h2>
              {raisedTasks}
            </h2>

            <p>
              Raised Tasks
            </p>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            🔵
          </div>

          <div>
            <h2>
              {pendingTasks}
            </h2>

            <p>
              Pending Tasks
            </p>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            🟢
          </div>

          <div>
            <h2>
              {completedTasks}
            </h2>

            <p>
              Completed Tasks
            </p>
          </div>

        </div>

      </div>


      {/* RECENT TASKS */}

      <div className="dashboard-section">

        <div className="section-heading">

          <h2>
            Recent Tasks
          </h2>

          <Link to="/tasks">
            View All
          </Link>

        </div>


        {tasks.length === 0 ? (

          <div className="empty">
            No tasks available.
          </div>

        ) : (

          <div className="recent-list">

            {tasks.slice(-4).reverse().map(task => (

              <div
                className="recent-task"
                key={task.id}
              >

                <div>

                  <h3>
                    {task.header}
                  </h3>

                  <p>
                    {task.category} • {task.priority}
                  </p>

                </div>

                <span
                  className={`status ${task.status.toLowerCase()}`}
                >
                  {task.status}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}


/* =========================================================
   ADD TASK
========================================================= */

function AddTask({ addTask }) {

  const navigate = useNavigate();

  const [header, setHeader] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [category, setCategory] =
    useState("Academic");


  const handleSubmit = (e) => {

    e.preventDefault();


    if (
      header.trim() === "" ||
      description.trim() === ""
    ) {

      alert(
        "Please fill all required fields."
      );

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

          <h1>
            Add New Task
          </h1>

          <p>
            Create a new task for your task manager.
          </p>

        </div>

      </div>


      <form
        className="task-form"
        onSubmit={handleSubmit}
      >

        {/* HEADER */}

        <div className="form-group">

          <label>
            Task Header
          </label>

          <input
            type="text"
            placeholder="Enter task header"
            value={header}
            onChange={
              e => setHeader(e.target.value)
            }
          />

        </div>


        {/* DESCRIPTION */}

        <div className="form-group">

          <label>
            Task Description
          </label>

          <textarea
            rows="5"
            placeholder="Enter task description"
            value={description}
            onChange={
              e => setDescription(e.target.value)
            }
          />

        </div>


        {/* PRIORITY */}

        <div className="form-row">

          <div className="form-group">

            <label>
              Priority
            </label>

            <select
              value={priority}
              onChange={
                e => setPriority(e.target.value)
              }
            >

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

          </div>


          {/* CATEGORY */}

          <div className="form-group">

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={
                e => setCategory(e.target.value)
              }
            >

              <option value="Academic">
                Academic
              </option>

              <option value="Personal">
                Personal
              </option>

            </select>

          </div>

        </div>


        {/* AUTOMATIC INFORMATION */}

        <div className="automatic-info">

          <h3>
            Task Information
          </h3>

          <div className="info-grid">

            <div>

              <span>
                Raised Date & Time
              </span>

              <strong>
                Automatically Generated
              </strong>

            </div>

            <div>

              <span>
                Due Date
              </span>

              <strong>
                28 Aug 2026
              </strong>

            </div>

            <div>

              <span>
                Status
              </span>

              <strong>
                Raised
              </strong>

            </div>

          </div>

        </div>


        <div className="form-actions">

          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/tasks")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-btn"
          >
            Create Task
          </button>

        </div>

      </form>

    </div>
  );
}


/* =========================================================
   TASKS PAGE
========================================================= */

function Tasks({
  tasks,
  deleteTask,
  completeTask
}) {

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");


  /* FILTER TASKS */

  const filteredTasks =
    tasks.filter(task => {

      const statusMatch =
        statusFilter === "All" ||
        task.status === statusFilter;

      const priorityMatch =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      const categoryMatch =
        categoryFilter === "All" ||
        task.category === categoryFilter;


      return (
        statusMatch &&
        priorityMatch &&
        categoryMatch
      );
    });


  return (

    <div className="page">

      <div className="page-header">

        <div>

          <h1>
            All Tasks
          </h1>

          <p>
            View, manage and update your tasks.
          </p>

        </div>

        <Link
          to="/add-task"
          className="primary-btn"
        >
          + Add Task
        </Link>

      </div>


      {/* FILTER */}

      <div className="filters">

        <div>

          <label>
            Status
          </label>

          <select
            value={statusFilter}
            onChange={
              e => setStatusFilter(e.target.value)
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Raised">
              Raised
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Closed">
              Closed
            </option>

          </select>

        </div>


        <div>

          <label>
            Priority
          </label>

          <select
            value={priorityFilter}
            onChange={
              e => setPriorityFilter(e.target.value)
            }
          >

            <option value="All">
              All Priority
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

        </div>


        <div>

          <label>
            Category
          </label>

          <select
            value={categoryFilter}
            onChange={
              e => setCategoryFilter(e.target.value)
            }
          >

            <option value="All">
              All Categories
            </option>

            <option value="Academic">
              Academic
            </option>

            <option value="Personal">
              Personal
            </option>

          </select>

        </div>

      </div>


      {/* TASK COUNT */}

      <div className="result-count">

        Showing {filteredTasks.length} task(s)

      </div>


      {/* TASK LIST */}

      <div className="task-list">

        {filteredTasks.length === 0 ? (

          <div className="empty">

            <div className="empty-icon">
              📭
            </div>

            <h2>
              No Tasks Found
            </h2>

            <p>
              Try changing your filters or add a new task.
            </p>

          </div>

        ) : (

          filteredTasks.map(task => (

            <div
              className="task-card"
              key={task.id}
            >

              <div className="task-main">

                <div className="task-title-row">

                  <h2>
                    {task.header}
                  </h2>

                  <span
                    className={`status ${task.status.toLowerCase()}`}
                  >
                    {task.status}
                  </span>

                </div>


                <p className="task-description">
                  {task.description}
                </p>


                <div className="task-meta">

                  <span>
                    🎯 Priority:
                    <strong>
                      {task.priority}
                    </strong>
                  </span>

                  <span>
                    📂 Category:
                    <strong>
                      {task.category}
                    </strong>
                  </span>

                  <span>
                    📅 Due:
                    <strong>
                      {task.dueDate}
                    </strong>
                  </span>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="task-actions">

                <Link
                  to={`/tasks/${task.id}`}
                  className="view-btn"
                >
                  View Details
                </Link>


                {task.status !== "Closed" && (

                  <button
                    className="complete-btn"
                    onClick={() =>
                      completeTask(task.id)
                    }
                  >
                    ✓ Complete
                  </button>

                )}


                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}


/* =========================================================
   TASK DETAILS
========================================================= */

function TaskDetails({
  tasks,
  updateTask,
  deleteTask,
  completeTask
}) {

  const { id } =
    useParams();

  const navigate =
    useNavigate();


  /* FIND TASK USING URL PARAMETER */

  const task =
    tasks.find(
      task => task.id === Number(id)
    );


  const [editing, setEditing] =
    useState(false);

  const [header, setHeader] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("");

  const [category, setCategory] =
    useState("");


  /* TASK NOT FOUND */

  if (!task) {

    return (

      <div className="page">

        <div className="empty">

          <div className="empty-icon">
            ❌
          </div>

          <h2>
            Task Not Found
          </h2>

          <p>
            The task with ID {id} does not exist.
          </p>

          <br />

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/tasks")
            }
          >
            Back to Tasks
          </button>

        </div>

      </div>
    );
  }


  /* START EDITING */

  const startEditing = () => {

    setHeader(task.header);

    setDescription(task.description);

    setPriority(task.priority);

    setCategory(task.category);

    setEditing(true);
  };


  /* UPDATE */

  const handleUpdate = () => {

    if (
      header.trim() === "" ||
      description.trim() === ""
    ) {

      alert(
        "Header and description are required."
      );

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


  /* DELETE */

  const handleDelete = () => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );


    if (confirmDelete) {

      deleteTask(task.id);

      navigate("/tasks");
    }
  };


  /* COMPLETE */

  const handleComplete = () => {

    completeTask(task.id);

    navigate("/completed");
  };


  return (

    <div className="page">

      <div className="details-top">

        <button
          className="back-btn"
          onClick={() =>
            navigate("/tasks")
          }
        >
          ← Back to Tasks
        </button>

        <span>
          Task ID: {task.id}
        </span>

      </div>


      {editing ? (

        /* ================= EDIT FORM ================= */

        <div className="details-card">

          <h1>
            Edit Task
          </h1>

          <div className="task-form edit-form">

            <div className="form-group">

              <label>
                Task Header
              </label>

              <input
                value={header}
                onChange={
                  e => setHeader(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Task Description
              </label>

              <textarea
                rows="5"
                value={description}
                onChange={
                  e => setDescription(e.target.value)
                }
              />

            </div>


            <div className="form-row">

              <div className="form-group">

                <label>
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={
                    e => setPriority(e.target.value)
                  }
                >

                  <option value="High">
                    High
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Low">
                    Low
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Category
                </label>

                <select
                  value={category}
                  onChange={
                    e => setCategory(e.target.value)
                  }
                >

                  <option value="Academic">
                    Academic
                  </option>

                  <option value="Personal">
                    Personal
                  </option>

                </select>

              </div>

            </div>


            <div className="form-actions">

              <button
                className="secondary-btn"
                onClick={() =>
                  setEditing(false)
                }
              >
                Cancel
              </button>

              <button
                className="primary-btn"
                onClick={handleUpdate}
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      ) : (

        /* ================= DETAILS ================= */

        <div className="details-card">

          <div className="details-title">

            <div>

              <span
                className={`status ${task.status.toLowerCase()}`}
              >
                {task.status}
              </span>

              <h1>
                {task.header}
              </h1>

            </div>

          </div>


          <div className="description-box">

            <h3>
              Task Description
            </h3>

            <p>
              {task.description}
            </p>

          </div>


          <div className="details-grid">

            <div className="detail-item">

              <span>
                🎯 Priority
              </span>

              <strong>
                {task.priority}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                📂 Category
              </span>

              <strong>
                {task.category}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                🕒 Raised Date & Time
              </span>

              <strong>
                {task.raisedDate}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                📅 Due Date
              </span>

              <strong>
                {task.dueDate}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                📌 Status
              </span>

              <strong>
                {task.status}
              </strong>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="details-actions">

            <button
              className="edit-btn"
              onClick={startEditing}
            >
              ✏ Edit Task
            </button>


            {task.status !== "Closed" && (

              <button
                className="complete-btn"
                onClick={handleComplete}
              >
                ✓ Mark Completed
              </button>

            )}


            <button
              className="delete-btn"
              onClick={handleDelete}
            >
              🗑 Delete Task
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================================================
   COMPLETED TASKS
========================================================= */

function CompletedTasks({
  tasks,
  deleteTask
}) {

  const completedTasks =
    tasks.filter(
      task => task.status === "Closed"
    );


  return (

    <div className="page">

      <div className="page-header">

        <div>

          <h1>
            Completed Tasks
          </h1>

          <p>
            All the tasks you have completed.
          </p>

        </div>

      </div>


      {completedTasks.length === 0 ? (

        <div className="empty">

          <div className="empty-icon">
            🎯
          </div>

          <h2>
            No Completed Tasks
          </h2>

          <p>
            Complete a task and it will appear here.
          </p>

        </div>

      ) : (

        <div className="task-list">

          {completedTasks.map(task => (

            <div
              className="task-card completed-card"
              key={task.id}
            >

              <div className="task-main">

                <div className="task-title-row">

                  <h2>
                    ✓ {task.header}
                  </h2>

                  <span className="status closed">
                    Closed
                  </span>

                </div>


                <p className="task-description">
                  {task.description}
                </p>


                <div className="task-meta">

                  <span>
                    🎯 Priority:
                    <strong>
                      {task.priority}
                    </strong>
                  </span>

                  <span>
                    📂 Category:
                    <strong>
                      {task.category}
                    </strong>
                  </span>

                  <span>
                    📅 Due:
                    <strong>
                      {task.dueDate}
                    </strong>
                  </span>

                </div>

              </div>


              <div className="task-actions">

                <Link
                  to={`/tasks/${task.id}`}
                  className="view-btn"
                >
                  View Details
                </Link>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}


/* =========================================================
   MAIN APP
========================================================= */

function App() {

  const [tasks, setTasks] = useState([

    {
      id: 1,

      header:
        "Complete React Assignment",

      description:
        "Complete the Task Manager assignment using React Router, nested routes and dynamic routes.",

      priority:
        "High",

      category:
        "Academic",

      raisedDate:
        "13 Sep 2026, 08:30 PM",

      dueDate:
        "28 Aug 2026",

      status:
        "Pending"
    },


    {
      id: 2,

      header:
        "Prepare DSA Questions",

      description:
        "Practice arrays, strings, recursion and dynamic programming problems.",

      priority:
        "High",

      category:
        "Academic",

      raisedDate:
        "13 Sep 2026, 07:15 PM",

      dueDate:
        "28 Aug 2026",

      status:
        "Raised"
    },


    {
      id: 3,

      header:
        "Buy Groceries",

      description:
        "Buy vegetables, milk, fruits and other household items.",

      priority:
        "Medium",

      category:
        "Personal",

      raisedDate:
        "13 Sep 2026, 06:00 PM",

      dueDate:
        "28 Aug 2026",

      status:
        "Closed"
    }

  ]);


  /* =====================================================
     ADD TASK
  ===================================================== */

  const addTask = (newTask) => {

    const task = {

      ...newTask,

      id:
        Date.now(),

      raisedDate:
        new Date().toLocaleString(
          "en-IN",
          {
            dateStyle: "medium",
            timeStyle: "short"
          }
        ),

      dueDate:
        "28 Aug 2026",

      status:
        "Raised"

    };


    setTasks([
      ...tasks,
      task
    ]);
  };


  /* =====================================================
     UPDATE TASK
  ===================================================== */

  const updateTask = (updatedTask) => {

    setTasks(

      tasks.map(task =>

        task.id === updatedTask.id

          ? updatedTask

          : task

      )

    );
  };


  /* =====================================================
     DELETE TASK
  ===================================================== */

  const deleteTask = (id) => {

    setTasks(

      tasks.filter(
        task => task.id !== id
      )

    );
  };


  /* =====================================================
     COMPLETE TASK
  ===================================================== */

  const completeTask = (id) => {

    setTasks(

      tasks.map(task =>

        task.id === id

          ? {
              ...task,
              status: "Closed"
            }

          : task

      )

    );
  };


  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* PROTECTED ROUTES */}

        <Route
          element={<ProtectedRoute />}
        >

          {/* NESTED ROUTE - NAVBAR */}

          <Route
            element={<Navbar />}
          >

            {/* DASHBOARD */}

            <Route
              path="/"
              element={
                <Dashboard
                  tasks={tasks}
                />
              }
            />


            {/* TASKS */}

            <Route
              path="/tasks"
              element={
                <Tasks
                  tasks={tasks}
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                />
              }
            />


            {/* ADD TASK */}

            <Route
              path="/add-task"
              element={
                <AddTask
                  addTask={addTask}
                />
              }
            />


            {/* DYNAMIC ROUTE */}

            <Route
              path="/tasks/:id"
              element={
                <TaskDetails
                  tasks={tasks}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                />
              }
            />


            {/* COMPLETED */}

            <Route
              path="/completed"
              element={
                <CompletedTasks
                  tasks={tasks}
                  deleteTask={deleteTask}
                />
              }
            />

          </Route>

        </Route>


        {/* UNKNOWN URL */}

        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;
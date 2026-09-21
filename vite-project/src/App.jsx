import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import CompletedTasks from "./pages/CompletedTasks";
import Login from "./pages/Login";

import "./App.css";

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      header: "Complete React Assignment",
      description: "Complete the Task Manager assignment using React Router, nested routes and dynamic routes.",
      priority: "High",
      category: "Academic",
      raisedDate: "13 Sep 2026, 08:30 PM",
      dueDate: "28 Aug 2026",
      status: "Pending"
    },
    {
      id: 2,
      header: "Prepare DSA Questions",
      description: "Practice arrays, strings, recursion and dynamic programming problems.",
      priority: "High",
      category: "Academic",
      raisedDate: "13 Sep 2026, 07:15 PM",
      dueDate: "28 Aug 2026",
      status: "Raised"
    },
    {
      id: 3,
      header: "Buy Groceries",
      description: "Buy vegetables, milk, fruits and other household items.",
      priority: "Medium",
      category: "Personal",
      raisedDate: "13 Sep 2026, 06:00 PM",
      dueDate: "28 Aug 2026",
      status: "Closed"
    }
  ]);

  /* =====================================================
     ADD TASK
  ===================================================== */
  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now(),
      raisedDate: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
      }),
      dueDate: "28 Aug 2026",
      status: "Raised"
    };
    setTasks([...tasks, task]);
  };

  /* =====================================================
     UPDATE TASK
  ===================================================== */
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  /* =====================================================
     DELETE TASK
  ===================================================== */
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  /* =====================================================
     COMPLETE TASK
  ===================================================== */
  const completeTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: "Closed" } : task));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          {/* NESTED ROUTE - NAVBAR */}
          <Route element={<Navbar />}>
            {/* DASHBOARD */}
            <Route path="/" element={<Dashboard tasks={tasks} />} />
            {/* TASKS */}
            <Route path="/tasks" element={<Tasks tasks={tasks} deleteTask={deleteTask} completeTask={completeTask} />} />
            {/* ADD TASK */}
            <Route path="/add-task" element={<AddTask addTask={addTask} />} />
            {/* DYNAMIC ROUTE */}
            <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} completeTask={completeTask} />} />
            {/* COMPLETED */}
            <Route path="/completed" element={<CompletedTasks tasks={tasks} deleteTask={deleteTask} />} />
          </Route>
        </Route>

        {/* UNKNOWN URL */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      const newTask = {
        id: new Date().getTime(),
        text: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput("");
    }
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  const handleClearAllTasks = () => {
    setTasks([]);
  };

  const filterTasks = () => {
    switch (filter) {
      case "all":
        return tasks;
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="app">
      <h1>#todo</h1>
      <div className="filter-container">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a new task"
          value={taskInput}
          onChange={handleTaskInputChange}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="task-list">
        {filterTasks().map((task) => (
          <div
            key={task.id}
            className={`task ${task.completed ? "completed" : ""}`}>
            <span
              className="task-text"
              onClick={() => handleCompleteTask(task.id)}>
              {task.text}
            </span>
            <button
              className="delete-button"
              onClick={() => handleDeleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      {tasks.length > 0 && (
        <div>
          <button onClick={handleClearAllTasks} className="delete-all">
            Delete All
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([{ text: input, done: false }, ...tasks]);
    setInput("");
  }

  function toggleDone(index) {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, done: !t.done } : t
      )
    );
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <div className="todo-container">
      <h1>To Do List</h1>
      <form onSubmit={addTask} className="todo-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>
      <ul className="todo-list">
        {tasks.length === 0 && <li>No tasks yet!</li>}
        {tasks.map((task, idx) => (
          <li key={idx} className={task.done ? "done" : ""}>
            <span onClick={() => toggleDone(idx)}>{task.text}</span>
            <button onClick={() => deleteTask(idx)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

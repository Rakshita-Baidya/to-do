import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import "./index.css";
// for unique ids for each task
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(() => {
    //tore tasks locally
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // toggle completed or pending
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  // add new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      alert("Task cannot be empty.");
      return;
    } else {
      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          text: newTask,
          date: new Date().toLocaleDateString(),
          status: false,
        },
      ]);
      setNewTask("");
    }
  };

  // edit existing task
  const saveEdit = (id) => {
    if (!editTask.trim()) {
      alert("Task cannot be empty.");
      return;
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: editTask } : task
        )
      );
      setEditTaskId(null);
      setEditTask("");
    }
  };

  // delete existing task from list
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // filter tasks based on completion
  const getFilteredTasks = () => {
    if (filter === "pending") {
      return tasks.filter((task) => !task.status);
    } else if (filter === "completed") {
      return tasks.filter((task) => task.status);
    } else {
      return tasks;
    }
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      {/* add new task */}
      <TaskForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      {/* filter tasks based on completion */}
      <TaskFilters filter={filter} setFilter={setFilter} />
      {/* task list in a table */}
      <TaskList
        tasks={getFilteredTasks()}
        toggleTaskCompletion={toggleTaskCompletion}
        editTaskId={editTaskId}
        setEditTaskId={setEditTaskId}
        editTask={editTask}
        setEditTask={setEditTask}
        saveEdit={saveEdit}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;

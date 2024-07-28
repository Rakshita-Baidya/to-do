import React from "react";

function TaskForm({ newTask, setNewTask, addTask }) {
  return (
    // form to add new tasks
    <form onSubmit={addTask} className="add-task-form">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Task"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;

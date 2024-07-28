import React from "react";
import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  toggleTaskCompletion,
  editTaskId,
  setEditTaskId,
  editTask,
  setEditTask,
  saveEdit,
  deleteTask,
}) {
  // return all tasks to a table
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th className="status-column">Status</th>
          <th className="task-column">Task</th>
          <th className="date-column">Date</th>
          <th className="action-column">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            editTaskId={editTaskId}
            setEditTaskId={setEditTaskId}
            editTask={editTask}
            setEditTask={setEditTask}
            saveEdit={saveEdit}
            deleteTask={deleteTask}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;

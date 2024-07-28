import React from "react";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

function TaskItem({
  task,
  toggleTaskCompletion,
  editTaskId,
  setEditTaskId,
  editTask,
  setEditTask,
  saveEdit,
  deleteTask,
}) {
  // return each task to the task list
  return (
    <tr
      style={{
        textDecoration: task.status ? "line-through" : "none",
        color: task.status ? "grey" : "black",
      }}
    >
      <td className="status-column">
        <input
          type="checkbox"
          checked={task.status}
          onChange={() => toggleTaskCompletion(task.id)}
        />
      </td>
      <td className="task-column">{task.text}</td>
      <td className="date-column">{task.date}</td>
      <td className="action-column">
        {editTaskId === task.id ? (
          <>
            <input
              type="text"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="action-input"
            />
            <button onClick={() => saveEdit(task.id)}>Save</button>
          </>
        ) : (
          <>
            <img
              src={editIcon}
              alt="Edit"
              onClick={() => {
                setEditTaskId(task.id);
                setEditTask(task.text);
              }}
              className="action-images"
            />
            <img
              src={deleteIcon}
              alt="Delete"
              onClick={() => deleteTask(task.id)}
              className="action-images"
            />
          </>
        )}
      </td>
    </tr>
  );
}

export default TaskItem;

import React, { useState } from "react";
import editIcon from './edit.png';
import deleteIcon from './delete.png';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [filter, setFilter] = useState('all');

  // change completion status
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => (
      task.id === id ? { ...task, status: !task.status } : task
    )));
  };

  // add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      alert('Task cannot be empty.');
      return;
    }else{
      setTasks([...tasks, {
        id: tasks.length + 1,
        text: newTask,
        date: new Date().toLocaleDateString(),
        status: false
      }]);
      setNewTask('');
    }
  };

  // edit existing task
  const saveEdit = (id) => {
    if (!editTask.trim()) {
      alert('Task cannot be empty.');
      return;
    }else{
      setTasks(tasks.map(task => (
        task.id === id ? { ...task, text: editTask } : task
      )));
      setEditTaskId(null);
      setEditTask('');
    }
  };
  
  // delete existing task
  const deleteTask = (id) => {
    setTimeout(() => {
      setTasks(tasks.filter(task => task.id !== id));
    }, 500);
  };

  // Filter tasks based on status
  const getFilteredTasks = () => {
    if (filter === 'pending') {
      return tasks.filter(task => !task.status);
    } else if (filter === 'completed') {
      return tasks.filter(task => task.status);
    } else {
      return tasks;
    }
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>

      {/* Create new task */}
      <form onSubmit={addTask} className="add-task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Task"
        />
        <button type="submit">Add</button>
      </form>

      {/* Task filters */}
      <div className="task-filters">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active-filter' : ''}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={filter === 'pending' ? 'active-filter' : ''}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active-filter' : ''}
        >
          Completed
        </button>
      </div>

      {/* Show list of tasks */}
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
          {/* get tasks based on the filter */}
          {getFilteredTasks().map(task => (
            <tr key={task.id} style={{
              textDecoration: task.status ? 'line-through' : 'none',
              color: task.status ? 'grey' : 'black'
            }}>
              {/* checkbox for each task */}
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
                {/* edit actions */}
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
                  {/* edit and delete icons */}
                    <img
                      src={editIcon}
                      alt="Edit"
                      onClick={() => { setEditTaskId(task.id); setEditTask(task.text); }}
                      className='action-images'
                    />
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      onClick={() => deleteTask(task.id)}
                      className='action-images'
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

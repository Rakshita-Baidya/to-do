import React from "react";

function TaskFilters({ filter, setFilter }) {
  return (
    // filters based on completion of tasks
    <div className="task-filters">
      <button
        onClick={() => setFilter("all")}
        className={filter === "all" ? "active-filter" : ""}
      >
        All
      </button>
      <button
        onClick={() => setFilter("pending")}
        className={filter === "pending" ? "active-filter" : ""}
      >
        Pending
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={filter === "completed" ? "active-filter" : ""}
      >
        Completed
      </button>
    </div>
  );
}

export default TaskFilters;

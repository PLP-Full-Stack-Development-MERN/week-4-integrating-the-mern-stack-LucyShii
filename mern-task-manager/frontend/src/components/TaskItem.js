import React from "react";

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md mb-4">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: <span className="font-semibold">{task.status}</span></p>
      <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => onEdit(task)}
          className="p-2 bg-yellow-500 text-white rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="p-2 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

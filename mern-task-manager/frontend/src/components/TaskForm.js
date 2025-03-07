import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks, taskToEdit, clearEdit }) => {
  const [task, setTask] = useState(
    taskToEdit || { title: "", description: "", status: "pending", dueDate: "" }
  );

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskToEdit) {
      await axios.put(`/api/tasks/${taskToEdit._id}`, task);
      clearEdit();
    } else {
      await axios.post("/api/tasks", task);
    }
    fetchTasks();
    setTask({ title: "", description: "", status: "pending", dueDate: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md">
      <div>
        <label className="block font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        ></textarea>
      </div>
      <div>
        <label className="block font-semibold">Status</label>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full mt-4 p-2 bg-blue-600 text-white rounded-md"
      >
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;

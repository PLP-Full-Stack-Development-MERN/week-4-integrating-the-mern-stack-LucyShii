import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    const response = await axios.get("/api/tasks");
    setTasks(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
  };

  const clearEdit = () => {
    setTaskToEdit(null);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
      <TaskForm fetchTasks={fetchTasks} taskToEdit={taskToEdit} clearEdit={clearEdit} />
      <div className="mt-6">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  useEffect(() => {
    const controller = new AbortController(); 
    const fetchTasks = async () => {
      try {
        const response = await api.get("/Tasks", { signal: controller.signal });
        setTasks(response.data);
      } catch (err) {
        if (err.name === "CanceledError" || err.message === "canceled") {
          return;
        }

        if (err.response?.status === 401) {
          logout();
          navigate("/login");
          return;
        }

        console.error("Failed to load tasks:", err);
        setError("Failed to load tasks");
      }
    };

    fetchTasks();

    return () => {
      controller.abort();
    };
  }, [ logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

    const handleAddTask = () => {
    navigate("/add-task");
  };

    const handleEditTask = (id) => {
    navigate(`/edit-task/${id}`);
  };

  const handleDeleteTask = async (id) =>{
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {

      await api.delete(`/Tasks/${id}`);
      setTasks(tasks.filter((t)=> t.id !== id));
      setMessage("Task deleted succesfully.");
      setTimeout(()=> setMessage(""),3000);

    } catch (error) {
      console.error("Failed to delete task: ",error);
      setError("Failed to delete task.")
      setTimeout(() => setError(""), 3000);
    }
  }

    const handleToggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      await api.put(`/Tasks/${task.id}`, updatedTask);

      setTasks(
        tasks.map((t) => (t.id === task.id ? updatedTask : t))
      );

      setMessage(
        updatedTask.isCompleted
          ? "Task marked as completed ✅"
          : "Task marked as pending ⏳"
      );
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to update task:", err);
      setError("Failed to update task");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <div className="flex gap-3">
          <button
            onClick={handleAddTask}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Task
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {message && (
        <div className="bg-green-600 p-2 rounded mb-4 text-center">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-600 p-2 rounded mb-4 text-center">{error}</div>
      )}

      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks found.</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800 p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-gray-400">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => handleToggleComplete(task)}
                  className={`font-semibold transition ${
                    task.isCompleted
                      ? "text-green-400 hover:text-green-300"
                      : "text-yellow-400 hover:text-yellow-300"
                  }`}
                >
                  {task.isCompleted ? "Done ✅" : "Pending ⏳"}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditTask(task.id)}
                    className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

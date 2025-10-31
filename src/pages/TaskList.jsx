import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

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
  }, [user, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="bg-red-500 p-2 rounded mb-4 text-center">{error}</div>
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
              <div>
                {task.isCompleted ? (
                  <span className="text-green-400 font-semibold">Done ✅</span>
                ) : (
                  <span className="text-yellow-400 font-semibold">
                    Pending ⏳
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

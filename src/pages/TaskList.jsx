import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown, Calendar } from "lucide-react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTasks = async () => {
      try {
        const response = await api.get("/Tasks", { signal: controller.signal });
        setTasks(response.data);
      } catch (err) {
        if (err.name === "CanceledError" || err.message === "canceled") return;
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
    return () => controller.abort();
  }, [logout, navigate]);

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

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/Tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      setMessage("Task deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError("Failed to delete task");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      await api.put(`/Tasks/${task.id}`, updatedTask);
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
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

  const handleExportCSV = () => {
    const header = ["Title", "Description", "Due Date", "Completed"];
    const rows = tasks.map((t) => [
      t.title,
      t.description,
      new Date(t.dueDate).toLocaleDateString(),
      t.isCompleted ? "Yes" : "No",
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "tasks.csv";
    link.click();
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.isCompleted).length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.isCompleted;
      if (filter === "pending") return !task.isCompleted;
      return true;
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "titleAsc") return a.title.localeCompare(b.title);
      if (sortBy === "titleDesc") return b.title.localeCompare(a.title);
      if (sortBy === "dueAsc") return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortBy === "dueDesc") return new Date(b.dueDate) - new Date(a.dueDate);
      return a.isCompleted - b.isCompleted;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 flex flex-col justify-between p-6 shadow-lg">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-blue-400">📊 Progress</h3>
          <p className="text-gray-300">Total tasks: {totalTasks}</p>
          <p className="text-gray-300">Completed: {completedTasks}</p>
          <p className="text-gray-300 mb-3">Progress: {completionRate}%</p>

          <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
            <div
              className="bg-blue-600 h-3 rounded-full"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Logout + Footer */}
        <div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition mb-3"
          >
            Logout
          </button>
          <p className="text-sm text-gray-500 text-center">
            Task Manager © {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64 p-8">
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
              onClick={handleExportCSV}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
            >
              ⬇ Export CSV
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded">
            <ArrowUpDown size={18} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 text-white focus:outline-none"
            >
              <option value="default">Sort by...</option>
              <option value="titleAsc">Title ↑</option>
              <option value="titleDesc">Title ↓</option>
              <option value="dueAsc">Due date ↑</option>
              <option value="dueDesc">Due date ↓</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded transition ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {f === "all"
                ? "All"
                : f === "pending"
                ? "Pending ⏳"
                : "Completed ✅"}
            </button>
          ))}
        </div>

        {message && (
          <div className="bg-green-600 p-2 rounded mb-4 text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-600 p-2 rounded mb-4 text-center">{error}</div>
        )}

        {currentTasks.length === 0 ? (
          <p className="text-gray-400">No tasks found.</p>
        ) : (
          <div className="grid gap-4">
            {currentTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-800 p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h2
                    className={`text-xl font-semibold ${
                      task.isCompleted ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </h2>
                  <p className="text-gray-400">{task.description}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar size={14} />
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              ◀ Previous
            </button>
            <span className="text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;

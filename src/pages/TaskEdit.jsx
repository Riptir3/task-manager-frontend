import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { UserContext } from "../contexts/UserContext";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {  logout } = useContext(UserContext);

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    isCompleted: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchTask = async () => {
      try {
        const response = await api.get(`/Tasks/${id}`);
        setTask(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
        } else {
          setError("Failed to load task details.");
        }
      }
    };

    fetchTask();
  }, [id, logout, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/Tasks/${id}`,{
        ...task
      })
      navigate("/Tasks");
    } catch (err) {
      console.error(err);
      setError("Failed to update task.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Edit Task</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 bg-gray-700 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-700 rounded"
        />

        <input
          type="date"
          name="dueDate"
          value={task.dueDate.split("T")[0]}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 bg-gray-700 rounded"
        />

        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            name="isCompleted"
            checked={task.isCompleted}
            onChange={handleChange}
            className="mr-2"
          />
          Completed
        </label>

        <button
          type="submit"
          className="bg-blue-600 w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;


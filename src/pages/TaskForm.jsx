import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const TaskForm = ()=>{
const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!title || !description || !description){
        setError("Fill in all fields.");
        return;
    }

    try{
        await api.post("/Tasks",{
            title,
            description,
            dueDate
        });

        navigate("/Tasks");
    }
    catch(error){
        console.error("Failed to create task: ",error);
        setError("Failed to create task. Please try again.");
    }
  };

   return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Task</h1>

      {error && (
        <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow-md max-w-lg mx-auto space-y-4"
      >
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Due Date</label>
          <input
            type="date"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
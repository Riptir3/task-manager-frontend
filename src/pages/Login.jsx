import  { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {

      const response = await loginService(email, password);
  
      if (response && response.token) {
        login(response.token); 
        navigate("/tasks"); 
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h2>
        {error && (
          <div className="bg-red-500 text-white text-sm p-2 rounded mb-3">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

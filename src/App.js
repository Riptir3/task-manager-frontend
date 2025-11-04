import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from '../src/pages/Login'
import RegisterPage from '../src/pages/Register'
import TaskPage from '../src/pages/TaskList'
import TaskForm from './pages/TaskForm'
import EditTask from "./pages/TaskEdit";
import ProtectedRoute from './components/ProtectedRoute'

function App() {
 return (
        <Router>
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Protected Routes */}
          <Route path="/tasks" element={<ProtectedRoute><TaskPage/></ProtectedRoute>}/>
          <Route path="/add-task" element={<ProtectedRoute><TaskForm/></ProtectedRoute>}/>
          <Route path="/edit-task/:id" element={<ProtectedRoute><EditTask/></ProtectedRoute>}/>
        </Routes>
      </Router>
 )
}

export default App;

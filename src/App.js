import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loginpage from '../src/pages/Login'
import RegisterPage from '../src/pages/Register'
import TaskPage from '../src/pages/TaskList'
import TaskForm from './pages/TaskForm'
import EditTask from "./pages/TaskEdit";
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

function App() {
 return (
        <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<PublicRoute><Loginpage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

          {/* Protected Routes */}
          <Route path="/tasks" element={<ProtectedRoute><TaskPage/></ProtectedRoute>}/>
          <Route path="/add-task" element={<ProtectedRoute><TaskForm/></ProtectedRoute>}/>
          <Route path="/edit-task/:id" element={<ProtectedRoute><EditTask/></ProtectedRoute>}/>

          {/* Default Routes */}
          <Route path='*' element={<Navigate to="/tasks" replace/>}/>
        </Routes>
      </Router>
 )
}

export default App;

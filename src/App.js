import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from '../src/pages/Login'
import RegisterPage from '../src/pages/Register'
import TaskPage from '../src/pages/TaskList'

function App() {
 return (
        <Router>
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<TaskPage/>}/>
        </Routes>
      </Router>
 )
}

export default App;

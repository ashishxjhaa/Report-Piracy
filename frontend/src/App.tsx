import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SignupForm from './pages/SignupForm';
import SigninForm from './pages/SigninForm';
import DashboardPage from './pages/DashboardPage';
import Error from './pages/Error';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/signin' element={<SigninForm />} />
        <Route path="/dashboard" element={<ProtectedRoute> <DashboardPage /></ProtectedRoute>} />
        <Route path='*' element={<Error />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
      
    </Router>
  )
}

export default App
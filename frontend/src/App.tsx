import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SignupForm from './pages/SignupForm';
import SigninForm from './pages/SigninForm';
import DashboardPage from './pages/DashboardPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/signin' element={<SigninForm />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}

export default App
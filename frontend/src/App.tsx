import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SignupForm from './pages/SignupForm';
import SigninForm from './pages/SigninForm';
import DashboardPage from './pages/DashboardPage';
import Error from './pages/Error';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from "react-hot-toast";
import ProfilePage from './pages/ProfilePage';
import ReportPage from './pages/ReportPage';
import ContentPage from './pages/ContentPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/signin' element={<SigninForm />} />
        <Route path='/dashboard' element={<ProtectedRoute> <DashboardPage /></ProtectedRoute>} />
        <Route path='/dashboard-form' element={<ProtectedRoute> <ReportPage /></ProtectedRoute>} />
        <Route path='/view-content' element={<ProtectedRoute> <ContentPage /></ProtectedRoute>} />
        <Route path='/me' element={<ProtectedRoute> <ProfilePage /></ProtectedRoute>} />
        <Route path='*' element={<Error />} />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
      
    </Router>
  )
}

export default App
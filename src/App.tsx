import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingScreen from './screens/LandingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import UserSidebarLayout from './components/UserSidebarLayout'
import ConsultantSidebarLayout from './components/ConsultantSidebarLayout'
import UserDashboard from './screens/UserDashboard'
import ConsultantDashboard from './screens/ConsultantDashboard'
import UserProfile from './screens/UserProfile'

function AppRoutes({ user, setUser }: { user: any, setUser: (u: any) => void }) {
  const role = user?.role

  if (user && (role === 'USER' || role === 'CONSULTANT')) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to={`/${role.toLowerCase()}/dashboard`} replace />} />
        <Route path="/login" element={<Navigate to={`/${role.toLowerCase()}/dashboard`} replace />} />
        <Route path="/register" element={<Navigate to={`/${role.toLowerCase()}/dashboard`} replace />} />
        <Route path="/user/*" element={<UserSidebarLayout setUser={setUser} />}>
          <Route path="dashboard" element={<UserDashboard user={user} />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="/consultant/*" element={<ConsultantSidebarLayout />}>
          <Route path="dashboard" element={<ConsultantDashboard user={user} />} />
        </Route>
        <Route path="*" element={<Navigate to={`/${role.toLowerCase()}/dashboard`} replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/login" element={<LoginScreen onLogin={setUser} />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function AppWithHeader({ user, setUser }: { user: any, setUser: (u: any) => void }) {
  const location = useLocation();
  const showHeader = ["/", "/login", "/register"].includes(location.pathname);
  return (
    <div className="app">
      {showHeader && <Header />}
      <AppRoutes user={user} setUser={setUser} />
      <Footer />
    </div>
  );
}

function App() {
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  return (
    <Router>
      <AppWithHeader user={user} setUser={setUser} />
    </Router>
  )
}

export default App

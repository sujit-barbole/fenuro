import { Link, useNavigate, Outlet } from 'react-router-dom';
import '../styles/ConsultantSidebarLayout.css';

export default function ConsultantSidebarLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <div className="sidebar-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-avatar">C</div>
          <span className="sidebar-title">Home</span>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <div className="sidebar-section-title">MAIN</div>
            <Link to="/consultant/dashboard" className="sidebar-link">Dashboard</Link>
            <Link to="/consultant/assigned-users" className="sidebar-link">Assigned Users</Link>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-section-title">ACCOUNT</div>
            <Link to="/consultant/profile" className="sidebar-link">Profile</Link>
            <button className="sidebar-link logout" onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      </aside>
      <main className="sidebar-content">
        <Outlet />
      </main>
    </div>
  );
} 
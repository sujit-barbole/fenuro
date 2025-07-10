import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import '../styles/UserSidebarLayout.css';

function LogoutModal({ open, onConfirm, onCancel }: { open: boolean, onConfirm: () => void, onCancel: () => void }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: '2rem 2.5rem', boxShadow: '0 2px 16px #232a3a33', minWidth: 320 }}>
        <h3 style={{ marginBottom: 16 }}>Confirm Logout</h3>
        <p style={{ marginBottom: 24 }}>Are you sure you want to logout?</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{ padding: '0.5rem 1.2rem', borderRadius: 6, border: 'none', background: '#e2e8f0', color: '#2d3748', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '0.5rem 1.2rem', borderRadius: 6, border: 'none', background: '#f56565', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default function UserSidebarLayout({ setUser }: { setUser: (u: any) => void }) {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const handleLogout = () => setShowLogout(true);
  const confirmLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowLogout(false);
    navigate('/');
  };
  const cancelLogout = () => setShowLogout(false);
  return (
    <div className="sidebar-layout">
      <LogoutModal open={showLogout} onConfirm={confirmLogout} onCancel={cancelLogout} />
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-avatar">N</div>
          <span className="sidebar-title">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>neurofi</Link>
          </span>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <div className="sidebar-section-title">MAIN</div>
            <Link to="/user/dashboard" className="sidebar-link">Dashboard</Link>
            <Link to="/user/profile" className="sidebar-link">Profile</Link>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-section-title">ACCOUNT</div>
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
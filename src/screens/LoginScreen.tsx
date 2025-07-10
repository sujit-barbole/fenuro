import { useState } from 'react';
import '../styles/LoginScreen.css';
import { loginUser } from '../api/authService';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen({ onLogin }: { onLogin: (user: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await loginUser({ email, password });
      onLogin(user);
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'USER') {
        navigate('/user/dashboard');
      } else if (user.role === 'CONSULTANT') {
        navigate('/consultant/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact login-section">
      <form className="contact-form login-form" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-header section-header">
            <h2>Login</h2>
            <p>Access your account</p>
          </div>
          <div className="form-fields">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <div className="form-error">{error}</div>}
            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="auth-switch-section">
              <span>Don't have an account? <a href="/register" className="auth-switch-link">Register here</a></span>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
} 
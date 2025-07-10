import { useState } from 'react';
import '../styles/RegisterScreen.css';
import { registerUser } from '../api/authService';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateMobile(mobile: string) {
  return /^[0-9]{10}$/.test(mobile);
}

export default function RegisterScreen({ onRegister }: { onRegister?: (user: any) => void }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    panId: '',
    mobileNumber: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === 'mobileNumber') {
      value = value.replace(/[^0-9]/g, '').slice(0, 10); // Only digits, max 10
    }
    setForm({ ...form, [e.target.name]: value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const errors: { [key: string]: string } = {};
    if (!validateEmail(form.email)) errors.email = 'Invalid email address';
    if (!validateMobile(form.mobileNumber)) errors.mobileNumber = 'Mobile number must be exactly 10 digits';
    if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...submitForm } = form;
      const user = await registerUser(submitForm);
      setSuccess('Registration successful!');
      if (onRegister) onRegister(user);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact register-section">
      <form className="contact-form register-form" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-header section-header">
            <h2>Register</h2>
            <p>Create your account</p>
          </div>

          <div className="form-fields form-fields-2col">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="panId"
              placeholder="PAN ID"
              value={form.panId}
              onChange={handleChange}
            //   required
            //   pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
            />
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={form.mobileNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              maxLength={10}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ gridColumn: '1 / span 2' }}
            />
            {fieldErrors.email && <div className="form-error" style={{ gridColumn: '1 / span 2' }}>{fieldErrors.email}</div>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              style={{ gridColumn: '1 / span 2' }}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              style={{ gridColumn: '1 / span 2' }}
            />
            {fieldErrors.password && <div className="form-error" style={{ gridColumn: '1 / span 2' }}>{fieldErrors.password}</div>}
            {fieldErrors.confirmPassword && <div className="form-error" style={{ gridColumn: '1 / span 2' }}>{fieldErrors.confirmPassword}</div>}
            {fieldErrors.mobileNumber && <div className="form-error" style={{ gridColumn: '1 / span 2' }}>{fieldErrors.mobileNumber}</div>}
          </div>

          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}

          <button className="btn primary" type="submit" disabled={loading} style={{ marginTop: '1.5rem' }}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <div className="auth-switch-section">
            <span>
              Already have an account?{' '}
              <a href="/login" className="auth-switch-link">
                Login
              </a>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
}
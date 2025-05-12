import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(credentials.email, credentials.password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-form">
      <div className="form-icon" aria-hidden="true">🚢</div>
      <h2 className="login-welcome">
        Welcome to<br />
        <span className="brand-accent">Ship Management System</span>
      </h2>
      <div className="subtitle">Your modern dashboard for smooth sailing and fleet control</div>
      <form onSubmit={handleSubmit} autoComplete="on">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            required
            autoFocus
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
            autoComplete="current-password"
          />
        </div>
        {error && <div className="login-error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
      <div
        className="toggle-link"
        tabIndex={0}
        role="button"
        onClick={() => navigate('/signup')}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/signup')}
        aria-label="Go to registration page"
      >
        New to ShipMaster? Create an account
      </div>
    </div>
  );
};

export default LoginForm; 
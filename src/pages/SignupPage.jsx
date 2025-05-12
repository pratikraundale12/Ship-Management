import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement signup logic
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-icon" aria-hidden="true">🚢</div>
        <h1>Create Account</h1>
        <div className="subtitle">Join ShipMaster and manage your fleet with ease</div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>
        {/* TODO: Show error message if passwords do not match or signup fails */}
        <button type="submit">Sign Up</button>
        <div
          className="toggle-link"
          tabIndex={0}
          role="button"
          onClick={() => navigate('/login')}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/login')}
          aria-label="Go to login page"
        >
          Already have an account? Log in
        </div>
      </form>
    </div>
  );
};

export default SignupPage; 
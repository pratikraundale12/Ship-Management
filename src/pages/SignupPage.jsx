import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement signup logic
    
    // Show alert that new user is created
    setAlertMessage('User created successfully!');
    setShowAlert(true);
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
      // Optional: navigate to login or dashboard after signup
      // navigate('/login');
    }, 3000);
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
      {showAlert && (
        <div className="success-alert" style={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '15px',
          borderRadius: '4px',
          textAlign: 'center',
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          minWidth: '300px'
        }}>
          {alertMessage}
        </div>
      )}
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
        {/* Todo: Show error message if passwords do not match or signup fails */}
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

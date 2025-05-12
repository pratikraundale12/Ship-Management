import React from 'react';
import LoginForm from '../components/Authentication/LoginForm';

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1 style={{ color: '#000' }}>Welcome to Ship Management System</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage; 
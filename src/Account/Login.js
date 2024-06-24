import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can add authentication logic (e.g., API call)
    // For simplicity, we'll assume the login is always successful
    if (credentials.username && credentials.password) {
      onLogin();
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div style={loginContainerStyle}>
      <form onSubmit={handleSubmit} style={loginFormStyle}>
        <h2>Login</h2>
        <div style={formGroupStyle}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
};

const loginContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
};

const loginFormStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const formGroupStyle = {
  marginBottom: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  boxSizing: 'border-box',
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Login;
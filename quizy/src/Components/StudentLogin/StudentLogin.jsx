import React, { useState } from 'react';
import './StudentLogin.css';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log('Student login:', { email, password });
     };

  return (
    <div className="student-login-container">
      <h2>Student Login</h2>
      <form className="student-login-form" onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default StudentLogin;

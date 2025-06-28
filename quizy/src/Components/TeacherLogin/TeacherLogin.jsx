import React, { useState } from 'react';
import './TeacherLogin.css';
import { useNavigate } from 'react-router-dom';

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
 
    console.log('Teacher login:', { email, password });
 
  };

  return (
    <div className="teacher-login-container">
      <h2>Teacher Login</h2>
      <form className="teacher-login-form" onSubmit={handleLogin}>
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

export default TeacherLogin;

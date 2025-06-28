import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentSignup.css';

const StudentSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Submitting student signup:', formData);

    
    navigate('/login/student');
  };

  return (
    <div className="signup-container">
      <h2>Student Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email Address
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default StudentSignup;

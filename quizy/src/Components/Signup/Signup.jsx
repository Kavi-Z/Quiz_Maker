import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <div className="button-group">
        <button onClick={() => navigate('/signup/teacher')}>Sign up as Teacher</button>
        <button onClick={() => navigate('/signup/student')}>Sign up as Student</button>
      </div>
    </div>
  );
};

export default Signup;

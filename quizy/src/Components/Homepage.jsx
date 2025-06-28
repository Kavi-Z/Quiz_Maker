import React from 'react';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Quiz Maker</h1>
      </header>
      <main className="homepage-main">
        <h2>Select Your Role</h2>
        <div className="button-group">
          <button onClick={() => navigate('/login/teacher')}>Login as Teacher</button>
          <button onClick={() => navigate('/login/student')}>Login as Student</button>
        </div>

        <div className="create-account-section">
          <p className="signup-link" onClick={() => navigate('/signup')}>
            Don't have an account?
          </p>
        </div>
      </main>
    </div>
  );
};

export default Homepage;

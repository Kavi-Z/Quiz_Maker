import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './StudentLogin.css';

function StudentLogin() {
  const [email, setEmail] = useState("");        // <- changed to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role: "student",  
      });

      const { token } = response.data;
 
      localStorage.setItem("token", token);
 
      navigate("/student/dashboard");

    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="student-login-container">
      <h2>Student Login</h2>
      <form className="student-login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      </form>
    </div>
  );
}

export default StudentLogin;

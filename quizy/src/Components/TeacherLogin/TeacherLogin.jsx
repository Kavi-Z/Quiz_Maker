import React, { useState } from "react";
import "./TeacherLogin.css";

function TeacherLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
     
    if (username === "teacher" && password === "password") {
      setError("");
      if (onLogin) onLogin(username);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="teacher-login-container">
      <h2>Teacher Login</h2>
      <form className="teacher-login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

export default TeacherLogin;

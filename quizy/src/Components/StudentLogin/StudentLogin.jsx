import React, { useState } from "react";

function StudentLogin({ onLogin }) {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onLogin({ name });
      }}
    >
      <input
        placeholder="Student Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <button type="submit">Student Login</button>
    </form>
  );
}

export default StudentLogin;
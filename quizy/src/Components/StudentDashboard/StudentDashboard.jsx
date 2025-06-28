
import React from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard({ quizzes, results }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Student Dashboard</h2>
      <ul>
        {quizzes.map((quiz, idx) => (
          <li key={idx}>
            <b>{quiz.title}</b>
            <button onClick={() => navigate(`/quiz/${idx}`)}>Take Quiz</button>
            {results.find(r => r.quizId === idx) && (
              <span> | Score: {results.find(r => r.quizId === idx).score}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDashboard;
import React, { useState } from "react";
import QuizForm from "./QuizForm";

function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState([]);

  const addQuiz = quiz => setQuizzes([...quizzes, quiz]);
  const deleteQuiz = idx => setQuizzes(quizzes.filter((_, i) => i !== idx));
  const updateQuiz = (idx, updatedQuiz) => {
    setQuizzes(quizzes.map((q, i) => (i === idx ? updatedQuiz : q)));
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <QuizForm onSubmit={addQuiz} />
      <ul>
        {quizzes.map((quiz, idx) => (
          <li key={idx}>
            <b>{quiz.question}</b>
            <button onClick={() => deleteQuiz(idx)}>Delete</button>
            {/* Add update logic as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherDashboard;
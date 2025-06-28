import React, { useState } from "react";
import QuizForm from "../QuizForm/QuizForm";

function TeacherDashboard({ quizzes, addQuiz, updateQuiz, deleteQuiz }) {
  const [editingIdx, setEditingIdx] = useState(null);

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <QuizForm
        onSubmit={addQuiz}
        buttonText="Create Quiz"
      />
      <h3>Existing Quizzes</h3>
      <ul>
        {quizzes.map((quiz, idx) => (
          <li key={idx}>
            <b>{quiz.title}</b>
            <button onClick={() => setEditingIdx(idx)}>Edit</button>
            <button onClick={() => deleteQuiz(idx)}>Delete</button>
            {editingIdx === idx && (
              <QuizForm
                initialQuiz={quiz}
                onSubmit={(q) => {
                  updateQuiz(idx, q);
                  setEditingIdx(null);
                }}
                buttonText="Update Quiz"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherDashboard;

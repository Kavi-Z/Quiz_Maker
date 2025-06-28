
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TakeQuiz({ quizzes, addResult }) {
  const { quizId } = useParams();
  const quiz = quizzes[quizId];
  const [answers, setAnswers] = useState(Array(quiz?.questions.length || 0).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleChange = (qIdx, optIdx) => {
    const newAns = [...answers];
    newAns[qIdx] = optIdx;
    setAnswers(newAns);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let sc = 0;
    quiz.questions.forEach((q, i) => {
      if (Number(answers[i]) === q.correct) sc++;
    });
    setScore(sc);
    setSubmitted(true);
    addResult({ quizId: Number(quizId), score: sc });
  };

  if (!quiz) return <div>Quiz not found.</div>;

  if (submitted)
    return (
      <div>
        <h3>Quiz Complete!</h3>
        <p>Your Score: {score} / {quiz.questions.length}</p>
        <button onClick={() => navigate("/student")}>Back to Dashboard</button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit}>
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q, i) => (
        <div key={i}>
          <p>{q.text}</p>
          {q.options.map((opt, j) => (
            <label key={j}>
              <input
                type="radio"
                name={`q${i}`}
                value={j}
                checked={Number(answers[i]) === j}
                onChange={() => handleChange(i, j)}
                required
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button type="submit">Submit Quiz</button>
    </form>
  );
}

export default TakeQuiz;
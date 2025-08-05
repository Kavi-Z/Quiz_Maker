import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function TakeQuiz() {
  // Extract quiz id from URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  // State for quiz data, student answers, submission status, and score
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");

  // Fetch quiz details on component mount or when the id changes
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/quizzes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizData(res.data);
      } catch (err) {
        console.error("Failed to fetch quiz:", err.response?.data || err.message);
        setError("Failed to load quiz. Please try again later.");
      }
    };
    fetchQuiz();
  }, [id]);

  // Update selected answer for a question
  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  // Compare student's answers with correct ones and update score
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For this example we'll calculate score on the front end.
    // (In production you may want to send the answers to the backend for evaluation.)
    let tempScore = 0;
    quizData.questions.forEach((question) => {
      // Compare the student's answer with the correct answer (assumed to be stored as a string)
      if (answers[question._id] === question.correctAnswer) {
        tempScore++;
      }
    });
    setScore(tempScore);
    setSubmitted(true);

    // Optionally, you could also send the student's answers to the backend:
    // try {
    //   const token = localStorage.getItem("token");
    //   const res = await axios.post(
    //     `http://localhost:5000/api/quizzes/${id}/submit`,
    //     { answers },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );
    //   setScore(res.data.correctAnswers);
    //   setSubmitted(true);
    // } catch (err) {
    //   console.error("Submission failed:", err.response?.data || err.message);
    //   setError("Submission failed. Please try again.");
    // }
  };

  if (error) return <div>{error}</div>;
  if (!quizData) return <div>Loading quiz...</div>;

  // If the quiz has been submitted, show the result
  if (submitted) {
    return (
      <div>
        <h3>Quiz Complete!</h3>
        <p>Your Score: {score} / {quizData.questions.length}</p>
        <button onClick={() => navigate("/student/dashboard")}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{quizData.title}</h2>
      {/* Loop over each question in the quiz */}
      {quizData.questions.map((question, index) => (
        <div key={question._id}>
          {/* Display the question text. Make sure to use the correct key.
              If your questions use 'questionText' then leave as is;
              if they use 'question', change accordingly */}
          <h4>{index + 1}. {question.questionText}</h4>
          {question.options.map((option, idx) => (
            <label key={idx} style={{ display: "block" }}>
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option}
                checked={answers[question._id] === option}
                onChange={() => handleOptionChange(question._id, option)}
                required
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button type="submit">Submit Quiz</button>
    </form>
  );
}

export default TakeQuiz;

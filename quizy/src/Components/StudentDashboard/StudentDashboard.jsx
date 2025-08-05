import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
    fetchResults();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/quizzes/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(res.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error.response?.data || error.message);
    }
  };

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/quizzes/my-results", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching results:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <ul>
        {quizzes.map((quiz) => {
          const result = results.find((r) => r.quiz._id === quiz._id);
          return (
            <li key={quiz._id}>
              <b>{quiz.title}</b>
              <button onClick={() => navigate(`/quiz/${quiz._id}`)}>Take Quiz</button>
              {result && (
                <span> | Score: {result.score} / {result.totalQuestions}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default StudentDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TeacherDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [expandedQuizIds, setExpandedQuizIds] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/quizzes/my-quizzes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error.response?.data || error.message);
      }
    };

    fetchQuizzes();
  }, []);

  const toggleQuizView = (quizId) => {
    setExpandedQuizIds((prev) =>
      prev.includes(quizId) ? prev.filter((id) => id !== quizId) : [...prev, quizId]
    );
  };

  return (
    <div className="dashboard">
      <h1>Teacher Dashboard</h1>
      <h2>Your Quizzes</h2>

      {quizzes.length === 0 ? (
        <p>No quizzes created yet.</p>
      ) : (
        quizzes.map((quiz) => (
          <div
            key={quiz._id}
            style={{
              border: "1px solid #ccc",
              margin: "20px",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => toggleQuizView(quiz._id)}
          >
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>

            {expandedQuizIds.includes(quiz._id) && (
              <>
                <p><strong>Total Questions:</strong> {quiz.questions.length}</p>
                {quiz.questions.map((q, index) => (
                  <div key={index} style={{ marginTop: "10px", paddingLeft: "10px" }}>
                    <p><strong>Q{index + 1}:</strong> {q.questionText}</p>
                    <ul>
                      {q.options.map((option, optIdx) => (
                        <li key={optIdx}>{option}</li>
                      ))}
                    </ul>
                    <p style={{ color: "green" }}>
                      <strong>Correct Answer:</strong> {q.correctAnswer}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default TeacherDashboard;

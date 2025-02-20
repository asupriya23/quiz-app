import React, { useEffect, useState } from "react";
import { getQuizHistory, clearQuizHistory } from "../utils/indexedDB";

const Scoreboard = ({ quizResults, restartQuiz }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const scores = await getQuizHistory();
    setHistory(scores.reverse());
  };

  const handleClearHistory = async () => {
    if (window.confirm("Are you sure you want to clear your quiz history?")) {
      await clearQuizHistory();
      setHistory([]);
    }
  };

  return (
    <div className="text-center mt-4 p-4 bg-light shadow-lg rounded">
      <h2 className="mb-3 text-white p-3 rounded" style={{ backgroundColor: "#007bff" }}>
        Quiz Completed!
      </h2>

      <p className="lead">
        <strong>Your Score: {quizResults.score} / {quizResults.total}</strong>
      </p>

      {/* Display Previous Scores */}
      <h4 className="mt-4 text-dark">📊 Previous Scores</h4>
      {history.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover mt-3">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {history.map((attempt, index) => (
                  <tr key={attempt.id}>
                    <td>{index + 1}</td>
                    <td>{new Date(attempt.date).toLocaleString()}</td>
                    <td className="font-weight-bold text-success">{attempt.score}</td>
                    <td className="font-weight-bold text-primary">{attempt.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={handleClearHistory} className="btn btn-danger mt-3">
            🗑️ Clear History
          </button>
        </>
      ) : (
        <p className="text-muted">No previous attempts found.</p>
      )}

      {/* Display Attempt History */}
      <h4 className="mt-4 text-dark">📜 Attempt History</h4>
      <ul className="list-group">
        {quizResults.attempts.map((attempt, index) => (
          <li
            key={index}
            className={`list-group-item ${
              attempt.isCorrect
                ? "list-group-item-success"
                : attempt.answer === "Skipped"
                ? "list-group-item-info"
                : "list-group-item-danger"
            }`}
          >
            <strong>Q:</strong> {attempt.question} <br />
            <strong>Your Answer:</strong> {attempt.answer === "Skipped" ? "➖ Skipped" : attempt.answer}{" "}
            {attempt.isCorrect ? "✅" : attempt.answer === "Skipped" ? "➖" : "❌"}
          </li>
        ))}
      </ul>

      <button onClick={restartQuiz} className="btn btn-primary mt-4 px-4 py-2">
        🔄 Try Again
      </button>
    </div>
  );
};

export default Scoreboard;

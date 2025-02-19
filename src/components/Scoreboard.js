import React, { useEffect, useState } from "react";
import { getQuizHistory } from "../utils/indexedDB";
import "bootstrap/dist/css/bootstrap.min.css";

const Scoreboard = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getQuizHistory().then(setHistory);
  }, []);

  return (
    <div className="container mt-5 p-4 bg-light shadow rounded">
      <h2 className="text-center">Quiz Attempt History</h2>
      {history.length === 0 ? (
        <p className="text-center text-muted">No quiz attempts yet.</p>
      ) : (
        <ul className="list-group mt-3">
          {history.map((attempt, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span><strong>Date:</strong> {attempt.date}</span>
              <span className="badge bg-primary p-2">Score: {attempt.score}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Scoreboard;

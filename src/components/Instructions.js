import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Instructions = ({ onStartQuiz }) => {
  return (
    <div className="container mt-5 p-4 bg-light shadow rounded text-center">
      <h2 className="mb-4 text-primary">Quiz Instructions</h2>
      <div className="p-3 bg-white border rounded">
        <ul className="list-group">
          <li className="list-group-item border-0 bg-light instruction-item">
            📌 For multiple-choice questions, select the one best answer (A, B, C, or D).
          </li>
          <li className="list-group-item border-0 bg-light instruction-item">
            📝 For integer-type questions, write your numerical answer clearly.
          </li>
          <li className="list-group-item border-0 bg-light instruction-item">
            ❌ No calculators unless specified.
          </li>
          <li className="list-group-item border-0 bg-light instruction-item">
            ⏳ You have <strong>30 minutes</strong> to complete this quiz.
          </li>
        </ul>
      </div>
      <button className="btn btn-primary mt-4 px-4 py-2" onClick={onStartQuiz}>
        🚀 Start Quiz
      </button>

      <style>
        {`
          .instruction-item {
            transition: background-color 0.3s, transform 0.2s;
            cursor: pointer;
            font-size: 1.1rem;
          }
          .instruction-item:hover {
            background-color: #dfe6e9;
            transform: scale(1.02);
          }
        `}
      </style>
    </div>
  );
};

export default Instructions;

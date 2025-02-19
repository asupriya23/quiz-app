import React, { useState } from "react";
import Instructions from "./components/Instructions";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [page, setPage] = useState("instructions"); // Start with Instructions
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  const handleQuizComplete = (result) => {
    setQuizResults(result);
    setQuizCompleted(true);
    setPage("scoreboard"); // Navigate to Scoreboard after Quiz
  };

  const restartQuiz = () => {
    setQuizCompleted(false);
    setQuizResults(null);
    setPage("instructions"); // Navigate back to Instructions before starting Quiz
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Quiz App</h1>

      {page === "instructions" && <Instructions onStartQuiz={() => setPage("quiz")} />}
      {page === "quiz" && <Quiz onQuizComplete={handleQuizComplete} />}
      
      {page === "scoreboard" && quizResults && (
        <div className="text-center mt-4 p-4 bg-light shadow rounded">
          <h2>Quiz Completed!</h2>
          <p className="lead">
            Your Score: <strong>{quizResults.score} / {quizResults.total}</strong>
          </p>

          <h4 className="mt-3">Attempt History</h4>
          <ul className="list-group">
            {quizResults.attempts.map((attempt, index) => (
              <li
                key={index}
                className={`list-group-item ${attempt.isCorrect ? "list-group-item-success" : "list-group-item-danger"}`}
              >
                <strong>Q:</strong> {attempt.question} <br />
                <strong>Your Answer:</strong> {attempt.answer} {attempt.isCorrect ? "✅" : "❌"}
              </li>
            ))}
          </ul>

          <button onClick={restartQuiz} className="btn btn-primary mt-4">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

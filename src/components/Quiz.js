import React, { useState, useEffect } from "react";
import questions from "../data/questions";
import "bootstrap/dist/css/bootstrap.min.css";

const Quiz = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [attemptHistory, setAttemptHistory] = useState([]);
  const [timer, setTimer] = useState(30);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      handleNext();
    }
  }, [timer]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const correctAnswer = questions[currentQuestion].correctAnswer;
    const isCorrect = answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    setFeedback(isCorrect ? "✅ Correct!" : `❌ Incorrect! The correct answer is: ${correctAnswer}`);

    const newAttempt = {
      question: questions[currentQuestion].question,
      answer,
      isCorrect,
    };
    setAttemptHistory([...attemptHistory, newAttempt]);
    if (isCorrect) setScore(score + 1);
  };

  const handleSkip = () => {
    setFeedback(null);
    setAttemptHistory([...attemptHistory, { question: questions[currentQuestion].question, answer: "Skipped", isCorrect: false }]);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer("");
    setTimer(30);
  };

  const handleNext = () => {
    setFeedback(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setTimer(30);
    } else {
      onQuizComplete({ score, total: questions.length, attempts: attemptHistory });
    }
  };

  return (
    <div className="container mt-5 p-4 bg-light shadow-lg rounded text-center" style={{ maxWidth: "700px" }}>
      <h2 className="mb-3 text-white p-3 rounded" style={{ backgroundColor: "#007bff" }}>
        Question {currentQuestion + 1} / {questions.length}
      </h2>
      <h5 className="text-danger font-weight-bold">⏳ Time Left: {timer} seconds</h5>

      <div className="p-4 bg-white border rounded mt-3">
        <p className="lead font-weight-bold">{questions[currentQuestion].question}</p>
      </div>

      <div className="mt-3">
        {questions[currentQuestion].options ? (
          questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`btn ${selectedAnswer === option ? "btn-primary" : "btn-outline-primary"} mt-2`}
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== ""}
              style={{ width: "100%", padding: "10px", fontSize: "1.1rem", marginBottom: "10px" }}
            >
              {option}
            </button>
          ))
        ) : (
          <input
            type="number"
            className="form-control mt-2"
            placeholder="Enter your answer"
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            disabled={feedback !== null}
            onBlur={() => handleAnswerClick(selectedAnswer)}
            onKeyPress={(e) => {
              if (!/^\d$/.test(e.key) && e.key !== "Backspace" && e.key !== "Enter") {
                e.preventDefault();
              }
            }}
            style={{ fontSize: "1.1rem", padding: "10px", textAlign: "center" }}
          />
        )}
      </div>

      {feedback && (
        <p className="text-center mt-3 font-weight-bold p-2 rounded" style={{ backgroundColor: "#f8d7da", color: "#721c24" }}>
          {feedback}
        </p>
      )}

      <div className="text-center mt-4">
        <button
          className="btn btn-success px-4 py-2 mx-2"
          onClick={handleNext}
          disabled={!selectedAnswer && timer > 0}
          style={{ fontSize: "1.1rem" }}
        >
          {currentQuestion === questions.length - 1 ? "🎉 Finish Quiz" : "➡ Next Question"}
        </button>

        {currentQuestion < questions.length - 1 && (
          <button
            className="btn btn-warning px-4 py-2 mx-2"
            onClick={handleSkip}
            disabled={selectedAnswer !== ""}
            style={{ fontSize: "1.1rem" }}
          >
            ⏭ Skip Question
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;

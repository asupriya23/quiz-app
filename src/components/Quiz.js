import React, { useState, useEffect } from "react";
import questions from "../data/questions";
import "bootstrap/dist/css/bootstrap.min.css";

const Quiz = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); 
  const [score, setScore] = useState(0);
  const [attemptHistory, setAttemptHistory] = useState([]);
  const [timer, setTimer] = useState(30);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      handleSkip();
    }
  }, [timer]);

  const normalizeNumber = (num) => {
    return num.replace(/^0+/, "") || "0"; 
  };

  const handleAnswerClick = (answer) => {
    const correctAnswer = normalizeNumber(questions[currentQuestion].correctAnswer.toString());
    const userAnswer = normalizeNumber(answer.toString());

    const isCorrect = userAnswer === correctAnswer;
    setFeedback(isCorrect ? "✅ Correct!" : `❌ Incorrect! The correct answer is: ${correctAnswer}`);

    setAttemptHistory([...attemptHistory, { question: questions[currentQuestion].question, answer, isCorrect }]);
    if (isCorrect) setScore((prevScore) => prevScore + 1); 

    setSelectedAnswer(answer); 
  };

  const handleSkip = () => {
    setAttemptHistory([
      ...attemptHistory,
      { question: questions[currentQuestion].question, answer: "Skipped", isCorrect: false }
    ]);
    moveToNextQuestion();
  };
  
  const handleNext = () => {
    if (feedback === null) return; 
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);  
      setFeedback(null);
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
              disabled={selectedAnswer !== null}
              style={{ width: "100%", padding: "10px", fontSize: "1.1rem", marginBottom: "10px" }}
            >
              {option}
            </button>
          ))
        ) : (
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Enter your answer"
            value={selectedAnswer || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setSelectedAnswer(value);
              }
            }}
            disabled={feedback !== null}
            onBlur={() => handleAnswerClick(selectedAnswer)}
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
          className="btn btn-success px-4 py-2 mx-3"
          onClick={handleNext}
          disabled={feedback === null} 
          style={{ fontSize: "1.1rem", marginRight: "10px" }}
        >
          {currentQuestion === questions.length - 1 ? "🎉 Finish Quiz" : "➡ Next Question"}
        </button>

        {currentQuestion < questions.length - 1 && (
          <button
            className="btn btn-warning px-4 py-2 mx-3"
            onClick={handleSkip}
            disabled={selectedAnswer !== null}
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

import React, { useState, useEffect } from "react";
import Instructions from "./components/Instructions";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";
import { saveQuizResult, getQuizHistory } from "./utils/indexedDB"; // IndexedDB functions
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [page, setPage] = useState("instructions");
  const [quizResults, setQuizResults] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getQuizHistory();
      setQuizHistory(history);
    };
    fetchHistory();
  }, []);

  const handleQuizComplete = async (result) => {
    setQuizResults(result);
    setPage("scoreboard");
    await saveQuizResult(result);
    const updatedHistory = await getQuizHistory();
    setQuizHistory(updatedHistory);
  };

  const restartQuiz = () => {
    setQuizResults(null);
    setPage("instructions");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Quiz App</h1>

      {page === "instructions" && <Instructions onStartQuiz={() => setPage("quiz")} />}
      {page === "quiz" && <Quiz onQuizComplete={handleQuizComplete} />}
      {page === "scoreboard" && (
        <Scoreboard 
          quizResults={quizResults} 
          quizHistory={quizHistory} 
          restartQuiz={restartQuiz} 
        />
      )}
    </div>
  );
};

export default App;

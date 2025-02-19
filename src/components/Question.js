import React from "react";

const Question = ({ questionData, selectedAnswer, onSelectAnswer }) => {
  return (
    <div>
      <h2>{questionData.question}</h2>
      {questionData.options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelectAnswer(option)}
          style={{
            backgroundColor:
              selectedAnswer !== null
                ? option === questionData.answer
                  ? "green"
                  : "red"
                : "white",
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Question;

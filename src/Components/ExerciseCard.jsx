import React, { useState } from "react";
import "../styles/ExerciseCard.css";

export default function ExerciseCard({ exercise }) {
  const [expanded, setExpanded] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [draggedOption, setDraggedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setUserAnswer(draggedOption);
  };

  const checkAnswer = () => {
    if (!userAnswer) return;
    const isCorrect = userAnswer === exercise.answer;
    setFeedback(isCorrect ? "correct" : "wrong");
  };

  const renderAnswerInput = () => {
    switch (exercise.answerType) {
      case "multiple":
        return (
          <div className="multiple-choice">
            {exercise.options?.map((option, index) => (
              <label key={index} className="option-label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <input
                  type="radio"
                  name={`question-${exercise.id}`}
                  value={option}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  style={{ transform: 'scale(1.5)', marginRight: '8px' ,cursor:'pointer'}} // 1.5 = הגדלה של 150%
                />
                {option}
              </label>
            ))}
          </div>
        );

      case "text":
        return (
          <input
            type="text"
            placeholder="הקלד תשובה"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="text-input"
          />
        );

      case "drag":
        return (
          <>
            <div className="drag-options">
              {exercise.options?.map((option, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => setDraggedOption(option)}
                  className="drag-option"
                >
                  {option}
                </div>
              ))}
            </div>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="drop-zone"
            >
              {userAnswer ? `בחרת: ${userAnswer}` : "גרור תשובה לכאן"}
            </div>
          </>
        );

      default:
        return <p className="error-text">שיטת מענה לא נתמכת</p>;
    }
  };

  return (
    <>
      <div
        className={`exercise-card ${expanded ? "expanded" : ""}`}
        onClick={() => setExpanded(!expanded)}
      >
        <h3>{exercise.topic}</h3>
        <p>{exercise.question}</p>
      </div>

      {expanded && (
        <div className="modal-overlay" onClick={() => setExpanded(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{exercise.topic}</h3>
            <p>{exercise.question}</p>
            <p><b>רמת קושי:</b> {exercise.difficulty}</p>
            <p><b>כיתה:</b> {exercise.grade}</p>

            <div className="answer-section">{renderAnswerInput()}</div>

            <button
              className="check-button"
              onClick={checkAnswer}
              disabled={!userAnswer}
            >
              בדוק תשובה
            </button>

            {feedback === "correct" && (
              <p className="feedback correct">כל הכבוד! התשובה נכונה.</p>
            )}
            {feedback === "wrong" && (
              <p className="feedback wrong">התשובה שגויה, נסה שוב.</p>
            )}

            <button className="close-button" onClick={() => setExpanded(false)}>
              סגור
            </button>
          </div>
        </div>
      )}
    </>
  );
}

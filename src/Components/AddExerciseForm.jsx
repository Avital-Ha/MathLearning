import React, { useState } from "react";
import "../styles/AddExerciseForm.css";

const answerTypeMap = {
  גרירה: "drag",
  "רב ברירה": "multiple",
  "הקלדת טקסט": "text",
  "גרירה לפי סדר": "drag-sort",
};
const grades = ["א","ב","ג","ד","ה","ו","ז","ח","ט","י",'י"א','י"ב']
export default function AddExerciseForm({ onAddExercise }) {
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [question, setQuestion] = useState("");
  const [answerTypeHeb, setAnswerTypeHeb] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [optionsText, setOptionsText] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!topic || !grade || !difficulty || !question || !answerTypeHeb) {
      alert("אנא מלא את כל השדות");
      return;
    }

    const answerType = answerTypeMap[answerTypeHeb];
    if (!answerType) {
      alert("בחר סוג תשובה תקין");
      return;
    }

    // המרת תשובה ומערך אפשרויות למערכים במידת הצורך
    let answer;
    if (answerType === "drag-sort" || answerType === "multiple") {
      answer = answerText.split(",").map((a) => a.trim());
    } else if (answerType === "drag") {
      // במקרה של drag - התשובה היא מחרוזת, אבל יכולה להיות גם מערך של מחרוזות (תלוי במימוש)
      // פה נניח שזה מחרוזת אחת
      answer = answerText.trim();
    } else if (answerType === "text") {
      answer = answerText.trim();
    }

    const options = optionsText
      ? optionsText.split(",").map((o) => o.trim())
      : [];

    const newExercise = {
      topic,
      grade,
      difficulty,
      question,
      answerType,
      answer,
      options,
    };

    onAddExercise(newExercise);

    // איפוס השדות
    setTopic("");
    setGrade("");
    setDifficulty("");
    setQuestion("");
    setAnswerTypeHeb("");
    setAnswerText("");
    setOptionsText("");
  };

  return (
    <form  className="exercise-form" onSubmit={handleSubmit} style={{ direction: "rtl", maxWidth: "400px" }}>
      <label>
        נושא:
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </label>

      <label>
        כיתה:
        <select value={grade} onChange={(e) => setGrade(e.target.value)} required>
          <option value="">בחר כיתה</option>
          {grades.map((grade, i) => (
            <option key={i} value={grade}>
                {grade}
            </option>
        ))}
        </select>
      </label>

      <label>
        רמת קושי:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
        >
          <option value="">בחר רמת קושי</option>
          <option value="קל">קל</option>
          <option value="בינוני">בינוני</option>
          <option value="קשה">קשה</option>
        </select>
      </label>

      <label>
        שאלה:
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </label>
<label>
  סוג תשובה:
  <select
    value={answerTypeHeb}
    onChange={(e) => setAnswerTypeHeb(e.target.value)}
    required
  >
    <option value="">בחר סוג תשובה</option>
    <option value="גרירה">גרירה</option>
    <option value="רב ברירה">רב ברירה</option>
    <option value="הקלדת טקסט">הקלדת טקסט</option>
    <option value="גרירה לפי סדר">גרירה לפי סדר</option>
  </select>
</label>

{(answerTypeHeb === "גרירה" ||
  answerTypeHeb === "רב ברירה" ||
  answerTypeHeb === "גרירה לפי סדר") && (
  <label>
    אפשרויות (מופרדות בפסיקים, לא חובה):
    <textarea
      value={optionsText}
      onChange={(e) => setOptionsText(e.target.value)}
      placeholder="לדוגמה: 3,2,5"
    />
  </label>
)}

<label>
  תשובה (לגרירה לפי סדר ורב ברירה רשום הערכים מופרדים בפסיקים):
  <textarea
    value={answerText}
    onChange={(e) => setAnswerText(e.target.value)}
    placeholder="לדוגמה: 2,3,5"
    required
  />
</label>

      <button type="submit">הוסף תרגיל</button>
    </form>
  );
}

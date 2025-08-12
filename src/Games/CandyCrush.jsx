import React, { useState, useEffect } from "react";
import "../Games/Styles/CandyCrush.css"

const width = 8;
const candyEmojis = ["🍭", "🍬", "🍫", "🍡", "🍪", "🍩"];

function getRandomCandy() {
  return candyEmojis[Math.floor(Math.random() * candyEmojis.length)];
}

function createBoard() {
  const board = [];
  for (let i = 0; i < width * width; i++) {
    board.push(getRandomCandy());
  }
  return board;
}

export default function CandyCrush() {
  const [board, setBoard] = useState(createBoard);
  const [draggedId, setDraggedId] = useState(null);
  const [replacedId, setReplacedId] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const checkRowForThree = (boardToCheck) => {
    let newBoard = [...boardToCheck];
    let foundMatch = false;

    for (let i = 0; i < 62; i++) {
      if (i % width > width - 3) continue;
      const rowOfThree = [i, i + 1, i + 2];
      const decidedCandy = newBoard[i];
      if (
        decidedCandy !== "" &&
        rowOfThree.every((idx) => newBoard[idx] === decidedCandy)
      ) {
        rowOfThree.forEach((idx) => (newBoard[idx] = ""));
        setScore((score) => score + 3);
        foundMatch = true;
      }
    }
    return { newBoard, foundMatch };
  };

  const checkColumnForThree = (boardToCheck) => {
    let newBoard = [...boardToCheck];
    let foundMatch = false;

    for (let i = 0; i < 48; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedCandy = newBoard[i];
      if (
        decidedCandy !== "" &&
        columnOfThree.every((idx) => newBoard[idx] === decidedCandy)
      ) {
        columnOfThree.forEach((idx) => (newBoard[idx] = ""));
        setScore((score) => score + 3);
        foundMatch = true;
      }
    }
    return { newBoard, foundMatch };
  };

  const dragStart = (e) => {
    setDraggedId(parseInt(e.target.getAttribute("data-id")));
  };

  const dragDrop = (e) => {
    setReplacedId(parseInt(e.target.getAttribute("data-id")));
  };

  const dragEnd = () => {
    if (draggedId === null || replacedId === null) return;

    const validMoves = [
      draggedId - 1,
      draggedId + 1,
      draggedId - width,
      draggedId + width,
    ];

    if (validMoves.includes(replacedId)) {
      const newBoard = [...board];
      // החלפת ממתקים
      const temp = newBoard[replacedId];
      newBoard[replacedId] = newBoard[draggedId];
      newBoard[draggedId] = temp;
      setBoard(newBoard);

      // בדיקה אם יש התאמה אחרי החלפה
      const rowCheck = checkRowForThree(newBoard);
      const colCheck = checkColumnForThree(rowCheck.newBoard);

      if (rowCheck.foundMatch || colCheck.foundMatch) {
        // שומרים את המצב עם ההתאמות
        setBoard(colCheck.newBoard);
      } else {
        // אין התאמה - מחזירים את המצב לקדמותו
        newBoard[draggedId] = newBoard[replacedId];
        newBoard[replacedId] = temp;
        setBoard(newBoard);
      }
    }
    setDraggedId(null);
    setReplacedId(null);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      let newBoard = [...board];

      // נפילה של ממתקים
      for (let i = 0; i < 56; i++) {
        if (newBoard[i + width] === "" && newBoard[i] !== "") {
          newBoard[i + width] = newBoard[i];
          newBoard[i] = "";
        }
      }

      // בדיקת שורות
      const { newBoard: boardAfterRowCheck, foundMatch: foundRow } = checkRowForThree(newBoard);
      // בדיקת עמודות
      const { newBoard: boardAfterColCheck, foundMatch: foundCol } = checkColumnForThree(boardAfterRowCheck);

      if (foundRow || foundCol) {
        setBoard(boardAfterColCheck);
        return; // מחכים לסבב הבא של ה-interval למלא ריקים
      }

      // מילוי ריקים
      for (let i = 0; i < 64; i++) {
        if (boardAfterColCheck[i] === "") {
          boardAfterColCheck[i] = getRandomCandy();
        }
      }

      setBoard(boardAfterColCheck);
    }, 150);

    return () => clearInterval(timer);
  }, [board]);

  return (
    <div className="game-zone-candy">
      <h1>Candy Crush מתמטי עם אימוג׳ים</h1>
      <p>ניקוד: {score} | חיים: {lives}</p>
      <div
        className="board-game-candy"
      >
        {board.map((candy, idx) => (
          <div
            className="board-element-candy"
            key={idx}
            data-id={idx}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          >
            {candy}
          </div>
        ))}
      </div>
    </div>
  );
}
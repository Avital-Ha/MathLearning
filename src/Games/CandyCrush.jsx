import React, { useState, useEffect } from "react";

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
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>Candy Crush מתמטי עם אימוג׳ים</h1>
      <p>ניקוד: {score} | חיים: {lives}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${width}, 50px)`,
          justifyContent: "center",
          gap: 5,
          userSelect: "none",
          fontSize: 32,
          lineHeight: "50px",
          cursor: "grab",
        }}
      >
        {board.map((candy, idx) => (
          <div
            key={idx}
            data-id={idx}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              border: "1px solid #333",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",
            }}
          >
            {candy}
          </div>
        ))}
      </div>
    </div>
  );
}

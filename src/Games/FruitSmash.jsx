import React, { useState, useEffect, useRef } from "react";
import "../Games/Styles/FruitSmash.css";

const fruitEmojis = ["🍎", "🍊", "🍇", "🍓", "🍍", "🥝"];
const bombEmoji = "💣";

function getRandomFruitOrBomb() {
  // 1 מתוך 6 להזמין פצצה
  if (Math.random() < 1 / 6) return bombEmoji;
  return fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];
}

function createFruitOrBomb(id, width, height) {
  return {
    id,
    emoji: getRandomFruitOrBomb(),
    x: Math.random() * (width - 100) + 50, // לא קרוב מדי לקצוות
    y: height / 3,
    speedY: -(2 + Math.random() * 3),
    cut: false,
  };
}

export default function FruitSmash() {
  const gameAreaRef = useRef(null);
  const [fruits, setFruits] = useState([]);
  const [score, setScore] = useState(0);
  const [cutPositions, setCutPositions] = useState([]);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameAreaRef.current) return;
      const rect = gameAreaRef.current.getBoundingClientRect();

      setFruits((fruits) => [
        ...fruits,
        createFruitOrBomb(Date.now(), rect.width, rect.height),
      ]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const update = () => {
      setFruits((oldFruits) => {
        return oldFruits
          .map((fruit) => {
            if (fruit.cut) return fruit;

            return {
              ...fruit,
              y: fruit.y + fruit.speedY,
              speedY: fruit.speedY + 0.1,
            };
          })
          .filter((fruit) => fruit.y < window.innerHeight + 60);
      });
    };

    const interval = setInterval(update, 16);
    return () => clearInterval(interval);
  }, []);

  const onPointerMove = (e) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);

    if (!x || !y) return;

    setCutPositions((positions) =>
      [...positions, { x, y, id: Date.now() }].slice(-10)
    );

    setFruits((fruits) =>
      fruits.map((fruit) => {
        if (fruit.cut) return fruit;

        const dx = fruit.x - x;
        const dy = fruit.y - y;
        if (dx * dx + dy * dy < 40 * 40) {
          if (fruit.emoji === bombEmoji) {
            setLives((l) => Math.max(0, l - 1));
          } else {
            setScore((score) => score + 1);
          }
          return { ...fruit, cut: true };
        }
        return fruit;
      })
    );
  };

  useEffect(() => {
    if (cutPositions.length === 0) return;
    const timeout = setTimeout(() => setCutPositions([]), 300);
    return () => clearTimeout(timeout);
  }, [cutPositions]);

  return (
    <div className="game-fruit">
      <h1 className="fruitSmash-name">FruitSmash מתמטי עם אימוג׳ים</h1>

       <h2 className="score">ניקוד: {score}</h2>
      <h2 className="lives">חיים: {lives}</h2>
    <div
      ref={gameAreaRef}
      onPointerMove={onPointerMove}
      onTouchMove={onPointerMove}
      className="game-area-fruit"
    >
     

      {fruits.map((fruit) => (
        <div
          key={fruit.id}
          className={`fruit ${fruit.cut ? "cut" : ""} ${
            fruit.emoji === bombEmoji ? "bomb" : ""
          }`}
          style={{ left: fruit.x, top: fruit.y }}
        >
          {fruit.emoji}
        </div>
      ))}

      <svg className="cut-lines">
        {cutPositions.length > 1 &&
          cutPositions.map((pos, i) => {
            if (i === 0) return null;
            const prev = cutPositions[i - 1];
            return (
              <line
                key={pos.id}
                x1={prev.x}
                y1={prev.y}
                x2={pos.x}
                y2={pos.y}
                stroke="rgba(0, 0, 0, 0.5)"
                strokeWidth={4}
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.3))" }}
              />
            );
          })}
      </svg>
    </div>
    </div>
  );
}

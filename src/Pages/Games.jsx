import React from "react";
import { Link } from "react-router-dom";
import "../styles/Games.css";

const gamesList = [
  { id: "candy-crush", name: "Candy Crush" },
  { id: "fruit-smash", name: "Fruit Smash" },
  { id: "tower-run", name: "Tower Run" },
];

export default function Games() {
  return (
    <div className="games-container">
      <h1>משחקים</h1>
      <div className="cards-container">
        {gamesList.map((game) => (
          <Link key={game.id} to={`/gamePage/${game.id}`} className="game-card">
            <h2>{game.name}</h2>
            <p>לחצו כדי לשחק</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

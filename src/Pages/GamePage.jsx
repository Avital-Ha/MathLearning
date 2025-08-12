import React from "react";
import { useParams } from "react-router-dom";
import CandyCrush from "../Games/CandyCrush";
import FruitSmash from "../Games/FruitSmash";
import TowerRun from "../Games/TowerRun";
import "../styles/Games.css";

export default function GamePage() {
  const { gameId } = useParams();

  let content;
  switch (gameId) {
    case "candy-crush":
      content = <CandyCrush />;
      break;
    case "fruit-smash":
      content = <FruitSmash />;
      break;
    case "tower-run":
      content = <TowerRun />;
      break;
    default:
      content = <p>משחק לא נמצא</p>;
  }

  return (
    <div className="fullscreen-game">
      {content}
    </div>
  );
}

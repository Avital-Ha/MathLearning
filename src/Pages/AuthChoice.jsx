import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/AuthChoice.css';

export default function AuthChoice() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to MathLearning!</h1>
      <div className="buttons">
        <button onClick={() => navigate("/register")}>SIGN UP</button>
        <button onClick={() => navigate("/login")}>LOGIN</button>
      </div>
    </div>
  );
}

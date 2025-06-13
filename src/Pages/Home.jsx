import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to MathLearning</h1>
        <p>Your companion for math exercises, games, and progress tracking.</p>
      </header>

      <section className="home-features">
        <div className="feature-card">
          <h2>Exercises</h2>
          <p>Practice math exercises tailored to your grade and skill level.</p>
          <Link to="/Exercises" className="btn btn-primary">Start Practicing</Link>
        </div>
        <div className="feature-card">
          <h2>Games</h2>
          <p>Learn math concepts through fun and interactive games.</p>
          <Link to="/Games" className="btn btn-primary">Play Games</Link>
        </div>
        <div className="feature-card">
          <h2>Progress</h2>
          <p>Track your learning journey and see your improvement over time.</p>
          <Link to="/Progress" className="btn btn-primary">View Progress</Link>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2025 MathLearning. All rights reserved.</p>
      </footer>
    </div>
  );
}

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

      {/* ✨ קודם כל הפיצ'רים: תרגול, משחקים, התקדמות */}
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

      {/* ✨ אחר כך – שלושת סוגי המשתמשים */}
      <section className="user-types">
        <h2>Perfect for Everyone</h2>
        <div className="user-cards">
          <div className="user-card student">
            <div className="icon">👥</div>
            <h3>Students</h3>
            <p>
              Interactive dashboard with personalized learning paths and achievement tracking.
            </p>
          </div>
          <div className="user-card parent">
            <div className="icon">👥</div>
            <h3>Parents</h3>
            <p>
              Monitor your child's progress and get insights on strengths and areas for improvement.
            </p>
          </div>
          <div className="user-card teacher">
            <div className="icon">🎓</div>
            <h3>Teachers</h3>
            <p>
              Create custom exercises and track student progress across multiple classes.
            </p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2025 MathLearning. All rights reserved.</p>
      </footer>
    </div>
  );
}

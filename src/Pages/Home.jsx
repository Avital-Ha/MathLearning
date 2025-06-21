import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';

export default function Home() {
  return (
    <div  data-aos="fade-up" className="home-container">
      <header className="home-header">
        <h1>ברוכים הבאים ל <br/>MathLearning</h1>
        <p>אתר למידה מתמטי מותאם אישית עם משחקים תרגולים והתקדמות שלכם</p>
      </header>

      {/* ✨ קודם כל הפיצ'רים: תרגול, משחקים, התקדמות */}
      <section className="home-features">
        <div className="feature-card">
          <h2>תרגולים</h2>
          <p>תרגולים מתמטים חווייתים מותאמים אישית לכיתה ולרמה שלכם</p>
          <Link to="/Exercises" className="btn btn-primary">התחילו לתרגל </Link>
        </div>
        <div className="feature-card">
          <h2>משחקים</h2>
          <p>ללמוד מתמטיקה מורכבת בכיף דרך משחקים לכל הכיתות והרמות</p>
          <Link to="/Games" className="btn btn-primary">שחקו משחקים</Link>
        </div>
        <div className="feature-card">
          <h2>התקדמות</h2>
          <p>עקבו אחד הלמידה שלכם ותראו את התהליך שלכם עם הזמן</p>
          <Link to="/Progress" className="btn btn-primary">צפו בהתקדמות</Link>
        </div>
      </section>

      {/* ✨ אחר כך – שלושת סוגי המשתמשים */}
      <section className="user-types">
        <h2>מתאים לכולם</h2>
        <div className="user-cards">
          <div className="user-card student">
            <div className="icon">👥</div>
            <h3>תלמידים</h3>
            <p>
              אזור אישי אינטראקטיבי עם משחקונים ותרגולים מושלמים ללמידה שלכם
            </p>
          </div>
          <div className="user-card parent">
            <div className="icon">👥</div>
            <h3>הורים</h3>
            <p>
              עקבו אחר ההתקדמות של הילד שלכם , וקבלו מאיתנו טיפים לשיפור
            </p>
          </div>
          <div className="user-card teacher">
            <div className="icon">🎓</div>
            <h3>מורים</h3>
            <p>
             תוכלו ליצור בקלות תרגולים מותאמים אישית לחומר ולכיתה שלכם 
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

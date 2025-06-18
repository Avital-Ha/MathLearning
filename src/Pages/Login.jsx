import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../FireBase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.emailVerified) {
        setError("נא לאמת את כתובת המייל לפני כניסה");
        await auth.signOut();
        return;
      }

      // כניסה מוצלחת
      navigate("/app");
    } catch (err) {
      setError("אימייל או סיסמה לא נכונים");
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("נא להזין כתובת אימייל כדי לאפס סיסמה");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("קישור לאיפוס סיסמה נשלח למייל שלך");
    } catch (err) {
      setError("שליחת הקישור נכשלה. בדוק את כתובת המייל ונסה שוב.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">התחברות</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-label">
          מייל:
          <input
            className="login-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="login-label">
          סיסמה:
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="login-error">{error}</p>}
        {message && <p className="login-success">{message}</p>}

        <button className="login-button" type="submit">
          התחבר
        </button>

        <button
          type="button"
          className="login-button login-reset-button"
          onClick={handleResetPassword}
        >
          שכחת סיסמה?
        </button>
      </form>
    </div>
  );
}

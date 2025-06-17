import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../FireBase";
import { signInWithEmailAndPassword } from "firebase/auth";
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.emailVerified) {
        setError("נא לאמת את כתובת המייל לפני כניסה");
        await auth.signOut();
        return;
      }

      // כניסה מוצלחת, מעבר לדשבורד (או עמוד הבית)
      navigate("/app");
    } catch (err) {
      setError("אימייל או סיסמה לא נכונים");
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

        <button className="login-button" type="submit">
          התחבר
        </button>
      </form>
    </div>
  );
}

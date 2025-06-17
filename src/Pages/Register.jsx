import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../FireBase";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import '../styles/Register.css';

export default function Register() {
  const [userType, setUserType] = useState("");
  const [grade, setGrade] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!userType) {
      setError("אנא בחר סוג משתמש");
      return;
    }
    if (userType === "student" && !grade) {
      setError("אנא בחר כיתה");
      return;
    }
    if (!fullName || !email || !password) {
      setError("אנא מלא את כל השדות");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      await sendEmailVerification(userCredential.user);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        user_type: userType,
        grade: userType === "student" ? grade : null,
        full_name: fullName,
        email: email,
      });

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div className="register-container" >
        <h2 className="register-title">נרשמת בהצלחה!</h2>
        <p>נשלח אליך מייל לאימות. אנא בדוק את תיבת המייל ולחץ על הקישור לאישור החשבון.</p>
        <button className="register-button" onClick={() => navigate("/login")}>
          עבור להתחברות
        </button>
      </div>
    );
  }

  return (
    <div className="register-container">
      <h2 className="register-title">הרשמה</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="register-label">
          סוג משתמש:
          <select
            className="register-select"
            value={userType}
            onChange={e => setUserType(e.target.value)}
          >
            <option value="">בחר</option>
            <option value="student">תלמיד</option>
            <option value="teacher">מורה</option>
            <option value="parent">הורה</option>
          </select>
        </label>

        {userType === "student" && (
          <label className="register-label">
            כיתה:
            <select
              className="register-select"
              value={grade}
              onChange={e => setGrade(e.target.value)}
            >
              <option value="">בחר כיתה</option>
              {['א','ב' , 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט','י','י"א','י"ב'].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>
        )}

        <label className="register-label">
          שם מלא:
          <input
            className="register-input"
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
        </label>

        <label className="register-label">
          מייל:
          <input
            className="register-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="register-label">
          סיסמה:
          <input
            className="register-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>

        {error && <p className="register-error">{error}</p>}

        <button className="register-button" type="submit">
          הרשמה
        </button>
      </form>
    </div>
  );
}

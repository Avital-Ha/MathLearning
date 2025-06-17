import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../FireBase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import '../styles/Register.css'; // וודא שה-CSS המותאם שם

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
      setError("Please select a user type");
      return;
    }
    if (userType === "student" && !grade) {
      setError("Please select a grade");
      return;
    }
    if (!fullName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

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
      <div className="register-container" style={{ maxWidth: 400 }}>
        <h2 className="register-title">נרשמת בהצלחה!</h2>
        <button className="register-button" onClick={() => navigate("/login")}>
          עבור להתחברות
        </button>
      </div>
    );
  }

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="register-label">
          User Type:
          <select
            className="register-select"
            value={userType}
            onChange={e => setUserType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
          </select>
        </label>

        {userType === "student" && (
          <label className="register-label">
            Grade:
            <select
              className="register-select"
              value={grade}
              onChange={e => setGrade(e.target.value)}
            >
              <option value="">Select Grade</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>
        )}

        <label className="register-label">
          Full Name:
          <input
            className="register-input"
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
        </label>

        <label className="register-label">
          Email:
          <input
            className="register-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="register-label">
          Password:
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
          Register
        </button>
      </form>
    </div>
  );
}

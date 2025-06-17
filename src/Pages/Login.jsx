import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBase"; // Make sure this path is correct
import '../styles/Login.css'; // Optional styling

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  console.log("Attempting login with", email, password);

  if (!email || !password) {
    setError("Please enter both email and password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email.trim(), password);
    navigate("/");
  } catch (error) {
    console.error("Login error:", error.code, error.message);
    setError(`Login failed: ${error.message}`);
  }
};

  return (
  <div className="login-container">
  <h2>Login</h2>
  <form onSubmit={handleSubmit} className="login-form">
    <label className="login-label">
      Email:
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="login-input"
      />
    </label>
    <label className="login-label">
      Password:
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="login-input"
      />
    </label>
    {error && <p className="login-error">{error}</p>}
    <button type="submit" className="login-button">Login</button>
  </form>
</div>

  );
}

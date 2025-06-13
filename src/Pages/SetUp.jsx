import React, { useState } from "react";
import "./setup.css";

export default function Setup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    grade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן אפשר להוסיף לוגיקה לשמירת ההגדרות או קריאה ל-API
    alert(`Setup submitted!\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nGrade: ${formData.grade}`);
  };

  return (
    <div className="setup-container">
      <h1>Setup Your Profile</h1>
      <form onSubmit={handleSubmit} className="setup-form">
        <label>
          First Name
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Grade
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Choose your grade</option>
            {[...Array(12).keys()].map(n => (
              <option key={n + 1} value={n + 1}>{n + 1}</option>
            ))}
          </select>
        </label>

        <button type="submit" className="btn btn-primary">Save Setup</button>
      </form>
    </div>
  );
}

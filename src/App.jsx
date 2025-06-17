import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import AuthChoice from "./Pages/AuthChoice";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function Dashboard() {
  return <h1>Dashboard Page</h1>;
}
function Exercises() {
  return <h1>Exercises Page</h1>;
}
function Games() {
  return <h1>Games Page</h1>;
}
function Progress() {
  return <h1>Progress Page</h1>;
}

const basename = process.env.NODE_ENV === "production" ? "/MathLearning" : "/";

export default function App() {
  return (
    <HashRouter basename={basename}>
      <Routes>
        {/* ברירת מחדל תמיד ל-auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* דפים ללא Layout */}
        <Route path="/auth" element={<AuthChoice />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* דפים בתוך Layout, תחת /app */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Exercises" element={<Exercises />} />
          <Route path="Games" element={<Games />} />
          <Route path="Progress" element={<Progress />} />

          {/* נתיב לא מוכר בתוך layout מפנה ל-home */}
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Route>

        {/* כל נתיב לא קיים מחוץ ל-layout גם ילך ל-/auth */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </HashRouter>
  );
}

import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";

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
function Setup() {
  return <h1>Setup Page (No layout)</h1>;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* דף Setup בלי Layout */}
        <Route path="/setup" element={<Setup />} />

        {/* כל השאר בתוך Layout */}
        <Route path="/" element={<Layout />}>
          {/* Home יהיה בנתיב הריק */}
          <Route index element={<Home />} />

          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Exercises" element={<Exercises />} />
          <Route path="Games" element={<Games />} />
          <Route path="Progress" element={<Progress />} />

          {/* כל נתיב לא מוכר מפנה ל-Home או Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

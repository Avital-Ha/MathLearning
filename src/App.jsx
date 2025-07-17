import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import AuthChoice from "./Pages/AuthChoice";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Exercises from "./Pages/Exercises";
import UserProgress from "./Pages/UserProgress";
import Games from "./Pages/Games";
import GamePage from "./Pages/GamePage";
import Farm from "./Pages/Farm";

function Dashboard() {
  return <h1>Dashboard Page</h1>;
}


export default function App() {
    useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <HashRouter>
      <Routes>
        {/* דפים ללא Layout */}
        <Route path="/auth" element={<AuthChoice />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gamePage/:gameId" element={<GamePage />} />
         {/* <Route path="Farm" element={<Farm />} /> */}

        {/* דפים בתוך Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Exercises" element={<Exercises />} />
          <Route path="Games" element={<Games />} />
         

          <Route path="Progress" element={<UserProgress/>} />
          {/* כל נתיב לא מוכר מפנה ל-Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

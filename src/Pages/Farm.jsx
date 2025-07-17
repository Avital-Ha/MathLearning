import React, { useEffect, useState } from "react";
import { db } from "../FireBase";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../styles/Farm.css";

export default function Farm() {

  return (
    <div className="Farm-container">
        <img className="img-Farm"  src={`${process.env.PUBLIC_URL}/Assets/Farm1.jpg`} />
    
        </div>
      ) 
}

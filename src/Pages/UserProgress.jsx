import React, { useEffect, useState } from "react";
import { db } from "../FireBase";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../styles/UserProgress.css";

export default function UserProgress() {
  const [userId, setUserId] = useState(null);
  const [userGrade, setUserGrade] = useState(null);
  const [progress, setProgress] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  // שליפת פרטי המשתמש המחובר
  useEffect(() => {
    async function fetchUserData() {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("No user is signed in");
        return;
      }

      const uid = currentUser.uid;
      setUserId(uid);

      try {
        const userDocRef = doc(db, "users", uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserGrade(userData.grade || "לא ידוע");
        } else {
          console.error("No user document found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  // טען את התרגילים מ-Firestore
useEffect(() => {
  async function fetchExercises() {
    try {
      const exercisesRef = collection(db, "exercises");
      const snapshot = await getDocs(exercisesRef);
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(ex => ex.grade === userGrade); // 👈 סינון לפי כיתה
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  }

  if (userGrade) { // רק לאחר שיש מידע על כיתה
    fetchExercises();
  }
}, [userGrade]);


  // טען את הפרוגרס של המשתמש מ-Firestore
  useEffect(() => {
    async function fetchProgress() {
      if (!userId) return;

      setLoading(true);
      try {
        const progressRef = collection(db, "users", userId, "user-progress");
        const snapshot = await getDocs(progressRef);
        const data = snapshot.docs.map(doc => doc.data());
        setProgress(data);
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [userId]);

  if (loading || !userGrade || exercises.length === 0) return <p>טוען נתונים...</p>;

  // מיפוי תרגילים לפי נושא
  const exercisesByTopic = exercises.reduce((acc, exercise) => {
    const topic = exercise.topic?.trim() || "כללי";
    if (!acc[topic]) acc[topic] = [];
    acc[topic].push(exercise);
    return acc;
  }, {});

  // ספירת תרגילים שהושלמו לפי נושא
  const countsByTopic = Object.keys(exercisesByTopic).reduce((acc, topic) => {
    acc[topic] = { total: exercisesByTopic[topic].length, correct: 0 };
    return acc;
  }, {});

  progress.forEach(item => {
    if (item.topic && countsByTopic[item.topic]) {
      if (item.completed) countsByTopic[item.topic].correct += 1;
    }
  });

  const chartData = Object.entries(countsByTopic).map(([topic, { total, correct }]) => ({
    topic,
    percent: total > 0 ? Math.round((correct / total) * 100) : 0,
    correct,
    total,
  }));

  const isYoung = ["א", "ב", "ג", "ד", "ה", "ו"].includes(userGrade);

  if (chartData.length === 0) return <p>לא נמצאו תרגילים להצגה.</p>;

  return (
    <div className="progress-page">
      <h2>ההתקדמות שלי - כיתה {userGrade}</h2>

      {isYoung ? (
        <div className="young-progress">
          {chartData.map(({ topic, total, correct, percent }) => (
            <div key={topic} className="young-topic-card">
              <h3>{topic}</h3>
              <div className="bubbles-container" aria-label={`${correct} מתוך ${total} תרגילים נכונים`}>
                {[...Array(total)].map((_, i) => (
                  <span
                    key={i}
                    className={`bubble ${i < correct ? "bubble-filled" : "bubble-empty"}`}
                    aria-label={i < correct ? "בועה מלאה" : "בועה ריקה"}
                  >
                    💧
                  </span>
                ))}
              </div>
              <p>{correct} מתוך {total} תרגילים נכונים</p>
              <p>{percent}% הצלחה</p>
              <div className="flower-decoration" aria-hidden="true">🌸🌼🌸</div>
            </div>
          ))}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="topic" />
            <YAxis domain={[0, 100]} tickFormatter={val => `${val}%`} />
            <Tooltip formatter={value => `${value}%`} />
            <Bar dataKey="percent" fill="#7b68ee" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

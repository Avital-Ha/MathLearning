import React, { useEffect, useState } from "react";
import { auth, db } from "../FireBase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import "../styles/Exercises.css";
import ExerciseCard from "../Components/ExerciseCard"

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTopic, setActiveTopic] = useState("");
const topicColors = {
  חיבור: "#70b8bb",        // טורקיז בינוני
  השוואה: "#5a8de0",       // כחול בינוני
  חיסור: "#4ba287",        // ירוק בינוני
  "סדר מספרים": "#4a90e2", // כחול עז
  כפל: "#7e66b7",          // סגול בינוני
  "בעיות מילוליות": "#7d8bc9", // סגול כחול
  חילוק: "#4db9f7",        // תכלת עז
  שעון: "#4bb7aa",         // טורקיז בהיר-כהה
  שברים: "#a368b7",        // סגול כהה-בינוני
  "שברים דומים": "#4ec9e6", // טורקיז תכלת
  אחוזים: "#6fb37b",       // ירוק מעט כהה
  חזקות: "#7d8bc9",        // סגול כחול
  משוואות: "#a0d4fb",      // תכלת בהיר עם נגיעה של כחול
  "העתקה למקומות": "#7e66b7", // סגול בינוני
  "מערכות משוואות": "#4a90e2", // כחול עז
  הנדסה: "#a368b7",        // סגול כהה-בינוני
  פונקציות: "#5a8de0",     // כחול בינוני
  טרינום: "#6fb37b",       // ירוק מעט כהה
  טריגונומטריה: "#4bb7aa", // טורקיז בהיר-כהה
  וקטורים: "#4a90e2",      // כחול עז
};

  useEffect(() => {
    async function fetchExercisesForUser() {
      setLoading(true);
      setError("");
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("משתמש לא מחובר");
          setExercises([]);
          setLoading(false);
          return;
        }
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          setError("משתמש לא נמצא במסד הנתונים");
          setExercises([]);
          setLoading(false);
          return;
        }
        const userData = userDocSnap.data();
        const userGrade = userData.grade;
        if (!userGrade) {
          setError("כיתה לא מוגדרת למשתמש");
          setExercises([]);
          setLoading(false);
          return;
        }
        const exercisesRef = collection(db, "exercises");
        const q = query(exercisesRef, where("grade", "==", userGrade));
        const querySnapshot = await getDocs(q);

        const fetchedExercises = [];
        querySnapshot.forEach((doc) => {
          fetchedExercises.push({ id: doc.id, ...doc.data() });
        });

        setExercises(fetchedExercises);

        if (fetchedExercises.length > 0) {
          setActiveTopic(fetchedExercises[0].topic);
        }

      } catch (err) {
        console.error(err);
        setError("שגיאה בטעינת התרגילים");
      } finally {
        setLoading(false);
      }
    }
    fetchExercisesForUser();
  }, []);

  if (loading) return <p className="loading">טוען תרגילים...</p>;
  if (error) return <p className="error">{error}</p>;

  const exercisesByTopic = exercises.reduce((acc, exercise) => {
    if (!acc[exercise.topic]) acc[exercise.topic] = [];
    acc[exercise.topic].push(exercise);
    return acc;
  }, {});

  const topics = Object.keys(exercisesByTopic);

  return (
    <div className="exercises-list-container">
      <h2 className="exercises-title">תרגולים לכיתה שלך</h2>

      {topics.length === 0 ? (
        <p className="no-exercises">לא נמצאו תרגילים עבור הכיתה שלך</p>
      ) : (
        <>
          <div className="tabs" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className="topic-tab"
                style={{
                 backgroundColor: topicColors[topic] || "transparent",
                borderBottom: activeTopic === topic ? "3px solid blue" : "3px solid transparent",
                fontWeight: activeTopic === topic ? "bold" : "normal",

                }}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="exercises-grid">
            {exercisesByTopic[activeTopic].map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

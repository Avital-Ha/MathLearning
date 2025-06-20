import React, { useEffect, useState } from "react";
import { auth, db } from "../FireBase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "../styles/Exercises.css";
import ExerciseCard from "../Components/ExerciseCard";
import AddExerciseForm from "../Components/AddExerciseForm"; // לא מוצג כרגע, אבל נשאר בקוד

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("");
  const [activeTopic, setActiveTopic] = useState("");
  const [activeGrade, setActiveGrade] = useState("");

  // צבעים לפי נושאים
  const topicColors = {
    חיבור: "#70b8bb",
    השוואה: "#5a8de0",
    חיסור: "#4ba287",
    "סדר מספרים": "#4a90e2",
    כפל: "#7e66b7",
    "בעיות מילוליות": "#7d8bc9",
    חילוק: "#4db9f7",
    שעון: "#4bb7aa",
    שברים: "#a368b7",
    "שברים דומים": "#4ec9e6",
    אחוזים: "#6fb37b",
    חזקות: "#7d8bc9",
    משוואות: "#a0d4fb",
    "העתקה למקומות": "#7e66b7",
    "מערכות משוואות": "#4a90e2",
    הנדסה: "#a368b7",
    פונקציות: "#5a8de0",
    טרינום: "#6fb37b",
    טריגונומטריה: "#4bb7aa",
    וקטורים: "#4a90e2",
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("משתמש לא מחובר");

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) throw new Error("משתמש לא נמצא במסד");

        const userData = userDoc.data();
        const userType = userData.user_type;
        const grade = userData.grade;

        setUserType(userType);

        let q;
        if (userType === "teacher") {
          q = query(collection(db, "exercises"));
        } else {
          if (!grade) throw new Error("כיתה לא מוגדרת למשתמש");
          q = query(collection(db, "exercises"), where("grade", "==", grade));
        }

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setExercises(data);

        // קביעת טאב ברירת מחדל
        if (data.length > 0) {
          setActiveTopic(data[0].topic);
          if (userType === "teacher") setActiveGrade(data[0].grade);
        }

      } catch (err) {
        console.error(err);
        setError(err.message || "שגיאה בטעינת הנתונים");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const groupBy = (arr, key) =>
    arr.reduce((acc, item) => {
      acc[item[key]] = acc[item[key]] || [];
      acc[item[key]].push(item);
      return acc;
    }, {});

  if (loading) return <p className="loading">טוען תרגילים...</p>;
  if (error) return <p className="error">{error}</p>;
  if (exercises.length === 0) return <p className="no-exercises">לא נמצאו תרגילים</p>;

  const groupedByGrade = groupBy(exercises, "grade");
  const groupedByTopic = groupBy(exercises, "topic");

  const topics = userType === "teacher"
    ? Object.keys(groupBy(exercises.filter(ex => ex.grade === activeGrade), "topic"))
    : Object.keys(groupedByTopic);

  return (
    <div className="exercises-list-container">
      <h2 className="exercises-title">
        {userType === "teacher" ? "תרגולים לפי כיתה" : "תרגולים לפי נושא"}
      </h2>

      {/* מורה – תפריט כיתות וטאבים לפי נושא */}
      {userType === "teacher" && (
        <>
          <select
            className="dropdown-select"
            value={activeGrade}
            onChange={(e) => {
              setActiveGrade(e.target.value);
              const filtered = exercises.filter(ex => ex.grade === e.target.value);
              const topics = [...new Set(filtered.map(ex => ex.topic))];
              setActiveTopic(topics[0]);
            }}
          >
            <option value="">בחר כיתה</option>
            {Object.keys(groupedByGrade).map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>

          {activeGrade && (
            <>
              <div className="tabs">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    className={`topic-tab ${activeTopic === topic ? "active" : ""}`}
                    onClick={() => setActiveTopic(topic)}
                    style={{ backgroundColor: topicColors[topic] || "#ccc" }}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              <div className="exercises-grid">
                {exercises
                  .filter(ex => ex.grade === activeGrade && ex.topic === activeTopic)
                  .map(ex => (
                    <ExerciseCard key={ex.id} exercise={ex} />
                  ))}
              </div>
            </>
          )}
        </>
      )}

      {/* תלמיד – תצוגת נושאים */}
      {userType !== "teacher" && (
        <>
          <div className="tabs">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`topic-tab ${activeTopic === topic ? "active" : ""}`}
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
            {groupedByTopic[activeTopic]?.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

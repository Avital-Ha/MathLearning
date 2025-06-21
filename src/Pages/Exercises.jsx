import React, { useEffect, useState } from "react";
import { auth, db } from "../FireBase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import "../styles/Exercises.css";
import ExerciseCard from "../Components/ExerciseCard";
import AddExerciseForm from "../Components/AddExerciseForm";
import topicColors from "../data/TopicColors";
import { setDoc } from "firebase/firestore"; 

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("");
  const [activeTopic, setActiveTopic] = useState("");
  const [activeGrade, setActiveGrade] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

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

  // פונקציה להוספת תרגיל חדש ל-Firebase ולמצב המקומי
  
const handleAddExercise = async (newExercise) => {
  try {
    // שלב 1: לשלוף את כל המסמכים ולמצוא את המזהה הכי גבוה
    const snapshot = await getDocs(collection(db, "exercises"));
    let maxNumber = 0;

    snapshot.forEach((doc) => {
      const id = doc.id;
      const match = id.match(/^EXERCISE(\d+)$/);
      if (match) {
        const number = parseInt(match[1]);
        if (number > maxNumber) maxNumber = number;
      }
    });

    // שלב 2 + 3: לבנות מזהה חדש
    const newId = `EXERCISE${maxNumber + 1}`;

    // שלב 4: לשמור את המסמך עם המזהה החדש
    await setDoc(doc(db, "exercises", newId), newExercise);

    const exerciseWithId = { id: newId, ...newExercise };
    setExercises((prev) => [...prev, exerciseWithId]);
    setShowAddForm(false);

    if (!activeTopic) setActiveTopic(newExercise.topic);
    if (!activeGrade) setActiveGrade(newExercise.grade);
  } catch (error) {
    console.error("Error adding exercise: ", error);
    setError("שגיאה בהוספת תרגיל");
  }
};


  const groupBy = (arr, key) =>
    arr.reduce((acc, item) => {
      acc[item[key]] = acc[item[key]] || [];
      acc[item[key]].push(item);
      return acc;
    }, {});

  if (loading) return <p className="loading">טוען תרגילים...</p>;
  if (error) return <p className="error">{error}</p>;
  if (exercises.length === 0 && !showAddForm) return <p className="no-exercises">לא נמצאו תרגילים</p>;

  const groupedByGrade = groupBy(exercises, "grade");
  const groupedByTopic = groupBy(exercises, "topic");

  const topics =
    userType === "teacher"
      ? Object.keys(groupBy(exercises.filter((ex) => ex.grade === activeGrade), "topic"))
      : Object.keys(groupedByTopic);

  return (
    <div className="exercises-list-container" data-aos="fade-up">
      <h2 className="exercises-title">
        {userType === "teacher" ? "תרגולים לפי כיתה" : "תרגולים לפי נושא"}
      </h2>

      {userType === "teacher" && (
        <>
          <select
            className="dropdown-select"
            value={activeGrade}
            onChange={(e) => {
              setActiveGrade(e.target.value);
              const filtered = exercises.filter((ex) => ex.grade === e.target.value);
              const newTopics = [...new Set(filtered.map((ex) => ex.topic))];
              setActiveTopic(newTopics[0] || "");
            }}
          >
            <option value="">בחר כיתה</option>
            {Object.keys(groupedByGrade)
              .sort()
              .map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
          </select>

          <button className="add-exercise-btn" onClick={() => setShowAddForm(true)}>
            הוספת תרגיל +
          </button>

          {showAddForm ? (
            <AddExerciseForm
              onClose={() => setShowAddForm(false)}
              defaultGrade={activeGrade}
              defaultTopic={activeTopic}
              onAddExercise={handleAddExercise}
            />
          ) : (
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
                  .filter((ex) => ex.grade === activeGrade && ex.topic === activeTopic)
                  .map((ex) => (
                    <ExerciseCard key={ex.id} exercise={ex} />
                  ))}
              </div>
            </>
          )}
        </>
      )}

      {userType !== "teacher" && !showAddForm && (
        <>
          <div className="tabs">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`topic-tab ${activeTopic === topic ? "active" : ""}`}
                style={{
                  backgroundColor: topicColors[topic] || "transparent",
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

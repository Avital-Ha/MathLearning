import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../FireBase"; // ודאי שהנתיב נכון

/**
 * שמירת התקדמות משתמש בתרגיל
 * @param {string} exerciseId - מזהה התרגיל (למשל: "exercise1")
 * @param {Object} data - מידע על ההתקדמות (למשל: { completed: true, score: 90 })
 */
const saveUserProgress = async (exerciseId, data) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("אין משתמש מחובר");

    const progressRef = doc(db, "users", user.uid, "user-progress", exerciseId);

    await setDoc(progressRef, {
      ...data,
      updatedAt: new Date()
    });

    console.log("התקדמות נשמרה בהצלחה");
  } catch (error) {
    console.error("שגיאה בשמירת ההתקדמות:", error.message);
  }
};

export default saveUserProgress;

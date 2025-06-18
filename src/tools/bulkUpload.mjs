import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

// הגדרות Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqFtzPVtSrrfrZf1FzV-IEUhzG3tYEeUA",
  authDomain: "math-learning-97bc1.firebaseapp.com",
  projectId: "math-learning-97bc1",
  storageBucket: "math-learning-97bc1.appspot.com",
  messagingSenderId: "151822558447",
  appId: "1:151822558447:web:8ab36a31c83062e245e71a",
  measurementId: "G-SPJVC62M41"
};
// 2. תרגילים לדוגמה - תשני למה שאת צריכה
const exercises = [
  // כיתה א'
  {
    topic: "חיבור",
    grade: "א",
    difficulty: "קל",
    question: "כמה זה 3 + 4?",
    answer: "7",
    answerType: "multiple",
    options: ["5", "6", "7", "8"]
  },
  {
    topic: "השוואה",
    grade: "א",
    difficulty: "קל",
    question: "איזה מספר גדול יותר: 6 או 9?",
    answer: "9",
    answerType: "text"
  },

  // כיתה ב'
  {
    topic: "חיסור",
    grade: "ב",
    difficulty: "בינוני",
    question: "מה התוצאה של 12 - 5?",
    answer: "7",
    answerType: "multiple",
    options: ["6", "7", "8", "9"]
  },
  {
    topic: "סדר מספרים",
    grade: "ב",
    difficulty: "בינוני",
    question: "גרור את המספרים לפי סדר עולה:",
    answer: ["3", "5", "7", "10"],
    answerType: "drag",
    options: ["10", "3", "7", "5"]
  },

  // כיתה ג'
  {
    topic: "כפל",
    grade: "ג",
    difficulty: "בינוני",
    question: "כמה זה 4 × 6?",
    answer: "24",
    answerType: "text"
  },
  {
    topic: "בעיות מילוליות",
    grade: "ג",
    difficulty: "קשה",
    question: "לי יש 5 שקיות, בכל שקית 3 תפוחים. כמה תפוחים יש לי?",
    answer: "15",
    answerType: "text"
  },

  // כיתה ד'
  {
    topic: "חילוק",
    grade: "ד",
    difficulty: "בינוני",
    question: "מה התוצאה של 20 ÷ 5?",
    answer: "4",
    answerType: "multiple",
    options: ["4", "5", "6", "7"]
  },
  {
    topic: "שעון",
    grade: "ד",
    difficulty: "קל",
    question: "אם השעה עכשיו 3:15, מה תהיה השעה בעוד שעה?",
    answer: "4:15",
    answerType: "text"
  },

  // כיתה ה'
  {
    topic: "שברים",
    grade: "ה",
    difficulty: "בינוני",
    question: "מהו חצי מ-10?",
    answer: "5",
    answerType: "multiple",
    options: ["2", "4", "5", "6"]
  },
  {
    topic: "שברים דומים",
    grade: "ה",
    difficulty: "קשה",
    question: "גרור את השברים לפי סדר גודל מהקטן לגדול:",
    answer: ["1/4", "1/3", "1/2"],
    answerType: "drag",
    options: ["1/2", "1/4", "1/3"]
  },

  // כיתה ו'
  {
    topic: "אחוזים",
    grade: "ו",
    difficulty: "קשה",
    question: "מהו 25% מתוך 80?",
    answer: "20",
    answerType: "text"
  },
  {
    topic: "חזקות",
    grade: "ו",
    difficulty: "בינוני",
    question: "מהו 2 בחזקת 3?",
    answer: "8",
    answerType: "multiple",
    options: ["6", "8", "9", "12"]
  },

  // כיתה ז'
  {
    topic: "משוואות",
    grade: "ז",
    difficulty: "קשה",
    question: "פתור: x + 3 = 7",
    answer: "4",
    answerType: "text"
  },
  {
    topic: "העתקה למקומות",
    grade: "ז",
    difficulty: "בינוני",
    question: "גרור את המספרים לפי סדר ערך המקום (אלפים, מאות, עשרות, יחידות): 3452",
    answer: ["3", "4", "5", "2"],
    answerType: "drag",
    options: ["2", "3", "5", "4"]
  },

  // כיתה ח'
  {
    topic: "מערכות משוואות",
    grade: "ח",
    difficulty: "קשה",
    question: "פתור: 2x + y = 10, x + y = 7",
    answer: "x=3, y=4",
    answerType: "text"
  },
  {
    topic: "הנדסה",
    grade: "ח",
    difficulty: "בינוני",
    question: "מהו שטח של מלבן באורך 5 ורוחב 4?",
    answer: "20",
    answerType: "text"
  },

  // כיתה ט'
  {
    topic: "פונקציות",
    grade: "ט",
    difficulty: "קשה",
    question: "f(x) = 2x + 1, מהו f(3)?",
    answer: "7",
    answerType: "text"
  },
  {
    topic: "טרינום",
    grade: "ט",
    difficulty: "קשה",
    question: "פתור: x² + 5x + 6 = 0",
    answer: "x= -2 או x= -3",
    answerType: "text"
  },

  // כיתה י'
  {
    topic: "טריגונומטריה",
    grade: "י",
    difficulty: "קשה",
    question: "מהו סינוס של 30°?",
    answer: "0.5",
    answerType: "multiple",
    options: ["0.5", "0.6", "0.7", "1"]
  },
  {
    topic: "וקטורים",
    grade: "י",
    difficulty: "קשה",
    question: "אם וקטור A = (2,3) ווקטור B = (1,4), מהו A + B?",
    answer: "(3,7)",
    answerType: "text"
  }
];


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadAll(startIndex = 2) {
  const colRef = collection(db, "exercises");
  for (let i = 0; i < exercises.length; i++) {
    const id = `EXERCISE${i + startIndex}`;
    const docRef = doc(colRef, id);
    await setDoc(docRef, exercises[i]);
    console.log("הועלה:", id, exercises[i].question);
  }
}

uploadAll();

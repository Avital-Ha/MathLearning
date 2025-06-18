import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../FireBase"; // חיבור ל־Firebase שלך

export async function getExercises({ grade }) {
  const colRef = collection(db, "exercises");
  const q = query(colRef, where("grade", "==", grade));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}

export async function addExercise(exercise) {
  const colRef = collection(db, "exercises");
  await addDoc(colRef, exercise);
}

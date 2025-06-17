import { auth, db } from "../FireBase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export class User {
  constructor(data) {
    Object.assign(this, data);
  }

  // מחזיר את המשתמש המחובר עם פרטים, כולל user_type מ-Firestore, או null אם לא מחובר
  static me() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          unsubscribe(); // מפסיק להאזין אחרי הפעם הראשונה

          if (firebaseUser) {
            try {
              const userDocRef = doc(db, "users", firebaseUser.uid);
              const userDocSnap = await getDoc(userDocRef);

              let userDataFromDb = {};
              if (userDocSnap.exists()) {
                userDataFromDb = userDocSnap.data();
              }

              const userData = {
                id: firebaseUser.uid,
                user_type: userDataFromDb.user_type || "",
                full_name: firebaseUser.displayName || "",
                first_name: firebaseUser.displayName ? firebaseUser.displayName.split(" ")[0] : "",
                email: firebaseUser.email,
                ...userDataFromDb, // למקרה ויש פרטים נוספים שאתה רוצה להוסיף
              };

              resolve(new User(userData));
            } catch (error) {
              reject(error);
            }
          } else {
            resolve(null);
          }
        },
        (error) => reject(error)
      );
    });
  }

  static async logout() {
    await signOut(auth);
  }
}

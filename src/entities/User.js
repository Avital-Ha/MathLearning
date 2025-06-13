export class User {
  constructor(data) {
    Object.assign(this, data);
  }

  static async me() {
    // סימולציה לבדיקת משתמש מחובר (ניתן לשנות ל-fetch אמיתי)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          new User({
            id: 1,
            user_type: "student",
            full_name: "John Doe",
            first_name: "John",
            grade: 6,
          })
        );
      }, 300);
    });
  }

  static async logout() {
    // סימולציה ליציאה מהמערכת (אפשר להוסיף לוגיקה אמיתית)
    return new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
  }
}

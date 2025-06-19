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
  },
  {
    topic: "חיבור",
    grade: "א",
    difficulty: "קל",
    question: "מה התוצאה של 2 + 6?",
    answer: "8",
    answerType: "multiple",
    options: ["7", "8", "9", "10"]
  },
  {
    topic: "חיבור",
    grade: "א",
    difficulty: "קל",
    question: "גרור את המספרים בסדר חיבור: 1, 4, 3",
    answer: ["1", "3", "4"],
    answerType: "drag-sort",
    options: ["4", "3", "1"]
  },
  {
    topic: "השוואה",
    grade: "א",
    difficulty: "קל",
    question: "איזה מספר קטן יותר: 2 או 5?",
    answer: "2",
    answerType: "text"
  },
  {
    topic: "מספרים",
    grade: "א",
    difficulty: "קל",
    question: "בחר את המספר 7",
    answer: "7",
    answerType: "multiple",
    options: ["5", "7", "9", "6"]
  },
  {
    topic: "סדר מספרים",
    grade: "א",
    difficulty: "קל",
    question: "גרור את המספרים לפי סדר עולה: 2, 5, 3",
    answer: ["2", "3", "5"],
    answerType: "drag",
    options: ["3", "2", "5"]
  },

  // כיתה ב' - 5 תרגילים חדשים
  {
    topic: "חיסור",
    grade: "ב",
    difficulty: "בינוני",
    question: "מה התוצאה של 10 - 4?",
    answer: "6",
    answerType: "multiple",
    options: ["6", "5", "7", "8"]
  },
  {
    topic: "השוואת מספרים",
    grade: "ב",
    difficulty: "בינוני",
    question: "איזה מספר גדול יותר: 15 או 12?",
    answer: "15",
    answerType: "text"
  },
  {
    topic: "סדר מספרים",
    grade: "ב",
    difficulty: "בינוני",
    question: "גרור את המספרים לפי סדר יורד: 8, 12, 10",
    answer: ["12", "10", "8"],
    answerType: "drag-sort",
    options: ["8", "12", "10"]
  },
  {
    topic: "בעיות מילוליות",
    grade: "ב",
    difficulty: "בינוני",
    question: "יש 9 תפוחים, אכלתי 3. כמה נשאר?",
    answer: "6",
    answerType: "text"
  },
  {
    topic: "כפל",
    grade: "ב",
    difficulty: "בינוני",
    question: "מה התוצאה של 3 × 4?",
    answer: "12",
    answerType: "multiple",
    options: ["10", "12", "15", "9"]
  },

  // כיתה ג' - 5 תרגילים חדשים
  {
    topic: "כפל",
    grade: "ג",
    difficulty: "בינוני",
    question: "מה התוצאה של 7 × 3?",
    answer: "21",
    answerType: "multiple",
    options: ["18", "21", "24", "20"]
  },
  {
    topic: "חיבור",
    grade: "ג",
    difficulty: "בינוני",
    question: "גרור את המספרים לפי סדר חיבור: 5, 2, 6",
    answer: ["2", "5", "6"],
    answerType: "drag-sort",
    options: ["6", "2", "5"]
  },
  {
    topic: "חיסור",
    grade: "ג",
    difficulty: "בינוני",
    question: "מה התוצאה של 14 - 7?",
    answer: "7",
    answerType: "text"
  },
  {
    topic: "בעיות מילוליות",
    grade: "ג",
    difficulty: "קשה",
    question: "לי יש 8 שקיות, בכל שקית 5 תפוחים. כמה תפוחים יש לי?",
    answer: "40",
    answerType: "text"
  },
  {
    topic: "השוואה",
    grade: "ג",
    difficulty: "בינוני",
    question: "איזה מספר גדול יותר: 18 או 21?",
    answer: "21",
    answerType: "multiple",
    options: ["18", "20", "21", "22"]
  },

  // כיתה ד' - 5 תרגילים חדשים
  {
    topic: "חילוק",
    grade: "ד",
    difficulty: "בינוני",
    question: "מה התוצאה של 36 ÷ 6?",
    answer: "6",
    answerType: "multiple",
    options: ["5", "6", "7", "8"]
  },
  {
    topic: "שעון",
    grade: "ד",
    difficulty: "קל",
    question: "אם השעה עכשיו 7:45, מה תהיה השעה בעוד שעה?",
    answer: "8:45",
    answerType: "text"
  },
  {
    topic: "חיבור",
    grade: "ד",
    difficulty: "בינוני",
    question: "גרור את המספרים לפי סדר חיבור: 4, 9, 7",
    answer: ["4", "7", "9"],
    answerType: "drag-sort",
    options: ["9", "4", "7"]
  },
  {
    topic: "כפל",
    grade: "ד",
    difficulty: "בינוני",
    question: "מה התוצאה של 5 × 5?",
    answer: "25",
    answerType: "multiple",
    options: ["20", "25", "30", "35"]
  },
  {
    topic: "בעיות מילוליות",
    grade: "ד",
    difficulty: "קשה",
    question: "יש 24 עוגיות, מחלקים ב-6 ילדים שווים. כמה עוגיות לכל ילד?",
    answer: "4",
    answerType: "text"
  },

  // כיתה ה' - 5 תרגילים חדשים
  {
    topic: "שברים",
    grade: "ה",
    difficulty: "בינוני",
    question: "מהו רבע מ-12?",
    answer: "3",
    answerType: "multiple",
    options: ["2", "3", "4", "5"]
  },
  {
    topic: "שברים",
    grade: "ה",
    difficulty: "בינוני",
    question: "גרור את השברים לפי סדר מהקטן לגדול: 2/5, 1/3, 3/4",
    answer: ["1/3", "2/5", "3/4"],
    answerType: "drag-sort",
    options: ["3/4", "1/3", "2/5"]
  },
  {
    topic: "חיבור",
    grade: "ה",
    difficulty: "בינוני",
    question: "מה התוצאה של 9 + 8?",
    answer: "17",
    answerType: "text"
  },
  {
    topic: "חיסור",
    grade: "ה",
    difficulty: "קשה",
    question: "מה התוצאה של 20 - 13?",
    answer: "7",
    answerType: "multiple",
    options: ["5", "6", "7", "8"]
  },
  {
    topic: "בעיות מילוליות",
    grade: "ה",
    difficulty: "קשה",
    question: "אם יש 5 קופסאות עם 4 עפרונות בכל קופסה, כמה עפרונות יש בסך הכל?",
    answer: "20",
    answerType: "text"
  },

  // כיתה ו' - 5 תרגילים חדשים
  {
    topic: "אחוזים",
    grade: "ו",
    difficulty: "קשה",
    question: "מהו 10% מתוך 50?",
    answer: "5",
    answerType: "multiple",
    options: ["3", "4", "5", "6"]
  },
  {
    topic: "חזקות",
    grade: "ו",
    difficulty: "בינוני",
    question: "מה התוצאה של 3 בחזקת 2?",
    answer: "9",
    answerType: "multiple",
    options: ["6", "8", "9", "12"]
  },
  {
    topic: "גרור את המספרים לפי סדר עולה: 12, 7, 9",
    grade: "ו",
    difficulty: "בינוני",
    question: "גרור את המספרים לפי סדר עולה:",
    answer: ["7", "9", "12"],
    answerType: "drag",
    options: ["12", "7", "9"]
  },
  {
    topic: "בעיות מילוליות",
    grade: "ו",
    difficulty: "קשה",
    question: "במרתון רצו 30 אנשים, 8 נפצעו. כמה אנשים סיימו את המרוץ?",
    answer: "22",
    answerType: "text"
  },
  {
    topic: "חיסור",
    grade: "ו",
    difficulty: "בינוני",
    question: "מה התוצאה של 25 - 7?",
    answer: "18",
    answerType: "multiple",
    options: ["17", "18", "19", "20"]
  },

  // כיתה ז' - 5 תרגילים חדשים
  {
    topic: "משוואות",
    grade: "ז",
    difficulty: "קשה",
    question: "פתור: 2x - 4 = 10",
    answer: "7",
    answerType: "text"
  },
  {
    topic: "גרור את המספרים לפי סדר ערך המקום (אלפים, מאות, עשרות, יחידות): 5632",
    grade: "ז",
    difficulty: "בינוני",
    question: "גרור את המספרים לפי סדר ערך המקום: 5632",
    answer: ["5", "6", "3", "2"],
    answerType: "drag",
    options: ["2", "3", "6", "5"]
  },
  {
    topic: "חיבור",
    grade: "ז",
    difficulty: "בינוני",
    question: "מה התוצאה של 13 + 7?",
    answer: "20",
    answerType: "multiple",
    options: ["18", "19", "20", "21"]
  },
  {
    topic: "בעיות מילוליות",
    grade: "ז",
    difficulty: "קשה",
    question: "אם יש 9 דגים בבריכה ו-4 דגים יוצאים, כמה דגים נשארו?",
    answer: "5",
    answerType: "text"
  },
  {
    topic: "כפל",
    grade: "ז",
    difficulty: "בינוני",
    question: "מה התוצאה של 6 × 6?",
    answer: "36",
    answerType: "multiple",
    options: ["30", "35", "36", "40"]
  },

  // כיתה ח' - 5 תרגילים חדשים
  {
    topic: "משוואות",
    grade: "ח",
    difficulty: "קשה",
    question: "פתור: 3x + 2 = 11",
    answer: "3",
    answerType: "text"
  },
  {
    topic: "אחוזים",
    grade: "ח",
    difficulty: "בינוני",
    question: "כמה זה 25% מ-80?",
    answer: "20",
    answerType: "multiple",
    options: ["15", "18", "20", "22"]
  },
  {
    topic: "גרור את המספרים לפי סדר יורד: 15, 22, 18",
    grade: "ח",
    difficulty: "בינוני",
    question: "גרור את המספרים לפי סדר יורד:",
    answer: ["22", "18", "15"],
    answerType: "drag-sort",
    options: ["15", "22", "18"]
  },
  {
    topic: "חזקות",
    grade: "ח",
    difficulty: "בינוני",
    question: "מה התוצאה של 2 בחזקת 4?",
    answer: "16",
    answerType: "multiple",
    options: ["8", "12", "16", "20"]
  },
  {
    topic: "בעיות מילוליות",
    grade: "ח",
    difficulty: "קשה",
    question: "יש 48 תפוחים בין 6 ילדים שווים. כמה תפוחים לכל ילד?",
    answer: "8",
    answerType: "text"
  },

  // כיתה ט' - 5 תרגילים חדשים
  {
    topic: "גאומטריה",
    grade: "ט",
    difficulty: "בינוני",
    question: "כמה צלעות יש למשולש?",
    answer: "3",
    answerType: "multiple",
    options: ["2", "3", "4", "5"]
  },
  {
    topic: "משוואות",
    grade: "ט",
    difficulty: "קשה",
    question: "פתור: 5x - 3 = 12",
    answer: "3",
    answerType: "text"
  },
  {
    topic: "גרור את המספרים לפי סדר עולה: 29, 15, 23",
    grade: "ט",
    difficulty: "בינוני",
    question: "גרור את המספרים לפי סדר עולה:",
    answer: ["15", "23", "29"],
    answerType: "drag-sort",
    options: ["29", "15", "23"]
  },
  {
    topic: "חיסור",
    grade: "ט",
    difficulty: "בינוני",
    question: "מה התוצאה של 40 - 25?",
    answer: "15",
    answerType: "multiple",
    options: ["10", "15", "20", "25"]
  },
  {
    topic: "בעיות מילוליות",
    grade: "ט",
    difficulty: "קשה",
    question: "אם מכונית נסעה 60 קילומטר ב-2 שעות, מה מהירותה הממוצעת?",
    answer: "30",
    answerType: "text"
  },

  // כיתה י' - 5 תרגילים חדשים
  {
    topic: "פונקציות",
    grade: "י",
    difficulty: "קשה",
    question: "אם f(x) = 2x + 3, מהו f(4)?",
    answer: "11",
    answerType: "text"
  },
  {
    topic: "אינטגרלים",
    grade: "י",
    difficulty: "קשה",
    question: "מה האינטגרל של f(x) = 2x?",
    answer: "x^2 + C",
    answerType: "text"
  },
  {
    topic: "גרור את המילים לפי סדר נכון במשוואה: 'x', '=', '3', '+', '5'",
    grade: "י",
    difficulty: "בינוני",
    question: "גרור את המילים לפי סדר במשוואה:",
    answer: ["x", "=", "3", "+", "5"],
    answerType: "drag-sort",
    options: ["=", "x", "+", "3", "5"]
  },
  {
    topic: "סדרת מספרים",
    grade: "י",
    difficulty: "בינוני",
    question: "מה המספר הבא בסדרה: 2, 4, 6, 8, ...?",
    answer: "10",
    answerType: "multiple",
    options: ["10", "12", "8", "9"]
  },
  {
    topic: "בעיות מילוליות",
    grade: "י",
    difficulty: "קשה",
    question: "אם סך כל המספרים הוא 45 וידוע ש-15 הוא אחד מהם, מהו סכום שאר המספרים?",
    answer: "30",
    answerType: "text"
  }


];
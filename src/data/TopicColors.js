

const topicColors = {
  חיבור: "#70b8bb",
  השוואה: "#5a8de0",
  חיסור: "#4ba287",
  "סדר מספרים": "#4a90e2",
  כפל: "#7e66b7",
  "בעיות מילוליות": "#7d8bc9",
  "השוואת מספרים": "#7d8bc9",
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

const defaultTopicColor = "#e0e0e0"; // צבע רקע ברירת מחדל

// פונקציה לקבלת צבע לפי נושא
export function getTopicColor(topic) {
  return topicColors[topic] || defaultTopicColor;
}

export default topicColors;

export type Subject = {
  id: string;
  name: string;
  category: "חיה" | "חפץ" | "אדם" | "מקום" | "מושג";
  attributes: Record<string, boolean>;
  difficulty: 1 | 2 | 3;
};

export const SUBJECTS: Subject[] = [
  {
    id: "elephant",
    name: "פיל",
    category: "חיה",
    difficulty: 1,
    attributes: {
      "בעל חיים": true,
      "יונק": true,
      "גדול": true,
      "אפור": true,
      "חי באפריקה": true,
      "אוכל צמחים": true,
      "מעופף": false,
      "שוחה": false,
    },
  },
  {
    id: "iphone",
    name: "אייפון",
    category: "חפץ",
    difficulty: 1,
    attributes: {
      "מכשיר אלקטרוני": true,
      "טלפון": true,
      "מסך מגע": true,
      "פותח על ידי אפל": true,
      "קטן מספיק לכיס": true,
      "מתחבר לאינטרנט": true,
      "מעופף": false,
    },
  },
  {
    id: "eiffel",
    name: "מגדל אייפל",
    category: "מקום",
    difficulty: 1,
    attributes: {
      "אטרקציה תיירותית": true,
      "בפריז": true,
      "צרפת": true,
      "מתכתי": true,
      "גובה מעל 300 מטר": true,
      "נבנה במאה ה-19": true,
      "פותח לציבור": true,
    },
  },
  {
    id: "love",
    name: "אהבה",
    category: "מושג",
    difficulty: 2,
    attributes: {
      "רגש": true,
      "ניתן לחוש": true,
      "מופשט": true,
      "פיזי": false,
      "ניתן לראות": false,
      "אוניברסלי": true,
    },
  },
  {
    id: "einstein",
    name: "איינשטיין",
    category: "אדם",
    difficulty: 2,
    attributes: {
      "מדען": true,
      "נפטר": true,
      "זכה בנובל": true,
      "גרמני": true,
      "פיזיקאי": true,
      "ספורטאי": false,
      "אישה": false,
    },
  },
  {
    id: "pizza",
    name: "פיצה",
    category: "חפץ",
    difficulty: 1,
    attributes: {
      "מאכל": true,
      "מאיטליה": true,
      "עגול": true,
      "נאפה": true,
      "מכיל גבינה": true,
      "מתוק": false,
      "צמחוני": true,
    },
  },
  {
    id: "dolphin",
    name: "דולפין",
    category: "חיה",
    difficulty: 2,
    attributes: {
      "בעל חיים": true,
      "יונק": true,
      "חי במים": true,
      "חכם": true,
      "אפור": true,
      "מעופף": false,
      "טורף": true,
    },
  },
  {
    id: "internet",
    name: "האינטרנט",
    category: "מושג",
    difficulty: 2,
    attributes: {
      "טכנולוגיה": true,
      "גלובלי": true,
      "המצאה אנושית": true,
      "מתחת ל-100 שנה": true,
      "פיזי": false,
      "ניתן למישוש": false,
    },
  },
  {
    id: "kotel",
    name: "הכותל המערבי",
    category: "מקום",
    difficulty: 1,
    attributes: {
      "בישראל": true,
      "בירושלים": true,
      "אתר דתי": true,
      "אתר היסטורי": true,
      "מבנה": true,
      "חוץ": true,
    },
  },
  {
    id: "kafka",
    name: "פרנץ קפקא",
    category: "אדם",
    difficulty: 3,
    attributes: {
      "סופר": true,
      "מהמאה ה-20": true,
      "נפטר": true,
      "כתב בגרמנית": true,
      "מצ'כיה": true,
      "ספורטאי": false,
      "פוליטיקאי": false,
    },
  },
];

export const MAX_QUESTIONS = 20;

export type LogicalPuzzle = {
  id: string;
  question: string;
  answer: string;
  options: string[];
  explanation: string;
  difficulty: 1 | 2 | 3;
  category: "מספרים" | "מילים" | "סדרות" | "פרדוקס";
};

export const LOGICAL_PUZZLES: LogicalPuzzle[] = [
  {
    id: "log-001",
    question: "מה הספרה הבאה בסדרה: 2, 4, 8, 16, ?",
    answer: "32",
    options: ["24", "30", "32", "64"],
    explanation: "כל מספר מוכפל ב-2.",
    difficulty: 1,
    category: "סדרות",
  },
  {
    id: "log-002",
    question: "אם 5 פועלים בונים 5 בתים ב-5 ימים, כמה ימים ייקח ל-100 פועלים לבנות 100 בתים?",
    answer: "5",
    options: ["5", "10", "20", "100"],
    explanation: "פועל אחד בונה בית אחד ב-5 ימים. 100 פועלים בונים 100 בתים במקביל ב-5 ימים.",
    difficulty: 2,
    category: "מספרים",
  },
  {
    id: "log-003",
    question: "פרדוקס הסבא: אם אתה חוזר בזמן ופוגש את סבך בילדותו, מה הסיכוי שיקרה משהו?",
    answer: "תלוי בפרשנות של מסע בזמן",
    options: [
      "שום דבר",
      "תלוי בפרשנות של מסע בזמן",
      "אתה תיעלם",
      "ייווצרו שני יקומים",
    ],
    explanation: "אין תשובה אחת — פרדוקס פילוסופי תלוי באיזה מודל של זמן אתה מאמין.",
    difficulty: 3,
    category: "פרדוקס",
  },
  {
    id: "log-004",
    question: "סדרת המספרים: 1, 1, 2, 3, 5, 8, ? איך נקראת?",
    answer: "פיבונאצ'י",
    options: ["פיבונאצ'י", "ארכימדס", "אוקלידס", "ניוטון"],
    explanation: "כל מספר הוא סכום שני המספרים הקודמים. הסדרה נקראת על שם המתמטיקאי האיטלקי.",
    difficulty: 2,
    category: "סדרות",
  },
  {
    id: "log-005",
    question: "אם כל הוורדים הם פרחים וחלק מהפרחים מתים מהר, האם כל הוורדים מתים מהר?",
    answer: "לא בהכרח",
    options: ["כן", "לא בהכרח", "לעולם לא", "תמיד"],
    explanation: "טעות לוגית קלאסית: 'חלק' לא משליך על 'כל'. ייתכן שאף ורד אינו מהפרחים שמתים מהר.",
    difficulty: 2,
    category: "מילים",
  },
  {
    id: "log-006",
    question: "מה המספר הבא: 1, 4, 9, 16, 25, ?",
    answer: "36",
    options: ["30", "32", "36", "49"],
    explanation: "ריבועים שלמים: 1², 2², 3², 4², 5², 6²=36.",
    difficulty: 1,
    category: "סדרות",
  },
  {
    id: "log-007",
    question: "אם אתחיל ב-100 ואחסיר את גילי, ואז אכפיל ב-2, אקבל 150. בן כמה אני?",
    answer: "25",
    options: ["20", "25", "30", "50"],
    explanation: "(100 - x) × 2 = 150 → 100 - x = 75 → x = 25.",
    difficulty: 2,
    category: "מספרים",
  },
  {
    id: "log-008",
    question: "מילה אחת זרה בקבוצה: כלב, חתול, סוס, מרק.",
    answer: "מרק",
    options: ["כלב", "חתול", "סוס", "מרק"],
    explanation: "כולן חיות חוץ ממרק שהוא מאכל.",
    difficulty: 1,
    category: "מילים",
  },
  {
    id: "log-009",
    question: "אם משפט זה שקרי, האם הוא אמת?",
    answer: "פרדוקס - אין תשובה",
    options: ["כן", "לא", "פרדוקס - אין תשובה", "תלוי"],
    explanation: "פרדוקס השקרן - אם אמת אז שקר, אם שקר אז אמת. הצהרה לא יכולה להיות בעלת ערך אמת.",
    difficulty: 3,
    category: "פרדוקס",
  },
  {
    id: "log-010",
    question: "סדרה: A, C, E, G, ? (לפי האלפבית האנגלי)",
    answer: "I",
    options: ["H", "I", "J", "K"],
    explanation: "מדלגים אות אחת בכל פעם. אחרי G באה I.",
    difficulty: 1,
    category: "סדרות",
  },
];

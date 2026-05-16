export type WordEntry = {
  word: string;
  difficulty: 1 | 2 | 3;
  category?: string;
};

export const FIVE_LETTER_WORDS: WordEntry[] = [
  { word: "גבורה", difficulty: 1, category: "מושגים" },
  { word: "סביבה", difficulty: 1, category: "כללי" },
  { word: "עבודה", difficulty: 1, category: "כללי" },
  { word: "אמונה", difficulty: 1, category: "מושגים" },
  { word: "משפחה", difficulty: 1, category: "כללי" },
  { word: "הצלחה", difficulty: 1, category: "מושגים" },
  { word: "שעמום", difficulty: 2, category: "רגשות" },
  { word: "מקצוע", difficulty: 1, category: "כללי" },
  { word: "תוצאה", difficulty: 1, category: "כללי" },
  { word: "תקווה", difficulty: 1, category: "מושגים" },
  { word: "קבוצה", difficulty: 1, category: "כללי" },
  { word: "מסורת", difficulty: 2, category: "מושגים" },
  { word: "בחירה", difficulty: 1, category: "כללי" },
  { word: "הגדרה", difficulty: 2, category: "כללי" },
  { word: "מנהיג", difficulty: 1, category: "כללי" },
  { word: "תחרות", difficulty: 1, category: "כללי" },
  { word: "משחקי", difficulty: 2, category: "כללי" },
  { word: "מערבה", difficulty: 3, category: "מקומות" },
  { word: "ירושה", difficulty: 2, category: "מושגים" },
  { word: "תפריט", difficulty: 1, category: "אוכל" },
  { word: "מטרה", difficulty: 2, category: "מושגים" },
  { word: "תפילה", difficulty: 2, category: "מושגים" },
  { word: "תפוחי", difficulty: 2, category: "אוכל" },
  { word: "שחקני", difficulty: 2, category: "כללי" },
  { word: "מתנה", difficulty: 2, category: "כללי" },
  { word: "סופר", difficulty: 3, category: "מקצועות" },
  { word: "כתבה", difficulty: 3, category: "כללי" },
  { word: "מנגינ", difficulty: 3, category: "מוזיקה" },
  { word: "חברו", difficulty: 3, category: "כללי" },
  { word: "מבחן", difficulty: 3, category: "כללי" },
];

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

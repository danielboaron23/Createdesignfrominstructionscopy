export type ConnectionsGroup = {
  theme: string;
  color: string;
  textColor: string;
  words: string[];
};

export type ConnectionsPuzzle = {
  id: string;
  date: string;
  difficulty: 1 | 2 | 3;
  groups: ConnectionsGroup[];
};

export const CONNECTIONS_PUZZLES: ConnectionsPuzzle[] = [
  {
    id: "puzzle-001",
    date: "2026-04-15",
    difficulty: 1,
    groups: [
      {
        theme: "פירות",
        color: "#f7d96b",
        textColor: "#3a2f00",
        words: ["תפוח", "בננה", "אגס", "ענבים"],
      },
      {
        theme: "ערים בישראל",
        color: "#b6d9b8",
        textColor: "#1a3a1a",
        words: ["חיפה", "אילת", "נתניה", "חולון"],
      },
      {
        theme: "ספורט",
        color: "#bfd4f9",
        textColor: "#1a3a7a",
        words: ["כדורגל", "שחייה", "רכיבה", "ריצה"],
      },
      {
        theme: "כלי נגינה",
        color: "#f5c9cc",
        textColor: "#3a1a1f",
        words: ["גיטרה", "תוף", "חליל", "פסנתר"],
      },
    ],
  },
  {
    id: "puzzle-002",
    date: "2026-04-16",
    difficulty: 2,
    groups: [
      {
        theme: "צבעים",
        color: "#f7d96b",
        textColor: "#3a2f00",
        words: ["אדום", "כחול", "ירוק", "צהוב"],
      },
      {
        theme: "ימים בשבוע",
        color: "#b6d9b8",
        textColor: "#1a3a1a",
        words: ["ראשון", "שני", "שלישי", "רביעי"],
      },
      {
        theme: "חיות בית",
        color: "#bfd4f9",
        textColor: "#1a3a7a",
        words: ["כלב", "חתול", "אוגר", "תוכי"],
      },
      {
        theme: "תבלינים",
        color: "#f5c9cc",
        textColor: "#3a1a1f",
        words: ["כורכום", "פפריקה", "כמון", "זעתר"],
      },
    ],
  },
  {
    id: "puzzle-003",
    date: "2026-04-17",
    difficulty: 3,
    groups: [
      {
        theme: "כוכבי לכת",
        color: "#f7d96b",
        textColor: "#3a2f00",
        words: ["נגה", "מאדים", "צדק", "שבתאי"],
      },
      {
        theme: "סופרים ישראלים",
        color: "#b6d9b8",
        textColor: "#1a3a1a",
        words: ["עוז", "גרוסמן", "אפלפלד", "קרת"],
      },
      {
        theme: "תוכניות AI",
        color: "#bfd4f9",
        textColor: "#1a3a7a",
        words: ["קלוד", "ג'מיני", "צ'אטGPT", "מיסטרל"],
      },
      {
        theme: "ערים אירופאיות",
        color: "#f5c9cc",
        textColor: "#3a1a1f",
        words: ["פריז", "ברלין", "מדריד", "וינה"],
      },
    ],
  },
];

export const MAX_MISTAKES = 4;

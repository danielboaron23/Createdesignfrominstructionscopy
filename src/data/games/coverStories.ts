export type CoverStory = {
  id: string;
  title: string;
  pixelatedImagePrompt: string;
  hints: string[];
  options: string[];
  publishedAt: string;
  difficulty: 1 | 2 | 3;
  topic: "פוליטיקה" | "ספורט" | "תרבות" | "טכנולוגיה" | "מדע";
};

export const COVER_STORIES: CoverStory[] = [
  {
    id: "cs-001",
    title: "תוצאות הבחירות 2025",
    pixelatedImagePrompt: "election-results-stage",
    difficulty: 1,
    topic: "פוליטיקה",
    publishedAt: "2025-11-04",
    hints: [
      "אירוע פוליטי דרמטי",
      "התרחש לאחרונה",
      "השפיע על הזירה הישראלית",
      "כלל בחירות לכנסת",
    ],
    options: [
      "תוצאות הבחירות 2025",
      "הסכם השלום",
      "פיצול בכנסת",
      "החלפת נשיא",
    ],
  },
  {
    id: "cs-002",
    title: "מונדיאל 2026",
    pixelatedImagePrompt: "world-cup-trophy",
    difficulty: 1,
    topic: "ספורט",
    publishedAt: "2026-07-15",
    hints: [
      "אירוע ספורט גלובלי",
      "מתקיים אחת לארבע שנים",
      "מתקיים השנה",
      "כדורגל",
    ],
    options: ["יורו 2024", "מונדיאל 2026", "אולימפיאדה 2024", "ליגת האלופות"],
  },
  {
    id: "cs-003",
    title: "השקת iPhone 17",
    pixelatedImagePrompt: "new-iphone-launch",
    difficulty: 2,
    topic: "טכנולוגיה",
    publishedAt: "2025-09-10",
    hints: [
      "השקה טכנולוגית",
      "מוצר של אפל",
      "אירוע ספטמבר השנתי",
      "טלפון",
    ],
    options: [
      "השקת iPhone 17",
      "השקת Vision Pro 2",
      "השקת Galaxy S25",
      "השקת Pixel 10",
    ],
  },
  {
    id: "cs-004",
    title: "פרס נובל לכלכלה 2025",
    pixelatedImagePrompt: "nobel-medal",
    difficulty: 3,
    topic: "מדע",
    publishedAt: "2025-10-13",
    hints: [
      "פרס יוקרתי",
      "מוענק בסטוקהולם",
      "תחום הכלכלה",
      "השנה הוענק לחוקרי AI כלכלי",
    ],
    options: [
      "פרס נובל לכלכלה 2025",
      "פרס פולצר",
      "פרס טיורינג",
      "פרס וולף לכלכלה",
    ],
  },
  {
    id: "cs-005",
    title: "מצעד הגאווה בתל אביב",
    pixelatedImagePrompt: "pride-parade-flags",
    difficulty: 2,
    topic: "תרבות",
    publishedAt: "2025-06-13",
    hints: [
      "אירוע שנתי",
      "בתל אביב",
      "חיבוק זכויות LGBTQ+",
      "מאות אלפי משתתפים",
    ],
    options: [
      "פסטיבל הקולנוע",
      "מצעד הגאווה בתל אביב",
      "פסטיבל ישראל",
      "הלוויינות",
    ],
  },
  {
    id: "cs-006",
    title: "השקת GPT-5",
    pixelatedImagePrompt: "ai-launch-screen",
    difficulty: 2,
    topic: "טכנולוגיה",
    publishedAt: "2025-08-20",
    hints: [
      "מודל בינה מלאכותית",
      "של OpenAI",
      "התקדמות משמעותית",
      "השנה הושק",
    ],
    options: ["השקת Claude 4", "השקת GPT-5", "השקת Gemini 2", "השקת Llama 4"],
  },
];

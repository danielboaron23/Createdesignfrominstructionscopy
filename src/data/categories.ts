import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "games",
    name: "משחקים",
    color: "#a30c15",
    description: "סיכומים, חידות וכתבות על עולם המשחקים היומיים",
  },
  {
    slug: "culture",
    name: "תרבות",
    color: "#7a3b9a",
    description: "ספרים, קולנוע, מוזיקה ואמנות",
  },
  {
    slug: "tech",
    name: "טכנולוגיה",
    color: "#0c6fa3",
    description: "AI, סטארטאפים, גאדג'טים ועתיד הטכנולוגיה",
  },
  {
    slug: "politics",
    name: "פוליטיקה",
    color: "#0a4d2e",
    description: "חדשות, ניתוחים ופרשנויות מהזירה הפוליטית",
  },
  {
    slug: "sports",
    name: "ספורט",
    color: "#c25e00",
    description: "כדורגל, כדורסל, אולימפיאדה וענפי ספורט נוספים",
  },
  {
    slug: "lifestyle",
    name: "אורח חיים",
    color: "#b8336a",
    description: "אוכל, נסיעות, בריאות וטיפים יומיים",
  },
  {
    slug: "opinion",
    name: "דעות",
    color: "#5b4636",
    description: "טורי דעה ופרשנויות מהמובילים בארץ",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return CATEGORIES.find((c) => c.name === name);
}

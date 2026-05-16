import type { Comment } from "./types";

export const COMMENTS: Comment[] = [
  {
    id: "c001",
    articleId: "megillat-esther",
    userId: "u_002",
    text: "כתבה מעולה, תודה! החידה של 5 אותיות השבוע הייתה ממש קשה.",
    postedAt: "2026-04-16T08:32:00",
    likes: 14,
  },
  {
    id: "c002",
    articleId: "megillat-esther",
    userId: "u_005",
    text: "פתרתי את החידה בניסיון השלישי - הרגשתי גאון 😎",
    postedAt: "2026-04-16T09:15:00",
    likes: 8,
  },
  {
    id: "c003",
    articleId: "megillat-esther",
    userId: "u_003",
    text: "מסכים עם הקוראת בוני, זו שאלת ליבה - יש לנו מספיק חידות בשפה?",
    postedAt: "2026-04-16T10:48:00",
    likes: 21,
    parentId: "c001",
  },
  {
    id: "c004",
    articleId: "megillat-esther",
    userId: "u_009",
    text: "אני זו שמופיעה בכתבה! מודה לכם על העזרה",
    postedAt: "2026-04-16T11:22:00",
    likes: 56,
  },
  {
    id: "c005",
    articleId: "megillat-esther",
    userId: "u_008",
    text: "לא הסכמתי עם פתרון אחד מהרמזים. כדאי שתפתחו דיון על זה.",
    postedAt: "2026-04-16T12:05:00",
    likes: 3,
  },
  {
    id: "c006",
    articleId: "megillat-esther",
    userId: "u_012",
    text: "החידה הכי טובה השנה. תמשיכו ככה!",
    postedAt: "2026-04-16T13:30:00",
    likes: 11,
  },
  {
    id: "c007",
    articleId: "megillat-esther",
    userId: "u_007",
    text: "האם תהיה כתבה דומה גם השבוע הבא?",
    postedAt: "2026-04-16T14:50:00",
    likes: 2,
  },
];

export function getCommentsForArticle(articleId: string): Comment[] {
  return COMMENTS.filter((c) => c.articleId === articleId);
}

export function getReplies(commentId: string): Comment[] {
  return COMMENTS.filter((c) => c.parentId === commentId);
}

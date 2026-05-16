# שכבת דאטה (Mock Data Layer)

תיקייה זו מכילה דאטה מדומה ושכבת API דמה (`mockApi.ts`) להדמיית עבודה מול שרת אמיתי. הקבצים נועדו לשמש בתרגילים תחת `exercises/` ובפיתוח הפרויקט.

## מבנה

```
src/data/
  ├── types.ts          # טיפוסים משותפים (User, Score, Comment...)
  ├── users.ts          # 18 משתמשי דמה
  ├── scores.ts         # היסטוריית משחקים + leaderboard + streaks
  ├── comments.ts       # תגובות לכתבות
  ├── categories.ts     # קטגוריות לכתבות
  ├── mockApi.ts        # API דמה אסינכרוני (delays, errors, pagination)
  ├── index.ts          # נקודת ייצוא מרכזית
  └── games/            # דאטה לכל משחק
      ├── words.ts          # 5 אותיות
      ├── characters.ts     # מי אני
      ├── songs.ts          # איזה שיר
      ├── connections.ts    # מה הקשר
      ├── logical.ts        # הגיונית
      ├── twentyQuestions.ts # 20 שאלות
      ├── coverStories.ts   # כתבת השער
      └── notForQuoting.ts  # לא לציטוט
```

## דוגמאות שימוש

### ייבוא דאטה ישיר

```ts
import { FIVE_LETTER_WORDS, CHARACTERS } from "@/data";

const randomWord = FIVE_LETTER_WORDS[Math.floor(Math.random() * FIVE_LETTER_WORDS.length)];
```

### שימוש ב-mock API

```ts
import { listArticles, fetchLeaderboard } from "@/data/mockApi";

// טעינת כתבות עם pagination + פילטור
const result = await listArticles({ category: "תרבות", page: 1, pageSize: 10 });
console.log(result.items, result.totalPages);

// חיפוש
const search = await listArticles({ search: "Wordle" });

// leaderboard
const top10 = await fetchLeaderboard(10);
```

### הוספת תקלות אקראיות (לבדיקות error handling)

```ts
import { configureMockApi } from "@/data/mockApi";

// 30% מהקריאות יזרקו שגיאה
configureMockApi({ errorRate: 0.3 });

// השהיה ארוכה יותר לבדיקת loading states
configureMockApi({ minDelayMs: 1500, maxDelayMs: 3000 });
```

## API זמין

| פונקציה | מחזירה | הערות |
|---------|---------|--------|
| `listArticles(opts)` | `PaginatedResult<ArticleData>` | תומך ב-category, search, tag, pagination |
| `fetchArticle(id)` | `ArticleData` | זורק 404 אם לא נמצא |
| `listCategories()` | `Category[]` | |
| `fetchCategory(slug)` | `Category` | |
| `fetchCurrentUser()` | `User` | מחזיר את משתמש ה-mock הנוכחי |
| `fetchUser(id)` | `User` | |
| `listUsers(page, pageSize)` | `PaginatedResult<User>` | |
| `fetchLeaderboard(limit)` | `LeaderboardEntry[]` | מסודר לפי ניקוד |
| `fetchUserScores(userId)` | `GameScore[]` | |
| `fetchUserStreak(userId)` | `DailyStreak \| null` | |
| `submitScore(score)` | `GameScore` | מוסיף ל-mock state |
| `fetchComments(articleId)` | `Comment[]` | |
| `postComment(comment)` | `Comment` | |
| `fetchAllStreaks()` | `DailyStreak[]` | |

## למתרגלים

הדאטה מוכן ומחכה לשימוש — אבל החיבור שלו ל-UI הוא חלק מהתרגול. ראה תרגיל **01-extract-game-data** ו-**02-mock-api-loading-states** ב-`exercises/` להתחלה.

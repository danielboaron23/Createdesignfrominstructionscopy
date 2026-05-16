
  # Create Design from Instructions (Copy)

  This is a code bundle for Create Design from Instructions (Copy). The original project is available at https://www.figma.com/design/kWmpcuy4Swbtza2UAYteDv/Create-Design-from-Instructions--Copy-.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ---

  ## תרגילים לתלמידים (Claude Code Practice)

  הפרויקט כולל **10 תרגילים מובנים** לתרגול שימוש ב-Claude Code על קוד אמיתי. התרגילים נמצאים בתיקיית `exercises/` וכל אחד מהם מכיל מטרה, רמזים, קריטריוני קבלה ובונוסים.

  ### דאטה מוכנה (`src/data/`)

  שכבת mock data ו-mock API מוכנה לשימוש בתרגילים:
  - 18 משתמשים, 34 ציוני משחקים, 7 רצפים יומיים
  - 7 קטגוריות, תגובות לדוגמה
  - דאטה מורחב ל-9 המשחקים
  - `mockApi.ts` — פונקציות אסינכרוניות עם delays, errors, ו-pagination

  ראה `src/data/README.md` לתיעוד מלא של ה-API.

  ### רשימת התרגילים

  | # | שם | קושי | פוקוס | זמן משוער |
  |---|-----|------|--------|-----------|
  | [01](exercises/01-extract-game-data.md) | חילוץ דאטה מהמשחקים | ⭐⭐ | refactoring, file organization | 30 דק' |
  | [02](exercises/02-mock-api-loading-states.md) | Mock API + Loading States | ⭐⭐⭐ | async, error handling | 45 דק' |
  | [03](exercises/03-category-page.md) | דף קטגוריה | ⭐⭐⭐ | routing, filtering | 60 דק' |
  | [04](exercises/04-leaderboard.md) | לוח מובילים | ⭐⭐⭐ | data viz, sorting | 45 דק' |
  | [05](exercises/05-user-profile.md) | פרופיל משתמש | ⭐⭐⭐ | stats, layout | 60 דק' |
  | [06](exercises/06-search-articles.md) | חיפוש בכתבות | ⭐⭐⭐⭐ | debouncing, UX | 60 דק' |
  | [07](exercises/07-favorites-bookmarks.md) | מועדפים (localStorage) | ⭐⭐⭐ | persistence, hooks | 45 דק' |
  | [08](exercises/08-comments-section.md) | תגובות בכתבה | ⭐⭐⭐⭐ | forms, optimistic UI | 75 דק' |
  | [09](exercises/09-daily-streak.md) | רצף יומי במשחקים | ⭐⭐⭐⭐ | dates, state | 60 דק' |
  | [10](exercises/10-bonus-challenges.md) | אתגרי בונוס | ⭐⭐⭐⭐⭐ | open-ended | 90+ דק' |

  ### איך מתחילים

  1. קרא את [`exercises/README.md`](exercises/README.md) — סקירה כללית + טיפים על שימוש יעיל ב-Claude Code (plan mode, sub-agents, parallel tool calls, slash commands).
  2. ודא ש-`npm install` ו-`npm run dev` עובדים.
  3. עיין ב-`guidelines/Guidelines.md` — Design System של הפרויקט (צבעים, typography, spacing, RTL).
  4. בחר תרגיל לפי רמתך והתחל!

  ### דרישות מקדימות

  - Node.js 18+ ו-npm
  - הכרות בסיסית עם React + TypeScript
  - Claude Code מותקן (`npm install -g @anthropic-ai/claude-code`)

  ### קונבנציות

  - **שפה**: עברית ל-UI strings, אנגלית לקוד
  - **RTL**: כל ה-UI הוא RTL — `dir="rtl"` ברוט
  - **Styles**: Tailwind CSS + Radix UI primitives
  - **State**: React hooks מקומי
  - **Mock data**: דאטה חדש מ-`src/data/`
  
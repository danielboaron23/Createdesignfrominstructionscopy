# תרגיל 10: אתגרי בונוס

**רמת קושי:** ⭐⭐⭐⭐⭐
**זמן משוער:** 90+ דקות כל אחד
**פוקוס:** Open-ended, מתאים אחרי שהשלמת 1-9

אחרי שהשלמת את התרגילים הבסיסיים, הנה אתגרים פתוחים יותר. אין "תשובה אחת" — נסה לעצב פיצ'ר אמיתי בעצמך.

---

## אתגר A: Dark Mode

הוסף מצב כהה לאפליקציה.

### דרישות

- כפתור toggle בכותרת (☀️ / 🌙)
- שמירת הבחירה ב-localStorage
- ברירת מחדל: עוקב אחרי `prefers-color-scheme`
- כל הצבעים צריכים להיראות טוב בשני המצבים — ולא רק הרקע
- אנימציה חלקה בין המצבים

### רמזים

- השתמש ב-Tailwind `dark:` prefix
- חשוב על קונטרסט (WCAG AA)
- ה-`next-themes` package כבר מותקן — שקול אם להשתמש בו

---

## אתגר B: Mobile-first Navigation Drawer

הכותרת הראשית קצת עמוסה. החלף בתפריט המבורגר עם drawer.

### דרישות

- אייקון ☰ פותח drawer מהצד
- בתוך ה-drawer: כל הקטגוריות + קישור לפרופיל + מועדפים + לוח מובילים
- אנימציה חלקה (שימוש ב-`vaul` או `@radix-ui/react-dialog`)
- סגירה ב-Esc / לחיצה מחוץ
- a11y: focus trap, aria-labels

### רמזים

- ה-`vaul` package כבר מותקן
- שקול לחלץ את הקישורים לקובץ נפרד `src/data/navigation.ts`

---

## אתגר C: ניתוח שימוש (Analytics)

עקב אחרי שימוש המשתמש באפליקציה והצג דשבורד אנליטיקס.

### דרישות

- עקוב אחרי: דפים שנצפו, משחקים ששוחקו, כתבות שנקראו, זמן ממוצע בעמוד
- שמור ב-localStorage (לא mock api הפעם)
- דף `/analytics` (Page) שמציג:
  - גרפים (recharts)
  - סטטיסטיקות אישיות
  - "הרגלי קריאה שלך"
- "Reset analytics" כפתור

### רמזים

- עטוף את ה-tracking ב-hook `useAnalytics()`
- שקול event-driven: `track("article.view", { id })`
- אל תאבד מידע על navigate — useEffect

---

## אתגר D: A/B Testing Framework

בנה תשתית A/B testing פשוטה.

### דרישות

- מערכת flags ב-`src/data/featureFlags.ts`: 
  ```ts
  type Flag = { key: string; variants: string[]; rollout?: number };
  ```
- Hook `useFlag(key)` שמחזיר variant יציב (לפי userId)
- דף debug `/flags` (אופציונלי) להחליף variants ידנית
- דוגמה: הריץ A/B על צבע כפתור "פרסם תגובה"

### רמזים

- Hash של userId + flag key → deterministic variant
- שמור overrides ב-localStorage
- חשוב על תיעוד: "אם אתה רוצה להוסיף flag חדש, ערוך X"

---

## אתגר E: Game Analytics & Difficulty Adjustment

חישוב קושי דינמי לפי ביצועי משתמש.

### דרישות

- אחרי כל משחק, חשב `difficulty score` למשתמש (0-100)
- במשחקים שתומכים בקושי (5 אותיות, מי אני) — בחר רמה לפי הציון
- הצג למשתמש "הקושי שלך: בינוני 📊"
- אפשרות לידנית לעקוף ("שחק קל / קשה")

### רמזים

- שקול moving average — ממוצע 10 משחקים אחרונים
- שמור ב-localStorage או הוסף ל-mockApi
- "win streak" משפיע על הקושי (מנצח 5 רצוף → העלה רמה)

---

## טיפים כלליים לאתגרי בונוס

- **התחל ב-plan mode** — כל אתגר כאן מצריך תכנון רציני.
- **השתמש ב-sub-agents** לחקר רחב לפני כתיבת קוד.
- **/review** — אחרי שסיימת, הרץ code review על השינויים.
- **commit-by-commit** — אל תעבוד הכל בקומיט אחד.
- **בדוק accessibility** — RTL, focus, contrast.

בהצלחה! זה הזמן להראות מה למדת. 🚀

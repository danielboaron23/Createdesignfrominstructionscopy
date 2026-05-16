# תרגילים לתרגול Claude Code

ברוכים הבאים! התרגילים כאן נועדו ללמד שימוש יעיל ב-Claude Code על פרויקט אמיתי — אתר חדשות ומשחקים בעברית.

## איך לעבוד עם התרגילים

1. **בחר תרגיל לפי רמת קושי** (1-5 כוכבים).
2. **קרא את כל התרגיל לפני שאתה מתחיל** — ה"רמזים" מציעים אילו פיצ'רים של Claude Code לנצל.
3. **התחל מ-plan mode** (`Shift+Tab` עד שמופיע "plan mode") כדי לתכנן לפני שמשנים קוד.
4. **הרץ `npm run dev`** כדי לראות את התוצאות בזמן אמת.
5. **כשסיימת — סמן ב-checklist** של קריטריוני הקבלה.

## טיפים יעילים ל-Claude Code

### 🧭 Plan Mode
לפני משימה מורכבת, היכנס ל-plan mode (`Shift+Tab`). Claude יציע תוכנית מפורטת לפני שיכתוב קוד אחד. אישור התוכנית = הפעלת ביצוע.

### 🤖 Sub-agents
למשימות חקר רחבות, השתמש ב-sub-agent מסוג `Explore` (לחיפוש בקוד) או `general-purpose` (למשימות רב-שלביות). הם רצים בנפרד ולא מזהמים את הקונטקסט הראשי.

```
"מצא לי את כל המקומות שבהם מוצג רכיב Article באפליקציה" → Explore agent
"חקור איך עובד הניווט בין דפים בפרויקט" → Explore agent
```

### ⚡ Parallel tool calls
כשיש מספר משימות בלתי תלויות, בקש מ-Claude לבצע אותן במקביל ("בצע במקביל"). זה מאיץ משמעותית.

### 📝 Slash commands
- `/init` — יצירת CLAUDE.md לפרויקט
- `/review` — code review לשינויים נוכחיים
- `/security-review` — סקירת אבטחה
- `/loop` — הרצת משימה חוזרת
- `/simplify` — סימפליפיקציה של קוד משונה

### 💾 CLAUDE.md
צור קובץ `CLAUDE.md` בשורש הפרויקט עם הוראות תמידיות לקלוד (סטיילינג, שפה, conventions). שמור אותו עדכני.

### 🎯 Specificity helps
"תשפר את הקוד" → רע.
"רפקטר את `FiveLettersGame.tsx`: חלץ את מערך המילים לקובץ נפרד תחת `src/data/games/`" → טוב.

## רשימת התרגילים

| # | שם | קושי | פוקוס | זמן משוער |
|---|-----|------|--------|-----------|
| 01 | חילוץ דאטה מהמשחקים | ⭐⭐ | refactoring, file organization | 30 דק' |
| 02 | Mock API + Loading States | ⭐⭐⭐ | async, error handling | 45 דק' |
| 03 | דף קטגוריה | ⭐⭐⭐ | routing, filtering | 60 דק' |
| 04 | לוח מובילים | ⭐⭐⭐ | data viz, sorting | 45 דק' |
| 05 | פרופיל משתמש | ⭐⭐⭐ | stats, layout | 60 דק' |
| 06 | חיפוש בכתבות | ⭐⭐⭐⭐ | debouncing, UX | 60 דק' |
| 07 | מועדפים (localStorage) | ⭐⭐⭐ | persistence, hooks | 45 דק' |
| 08 | תגובות בכתבה | ⭐⭐⭐⭐ | forms, optimistic UI | 75 דק' |
| 09 | רצף יומי במשחקים | ⭐⭐⭐⭐ | dates, state | 60 דק' |
| 10 | אתגרי בונוס | ⭐⭐⭐⭐⭐ | open-ended | 90+ דק' |

## דרישות מקדימות

- Node.js 18+ ו-npm
- הכרות בסיסית עם React + TypeScript
- Claude Code מותקן (`npm install -g @anthropic-ai/claude-code`)
- הרצה ראשונה: `npm install && npm run dev`

## קונבנציות בקוד

- **שפה**: עברית ל-UI strings, אנגלית לשמות משתנים ופונקציות
- **RTL**: כל ה-UI הוא RTL — שים לב לכיווניות
- **Styles**: Tailwind CSS + Radix UI primitives
- **State**: React hooks מקומי (אין global state library)
- **Mock data**: כל הנתונים החדשים צריכים להגיע מ-`src/data/`

בהצלחה! 🚀

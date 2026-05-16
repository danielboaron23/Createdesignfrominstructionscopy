# תרגיל 09: רצף יומי במשחקים

**רמת קושי:** ⭐⭐⭐⭐
**זמן משוער:** 60 דקות
**פוקוס:** Date logic, persistence, motivational UI

## מטרה

הוסף מערכת "רצף יומי" (streak): כל יום שהמשתמש משחק לפחות משחק אחד מצליח, הרצף עולה. אם דילג יום — חוזר ל-0. הצג את הרצף בכותרת ובדף הפרופיל.

## רקע

יש לנו `STREAKS` mock עם current/longest. ה-mockApi חושף `fetchUserStreak(userId)`. המשימה: לבנות את הלוגיקה שמעדכנת אותו כשהמשתמש מסיים משחק.

## משימות

1. **הוסף `updateStreak` ב-mockApi**:
   ```ts
   async function updateStreak(userId: string, playedDate: string): Promise<DailyStreak>
   ```
   הלוגיקה:
   - אם `playedDate === lastPlayedDate` → אין שינוי
   - אם `playedDate === lastPlayedDate + 1 day` → current++, longest = max(current, longest)
   - אחרת (פער יותר מ-1 יום) → current = 1
   - עדכן ב-`STREAKS` array
2. **חבר ל-GameShell או לכל משחק**: כשה-game נגמר בניצחון → קרא ל-`updateStreak` + `submitScore`.
3. **הצג streak badge בכותרת**:
   - 🔥 + מספר הימים
   - tooltip עם longest
   - אנימציה קצרה כשהרצף עולה
4. **הצג ב-UserProfilePage** את הרצף הנוכחי והמרבי (מתרגיל 05).
5. **דף מיוחד** לרצף שבור: אם current=0 ו-longest>5, הצג "פספסת! היה לך רצף של X ימים."

## רמזים

- **תאריכים:** עבוד ב-`YYYY-MM-DD` (string) במקום `Date` objects כדי להימנע מ-timezone bugs.
- **חישוב הפרש ימים:**
  ```ts
  const diffDays = (a: string, b: string) =>
    Math.round((new Date(a).getTime() - new Date(b).getTime()) / 86400000);
  ```
- **Race condition:** אם המשתמש מסיים שני משחקים באותו יום — `updateStreak` צריך להיות idempotent.
- **Sub-agent:** _"מצא את כל המקומות שבהם מסתיים משחק (win/lose) בכל קבצי המשחקים"_
- **Plan mode מומלץ מאוד** — זה משימה רב-קובץ עם state משותף.

## קריטריוני קבלה

- [ ] `updateStreak` קיים ב-mockApi עם הלוגיקה הנכונה
- [ ] רצף עולה כשמנצחים יום אחר יום
- [ ] רצף יורד ל-0 כשמדלגים יום
- [ ] רצף לא יורד אם משחקים פעמיים באותו יום
- [ ] longest תמיד >= current
- [ ] Badge מוצג בכותרת
- [ ] פרופיל המשתמש מציג את הרצף
- [ ] אנימציה/feedback ויזואלי כשהרצף עולה

## בונוס

- **streak freeze**: פעם בשבוע המשתמש יכול "להקפיא" את הרצף ולדלג יום בלי לאבד אותו.
- **התראות**: ב-localStorage, סמן "המשתמש כבר שיחק היום" → באייקון בכותרת.
- **גרף streak**: GitHub-style heatmap של 90 הימים האחרונים.
- **streak milestones**: badges מיוחדים בנקודות 7, 30, 100, 365 ימים.

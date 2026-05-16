# תרגיל 07: מועדפים (Bookmarks)

**רמת קושי:** ⭐⭐⭐
**זמן משוער:** 45 דקות
**פוקוס:** localStorage, custom hooks, persistence

## מטרה

אפשר למשתמש לסמן כתבות כ"מועדפות" ולגשת לרשימת המועדפים שלו בכל זמן. הנתון נשמר ב-localStorage (אין דאטהבייס).

## רקע

`localStorage` מאפשר אחסון פר-דפדפן. נשתמש בו ל-bookmarks תחת מפתח `bookmarks:u_001` (מותאם למשתמש).

## משימות

1. **כתוב hook `useBookmarks(userId)`**:
   ```ts
   function useBookmarks(userId: string): {
     bookmarks: Set<string>;
     toggle: (articleId: string) => void;
     isBookmarked: (articleId: string) => boolean;
   }
   ```
   - קורא מ-localStorage בעלייה
   - שומר ל-localStorage בכל שינוי
   - מתעדכן בין טאבים (אופציונלי: `storage` event)
2. **הוסף כפתור 🔖 בכרטיס כתבה ובדף כתבה**:
   - אייקון מתמלא כשמועדף
   - אנימציה קטנה בלחיצה
3. **דף מועדפים** (`{ kind: "bookmarks" }`):
   - מציג את כל הכתבות המועדפות של המשתמש הנוכחי
   - כפתור "הסר" על כל אחת
   - empty state: "עדיין לא סימנת כתבות. עבור לדף הבית כדי להתחיל."
4. **הוסף קישור** לדף מועדפים בכותרת הראשית.

## רמזים

- **שמירה ב-localStorage:** `JSON.stringify(Array.from(bookmarks))` ו-`new Set(JSON.parse(...))`.
- **Hydration safety:** קרא מ-localStorage ב-`useEffect`, לא ב-initial state, כדי להימנע משגיאות SSR (פחות רלוונטי כאן כי Vite, אבל הרגל טוב).
- **Sub-agent:** _"חקור איך כרטיס כתבה מוצג ברכיבי NewsSection ו-RecommendedSection"_
- **טיפ עיצוב:** השתמש ב-icons מ-`lucide-react` (כבר מותקן) — `Bookmark` ו-`BookmarkCheck`.

## קריטריוני קבלה

- [ ] לחיצה על 🔖 בכרטיס מסמנת/מבטלת מועדף
- [ ] הסימון נשמר אחרי רענון הדף
- [ ] דף מועדפים מציג את כל הכתבות המועדפות
- [ ] empty state מוצג כשאין מועדפים
- [ ] הסרה מהדף עובדת ומתעדכנת מיידית
- [ ] אם תפתח את הדף בטאב חדש — המועדפים שם

## בונוס

- **קטגוריזציה של מועדפים**: צור קולקציות (קריאה אחר כך, חשוב, מעניין).
- **ייצוא/ייבוא**: כפתורים לייצא JSON או לייבא רשימה.
- **סנכרון** דרך mock API: הוסף `syncBookmarks(userId, ids)` ל-mockApi כדי לדמות שרת.

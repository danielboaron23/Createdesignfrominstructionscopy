# תרגיל 02: Mock API + Loading & Error States

**רמת קושי:** ⭐⭐⭐
**זמן משוער:** 45 דקות
**פוקוס:** Async data fetching, loading states, error handling

## מטרה

כיום הכתבות נטענות סינכרונית מ-`articles.ts`. נחליף את זה לטעינה אסינכרונית דרך ה-mock API, עם הצגת loading state ו-error state. זה ידמה איך אפליקציה אמיתית עובדת מול שרת.

## רקע

`src/data/mockApi.ts` מספק פונקציות אסינכרוניות עם delays של 200-800ms ואפשרות להוסיף שגיאות אקראיות. נחבר את הכתבות אליו.

## משימות

1. **ב-`MobileHome.tsx`**: החלף את הקריאה הסינכרונית ל-`ARTICLES` בקריאה ל-`listArticles({ pageSize: 6 })`. השתמש ב-`useEffect` + `useState`.
2. **הוסף `LoadingSkeleton`** — קומפוננטה שמוצגת בזמן הטעינה (Tailwind animate-pulse, מבנה דומה לכרטיס כתבה).
3. **הוסף `ErrorBanner`** — קומפוננטה שמוצגת אם הטעינה נכשלה, עם כפתור "נסה שוב".
4. **ב-`ArticlePage`**: רפקטר כדי שיקבל `id` במקום אובייקט מלא, וטוען את הכתבה דרך `fetchArticle(id)`.
5. **טסט סוף**: הפעל `configureMockApi({ errorRate: 0.5 })` ב-main.tsx וודא שה-error state מוצג ושכפתור "נסה שוב" עובד.

## רמזים

- **Custom hook עוזר:** שקול לחלץ `useAsync` או `useArticles` כדי לא לחזור על הלוגיקה (loading/error/data).
- **AbortController:** אם המשתמש מנווט החוצה באמצע טעינה, בטל את ה-fetch (אופציונלי, בונוס).
- בעת קריאה ל-API, תפוס `try/catch` ושמור `error` ב-state.
- ה-`ApiError` מ-`src/data/types.ts` הוא הצורה של השגיאה.

### דוגמת מבנה ל-custom hook

```ts
function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  // ... useEffect שמטפל ב-fn
  return { data, loading, error, refetch };
}
```

## קריטריוני קבלה

- [ ] דף הבית מציג skeleton בזמן הטעינה (לפחות 200ms)
- [ ] במקרה של שגיאה — מוצג ErrorBanner עם כפתור "נסה שוב" פונקציונלי
- [ ] דף הכתבה טוען דרך `fetchArticle(id)` ולא מקבל אובייקט מלא דרך props
- [ ] בעת ניווט בין דפים, אין flicker או שגיאות בקונסול
- [ ] עם `errorRate: 0.5` ב-mockApi, האפליקציה עדיין שמישה (אחרי 1-2 retries)

## בונוס

- הוסף **stale-while-revalidate**: הצג דאטה ישן מהקאש מיידית ועדכן ברקע.
- הוסף **prefetch** של כתבה כשהיא מופיעה ב-viewport (IntersectionObserver).

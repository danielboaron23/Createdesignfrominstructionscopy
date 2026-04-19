import { useCallback, useEffect, useState } from "react";
import GameShell, { GameOverlay, PrimaryButton, SecondaryButton, StatPill } from "./GameShell";

type Props = { onExit: () => void };

type Question = {
  q: string;
  options: string[];
  correct: number; // index into options
  explanation?: string;
};

const QUESTIONS: Question[] = [
  {
    q: "איזו שפה מדוברת ברוב המכריע של ברזיל?",
    options: ["ספרדית", "פורטוגזית", "אנגלית", "צרפתית"],
    correct: 1,
  },
  {
    q: "מהי בירת אוסטרליה?",
    options: ["סידני", "מלבורן", "קנברה", "פרת'"],
    correct: 2,
    explanation: "קנברה היא בירת אוסטרליה, לא סידני.",
  },
  {
    q: "מי כתב את 'מלחמה ושלום'?",
    options: ["דוסטויבסקי", "טולסטוי", "צ'כוב", "פושקין"],
    correct: 1,
  },
  {
    q: "איזה יסוד מסומן באות Au?",
    options: ["כסף", "כספית", "זהב", "עופרת"],
    correct: 2,
    explanation: "Au הוא הסימן הכימי לזהב (מלטינית 'Aurum').",
  },
  {
    q: "כמה שופטים יש בבית המשפט העליון בישראל?",
    options: ["9", "12", "15", "17"],
    correct: 2,
  },
  {
    q: "מי המציא את הרדיו?",
    options: ["אדיסון", "בל", "מרקוני", "טסלה"],
    correct: 2,
  },
  {
    q: "איזה כוכב לכת הוא הקרוב ביותר לשמש?",
    options: ["נוגה", "כדור הארץ", "מאדים", "חמה"],
    correct: 3,
  },
  {
    q: "באיזו שנה הוקמה מדינת ישראל?",
    options: ["1945", "1948", "1950", "1967"],
    correct: 1,
  },
  {
    q: "מה שמו של האוקיינוס הגדול ביותר?",
    options: ["האטלנטי", "השקט", "ההודי", "הארקטי"],
    correct: 1,
  },
  {
    q: "מי היה ראש הממשלה הראשון של ישראל?",
    options: ["לוי אשכול", "דוד בן-גוריון", "משה שרת", "גולדה מאיר"],
    correct: 1,
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QUIZ_LENGTH = 10;

export default function TwentyQuestionsGame({ onExit }: Props) {
  const [deck, setDeck] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [done, setDone] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const reset = useCallback(() => {
    setDeck(shuffle(QUESTIONS).slice(0, QUIZ_LENGTH));
    setIdx(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
    setDone(false);
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  const current = deck[idx];

  function choose(optionIdx: number) {
    if (showFeedback || !current) return;
    setSelected(optionIdx);
    setShowFeedback(true);
    if (optionIdx === current.correct) setScore((s) => s + 1);
  }

  function next() {
    if (idx + 1 >= deck.length) {
      setDone(true);
    } else {
      setIdx(idx + 1);
      setSelected(null);
      setShowFeedback(false);
    }
  }

  if (!current && !done) return null;

  const percent = deck.length ? Math.round((score / deck.length) * 100) : 0;

  return (
    <GameShell
      title="20 שאלות"
      onExit={onExit}
      rightSlot={
        <div className="flex items-center gap-1.5">
          <StatPill label="ניקוד" value={`${score}/${deck.length || QUIZ_LENGTH}`} />
        </div>
      }
    >
      {showIntro && (
        <GameOverlay
          emoji="❓"
          title="20 שאלות"
          subtitle={`ענו על ${QUIZ_LENGTH} שאלות טריוויה. תשובות נכונות מעלות את הניקוד שלכם. בהצלחה!`}
        >
          <PrimaryButton onClick={() => setShowIntro(false)}>בואו נתחיל</PrimaryButton>
        </GameOverlay>
      )}

      {!showIntro && !done && current && (
        <>
          {/* Progress */}
          <div className="w-full">
            <div className="flex items-center justify-between text-[12px] text-[#737373] font-bold mb-2">
              <span>שאלה {idx + 1} מתוך {deck.length}</span>
            </div>
            <div className="h-[6px] w-full bg-[#ececf0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#226ee9] transition-all duration-300"
                style={{ width: `${((idx) / deck.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="w-full bg-white rounded-[12px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <p
              className="text-[18px] sm:text-[20px] font-bold text-[#2d2d2d] text-right leading-relaxed"
              dir="rtl"
            >
              {current.q}
            </p>
          </div>

          {/* Options */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
            {current.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === current.correct;
              const showState = showFeedback;
              let className =
                "min-h-[52px] rounded-[6px] text-[15px] sm:text-[16px] font-bold transition-all px-4 text-right " +
                "bg-white text-[#2d2d2d] hover:bg-[#ececf0] shadow-[0_1px_2px_rgba(0,0,0,0.06)]";
              if (showState) {
                if (isCorrect) className = className.replace(/bg-white[^ ]*/, "bg-[#22a06b] text-white");
                if (isSelected && !isCorrect) className = className.replace(/bg-white[^ ]*/, "bg-[#d4183d] text-white tq-shake");
                if (!isCorrect && !isSelected) className += " opacity-60";
              }
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={showState}
                  className={className + " active:scale-[0.98]"}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback + Next */}
          {showFeedback && (
            <div className="w-full flex flex-col items-center gap-3 mt-1">
              {current.explanation && (
                <div className="bg-[#e8f0fe] rounded-[6px] p-3 text-[14px] text-[#1a3a7a] text-right w-full" dir="rtl">
                  {current.explanation}
                </div>
              )}
              <PrimaryButton onClick={next} fullWidth>
                {idx + 1 >= deck.length ? "סיים" : "הבא"}
              </PrimaryButton>
            </div>
          )}

          <style>{`
            @keyframes tq-shake {
              0%, 100% { transform: translateX(0); }
              20% { transform: translateX(-4px); }
              40% { transform: translateX(4px); }
              60% { transform: translateX(-3px); }
              80% { transform: translateX(3px); }
            }
            .tq-shake { animation: tq-shake 0.4s ease-in-out; }
          `}</style>
        </>
      )}

      {done && (
        <GameOverlay
          emoji={percent >= 80 ? "🏆" : percent >= 50 ? "🎉" : "💪"}
          title={
            percent >= 80
              ? "מצוין!"
              : percent >= 50
              ? "כל הכבוד!"
              : "מעניין, נסו שוב!"
          }
          subtitle={`עניתם נכון על ${score} מתוך ${deck.length} (${percent}%)`}
        >
          <PrimaryButton onClick={reset}>משחק חדש</PrimaryButton>
          <SecondaryButton onClick={onExit}>חזרה למשחקים</SecondaryButton>
        </GameOverlay>
      )}
    </GameShell>
  );
}

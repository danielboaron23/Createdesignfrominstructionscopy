import { useCallback, useEffect, useState } from "react";
import GameShell, { GameOverlay, PrimaryButton, SecondaryButton, StatPill } from "./GameShell";

type Props = { onExit: () => void };

type Riddle = {
  riddle: string;
  /** Accepted answers (case-insensitive, trimmed) */
  answers: string[];
  /** Progressive hints */
  hints: string[];
};

const RIDDLES: Riddle[] = [
  {
    riddle: "יש לי עיניים, אך איני רואה. יש לי שנת תרדמה, ואינני ישן. מה אני?",
    answers: ["תפוח אדמה", "תפוח-אדמה", "תפוד", "תפו״א"],
    hints: [
      "גדל מתחת לאדמה",
      "משתמשים בו להכנת צ׳יפס",
      "הוא יכול להיות אפוי, מטוגן או מבושל",
    ],
  },
  {
    riddle: "אני רץ בלי רגליים, יורד בלי לעלות, יש לי לשון אך אין לי שפה. מה אני?",
    answers: ["נהר", "הנהר"],
    hints: ["זורם מים", "יש בו דגים", "מסתיים בים או באגם"],
  },
  {
    riddle: "ככל שלוקחים ממני יותר — אני גדל יותר. מה אני?",
    answers: ["חור", "בור"],
    hints: [
      "משהו ריק מתוכן",
      "נוצר בקרקע או בחומר",
      "בחול לדוגמה, חפירה יוצרת אותו",
    ],
  },
  {
    riddle:
      "לפני יומיים הייתי בן 5. בשנה הבאה אהיה בן 8. איך זה אפשרי?",
    answers: ["יום הולדת ב-31 בדצמבר", "31 בדצמבר", "ב-31.12", "יום ההולדת ב-31 בדצמבר"],
    hints: [
      "תאריך היום הוא 1 בינואר",
      "חשבו על תאריכי יום הולדת סביב סוף השנה",
      "יום ההולדת חל ב-31 בדצמבר — אמרת את המשפט ב-1 בינואר",
    ],
  },
];

function pickRiddle(exclude?: number): { riddle: Riddle; idx: number } {
  let idx = Math.floor(Math.random() * RIDDLES.length);
  if (exclude !== undefined && RIDDLES.length > 1) {
    while (idx === exclude) idx = Math.floor(Math.random() * RIDDLES.length);
  }
  return { riddle: RIDDLES[idx], idx };
}

function normalize(s: string): string {
  return s
    .trim()
    .replace(/[״"'׳.?!]/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

const MAX_ATTEMPTS = 5;

export default function LogicalGame({ onExit }: Props) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(0); // hints revealed
  const [attempts, setAttempts] = useState(0);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [feedback, setFeedback] = useState<"wrong" | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const reset = useCallback(() => {
    const next = pickRiddle(idx);
    setIdx(next.idx);
    setInput("");
    setRevealed(0);
    setAttempts(0);
    setWon(false);
    setLost(false);
    setFeedback(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  const riddle = RIDDLES[idx];

  function submit() {
    if (won || lost || !input.trim()) return;
    const norm = normalize(input);
    const match = riddle.answers.some((a) => normalize(a) === norm || norm.includes(normalize(a)));
    if (match) {
      setWon(true);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 450);
      setAttempts((a) => {
        const n = a + 1;
        if (n >= MAX_ATTEMPTS) setLost(true);
        return n;
      });
    }
  }

  function revealHint() {
    if (revealed < riddle.hints.length) setRevealed((r) => r + 1);
  }

  return (
    <GameShell
      title="הגיונית"
      onExit={onExit}
      rightSlot={
        <StatPill
          label="ניסיונות"
          value={`${attempts}/${MAX_ATTEMPTS}`}
          highlight={attempts > 0 ? "#d4183d" : undefined}
        />
      }
    >
      {showIntro && (
        <GameOverlay
          emoji="🧠"
          title="הגיונית"
          subtitle="חידת הגיון יומית. הקלידו את תשובתכם, ואם אתם תקועים — אפשר לחשוף רמזים. יש לכם 5 ניסיונות."
        >
          <PrimaryButton onClick={() => setShowIntro(false)}>בואו נתחיל</PrimaryButton>
        </GameOverlay>
      )}

      {!showIntro && (
        <>
          {/* Riddle card */}
          <div className="w-full bg-white rounded-[12px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="text-[11px] text-[#737373] font-bold uppercase tracking-wide mb-3 text-right">
              החידה
            </div>
            <p
              className="text-[17px] sm:text-[19px] font-bold text-[#2d2d2d] text-right leading-relaxed"
              dir="rtl"
            >
              {riddle.riddle}
            </p>
          </div>

          {/* Hints */}
          {revealed > 0 && (
            <div className="w-full flex flex-col gap-2">
              {riddle.hints.slice(0, revealed).map((h, i) => (
                <div
                  key={i}
                  className="bg-[#fff7e6] rounded-[6px] p-3 text-[14px] text-[#2d2d2d] text-right shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  dir="rtl"
                >
                  <span className="font-bold text-[#e9a937] ml-2">רמז {i + 1}:</span>
                  {h}
                </div>
              ))}
            </div>
          )}

          {/* Answer input */}
          {!won && !lost && (
            <div className="w-full flex flex-col gap-2">
              <div className={"flex gap-2 " + (feedback === "wrong" ? "lg-shake" : "")}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submit();
                  }}
                  placeholder="הקלידו את תשובתכם..."
                  className="flex-1 min-h-[48px] px-4 rounded-[6px] border-2 border-[#e5e5e5] bg-white text-[16px] text-[#2d2d2d] focus:outline-none focus:border-[#226ee9] text-right"
                  dir="rtl"
                />
                <PrimaryButton onClick={submit} disabled={!input.trim()}>
                  שלח
                </PrimaryButton>
              </div>
              {feedback === "wrong" && (
                <p className="text-[13px] text-[#d4183d] text-right font-bold" dir="rtl">
                  לא נכון, נסו שוב
                </p>
              )}
              {revealed < riddle.hints.length && (
                <SecondaryButton onClick={revealHint} fullWidth>
                  חשוף רמז ({riddle.hints.length - revealed} נותרו)
                </SecondaryButton>
              )}
            </div>
          )}

          {(won || lost) && (
            <GameOverlay
              emoji={won ? "🎉" : "🤔"}
              title={won ? "נכון מאוד!" : `התשובה: ${riddle.answers[0]}`}
              subtitle={won ? `פתרתם את החידה ב-${attempts + 1} ניסיונות` : undefined}
            >
              <PrimaryButton onClick={reset}>חידה חדשה</PrimaryButton>
              <SecondaryButton onClick={onExit}>חזרה למשחקים</SecondaryButton>
            </GameOverlay>
          )}

          <style>{`
            @keyframes lg-shake {
              0%, 100% { transform: translateX(0); }
              20% { transform: translateX(-5px); }
              40% { transform: translateX(5px); }
              60% { transform: translateX(-3px); }
              80% { transform: translateX(3px); }
            }
            .lg-shake { animation: lg-shake 0.45s ease-in-out; }
          `}</style>
        </>
      )}
    </GameShell>
  );
}

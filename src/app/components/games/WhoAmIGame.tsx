import { useCallback, useEffect, useState } from "react";
import GameShell, { GameOverlay, PrimaryButton, SecondaryButton, StatPill } from "./GameShell";

type Props = { onExit: () => void };

type Character = {
  /** Name (answer) */
  name: string;
  /** Hint clues — revealed progressively */
  hints: string[];
  /** Emoji representing the character (used with pixel mosaic) */
  emoji: string;
  /** Accent color for the pixel mosaic */
  color: string;
  /** Multiple choice options (correct name must be included) */
  options: string[];
};

const CHARACTERS: Character[] = [
  {
    name: "אלברט איינשטיין",
    emoji: "🧑‍🔬",
    color: "#bfd4f9",
    hints: [
      "נולד בגרמניה ב-1879",
      "זכה בפרס נובל לפיזיקה",
      "ידוע במשוואה E=mc²",
      "שיער לבן פרוע הפך לסמל מסחרי",
    ],
    options: ["איזק ניוטון", "אלברט איינשטיין", "סטיבן הוקינג", "ניקולה טסלה"],
  },
  {
    name: "גולדה מאיר",
    emoji: "👩‍💼",
    color: "#f5c9cc",
    hints: [
      "מנהיגה פוליטית מהמאה ה-20",
      "ראש ממשלת ישראל הרביעי",
      "האישה הראשונה שכיהנה בתפקיד זה בישראל",
      "כונתה 'סבתא של האומה'",
    ],
    options: ["גולדה מאיר", "שרה נתניהו", "תמר גוז'נסקי", "שולמית אלוני"],
  },
  {
    name: "לאונרדו דה וינצ'י",
    emoji: "🎨",
    color: "#f7d96b",
    hints: [
      "חי באיטליה בתקופת הרנסנס",
      "צייר, ממציא, מהנדס ומדען",
      "צייר את 'הסעודה האחרונה'",
      "יצר את הציור 'מונה ליזה'",
    ],
    options: [
      "מיכלאנג'לו",
      "רפאל",
      "לאונרדו דה וינצ'י",
      "ואן גוך",
    ],
  },
  {
    name: "דוד בן-גוריון",
    emoji: "👴",
    color: "#b6d9b8",
    hints: [
      "נולד בפולין ב-1886",
      "עלה לארץ ישראל בגיל 20",
      "ראש הממשלה הראשון של ישראל",
      "הכריז על הקמת מדינת ישראל ב-14 במאי 1948",
    ],
    options: ["משה שרת", "לוי אשכול", "מנחם בגין", "דוד בן-גוריון"],
  },
];

const MAX_HINTS = 4;

function pickChar(): Character {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}

export default function WhoAmIGame({ onExit }: Props) {
  const [char, setChar] = useState<Character | null>(null);
  const [revealedHints, setRevealedHints] = useState(1); // start with 1 hint
  const [selected, setSelected] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;

  const reset = useCallback(() => {
    setChar(pickChar());
    setRevealedHints(1);
    setSelected(null);
    setWon(false);
    setLost(false);
    setAttempts(0);
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  if (!char) return null;

  function revealHint() {
    setRevealedHints((r) => Math.min(MAX_HINTS, r + 1));
  }

  function guess(name: string) {
    if (won || lost) return;
    setSelected(name);
    if (name === char!.name) {
      setWon(true);
    } else {
      setAttempts((a) => {
        const n = a + 1;
        if (n >= MAX_ATTEMPTS) setLost(true);
        return n;
      });
      setTimeout(() => setSelected(null), 600);
    }
  }

  // Pixelation level is based on hints revealed — more hints = less blur
  const blurPx = Math.max(0, 16 - revealedHints * 4);

  return (
    <GameShell
      title="מי אני?"
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
          emoji="🔎"
          title="מי אני?"
          subtitle="דמות מפורסמת מוסתרת מאחורי פיקסלים ורמזים. עם כל רמז, התמונה מתחדדת. יש לכם 3 ניסיונות לזהות את הדמות."
        >
          <PrimaryButton onClick={() => setShowIntro(false)}>בואו נתחיל</PrimaryButton>
        </GameOverlay>
      )}

      {!showIntro && (
        <>
          {/* Pixelated "portrait" — CSS blur on a large emoji in an accent square */}
          <div
            className="w-full max-w-[320px] aspect-square rounded-[12px] flex items-center justify-center overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            style={{ backgroundColor: won ? char.color : "#ececf0" }}
          >
            <div
              className="text-[180px] sm:text-[220px] leading-none select-none transition-all duration-500"
              style={{
                filter: won ? "none" : `blur(${blurPx}px)`,
                transform: won ? "scale(1)" : "scale(1.1)",
              }}
              aria-hidden="true"
            >
              {char.emoji}
            </div>
          </div>

          {/* Hints */}
          <div className="w-full flex flex-col gap-2">
            {char.hints.slice(0, revealedHints).map((h, i) => (
              <div
                key={i}
                className="bg-white rounded-[6px] p-3 text-[14px] sm:text-[15px] text-[#2d2d2d] text-right shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                dir="rtl"
              >
                <span className="font-bold text-[#737373] ml-2">רמז {i + 1}:</span>
                {h}
              </div>
            ))}
            {revealedHints < MAX_HINTS && !won && !lost && (
              <SecondaryButton onClick={revealHint} fullWidth>
                חשוף רמז נוסף ({MAX_HINTS - revealedHints} נותרו)
              </SecondaryButton>
            )}
          </div>

          {/* Options */}
          {!won && !lost && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {char.options.map((opt) => {
                const isSelected = selected === opt;
                const isCorrect = opt === char.name;
                return (
                  <button
                    key={opt}
                    onClick={() => guess(opt)}
                    disabled={won || lost}
                    className={
                      "min-h-[48px] rounded-[6px] text-[14px] sm:text-[16px] font-bold transition-all active:scale-[0.98] px-3 " +
                      (isSelected
                        ? isCorrect
                          ? "bg-[#22a06b] text-white"
                          : "bg-[#d4183d] text-white wm-shake"
                        : "bg-white text-[#2d2d2d] hover:bg-[#ececf0] shadow-[0_1px_2px_rgba(0,0,0,0.06)]")
                    }
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {(won || lost) && (
            <GameOverlay
              emoji={won ? "🎉" : "😕"}
              title={won ? "כל הכבוד!" : `הדמות הייתה: ${char.name}`}
              subtitle={won ? `זיהיתם את ${char.name} ב-${attempts + 1} ניסיונות` : undefined}
            >
              <PrimaryButton onClick={reset}>דמות חדשה</PrimaryButton>
              <SecondaryButton onClick={onExit}>חזרה למשחקים</SecondaryButton>
            </GameOverlay>
          )}

          <style>{`
            @keyframes wm-shake {
              0%, 100% { transform: translateX(0); }
              20% { transform: translateX(-4px); }
              40% { transform: translateX(4px); }
              60% { transform: translateX(-3px); }
              80% { transform: translateX(3px); }
            }
            .wm-shake { animation: wm-shake 0.4s ease-in-out; }
          `}</style>
        </>
      )}
    </GameShell>
  );
}

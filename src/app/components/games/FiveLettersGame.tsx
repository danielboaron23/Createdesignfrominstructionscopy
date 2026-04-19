import { useCallback, useEffect, useState } from "react";
import GameShell, { GameOverlay, PrimaryButton, SecondaryButton, StatPill } from "./GameShell";

type Props = { onExit: () => void };

// 5-letter Hebrew words (simple/common nouns). Letters counted by character.
const WORDS = [
  "גבורה",
  "סביבה",
  "עבודה",
  "אמונה",
  "משפחה",
  "הצלחה",
  "שעמום",
  "מקצוע",
  "תוצאה",
  "תקווה",
  "קבוצה",
  "מסורת",
  "בחירה",
  "הגדרה",
  "מנהיג",
  "תחרות",
  "משחקי",
  "מערבה",
  "ירושה",
  "תפריט",
];

const WORD_LEN = 5;
const MAX_GUESSES = 6;

type LetterStatus = "correct" | "present" | "absent" | "empty" | "pending";

// Hebrew alphabet for on-screen keyboard (RTL order top→bottom, right→left on screen)
const KEYBOARD_ROWS = [
  ["פ", "ם", "ן", "ו", "ט", "א", "ר", "ק"],
  ["ף", "ך", "ל", "ח", "י", "ע", "כ", "ג", "ד", "ש"],
  ["ץ", "ת", "צ", "מ", "נ", "ה", "ב", "ס", "ז"],
];

function pickDaily(): string {
  const idx = Math.floor(Math.random() * WORDS.length);
  return WORDS[idx];
}

function evaluateGuess(guess: string, target: string): LetterStatus[] {
  const result: LetterStatus[] = Array(WORD_LEN).fill("absent");
  const targetArr = target.split("");
  // 1. Mark exact matches
  for (let i = 0; i < WORD_LEN; i++) {
    if (guess[i] === targetArr[i]) {
      result[i] = "correct";
      targetArr[i] = ""; // consume
    }
  }
  // 2. Mark present (wrong position)
  for (let i = 0; i < WORD_LEN; i++) {
    if (result[i] !== "correct" && guess[i]) {
      const idx = targetArr.indexOf(guess[i]);
      if (idx !== -1) {
        result[i] = "present";
        targetArr[idx] = "";
      }
    }
  }
  return result;
}

export default function FiveLettersGame({ onExit }: Props) {
  const [target, setTarget] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState<string>("");
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [shakeRow, setShakeRow] = useState(false);
  const [keyStatus, setKeyStatus] = useState<Record<string, LetterStatus>>({});
  const [showIntro, setShowIntro] = useState(true);

  const resetGame = useCallback(() => {
    setTarget(pickDaily());
    setGuesses([]);
    setCurrent("");
    setWon(false);
    setLost(false);
    setKeyStatus({});
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const submitGuess = useCallback(() => {
    if (won || lost) return;
    if (current.length !== WORD_LEN) {
      setShakeRow(true);
      setTimeout(() => setShakeRow(false), 400);
      return;
    }
    const newGuesses = [...guesses, current];
    const statuses = evaluateGuess(current, target);
    // Update keyboard status (keep best status)
    setKeyStatus((prev) => {
      const next = { ...prev };
      current.split("").forEach((letter, i) => {
        const s = statuses[i];
        const existing = next[letter];
        if (s === "correct" || !existing || (s === "present" && existing === "absent")) {
          next[letter] = s;
        }
      });
      return next;
    });
    setGuesses(newGuesses);
    setCurrent("");
    if (current === target) {
      setWon(true);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setLost(true);
    }
  }, [current, guesses, target, won, lost]);

  const onKey = useCallback(
    (key: string) => {
      if (won || lost || showIntro) return;
      if (key === "ENTER") {
        submitGuess();
      } else if (key === "BACK") {
        setCurrent((c) => c.slice(0, -1));
      } else if (current.length < WORD_LEN) {
        setCurrent((c) => c + key);
      }
    },
    [current, won, lost, showIntro, submitGuess],
  );

  // Physical keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showIntro) return;
      if (e.key === "Enter") onKey("ENTER");
      else if (e.key === "Backspace") onKey("BACK");
      else if (/^[\u0590-\u05FF]$/.test(e.key)) onKey(e.key);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onKey, showIntro]);

  return (
    <GameShell
      title="5 אותיות"
      onExit={onExit}
      rightSlot={
        <div className="flex items-center gap-1.5">
          <StatPill label="ניחוש" value={`${guesses.length}/${MAX_GUESSES}`} />
        </div>
      }
    >
      {showIntro && (
        <GameOverlay
          emoji="📝"
          title="5 אותיות"
          subtitle="נחשו את המילה בת חמש האותיות בשישה ניסיונות. אחרי כל ניחוש, האותיות יסומנו: ירוק — במיקום הנכון, צהוב — במילה אך במיקום אחר, אפור — לא במילה."
        >
          <PrimaryButton onClick={() => setShowIntro(false)}>בואו נתחיל</PrimaryButton>
        </GameOverlay>
      )}

      {!showIntro && (
        <>
          {/* Board */}
          <div className="flex flex-col gap-[6px] sm:gap-[8px]" style={{ direction: "ltr" }}>
            {Array.from({ length: MAX_GUESSES }).map((_, rowIdx) => {
              const guess = guesses[rowIdx];
              const isCurrent = rowIdx === guesses.length && !won && !lost;
              const statuses = guess ? evaluateGuess(guess, target) : null;
              const letters = (guess ?? (isCurrent ? current : "")).padEnd(WORD_LEN, " ").split("");
              return (
                <div
                  key={rowIdx}
                  className={"flex gap-[6px] sm:gap-[8px] " + (isCurrent && shakeRow ? "fl-shake" : "")}
                >
                  {letters.map((ch, colIdx) => {
                    const status = statuses ? statuses[colIdx] : "empty";
                    return (
                      <div
                        key={colIdx}
                        className={
                          "w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[60px] md:h-[60px] rounded-[6px] flex items-center justify-center text-[24px] sm:text-[28px] font-bold transition-all " +
                          statusClass(status, ch.trim() !== "")
                        }
                        style={{ direction: "ltr" }}
                      >
                        <span style={{ direction: "rtl" }}>{ch.trim()}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Keyboard */}
          <div className="w-full flex flex-col gap-1.5 sm:gap-2 mt-2">
            {KEYBOARD_ROWS.map((row, idx) => (
              <div key={idx} className="flex justify-center gap-[4px] sm:gap-[6px]" dir="rtl">
                {idx === 0 && (
                  <KeyButton onClick={() => onKey("ENTER")} wide disabled={won || lost}>
                    שלח
                  </KeyButton>
                )}
                {row.map((k) => (
                  <KeyButton
                    key={k}
                    onClick={() => onKey(k)}
                    status={keyStatus[k]}
                    disabled={won || lost}
                  >
                    {k}
                  </KeyButton>
                ))}
                {idx === 2 && (
                  <KeyButton onClick={() => onKey("BACK")} wide disabled={won || lost}>
                    ←
                  </KeyButton>
                )}
              </div>
            ))}
          </div>

          {(won || lost) && (
            <GameOverlay
              emoji={won ? "🎉" : "😕"}
              title={won ? "כל הכבוד!" : "המילה הייתה:"}
              subtitle={won ? `מצאתם את המילה "${target}" ב-${guesses.length} ניסיונות` : `"${target}"`}
            >
              <PrimaryButton onClick={resetGame}>משחק חדש</PrimaryButton>
              <SecondaryButton onClick={onExit}>חזרה למשחקים</SecondaryButton>
            </GameOverlay>
          )}

          <style>{`
            @keyframes fl-shake {
              0%, 100% { transform: translateX(0); }
              20% { transform: translateX(-6px); }
              40% { transform: translateX(6px); }
              60% { transform: translateX(-4px); }
              80% { transform: translateX(4px); }
            }
            .fl-shake { animation: fl-shake 0.4s ease-in-out; }
          `}</style>
        </>
      )}
    </GameShell>
  );
}

function statusClass(status: LetterStatus, hasLetter: boolean): string {
  switch (status) {
    case "correct":
      return "bg-[#22a06b] text-white border-2 border-[#22a06b]";
    case "present":
      return "bg-[#e9a937] text-white border-2 border-[#e9a937]";
    case "absent":
      return "bg-[#5b5b5b] text-white border-2 border-[#5b5b5b]";
    default:
      return hasLetter
        ? "bg-white text-[#2d2d2d] border-2 border-[#737373]"
        : "bg-white text-[#2d2d2d] border-2 border-[#e5e5e5]";
  }
}

function KeyButton({
  children,
  onClick,
  status,
  wide,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  status?: LetterStatus;
  wide?: boolean;
  disabled?: boolean;
}) {
  let bg = "bg-white text-[#2d2d2d] hover:bg-[#ececf0]";
  if (status === "correct") bg = "bg-[#22a06b] text-white";
  else if (status === "present") bg = "bg-[#e9a937] text-white";
  else if (status === "absent") bg = "bg-[#5b5b5b] text-white";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        "min-h-[44px] sm:min-h-[48px] rounded-[6px] text-[16px] sm:text-[18px] font-bold transition-all active:scale-[0.94] " +
        (wide ? "px-3 sm:px-4 min-w-[56px] text-[13px] sm:text-[14px]" : "w-[28px] sm:w-[32px] md:w-[36px]") +
        " " +
        bg +
        " shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
      }
    >
      {children}
    </button>
  );
}

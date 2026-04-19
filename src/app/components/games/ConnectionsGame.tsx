import { useCallback, useEffect, useMemo, useState } from "react";
import GameShell, { GameOverlay, PrimaryButton, SecondaryButton, StatPill } from "./GameShell";

type Props = { onExit: () => void };

type Group = {
  theme: string;
  color: string; // background
  textColor: string;
  words: string[]; // 4 words
};

// One daily puzzle: 4 groups × 4 words = 16 words total.
const PUZZLE: Group[] = [
  {
    theme: "פירות",
    color: "#f7d96b",
    textColor: "#3a2f00",
    words: ["תפוח", "בננה", "אגס", "ענבים"],
  },
  {
    theme: "ערים בישראל",
    color: "#b6d9b8",
    textColor: "#1a3a1a",
    words: ["חיפה", "אילת", "נתניה", "חולון"],
  },
  {
    theme: "ספורט",
    color: "#bfd4f9",
    textColor: "#1a3a7a",
    words: ["כדורגל", "שחייה", "רכיבה", "ריצה"],
  },
  {
    theme: "כלי נגינה",
    color: "#f5c9cc",
    textColor: "#3a1a1f",
    words: ["גיטרה", "תוף", "חליל", "פסנתר"],
  },
];

const MAX_MISTAKES = 4;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ConnectionsGame({ onExit }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [solved, setSolved] = useState<Group[]>([]);
  const [remaining, setRemaining] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [shake, setShake] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const allWords = useMemo(() => PUZZLE.flatMap((g) => g.words), []);

  const reset = useCallback(() => {
    setSelected(new Set());
    setSolved([]);
    setRemaining(shuffle(allWords));
    setMistakes(0);
    setWon(false);
    setLost(false);
  }, [allWords]);

  useEffect(() => {
    reset();
  }, [reset]);

  function toggleWord(word: string) {
    if (won || lost) return;
    const next = new Set(selected);
    if (next.has(word)) next.delete(word);
    else if (next.size < 4) next.add(word);
    setSelected(next);
  }

  function shuffleRemaining() {
    setRemaining((r) => shuffle(r));
  }

  function submit() {
    if (selected.size !== 4 || won || lost) return;
    const selectedArr = Array.from(selected);
    const matchGroup = PUZZLE.find((g) => selectedArr.every((w) => g.words.includes(w)));
    if (matchGroup && !solved.find((s) => s.theme === matchGroup.theme)) {
      // Correct!
      const newSolved = [...solved, matchGroup];
      setSolved(newSolved);
      setRemaining((r) => r.filter((w) => !selected.has(w)));
      setSelected(new Set());
      if (newSolved.length === PUZZLE.length) setWon(true);
    } else {
      // Wrong
      setShake(true);
      setTimeout(() => setShake(false), 450);
      setMistakes((m) => {
        const nm = m + 1;
        if (nm >= MAX_MISTAKES) setLost(true);
        return nm;
      });
    }
  }

  function deselect() {
    setSelected(new Set());
  }

  return (
    <GameShell
      title="מה הקשר"
      onExit={onExit}
      rightSlot={
        <StatPill
          label="טעויות"
          value={`${mistakes}/${MAX_MISTAKES}`}
          highlight={mistakes > 0 ? "#d4183d" : undefined}
        />
      }
    >
      {showIntro && (
        <GameOverlay
          emoji="🧩"
          title="מה הקשר"
          subtitle="מצאו ארבע קבוצות של ארבע מילים הקשורות ביניהן. לחצו על ארבע מילים ואז על 'שלח'. יש לכם עד 4 טעויות."
        >
          <PrimaryButton onClick={() => setShowIntro(false)}>בואו נתחיל</PrimaryButton>
        </GameOverlay>
      )}

      {!showIntro && (
        <>
          {/* Solved groups — displayed at the top */}
          {solved.length > 0 && (
            <div className="w-full flex flex-col gap-2 sm:gap-3 mb-1">
              {solved.map((g) => (
                <div
                  key={g.theme}
                  className="rounded-[8px] p-3 sm:p-4 text-center"
                  style={{ backgroundColor: g.color, color: g.textColor }}
                >
                  <div className="font-bold text-[14px] sm:text-[15px] uppercase tracking-wide">
                    {g.theme}
                  </div>
                  <div className="text-[15px] sm:text-[16px] font-bold mt-0.5">
                    {g.words.join(" · ")}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Remaining grid */}
          <div
            className={"w-full grid grid-cols-4 gap-1.5 sm:gap-2 " + (shake ? "cn-shake" : "")}
            role="group"
            aria-label="מילים"
          >
            {remaining.map((word) => {
              const isSelected = selected.has(word);
              return (
                <button
                  key={word}
                  onClick={() => toggleWord(word)}
                  disabled={won || lost}
                  className={
                    "aspect-[3/2] sm:aspect-auto sm:h-[72px] rounded-[6px] px-1 text-[13px] sm:text-[15px] md:text-[17px] font-bold transition-all active:scale-[0.96] " +
                    (isSelected
                      ? "bg-[#2d2d2d] text-white shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                      : "bg-white text-[#2d2d2d] hover:bg-[#ececf0] shadow-[0_1px_2px_rgba(0,0,0,0.06)]")
                  }
                >
                  {word}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="w-full flex gap-2 justify-center flex-wrap mt-1">
            <SecondaryButton onClick={shuffleRemaining} disabled={won || lost}>
              ערבב
            </SecondaryButton>
            <SecondaryButton onClick={deselect} disabled={selected.size === 0}>
              נקה
            </SecondaryButton>
            <PrimaryButton onClick={submit} disabled={selected.size !== 4}>
              שלח
            </PrimaryButton>
          </div>

          {(won || lost) && (
            <GameOverlay
              emoji={won ? "🎉" : "😕"}
              title={won ? "כל הכבוד!" : "הגעתם ל-4 טעויות"}
              subtitle={
                won
                  ? `פתרתם את כל הקבוצות${mistakes === 0 ? " ללא טעויות!" : "!"}`
                  : "הפתרונות הוצגו למעלה."
              }
            >
              <PrimaryButton onClick={reset}>משחק חדש</PrimaryButton>
              <SecondaryButton onClick={onExit}>חזרה למשחקים</SecondaryButton>
            </GameOverlay>
          )}

          <style>{`
            @keyframes cn-shake {
              0%, 100% { transform: translateX(0); }
              20% { transform: translateX(-5px); }
              40% { transform: translateX(5px); }
              60% { transform: translateX(-4px); }
              80% { transform: translateX(4px); }
            }
            .cn-shake { animation: cn-shake 0.45s ease-in-out; }
          `}</style>
        </>
      )}

      {/* When lost, reveal all remaining groups so user can see them */}
      {lost && remaining.length > 0 && (
        <div className="w-full flex flex-col gap-2 sm:gap-3 mt-2">
          {PUZZLE.filter((g) => !solved.find((s) => s.theme === g.theme)).map((g) => (
            <div
              key={g.theme}
              className="rounded-[8px] p-3 sm:p-4 text-center opacity-80"
              style={{ backgroundColor: g.color, color: g.textColor }}
            >
              <div className="font-bold text-[14px] sm:text-[15px] uppercase tracking-wide">
                {g.theme}
              </div>
              <div className="text-[15px] sm:text-[16px] font-bold mt-0.5">
                {g.words.join(" · ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </GameShell>
  );
}

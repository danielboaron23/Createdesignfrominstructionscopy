import { useCallback, useEffect, useState } from "react";
import GameShell, { GameOverlay, PrimaryButton, SecondaryButton, StatPill } from "./GameShell";

type Props = { onExit: () => void };

type Quote = {
  text: string;
  speaker: string;
  options: string[];
  context?: string;
};

const QUOTES: Quote[] = [
  {
    text: "אני מאמין שנצטרך עוד הרבה דם ודמעות בטרם נראה את השלום המיוחל.",
    speaker: "יצחק רבין",
    options: ["דוד בן-גוריון", "יצחק רבין", "מנחם בגין", "שמעון פרס"],
    context: "מתוך נאום לאחר חתימת הסכמי אוסלו",
  },
  {
    text: "לא הכול מותר לומר.",
    speaker: "אהוד ברק",
    options: ["בנימין נתניהו", "אהוד ברק", "יאיר לפיד", "אריאל שרון"],
  },
  {
    text: "אם תרצו אין זו אגדה.",
    speaker: "בנימין זאב הרצל",
    options: ["דוד בן-גוריון", "חיים ויצמן", "בנימין זאב הרצל", "זאב ז'בוטינסקי"],
    context: "מתוך הספר 'אלטנוילנד'",
  },
  {
    text: "אנחנו כאן כי תמיד היינו כאן, ותמיד נהיה כאן.",
    speaker: "גולדה מאיר",
    options: ["שולמית אלוני", "גולדה מאיר", "תמר גוז'נסקי", "דליה איציק"],
  },
  {
    text: "הגיע הזמן לשים סוף למצב הקיים.",
    speaker: "אריאל שרון",
    options: ["אהוד אולמרט", "אריאל שרון", "דן חלוץ", "שאול מופז"],
  },
  {
    text: "לקום בבוקר אחד ולהגיד: רבותי — מספיק.",
    speaker: "מנחם בגין",
    options: ["מנחם בגין", "יצחק שמיר", "יגאל אלון", "משה דיין"],
    context: "נאום במלחמת לבנון הראשונה",
  },
];

const MAX_ATTEMPTS = 3;

function pickQuote(excludeIdx?: number): { quote: Quote; idx: number } {
  let idx = Math.floor(Math.random() * QUOTES.length);
  if (excludeIdx !== undefined && QUOTES.length > 1) {
    while (idx === excludeIdx) idx = Math.floor(Math.random() * QUOTES.length);
  }
  return { quote: QUOTES[idx], idx };
}

export default function NotForQuotingGame({ onExit }: Props) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showContext, setShowContext] = useState(false);

  const reset = useCallback(() => {
    const picked = pickQuote(quoteIdx);
    setQuoteIdx(picked.idx);
    setSelected(null);
    setWon(false);
    setLost(false);
    setAttempts(0);
    setShowContext(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  const quote = QUOTES[quoteIdx];

  function guess(name: string) {
    if (won || lost) return;
    setSelected(name);
    if (name === quote.speaker) {
      setWon(true);
    } else {
      setAttempts((a) => {
        const n = a + 1;
        if (n >= MAX_ATTEMPTS) setLost(true);
        return n;
      });
      setTimeout(() => setSelected(null), 500);
    }
  }

  return (
    <GameShell
      title="לא לציטוט"
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
          emoji="💬"
          title="לא לציטוט"
          subtitle="נחשו מי אמר את המשפט המפורסם. יש לכם 3 ניסיונות. אפשר לבקש רמז הקשר."
        >
          <PrimaryButton onClick={() => setShowIntro(false)}>בואו נתחיל</PrimaryButton>
        </GameOverlay>
      )}

      {!showIntro && (
        <>
          {/* Quote card */}
          <div className="w-full bg-white rounded-[12px] p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] relative">
            <span
              className="absolute right-3 top-2 text-[64px] leading-none text-[#226ee9] opacity-30 select-none font-serif"
              aria-hidden="true"
            >
              "
            </span>
            <p
              className="text-[18px] sm:text-[20px] font-bold text-[#2d2d2d] text-right leading-relaxed pt-4"
              dir="rtl"
            >
              {quote.text}
            </p>

            {showContext && quote.context && (
              <p className="mt-4 text-[13px] text-[#737373] text-right italic" dir="rtl">
                {quote.context}
              </p>
            )}

            {!showContext && quote.context && !won && !lost && (
              <button
                onClick={() => setShowContext(true)}
                className="mt-4 text-[13px] text-[#226ee9] font-bold hover:underline"
              >
                הצג רמז הקשר
              </button>
            )}
          </div>

          {/* Options */}
          {!won && !lost && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {quote.options.map((opt) => {
                const isSelected = selected === opt;
                const isCorrect = opt === quote.speaker;
                return (
                  <button
                    key={opt}
                    onClick={() => guess(opt)}
                    disabled={won || lost}
                    className={
                      "min-h-[52px] rounded-[6px] text-[15px] sm:text-[16px] font-bold transition-all active:scale-[0.98] px-4 " +
                      (isSelected
                        ? isCorrect
                          ? "bg-[#22a06b] text-white"
                          : "bg-[#d4183d] text-white nq-shake"
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
              emoji={won ? "🎉" : "💭"}
              title={won ? "נכון!" : `הדובר/ת: ${quote.speaker}`}
              subtitle={won ? `זיהיתם את דבריו של ${quote.speaker}` : quote.context}
            >
              <PrimaryButton onClick={reset}>ציטוט חדש</PrimaryButton>
              <SecondaryButton onClick={onExit}>חזרה למשחקים</SecondaryButton>
            </GameOverlay>
          )}

          <style>{`
            @keyframes nq-shake {
              0%, 100% { transform: translateX(0); }
              20% { transform: translateX(-4px); }
              40% { transform: translateX(4px); }
              60% { transform: translateX(-3px); }
              80% { transform: translateX(3px); }
            }
            .nq-shake { animation: nq-shake 0.4s ease-in-out; }
          `}</style>
        </>
      )}
    </GameShell>
  );
}

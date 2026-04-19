import { useCallback, useEffect, useState } from "react";
import GameShell, { GameOverlay, PrimaryButton, SecondaryButton, StatPill } from "./GameShell";

type Props = { onExit: () => void };

type Song = {
  title: string;
  artist: string;
  /** Lyric lines revealed progressively */
  lyrics: string[];
  /** Multiple choice options (must include correct title) */
  options: string[];
};

const SONGS: Song[] = [
  {
    title: "יש לי חג",
    artist: "שלום חנוך",
    lyrics: [
      "יש לי חג ויש לי ימים של חול",
      "יש לי חלום ויש לי גם מציאות",
      "אני חולם על חופש ועל גן",
      "אני אמתין לך תמיד תחת הרקיע הכחול",
    ],
    options: ["יש לי חג", "רוח סתיו", "תמיד אוהב", "אם תרצי"],
  },
  {
    title: "חורף שבעים ושלוש",
    artist: "להקת הנח\"ל",
    lyrics: [
      "אנחנו הילדים של חורף שבעים ושלוש",
      "חלמתם אותנו לראשונה עם שחר",
      "בסוף הקרבות הייתם הורים עייפים",
      "ואנחנו גדלנו כשכול צף על פנינו",
    ],
    options: [
      "חורף שבעים ושלוש",
      "על ראש שמחתי",
      "שלום חבר",
      "שיר למעין",
    ],
  },
  {
    title: "מכתב לאחי",
    artist: "אריק איינשטיין",
    lyrics: [
      "אני יושב וכותב לך מכתב",
      "אחי הקטן שלי שאוהב",
      "מסתכל החוצה על הגשם היורד",
      "וחושב עליך באמת",
    ],
    options: ["אני ואתה", "מכתב לאחי", "עוף גוזל", "אהבתיה"],
  },
  {
    title: "שיר של יום חולין",
    artist: "להקת כוורת",
    lyrics: [
      "שיר של יום חולין",
      "בלי שום בושה",
      "אני לא שר על אהבה",
      "אני רק מבקש קצת מנוחה",
    ],
    options: [
      "שיר המכולת",
      "שיר של יום חולין",
      "יו יה",
      "נתתי לה חיי",
    ],
  },
];

const MAX_ATTEMPTS = 3;

function pickSong(): Song {
  return SONGS[Math.floor(Math.random() * SONGS.length)];
}

export default function WhichSongGame({ onExit }: Props) {
  const [song, setSong] = useState<Song | null>(null);
  const [revealed, setRevealed] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const reset = useCallback(() => {
    setSong(pickSong());
    setRevealed(1);
    setSelected(null);
    setWon(false);
    setLost(false);
    setAttempts(0);
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  if (!song) return null;

  function revealMore() {
    setRevealed((r) => Math.min(song!.lyrics.length, r + 1));
  }

  function guess(opt: string) {
    if (won || lost) return;
    setSelected(opt);
    if (opt === song!.title) {
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
      title="איזה שיר?"
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
          emoji="🎵"
          title="איזה שיר?"
          subtitle="קראו את השורה המוצגת ונחשו איזה שיר לפניכם. אם קשה — חשפו שורה נוספת. יש לכם 3 ניסיונות."
        >
          <PrimaryButton onClick={() => setShowIntro(false)}>בואו נתחיל</PrimaryButton>
        </GameOverlay>
      )}

      {!showIntro && (
        <>
          {/* Lyrics card */}
          <div className="w-full bg-white rounded-[12px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="text-[11px] text-[#737373] font-bold uppercase tracking-wide mb-3 text-right">
              מילים מתוך השיר
            </div>
            <div className="flex flex-col gap-2.5" dir="rtl">
              {song.lyrics.slice(0, revealed).map((line, i) => (
                <p
                  key={i}
                  className="text-[16px] sm:text-[18px] text-[#2d2d2d] text-right leading-relaxed font-bold"
                >
                  "{line}"
                </p>
              ))}
              {revealed < song.lyrics.length && (
                <button
                  onClick={revealMore}
                  disabled={won || lost}
                  className="mt-2 text-[13px] text-[#226ee9] font-bold hover:underline self-end"
                >
                  חשוף שורה נוספת ({song.lyrics.length - revealed} נותרו)
                </button>
              )}
            </div>
          </div>

          {/* Options */}
          {!won && !lost && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {song.options.map((opt) => {
                const isSelected = selected === opt;
                const isCorrect = opt === song.title;
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
                          : "bg-[#d4183d] text-white ws-shake"
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
              emoji={won ? "🎉" : "🎵"}
              title={won ? "יפה מאוד!" : `השיר היה: "${song.title}"`}
              subtitle={`${won ? "זיהיתם את" : ""} השיר של ${song.artist}`}
            >
              <PrimaryButton onClick={reset}>שיר חדש</PrimaryButton>
              <SecondaryButton onClick={onExit}>חזרה למשחקים</SecondaryButton>
            </GameOverlay>
          )}

          <style>{`
            @keyframes ws-shake {
              0%, 100% { transform: translateX(0); }
              20% { transform: translateX(-4px); }
              40% { transform: translateX(4px); }
              60% { transform: translateX(-3px); }
              80% { transform: translateX(3px); }
            }
            .ws-shake { animation: ws-shake 0.4s ease-in-out; }
          `}</style>
        </>
      )}
    </GameShell>
  );
}

import { useCallback, useEffect, useMemo, useState } from "react";
import GameShell, { GameOverlay, PrimaryButton, SecondaryButton, StatPill } from "./GameShell";

type Props = { onExit: () => void };

type Difficulty = "easy" | "medium" | "hard";

/**
 * Cover Story — a 3×3 Nonogram-style puzzle.
 * The player fills cells based on the number clues on each row and column,
 * which indicate how many cells in that row/column should be filled.
 * The goal is to find the hidden pattern with as few moves as possible.
 */

type Puzzle = {
  /** The target solution (1 = filled, 0 = empty) */
  solution: number[][];
  rowCounts: number[];
  colCounts: number[];
};

// Pre-defined 3x3 solutions per difficulty, chosen to be satisfyingly solvable.
const PUZZLES: Record<Difficulty, number[][][]> = {
  easy: [
    [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1],
    ], // X pattern
    [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ], // T
  ],
  medium: [
    [
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
    ], // H
    [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ], // Frame
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ], // Plus
  ],
  hard: [
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ], // Diagonal
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ], // Z
    [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ], // Corners
  ],
};

function buildPuzzle(difficulty: Difficulty): Puzzle {
  const pool = PUZZLES[difficulty];
  const solution = pool[Math.floor(Math.random() * pool.length)];
  const rowCounts = solution.map((row) => row.reduce((a, b) => a + b, 0));
  const colCounts = [0, 0, 0].map((_, c) => solution.reduce((sum, row) => sum + row[c], 0));
  return { solution, rowCounts, colCounts };
}

function emptyBoard(): number[][] {
  return [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "קל",
  medium: "בינוני",
  hard: "קשה",
};

export default function CoverStoryGame({ onExit }: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [board, setBoard] = useState<number[][]>(emptyBoard());
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const newGame = useCallback((d: Difficulty) => {
    setDifficulty(d);
    setPuzzle(buildPuzzle(d));
    setBoard(emptyBoard());
    setMoves(0);
    setWon(false);
  }, []);

  useEffect(() => {
    newGame("easy");
  }, [newGame]);

  // Check win: board === solution
  useEffect(() => {
    if (!puzzle || won) return;
    const match = board.every((row, r) => row.every((v, c) => v === puzzle.solution[r][c]));
    if (match && moves > 0) setWon(true);
  }, [board, puzzle, moves, won]);

  function toggle(r: number, c: number) {
    if (won) return;
    setBoard((prev) => {
      const next = prev.map((row) => row.slice());
      next[r][c] = next[r][c] ? 0 : 1;
      return next;
    });
    setMoves((m) => m + 1);
  }

  // Live row / col count feedback
  const currentRowCounts = useMemo(() => board.map((r) => r.reduce((a, b) => a + b, 0)), [board]);
  const currentColCounts = useMemo(
    () => [0, 1, 2].map((c) => board.reduce((sum, row) => sum + row[c], 0)),
    [board],
  );

  if (!puzzle) return null;

  return (
    <GameShell
      title="סיפור כיסוי"
      onExit={onExit}
      rightSlot={<StatPill label="מהלכים" value={String(moves)} />}
    >
      {showIntro && (
        <GameOverlay
          emoji="🎯"
          title="סיפור כיסוי"
          subtitle="מלאו את הלוח 3×3 כך שמספר התאים המלאים בכל שורה ועמודה יתאים למספרים המופיעים. לחיצה על תא מסמנת/מבטלת אותו."
        >
          <PrimaryButton onClick={() => setShowIntro(false)}>בואו נתחיל</PrimaryButton>
        </GameOverlay>
      )}

      {!showIntro && (
        <>
          {/* Difficulty selector */}
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-1.5" role="tablist" aria-label="רמת קושי">
              {(Object.keys(DIFFICULTY_LABELS) as Difficulty[]).map((d) => (
                <button
                  key={d}
                  role="tab"
                  aria-selected={difficulty === d}
                  onClick={() => newGame(d)}
                  className={
                    "min-h-[40px] px-4 rounded-[6px] text-[14px] font-bold transition-all " +
                    (difficulty === d
                      ? "bg-[#2d2d2d] text-white"
                      : "bg-white text-[#2d2d2d] border border-[#e5e5e5] hover:bg-[#ececf0]")
                  }
                >
                  {DIFFICULTY_LABELS[d]}
                </button>
              ))}
            </div>
            <SecondaryButton onClick={() => newGame(difficulty)}>משחק חדש</SecondaryButton>
          </div>

          {/* Board with row/col clues. Layout:
                 [empty] [col0 clue] [col1 clue] [col2 clue]
                 [row0 clue] [cell] [cell] [cell]
                 ...
          */}
          <div className="bg-white rounded-[12px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]" style={{ direction: "ltr" }}>
            <div className="grid grid-cols-[auto_auto_auto_auto] gap-2 sm:gap-3">
              {/* Empty corner */}
              <div />
              {/* Column clues */}
              {puzzle.colCounts.map((count, c) => (
                <ClueBadge
                  key={"col" + c}
                  count={count}
                  current={currentColCounts[c]}
                />
              ))}
              {puzzle.solution.map((_, r) => (
                <>
                  <ClueBadge
                    key={"row" + r}
                    count={puzzle.rowCounts[r]}
                    current={currentRowCounts[r]}
                  />
                  {[0, 1, 2].map((c) => {
                    const filled = board[r][c] === 1;
                    return (
                      <button
                        key={`cell-${r}-${c}`}
                        onClick={() => toggle(r, c)}
                        disabled={won}
                        className={
                          "w-[56px] h-[56px] sm:w-[72px] sm:h-[72px] rounded-[6px] transition-all active:scale-[0.94] " +
                          (filled
                            ? "bg-[#2d2d2d] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                            : "bg-[#ececf0] hover:bg-[#dcdfe4] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]")
                        }
                        aria-label={`תא ${r + 1},${c + 1}${filled ? " מלא" : " ריק"}`}
                      />
                    );
                  })}
                </>
              ))}
            </div>
          </div>

          <p className="text-[13px] text-[#737373] text-center max-w-[400px]" dir="rtl">
            המספר הכחול מציין כמה תאים צריכים להיות מלאים בשורה/עמודה. כאשר המספר הופך לירוק — הגעתם לספירה הנכונה.
          </p>

          {won && (
            <GameOverlay
              emoji="🎉"
              title="מצוין!"
              subtitle={`פתרתם את החידה ברמה ${DIFFICULTY_LABELS[difficulty]} ב-${moves} מהלכים`}
            >
              <PrimaryButton onClick={() => newGame(difficulty)}>משחק חדש</PrimaryButton>
              <SecondaryButton onClick={onExit}>חזרה למשחקים</SecondaryButton>
            </GameOverlay>
          )}
        </>
      )}
    </GameShell>
  );
}

function ClueBadge({ count, current }: { count: number; current: number }) {
  const matched = current === count;
  const over = current > count;
  return (
    <div
      className={
        "w-[56px] h-[56px] sm:w-[72px] sm:h-[72px] rounded-[6px] flex items-center justify-center text-[20px] sm:text-[24px] font-bold transition-colors " +
        (matched
          ? "bg-[#22a06b] text-white"
          : over
          ? "bg-[#f5c9cc] text-[#d4183d]"
          : "bg-[#e8f0fe] text-[#226ee9]")
      }
    >
      {count}
    </div>
  );
}

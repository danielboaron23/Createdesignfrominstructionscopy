import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import {
  Board,
  Difficulty,
  cloneBoard,
  countDigit,
  findConflicts,
  generatePuzzle,
  isBoardComplete,
} from "./sudokuEngine";

type CellNotes = Set<number>;
type NotesGrid = CellNotes[][];

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "קל",
  medium: "בינוני",
  hard: "קשה",
};

const MAX_MISTAKES = 3;
const MAX_HINTS = 3;

function emptyNotes(): NotesGrid {
  return Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => new Set<number>()),
  );
}

function cloneNotes(n: NotesGrid): NotesGrid {
  return n.map((row) => row.map((s) => new Set(s)));
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

type HistoryEntry = {
  board: Board;
  notes: NotesGrid;
  mistakes: number;
};

type Props = {
  onExit: () => void;
};

export default function SudokuGame({ onExit }: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [generating, setGenerating] = useState(true);
  const [puzzle, setPuzzle] = useState<Board | null>(null);
  const [solution, setSolution] = useState<Board | null>(null);
  const [board, setBoard] = useState<Board | null>(null);
  const [notes, setNotes] = useState<NotesGrid>(emptyNotes());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [noteMode, setNoteMode] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [shake, setShake] = useState<string | null>(null);
  const confettiFiredRef = useRef(false);

  const startNewGame = useCallback((d: Difficulty) => {
    setGenerating(true);
    setDifficulty(d);
    setSelected(null);
    setMistakes(0);
    setHintsUsed(0);
    setElapsed(0);
    setPaused(false);
    setWon(false);
    setLost(false);
    setNoteMode(false);
    setHistory([]);
    setNotes(emptyNotes());
    confettiFiredRef.current = false;
    setTimeout(() => {
      const { puzzle: p, solution: s } = generatePuzzle(d);
      setPuzzle(p);
      setSolution(s);
      setBoard(cloneBoard(p));
      setGenerating(false);
    }, 20);
  }, []);

  useEffect(() => {
    startNewGame("easy");
  }, [startNewGame]);

  useEffect(() => {
    if (generating || paused || won || lost) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [generating, paused, won, lost]);

  useEffect(() => {
    if (!board || !solution) return;
    if (isBoardComplete(board) && findConflicts(board).size === 0) {
      setWon(true);
      if (!confettiFiredRef.current) {
        confettiFiredRef.current = true;
        const fire = (particleRatio: number, opts: confetti.Options) =>
          confetti({
            origin: { y: 0.6 },
            particleCount: Math.floor(200 * particleRatio),
            ...opts,
          });
        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      }
    }
  }, [board, solution]);

  const conflicts = useMemo(() => (board ? findConflicts(board) : new Set<string>()), [board]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!board || won || lost || paused || generating) return;
      if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const [r, c] = selected ?? [0, 0];
        let nr = r;
        let nc = c;
        if (e.key === "ArrowUp") nr = Math.max(0, r - 1);
        if (e.key === "ArrowDown") nr = Math.min(8, r + 1);
        if (e.key === "ArrowLeft") nc = Math.min(8, c + 1);
        if (e.key === "ArrowRight") nc = Math.max(0, c - 1);
        setSelected([nr, nc]);
        return;
      }
      if (e.key >= "1" && e.key <= "9") {
        inputNumber(parseInt(e.key, 10));
      } else if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        eraseCell();
      } else if (e.key.toLowerCase() === "n") {
        setNoteMode((m) => !m);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, board, noteMode, won, lost, paused, generating]);

  function pushHistory() {
    if (!board) return;
    setHistory((h) => [
      ...h.slice(-49),
      { board: cloneBoard(board), notes: cloneNotes(notes), mistakes },
    ]);
  }

  function triggerShake(key: string) {
    setShake(key);
    setTimeout(() => setShake(null), 380);
  }

  function inputNumber(num: number) {
    if (!selected || !board || !puzzle || !solution) return;
    const [r, c] = selected;
    if (puzzle[r][c] !== 0) return;

    if (noteMode) {
      pushHistory();
      setNotes((prev) => {
        const next = cloneNotes(prev);
        if (next[r][c].has(num)) next[r][c].delete(num);
        else next[r][c].add(num);
        return next;
      });
      return;
    }

    pushHistory();
    const isCorrect = solution[r][c] === num;
    const nextBoard = cloneBoard(board);
    nextBoard[r][c] = num;
    setBoard(nextBoard);

    setNotes((prev) => {
      const next = cloneNotes(prev);
      next[r][c].clear();
      if (isCorrect) {
        for (let i = 0; i < 9; i++) {
          next[r][i].delete(num);
          next[i][c].delete(num);
        }
        const br = Math.floor(r / 3) * 3;
        const bc = Math.floor(c / 3) * 3;
        for (let rr = br; rr < br + 3; rr++)
          for (let cc = bc; cc < bc + 3; cc++) next[rr][cc].delete(num);
      }
      return next;
    });

    if (!isCorrect) {
      triggerShake(`${r},${c}`);
      setMistakes((m) => {
        const nm = m + 1;
        if (nm >= MAX_MISTAKES) setLost(true);
        return nm;
      });
    }
  }

  function eraseCell() {
    if (!selected || !board || !puzzle) return;
    const [r, c] = selected;
    if (puzzle[r][c] !== 0) return;
    if (board[r][c] === 0 && notes[r][c].size === 0) return;
    pushHistory();
    if (board[r][c] !== 0) {
      const nb = cloneBoard(board);
      nb[r][c] = 0;
      setBoard(nb);
    }
    setNotes((prev) => {
      const next = cloneNotes(prev);
      next[r][c].clear();
      return next;
    });
  }

  function undo() {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setBoard(cloneBoard(last.board));
    setNotes(cloneNotes(last.notes));
    setMistakes(last.mistakes);
    setHistory((h) => h.slice(0, -1));
  }

  function useHint() {
    if (!selected || !board || !solution || !puzzle) return;
    if (hintsUsed >= MAX_HINTS) return;
    const [r, c] = selected;
    if (puzzle[r][c] !== 0 || board[r][c] === solution[r][c]) return;
    pushHistory();
    const nb = cloneBoard(board);
    nb[r][c] = solution[r][c];
    setBoard(nb);
    setHintsUsed((h) => h + 1);
    setNotes((prev) => {
      const next = cloneNotes(prev);
      next[r][c].clear();
      return next;
    });
  }

  const selectedValue = selected && board ? board[selected[0]][selected[1]] : 0;

  return (
    <div
      dir="rtl"
      className="min-h-dvh w-full bg-[#f3f3f3] flex flex-col items-center"
      style={{
        fontFamily: "'Open Sans Hebrew', 'Arial Hebrew', sans-serif",
        touchAction: "manipulation",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Header */}
      <header className="w-full bg-white border-b border-[#e5e5e5] sticky top-0 z-20">
        <div className="mx-auto w-full max-w-[1200px] flex items-center justify-between px-4 sm:px-6 lg:px-8 h-[56px] sm:h-[60px]">
          <button
            onClick={onExit}
            className="flex items-center gap-[6px] text-[#2d2d2d] text-[14px] font-bold hover:text-[#226ee9] transition-colors min-h-[44px] min-w-[44px] px-2 -mx-2"
            aria-label="חזרה לעמוד הבית"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[18px] sm:h-[18px]">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">חזרה למשחקים</span>
            <span className="sm:hidden">חזרה</span>
          </button>
          <div className="flex items-center gap-[8px] sm:gap-[10px]">
            <div className="bg-[#226ee9] h-[12px] w-[36px] sm:h-[16px] sm:w-[49px]" />
            <h1 className="text-[#2d2d2d] text-[22px] sm:text-[28px] font-bold leading-none">סודוקו</h1>
          </div>
        </div>
      </header>

      {/* Main play area */}
      <main className="w-full max-w-[600px] flex flex-col items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Difficulty selector + new game */}
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex gap-1.5 sm:gap-2" role="tablist" aria-label="רמת קושי">
            {(Object.keys(DIFFICULTY_LABELS) as Difficulty[]).map((d) => (
              <button
                key={d}
                role="tab"
                aria-selected={difficulty === d}
                onClick={() => startNewGame(d)}
                className={
                  "min-h-[44px] px-3 sm:px-4 rounded-[6px] text-[14px] font-bold transition-all " +
                  (difficulty === d
                    ? "bg-[#2d2d2d] text-white"
                    : "bg-white text-[#2d2d2d] hover:bg-[#ececf0] active:bg-[#ececf0] border border-[#e5e5e5]")
                }
              >
                {DIFFICULTY_LABELS[d]}
              </button>
            ))}
          </div>
          <button
            onClick={() => startNewGame(difficulty)}
            aria-label="משחק חדש"
            className="min-h-[44px] min-w-[44px] px-3 sm:px-4 bg-white text-[#2d2d2d] text-[14px] font-bold rounded-[6px] border border-[#e5e5e5] hover:bg-[#ececf0] active:bg-[#ececf0] transition-colors flex items-center gap-[6px]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 12a9 9 0 1 1-3.5-7.1M21 4v5h-5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">משחק חדש</span>
          </button>
        </div>

        {/* Stats bar — 2x2 on mobile, 4-col on larger */}
        <div className="w-full grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
          <Stat label="טעויות" value={`${mistakes}/${MAX_MISTAKES}`} highlight={mistakes > 0 ? "#d4183d" : undefined} />
          <Stat label="רמזים" value={`${hintsUsed}/${MAX_HINTS}`} />
          <Stat label="קושי" value={DIFFICULTY_LABELS[difficulty]} />
          <Stat label="זמן" value={formatTime(elapsed)} mono />
        </div>

        {/* Board — fluid square container */}
        <div className="relative w-full flex justify-center">
          {generating && <LoadingOverlay />}
          {paused && !generating && !won && !lost && <PausedOverlay onResume={() => setPaused(false)} />}
          {won && <WinOverlay time={formatTime(elapsed)} difficulty={DIFFICULTY_LABELS[difficulty]} onNew={() => startNewGame(difficulty)} onExit={onExit} />}
          {lost && <LostOverlay onRetry={() => startNewGame(difficulty)} onExit={onExit} />}
          {board && puzzle && (
            <SudokuBoard
              board={board}
              puzzle={puzzle}
              notes={notes}
              selected={selected}
              conflicts={conflicts}
              selectedValue={selectedValue}
              shake={shake}
              onSelect={(r, c) => setSelected([r, c])}
            />
          )}
        </div>

        {/* Controls */}
        <div className="w-full grid grid-cols-4 gap-1.5 sm:gap-2">
          <ControlButton
            label="בטל"
            disabled={history.length === 0 || won || lost}
            onClick={undo}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 14l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 10h9a5 5 0 0 1 0 10h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <ControlButton
            label="מחק"
            disabled={!selected || won || lost}
            onClick={eraseCell}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 13l6-6 9 9-6 6H6l-3-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M13 7l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          />
          <ControlButton
            label="רשימה"
            active={noteMode}
            disabled={won || lost}
            onClick={() => setNoteMode((m) => !m)}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 5h16M4 10h16M4 15h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M13 19l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <ControlButton
            label="רמז"
            badge={hintsUsed < MAX_HINTS ? String(MAX_HINTS - hintsUsed) : undefined}
            disabled={hintsUsed >= MAX_HINTS || !selected || won || lost}
            onClick={useHint}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M9 19h6M10 21h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          />
        </div>

        {/* Number pad */}
        <div className="w-full grid grid-cols-9 gap-[4px] sm:gap-[6px]" role="group" aria-label="מקלדת מספרים">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
            const count = board ? countDigit(board, n) : 0;
            const done = count >= 9;
            return (
              <button
                key={n}
                onClick={() => inputNumber(n)}
                disabled={done || won || lost}
                aria-label={`הכנס ${n}`}
                className={
                  "relative aspect-square min-h-[44px] rounded-[6px] text-[22px] sm:text-[26px] font-bold transition-all select-none " +
                  (done
                    ? "bg-[#ececf0] text-[#c4c4c4] cursor-not-allowed"
                    : "bg-white text-[#226ee9] hover:bg-[#e8f0fe] active:scale-[0.94] active:bg-[#d8e6fb] shadow-[0_1px_2px_rgba(0,0,0,0.06)]")
                }
              >
                {n}
                {!done && (
                  <span className="absolute bottom-[2px] left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-normal text-[#a3a3a3]">
                    {9 - count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Pause */}
        <button
          onClick={() => setPaused((p) => !p)}
          disabled={won || lost || generating}
          className="mt-1 min-h-[44px] px-5 bg-white text-[#2d2d2d] text-[14px] font-bold rounded-[6px] border border-[#e5e5e5] hover:bg-[#ececf0] active:bg-[#ececf0] transition-colors flex items-center gap-[6px] disabled:opacity-50"
        >
          {paused ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>המשך משחק</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
              <span>השהה</span>
            </>
          )}
        </button>

        <p className="text-[11px] sm:text-[12px] text-[#737373] mt-1 text-center hidden sm:block">
          טיפ: לחצו על תא ואז על מספר, או השתמשו במקלדת (1-9, Backspace, חצים, N למצב רשימה)
        </p>
      </main>

      <style>{`
        @keyframes sudoku-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }
        .sudoku-shake { animation: sudoku-shake 0.38s ease-in-out; }
        @keyframes sudoku-pop {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .sudoku-pop { animation: sudoku-pop 0.22s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .sudoku-shake, .sudoku-pop { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
  mono,
}: {
  label: string;
  value: string;
  highlight?: string;
  mono?: boolean;
}) {
  return (
    <div className="bg-white rounded-[8px] py-1.5 sm:py-2 px-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="text-[10px] sm:text-[11px] text-[#737373] font-normal leading-tight">{label}</div>
      <div
        className={"text-[15px] sm:text-[18px] font-bold leading-tight mt-0.5 " + (mono ? "tabular-nums" : "")}
        style={highlight ? { color: highlight } : undefined}
      >
        {value}
      </div>
    </div>
  );
}

function ControlButton({
  label,
  icon,
  onClick,
  disabled,
  active,
  badge,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        "relative min-h-[60px] sm:min-h-[64px] rounded-[8px] flex flex-col items-center justify-center gap-[2px] transition-all " +
        (disabled
          ? "bg-[#ececf0] text-[#c4c4c4] cursor-not-allowed"
          : active
          ? "bg-[#226ee9] text-white shadow-[0_2px_6px_rgba(34,110,233,0.35)]"
          : "bg-white text-[#2d2d2d] hover:bg-[#ececf0] shadow-[0_1px_2px_rgba(0,0,0,0.06)] active:scale-[0.96]")
      }
    >
      {icon}
      <span className="text-[11px] sm:text-[12px] font-bold">{label}</span>
      {badge && (
        <span className="absolute top-1 left-1 min-w-[18px] h-[18px] px-[5px] bg-[#226ee9] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

function SudokuBoard({
  board,
  puzzle,
  notes,
  selected,
  conflicts,
  selectedValue,
  shake,
  onSelect,
}: {
  board: Board;
  puzzle: Board;
  notes: NotesGrid;
  selected: [number, number] | null;
  conflicts: Set<string>;
  selectedValue: number;
  shake: string | null;
  onSelect: (r: number, c: number) => void;
}) {
  const [selR, selC] = selected ?? [-1, -1];

  return (
    <div
      className="relative bg-[#2d2d2d] p-[2px] sm:p-[3px] rounded-[6px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] w-full aspect-square max-w-[min(92vh,560px)]"
      style={{ direction: "ltr" }}
    >
      <div className="grid grid-cols-9 grid-rows-9 gap-0 bg-white overflow-hidden rounded-[3px] w-full h-full">
        {board.map((row, r) =>
          row.map((val, c) => {
            const key = `${r},${c}`;
            const prefilled = puzzle[r][c] !== 0;
            const isSelected = r === selR && c === selC;
            const inPeer =
              selected &&
              !isSelected &&
              (r === selR ||
                c === selC ||
                (Math.floor(r / 3) === Math.floor(selR / 3) && Math.floor(c / 3) === Math.floor(selC / 3)));
            const sameValue = !!selectedValue && val === selectedValue && !isSelected;
            const isConflict = conflicts.has(key);
            const cellNotes = notes[r][c];

            let bg = "bg-white";
            if (isSelected) bg = "bg-[#bcd6fa]";
            else if (sameValue) bg = "bg-[#d8e6fb]";
            else if (inPeer) bg = "bg-[#f0f4fa]";
            if (isConflict) bg = "bg-[#fde2e7]";

            const borderTop = r === 0 ? "" : r % 3 === 0 ? "border-t-[2px] border-t-[#2d2d2d]" : "border-t border-t-[#e5e5e5]";
            const borderLeft = c === 0 ? "" : c % 3 === 0 ? "border-l-[2px] border-l-[#2d2d2d]" : "border-l border-l-[#e5e5e5]";

            const textColor = isConflict
              ? "text-[#d4183d]"
              : prefilled
              ? "text-[#2d2d2d]"
              : "text-[#226ee9]";

            return (
              <button
                key={key}
                onClick={() => onSelect(r, c)}
                className={
                  "relative aspect-square w-full h-full " +
                  bg +
                  " " +
                  borderTop +
                  " " +
                  borderLeft +
                  " transition-colors duration-150 flex items-center justify-center " +
                  (shake === key ? "sudoku-shake" : "")
                }
                style={{ fontFamily: "'Open Sans Hebrew', sans-serif", touchAction: "manipulation" }}
                aria-label={`תא שורה ${r + 1} עמודה ${c + 1}${val ? `, ערך ${val}` : ""}`}
              >
                {val !== 0 ? (
                  <span
                    key={`v-${val}`}
                    className={
                      "text-[clamp(18px,5vw,28px)] font-bold select-none " +
                      textColor +
                      (!prefilled ? " sudoku-pop" : "")
                    }
                  >
                    {val}
                  </span>
                ) : cellNotes.size > 0 ? (
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0 p-[2px] sm:p-[3px]">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <span
                        key={n}
                        className="flex items-center justify-center text-[7px] sm:text-[10px] leading-none text-[#5b5b5b] font-normal"
                      >
                        {cellNotes.has(n) ? n : ""}
                      </span>
                    ))}
                  </div>
                ) : null}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-[6px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-[3px] border-[#e5e5e5] border-t-[#226ee9] rounded-full animate-spin" />
        <p className="text-[14px] text-[#5b5b5b] font-bold">מייצר לוח חדש...</p>
      </div>
    </div>
  );
}

function PausedOverlay({ onResume }: { onResume: () => void }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-[6px]">
      <div className="flex flex-col items-center gap-4">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#2d2d2d" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
        <p className="text-[18px] text-[#2d2d2d] font-bold">המשחק מושהה</p>
        <button
          onClick={onResume}
          className="min-h-[44px] px-6 bg-[#2d2d2d] text-white text-[14px] font-bold rounded-[6px] hover:bg-[#1a1a1a] transition-colors"
        >
          המשך
        </button>
      </div>
    </div>
  );
}

function WinOverlay({
  time,
  difficulty,
  onNew,
  onExit,
}: {
  time: string;
  difficulty: string;
  onNew: () => void;
  onExit: () => void;
}) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-[6px] p-4 sm:p-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="text-[56px] leading-none">🎉</div>
        <p className="text-[24px] sm:text-[28px] text-[#2d2d2d] font-bold">כל הכבוד!</p>
        <p className="text-[14px] sm:text-[16px] text-[#5b5b5b]">
          סיימתם סודוקו ברמה {difficulty} בזמן {time}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 mt-3 w-full sm:w-auto">
          <button
            onClick={onNew}
            className="min-h-[44px] px-6 bg-[#2d2d2d] text-white text-[14px] font-bold rounded-[6px] hover:bg-[#1a1a1a] transition-colors"
          >
            משחק חדש
          </button>
          <button
            onClick={onExit}
            className="min-h-[44px] px-6 bg-white text-[#2d2d2d] text-[14px] font-bold rounded-[6px] border border-[#e5e5e5] hover:bg-[#ececf0] transition-colors"
          >
            חזרה למשחקים
          </button>
        </div>
      </div>
    </div>
  );
}

function LostOverlay({ onRetry, onExit }: { onRetry: () => void; onExit: () => void }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-[6px] p-4 sm:p-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="text-[56px] leading-none">😕</div>
        <p className="text-[20px] sm:text-[24px] text-[#2d2d2d] font-bold">הגעתם לשלוש טעויות</p>
        <p className="text-[14px] sm:text-[15px] text-[#5b5b5b]">רוצים לנסות שוב?</p>
        <div className="flex flex-col sm:flex-row gap-2 mt-3 w-full sm:w-auto">
          <button
            onClick={onRetry}
            className="min-h-[44px] px-6 bg-[#2d2d2d] text-white text-[14px] font-bold rounded-[6px] hover:bg-[#1a1a1a] transition-colors"
          >
            משחק חדש
          </button>
          <button
            onClick={onExit}
            className="min-h-[44px] px-6 bg-white text-[#2d2d2d] text-[14px] font-bold rounded-[6px] border border-[#e5e5e5] hover:bg-[#ececf0] transition-colors"
          >
            חזרה למשחקים
          </button>
        </div>
      </div>
    </div>
  );
}

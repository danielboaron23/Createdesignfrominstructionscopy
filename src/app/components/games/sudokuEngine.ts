// Sudoku engine: generate, solve, validate.
// Boards use 0 for empty cells.

export type Board = number[][];
export type Difficulty = "easy" | "medium" | "hard";

const N = 9;
const BOX = 3;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function emptyBoard(): Board {
  return Array.from({ length: N }, () => Array(N).fill(0));
}

export function cloneBoard(b: Board): Board {
  return b.map((row) => row.slice());
}

export function isValidPlacement(
  b: Board,
  row: number,
  col: number,
  num: number,
): boolean {
  if (num < 1 || num > 9) return false;
  for (let i = 0; i < N; i++) {
    if (i !== col && b[row][i] === num) return false;
    if (i !== row && b[i][col] === num) return false;
  }
  const br = Math.floor(row / BOX) * BOX;
  const bc = Math.floor(col / BOX) * BOX;
  for (let r = br; r < br + BOX; r++) {
    for (let c = bc; c < bc + BOX; c++) {
      if ((r !== row || c !== col) && b[r][c] === num) return false;
    }
  }
  return true;
}

// Fill using randomized backtracking to get a complete valid solution
function fillBoard(b: Board): boolean {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (b[r][c] === 0) {
        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const n of nums) {
          if (isValidPlacement(b, r, c, n)) {
            b[r][c] = n;
            if (fillBoard(b)) return true;
            b[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Count solutions up to `limit` for uniqueness check
function countSolutions(b: Board, limit = 2): number {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (b[r][c] === 0) {
        let total = 0;
        for (let n = 1; n <= 9; n++) {
          if (isValidPlacement(b, r, c, n)) {
            b[r][c] = n;
            total += countSolutions(b, limit - total);
            b[r][c] = 0;
            if (total >= limit) return total;
          }
        }
        return total;
      }
    }
  }
  return 1;
}

function cluesForDifficulty(d: Difficulty): number {
  // Keep higher clue counts to preserve unique-solution generation speed
  switch (d) {
    case "easy":
      return 42;
    case "medium":
      return 34;
    case "hard":
      return 28;
  }
}

export function generatePuzzle(difficulty: Difficulty): {
  puzzle: Board;
  solution: Board;
} {
  const solution = emptyBoard();
  fillBoard(solution);

  const puzzle = cloneBoard(solution);
  const target = cluesForDifficulty(difficulty);
  let remaining = N * N;

  // Try to remove cells in random order while keeping uniqueness.
  // To keep generation fast we cap the uniqueness checks; if we can't hit the
  // exact target we accept what we have (still valid, still solvable).
  const positions = shuffle(
    Array.from({ length: N * N }, (_, i) => [Math.floor(i / N), i % N] as [number, number]),
  );

  for (const [r, c] of positions) {
    if (remaining <= target) break;
    const backup = puzzle[r][c];
    if (backup === 0) continue;
    puzzle[r][c] = 0;
    const test = cloneBoard(puzzle);
    const count = countSolutions(test, 2);
    if (count !== 1) {
      puzzle[r][c] = backup;
    } else {
      remaining--;
    }
  }

  return { puzzle, solution };
}

export function boardsEqual(a: Board, b: Board): boolean {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

export function isBoardComplete(b: Board): boolean {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (b[r][c] === 0) return false;
    }
  }
  return true;
}

export function findConflicts(b: Board): Set<string> {
  const conflicts = new Set<string>();
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const v = b[r][c];
      if (v === 0) continue;
      if (!isValidPlacement(b, r, c, v)) conflicts.add(`${r},${c}`);
    }
  }
  return conflicts;
}

export function countDigit(b: Board, d: number): number {
  let n = 0;
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (b[r][c] === d) n++;
  return n;
}

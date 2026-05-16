import type { DailyStreak, GameScore, LeaderboardEntry } from "./types";
import { USERS, getUserById } from "./users";

export const SCORES: GameScore[] = [
  { id: "s001", userId: "u_001", gameId: "five-letters", score: 95, durationSec: 180, playedAt: "2026-05-15", won: true },
  { id: "s002", userId: "u_001", gameId: "sudoku", score: 88, durationSec: 420, playedAt: "2026-05-15", won: true },
  { id: "s003", userId: "u_001", gameId: "connections", score: 72, durationSec: 260, playedAt: "2026-05-14", won: true },
  { id: "s004", userId: "u_001", gameId: "who-am-i", score: 60, durationSec: 90, playedAt: "2026-05-13", won: false },
  { id: "s005", userId: "u_001", gameId: "which-song", score: 100, durationSec: 45, playedAt: "2026-05-13", won: true },
  { id: "s006", userId: "u_002", gameId: "five-letters", score: 100, durationSec: 120, playedAt: "2026-05-15", won: true },
  { id: "s007", userId: "u_002", gameId: "sudoku", score: 95, durationSec: 380, playedAt: "2026-05-14", won: true },
  { id: "s008", userId: "u_002", gameId: "logical", score: 80, durationSec: 200, playedAt: "2026-05-13", won: true },
  { id: "s009", userId: "u_003", gameId: "five-letters", score: 70, durationSec: 240, playedAt: "2026-05-15", won: true },
  { id: "s010", userId: "u_003", gameId: "connections", score: 60, durationSec: 360, playedAt: "2026-05-14", won: false },
  { id: "s011", userId: "u_003", gameId: "who-am-i", score: 90, durationSec: 65, playedAt: "2026-05-13", won: true },
  { id: "s012", userId: "u_004", gameId: "twenty-questions", score: 75, durationSec: 480, playedAt: "2026-05-15", won: true },
  { id: "s013", userId: "u_004", gameId: "not-for-quoting", score: 85, durationSec: 150, playedAt: "2026-05-14", won: true },
  { id: "s014", userId: "u_005", gameId: "cover-story", score: 100, durationSec: 38, playedAt: "2026-05-15", won: true },
  { id: "s015", userId: "u_005", gameId: "logical", score: 95, durationSec: 180, playedAt: "2026-05-14", won: true },
  { id: "s016", userId: "u_005", gameId: "sudoku", score: 100, durationSec: 305, playedAt: "2026-05-13", won: true },
  { id: "s017", userId: "u_006", gameId: "five-letters", score: 50, durationSec: 300, playedAt: "2026-05-15", won: false },
  { id: "s018", userId: "u_007", gameId: "which-song", score: 80, durationSec: 60, playedAt: "2026-05-15", won: true },
  { id: "s019", userId: "u_007", gameId: "connections", score: 90, durationSec: 220, playedAt: "2026-05-14", won: true },
  { id: "s020", userId: "u_008", gameId: "logical", score: 100, durationSec: 140, playedAt: "2026-05-15", won: true },
  { id: "s021", userId: "u_008", gameId: "five-letters", score: 85, durationSec: 200, playedAt: "2026-05-14", won: true },
  { id: "s022", userId: "u_009", gameId: "sudoku", score: 100, durationSec: 290, playedAt: "2026-05-15", won: true },
  { id: "s023", userId: "u_009", gameId: "five-letters", score: 100, durationSec: 95, playedAt: "2026-05-14", won: true },
  { id: "s024", userId: "u_009", gameId: "connections", score: 100, durationSec: 175, playedAt: "2026-05-13", won: true },
  { id: "s025", userId: "u_009", gameId: "logical", score: 95, durationSec: 160, playedAt: "2026-05-12", won: true },
  { id: "s026", userId: "u_010", gameId: "who-am-i", score: 70, durationSec: 110, playedAt: "2026-05-15", won: true },
  { id: "s027", userId: "u_011", gameId: "twenty-questions", score: 65, durationSec: 520, playedAt: "2026-05-14", won: false },
  { id: "s028", userId: "u_012", gameId: "cover-story", score: 90, durationSec: 48, playedAt: "2026-05-15", won: true },
  { id: "s029", userId: "u_013", gameId: "not-for-quoting", score: 80, durationSec: 130, playedAt: "2026-05-15", won: true },
  { id: "s030", userId: "u_014", gameId: "logical", score: 85, durationSec: 195, playedAt: "2026-05-14", won: true },
  { id: "s031", userId: "u_015", gameId: "five-letters", score: 90, durationSec: 140, playedAt: "2026-05-15", won: true },
  { id: "s032", userId: "u_016", gameId: "sudoku", score: 75, durationSec: 450, playedAt: "2026-05-14", won: true },
  { id: "s033", userId: "u_017", gameId: "which-song", score: 60, durationSec: 80, playedAt: "2026-05-15", won: false },
  { id: "s034", userId: "u_018", gameId: "connections", score: 95, durationSec: 200, playedAt: "2026-05-15", won: true },
];

export const STREAKS: DailyStreak[] = [
  { userId: "u_001", current: 5, longest: 12, lastPlayedDate: "2026-05-15" },
  { userId: "u_002", current: 3, longest: 8, lastPlayedDate: "2026-05-15" },
  { userId: "u_003", current: 0, longest: 4, lastPlayedDate: "2026-05-13" },
  { userId: "u_004", current: 7, longest: 7, lastPlayedDate: "2026-05-15" },
  { userId: "u_005", current: 15, longest: 15, lastPlayedDate: "2026-05-15" },
  { userId: "u_009", current: 28, longest: 35, lastPlayedDate: "2026-05-15" },
  { userId: "u_018", current: 4, longest: 22, lastPlayedDate: "2026-05-15" },
];

export function computeLeaderboard(): LeaderboardEntry[] {
  const userTotals = new Map<string, { totalScore: number; games: number; wins: number }>();

  for (const score of SCORES) {
    const current = userTotals.get(score.userId) ?? { totalScore: 0, games: 0, wins: 0 };
    current.totalScore += score.score;
    current.games += 1;
    if (score.won) current.wins += 1;
    userTotals.set(score.userId, current);
  }

  const entries: LeaderboardEntry[] = [];
  for (const [userId, totals] of userTotals.entries()) {
    const user = getUserById(userId);
    if (!user) continue;
    entries.push({
      rank: 0,
      user,
      totalScore: totals.totalScore,
      gamesPlayed: totals.games,
      winRate: totals.games > 0 ? totals.wins / totals.games : 0,
    });
  }

  entries.sort((a, b) => b.totalScore - a.totalScore);
  entries.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  return entries;
}

export function getScoresForUser(userId: string): GameScore[] {
  return SCORES.filter((s) => s.userId === userId);
}

export function getStreakForUser(userId: string): DailyStreak | undefined {
  return STREAKS.find((s) => s.userId === userId);
}

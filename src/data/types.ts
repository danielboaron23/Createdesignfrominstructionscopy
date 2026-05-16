import type { GameId } from "../app/App";

export type User = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarEmoji: string;
  joinedAt: string;
  city?: string;
  isPremium: boolean;
};

export type GameScore = {
  id: string;
  userId: string;
  gameId: GameId;
  score: number;
  durationSec: number;
  playedAt: string;
  won: boolean;
};

export type LeaderboardEntry = {
  rank: number;
  user: User;
  totalScore: number;
  gamesPlayed: number;
  winRate: number;
};

export type DailyStreak = {
  userId: string;
  current: number;
  longest: number;
  lastPlayedDate: string;
};

export type Comment = {
  id: string;
  articleId: string;
  userId: string;
  text: string;
  postedAt: string;
  likes: number;
  parentId?: string;
};

export type Category = {
  slug: string;
  name: string;
  color: string;
  description: string;
};

export type ApiError = {
  status: number;
  message: string;
};

export type PaginatedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

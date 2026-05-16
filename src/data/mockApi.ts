import { ARTICLES, getArticleById } from "../app/components/articles";
import type { ArticleData } from "../app/components/ArticlePage";
import { CATEGORIES, getCategoryBySlug } from "./categories";
import { COMMENTS, getCommentsForArticle } from "./comments";
import { SCORES, STREAKS, computeLeaderboard, getScoresForUser, getStreakForUser } from "./scores";
import type {
  ApiError,
  Category,
  Comment,
  DailyStreak,
  GameScore,
  LeaderboardEntry,
  PaginatedResult,
  User,
} from "./types";
import { USERS, getCurrentUser, getUserById } from "./users";

type MockApiConfig = {
  minDelayMs: number;
  maxDelayMs: number;
  errorRate: number;
};

const config: MockApiConfig = {
  minDelayMs: 200,
  maxDelayMs: 800,
  errorRate: 0,
};

export function configureMockApi(overrides: Partial<MockApiConfig>): void {
  Object.assign(config, overrides);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(): number {
  return config.minDelayMs + Math.random() * (config.maxDelayMs - config.minDelayMs);
}

async function withLatencyAndErrors<T>(fn: () => T): Promise<T> {
  await delay(randomDelay());
  if (config.errorRate > 0 && Math.random() < config.errorRate) {
    const error: ApiError = {
      status: 500,
      message: "תקלה בשרת - נסה שוב",
    };
    throw error;
  }
  return fn();
}

function paginate<T>(items: T[], page: number, pageSize: number): PaginatedResult<T> {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);
  const start = (safePage - 1) * safePageSize;
  return {
    items: items.slice(start, start + safePageSize),
    page: safePage,
    pageSize: safePageSize,
    totalItems: items.length,
    totalPages: Math.ceil(items.length / safePageSize),
  };
}

export type ListArticlesOptions = {
  category?: string;
  search?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
};

export async function listArticles(
  options: ListArticlesOptions = {},
): Promise<PaginatedResult<ArticleData>> {
  return withLatencyAndErrors(() => {
    let filtered = [...ARTICLES];

    if (options.category) {
      filtered = filtered.filter((a) => a.category === options.category);
    }

    if (options.tag) {
      filtered = filtered.filter((a) => a.tags.includes(options.tag!));
    }

    if (options.search) {
      const q = options.search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.dek.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return paginate(filtered, options.page ?? 1, options.pageSize ?? 10);
  });
}

export async function fetchArticle(id: string): Promise<ArticleData> {
  return withLatencyAndErrors(() => {
    const article = getArticleById(id);
    if (!article) {
      throw { status: 404, message: "הכתבה לא נמצאה" } as ApiError;
    }
    return article;
  });
}

export async function listCategories(): Promise<Category[]> {
  return withLatencyAndErrors(() => [...CATEGORIES]);
}

export async function fetchCategory(slug: string): Promise<Category> {
  return withLatencyAndErrors(() => {
    const category = getCategoryBySlug(slug);
    if (!category) {
      throw { status: 404, message: "הקטגוריה לא נמצאה" } as ApiError;
    }
    return category;
  });
}

export async function fetchCurrentUser(): Promise<User> {
  return withLatencyAndErrors(() => getCurrentUser());
}

export async function fetchUser(id: string): Promise<User> {
  return withLatencyAndErrors(() => {
    const user = getUserById(id);
    if (!user) {
      throw { status: 404, message: "המשתמש לא נמצא" } as ApiError;
    }
    return user;
  });
}

export async function listUsers(
  page = 1,
  pageSize = 20,
): Promise<PaginatedResult<User>> {
  return withLatencyAndErrors(() => paginate([...USERS], page, pageSize));
}

export async function fetchLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
  return withLatencyAndErrors(() => computeLeaderboard().slice(0, limit));
}

export async function fetchUserScores(userId: string): Promise<GameScore[]> {
  return withLatencyAndErrors(() => getScoresForUser(userId));
}

export async function fetchUserStreak(userId: string): Promise<DailyStreak | null> {
  return withLatencyAndErrors(() => getStreakForUser(userId) ?? null);
}

export async function submitScore(
  score: Omit<GameScore, "id" | "playedAt">,
): Promise<GameScore> {
  return withLatencyAndErrors(() => {
    const newScore: GameScore = {
      ...score,
      id: `s${Date.now()}`,
      playedAt: new Date().toISOString().slice(0, 10),
    };
    SCORES.push(newScore);
    return newScore;
  });
}

export async function fetchComments(articleId: string): Promise<Comment[]> {
  return withLatencyAndErrors(() => getCommentsForArticle(articleId));
}

export async function postComment(
  comment: Omit<Comment, "id" | "postedAt" | "likes">,
): Promise<Comment> {
  return withLatencyAndErrors(() => {
    const newComment: Comment = {
      ...comment,
      id: `c${Date.now()}`,
      postedAt: new Date().toISOString(),
      likes: 0,
    };
    COMMENTS.push(newComment);
    return newComment;
  });
}

export async function fetchAllStreaks(): Promise<DailyStreak[]> {
  return withLatencyAndErrors(() => [...STREAKS]);
}

import { useEffect, useState } from "react";
import MobileHome from "./components/MobileHome";
import SudokuGame from "./components/games/SudokuGame";
import FiveLettersGame from "./components/games/FiveLettersGame";
import ConnectionsGame from "./components/games/ConnectionsGame";
import WhoAmIGame from "./components/games/WhoAmIGame";
import WhichSongGame from "./components/games/WhichSongGame";
import TwentyQuestionsGame from "./components/games/TwentyQuestionsGame";
import NotForQuotingGame from "./components/games/NotForQuotingGame";
import LogicalGame from "./components/games/LogicalGame";
import CoverStoryGame from "./components/games/CoverStoryGame";
import ArticlePage from "./components/ArticlePage";
import { getArticleById } from "./components/articles";

export type GameId =
  | "sudoku"
  | "five-letters"
  | "connections"
  | "who-am-i"
  | "which-song"
  | "twenty-questions"
  | "not-for-quoting"
  | "logical"
  | "cover-story";

type Page = { kind: "home" } | { kind: "game"; id: GameId } | { kind: "article"; id: string };

export default function App() {
  const [page, setPage] = useState<Page>({ kind: "home" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [page]);

  const goHome = () => setPage({ kind: "home" });
  const play = (id: GameId) => setPage({ kind: "game", id });
  const openArticle = (id: string) => setPage({ kind: "article", id });

  return (
    <div
      className="min-h-dvh bg-[#f3f3f3]"
      style={{ fontFamily: "'Open Sans Hebrew', 'Arial Hebrew', sans-serif" }}
    >
      {page.kind === "home" && <MobileHome onPlay={play} onOpenArticle={openArticle} />}
      {page.kind === "game" && page.id === "sudoku" && <SudokuGame onExit={goHome} />}
      {page.kind === "game" && page.id === "five-letters" && <FiveLettersGame onExit={goHome} />}
      {page.kind === "game" && page.id === "connections" && <ConnectionsGame onExit={goHome} />}
      {page.kind === "game" && page.id === "who-am-i" && <WhoAmIGame onExit={goHome} />}
      {page.kind === "game" && page.id === "which-song" && <WhichSongGame onExit={goHome} />}
      {page.kind === "game" && page.id === "twenty-questions" && <TwentyQuestionsGame onExit={goHome} />}
      {page.kind === "game" && page.id === "not-for-quoting" && <NotForQuotingGame onExit={goHome} />}
      {page.kind === "game" && page.id === "logical" && <LogicalGame onExit={goHome} />}
      {page.kind === "game" && page.id === "cover-story" && <CoverStoryGame onExit={goHome} />}
      {page.kind === "article" && (() => {
        const article = getArticleById(page.id);
        return article ? <ArticlePage article={article} onExit={goHome} /> : null;
      })()}
    </div>
  );
}

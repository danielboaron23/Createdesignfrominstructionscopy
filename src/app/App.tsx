import { useEffect, useState } from "react";
import MobileHome from "./components/MobileHome";
import SudokuGame from "./components/games/SudokuGame";

type Page = "home" | "sudoku";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [page]);

  return (
    <div
      className="min-h-dvh bg-[#f3f3f3]"
      style={{ fontFamily: "'Open Sans Hebrew', 'Arial Hebrew', sans-serif" }}
    >
      {page === "home" && <MobileHome onPlaySudoku={() => setPage("sudoku")} />}
      {page === "sudoku" && <SudokuGame onExit={() => setPage("home")} />}
    </div>
  );
}

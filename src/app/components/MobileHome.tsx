import NewsSection from "./NewsSection";
import RecommendedSection from "./RecommendedSection";
import SiteFooter from "./SiteFooter";
import imgRectangle18 from "figma:asset/b468fe1f59c2ed9c7ef3a2cab4fd006d08cfa2ad.png";
import imgRectangle19 from "figma:asset/c8f494e6316c0a5254f99b0601bd4324a561c8e0.png";
import imgRectangle20 from "figma:asset/581b66b1cffde581028a271bd3a9bdbf5296fe44.png";
import imgRectangle21 from "figma:asset/26e8d384c27556bf780614681a3736fdd21be15f.png";
import imgRectangle22 from "figma:asset/3e0bb0cb66ddf9690c925dcc6ef62e16d6180289.png";
import imgRectangle23 from "figma:asset/99c713a0193a0163bb1f1794a205c8ae472346bb.png";
import imgRectangle24 from "figma:asset/64bac39cbebe016b41d28d7deb8d47c97bf0417d.png";
import imgRectangle25 from "figma:asset/d072cf7f47e03e6e12c5ba7c5426e6f606d9c968.png";
import imgRectangle26 from "figma:asset/899e148af0dc83343a399c3eca87404e530a278f.png";

type GameId = "sudoku" | "other";

type Game = {
  id: GameId;
  title: string;
  subtitle: string;
  image: string;
};

const GAMES: Game[] = [
  { id: "other", title: "איזה שיר?", subtitle: "אבודים בתרגום? אפשר לשמוע רמז", image: imgRectangle18 },
  { id: "other", title: "סיפור כיסוי", subtitle: "בכמה צעדים תצליחו למלא את הלוח?", image: imgRectangle19 },
  { id: "other", title: "מה הקשר", subtitle: "חברו ארבע קבוצות של ארבע מילים", image: imgRectangle20 },
  { id: "other", title: "5 אותיות", subtitle: "לא תאמינו כמה מילים בנות 5 אותיות יש בעברית", image: imgRectangle21 },
  { id: "other", title: "20 שאלות", subtitle: "הטקס הקבוע שלכם בפרלמנט שישי", image: imgRectangle22 },
  { id: "sudoku", title: "סודוקו", subtitle: "שלוש שורות, שלושה טורים, שלוש רמות קושי", image: imgRectangle23 },
  { id: "other", title: "מי אני?", subtitle: "התמונה מפוקסלת והדמות לא ברורה. בכמה נסיונות תזהו אותה?", image: imgRectangle24 },
  { id: "other", title: "הגיונית", subtitle: "חידת הגיון מילולית יומית", image: imgRectangle25 },
  { id: "other", title: "לא לציטוט", subtitle: "שלוש שורות, שלושה טורים, שלוש רמות קושי", image: imgRectangle26 },
];

type Props = {
  onPlaySudoku: () => void;
};

export default function MobileHome({ onPlaySudoku }: Props) {
  return (
    <div
      dir="rtl"
      className="min-h-dvh w-full bg-[#f3f3f3]"
      style={{
        fontFamily: "'Open Sans Hebrew', 'Arial Hebrew', sans-serif",
        touchAction: "manipulation",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Masthead */}
      <header className="w-full bg-white border-b border-[#e5e5e5] sticky top-0 z-10">
        <div className="mx-auto w-full max-w-[1280px] h-[52px] sm:h-[60px] flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* RTL start (right side): user + nav */}
          <div className="flex items-center gap-3 lg:gap-5">
            <div className="hidden lg:flex items-center gap-2 text-[13px] text-[#2d2d2d] font-bold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M5 20c1.5-4 4-5 7-5s5.5 1 7 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span>שלום, עמוס</span>
            </div>
            <button
              aria-label="תפריט"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center -mx-2 hover:text-[#226ee9] transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <span className="hidden lg:inline text-[13px] text-[#2d2d2d] font-bold">ניווט</span>
          </div>

          {/* Logo centered */}
          <div className="font-bold text-[18px] sm:text-[20px] text-[#2d2d2d]" style={{ fontFamily: "'Arial Hebrew', serif" }}>
            הארץ
          </div>

          {/* RTL end (left side): search */}
          <div className="flex items-center gap-2">
            <span className="hidden lg:inline text-[13px] text-[#2d2d2d] font-bold">חיפוש</span>
            <button
              aria-label="חיפוש"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center -mx-2 hover:text-[#226ee9] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="w-full mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <div className="w-full max-w-[970px] mx-auto rounded-[8px] overflow-hidden bg-[#f7b439] aspect-[970/250] flex items-center justify-center">
          <p className="text-white text-[14px] sm:text-[18px]">970x250</p>
        </div>
      </div>

      {/* Games section */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Section title — aligned to RIGHT in RTL */}
        <div className="mb-5 sm:mb-6 lg:mb-8 flex flex-col items-start gap-[4px]">
          <div className="bg-[#226ee9] h-[10px] w-[40px] sm:h-[12px] sm:w-[49px]" />
          <h2 className="font-bold text-[#2d2d2d] text-[26px] sm:text-[32px] lg:text-[40px] leading-tight">משחקים</h2>
        </div>

        {/* Responsive games grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {GAMES.map((game, i) => (
            <GameCard
              key={i}
              game={game}
              onPlay={game.id === "sudoku" ? onPlaySudoku : undefined}
            />
          ))}
        </div>
      </section>

      {/* News / weekly summary */}
      <NewsSection />

      {/* Recommended / Outbrain */}
      <RecommendedSection />

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

function GameCard({ game, onPlay }: { game: Game; onPlay?: () => void }) {
  const isActive = !!onPlay;
  return (
    <article
      className={
        "bg-white rounded-[12px] px-3 py-4 sm:p-5 md:p-6 flex flex-col items-center gap-3 sm:gap-4 transition-all " +
        (isActive
          ? "hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
          : "")
      }
    >
      <div className="w-[68px] h-[68px] sm:w-[80px] sm:h-[80px] md:w-[88px] md:h-[88px] shrink-0">
        <img
          src={game.image}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          width="88"
          height="88"
        />
      </div>
      <div className="w-full flex flex-col items-center text-center gap-[2px]">
        <h3 className="font-bold text-[#2d2d2d] text-[17px] sm:text-[20px] md:text-[22px] leading-[1.25]" dir="rtl">
          {game.title}
        </h3>
        <p className="font-normal text-[#2d2d2d] text-[12px] sm:text-[14px] md:text-[15px] leading-[1.4] min-h-[34px] sm:min-h-[40px] md:min-h-[42px]" dir="rtl">
          {game.subtitle}
        </p>
      </div>
      <button
        type="button"
        onClick={onPlay}
        disabled={!isActive}
        className={
          "min-h-[44px] w-full sm:w-auto px-5 rounded-[6px] text-white text-[14px] sm:text-[15px] md:text-[16px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#226ee9] focus-visible:ring-offset-2 " +
          (isActive
            ? "bg-[#5b5b5b] hover:bg-[#2d2d2d] active:bg-[#2d2d2d] cursor-pointer"
            : "bg-[#c4c4c4] cursor-not-allowed")
        }
        aria-label={isActive ? `שחק ${game.title}` : `${game.title} — בקרוב`}
      >
        {isActive ? "רוצה לשחק" : "בקרוב"}
      </button>
    </article>
  );
}

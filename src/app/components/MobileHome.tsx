import NewsSection from "./NewsSection";
import RecommendedCarousel from "./RecommendedCarousel";
import SiteFooter from "./SiteFooter";
import type { GameId } from "../App";
import imgRectangle18 from "figma:asset/b468fe1f59c2ed9c7ef3a2cab4fd006d08cfa2ad.png";
import imgRectangle19 from "figma:asset/c8f494e6316c0a5254f99b0601bd4324a561c8e0.png";
import imgRectangle20 from "figma:asset/581b66b1cffde581028a271bd3a9bdbf5296fe44.png";
import imgRectangle21 from "figma:asset/26e8d384c27556bf780614681a3736fdd21be15f.png";
import imgRectangle22 from "figma:asset/3e0bb0cb66ddf9690c925dcc6ef62e16d6180289.png";
import imgRectangle23 from "figma:asset/99c713a0193a0163bb1f1794a205c8ae472346bb.png";
import imgRectangle24 from "figma:asset/64bac39cbebe016b41d28d7deb8d47c97bf0417d.png";
import imgRectangle25 from "figma:asset/d072cf7f47e03e6e12c5ba7c5426e6f606d9c968.png";
import imgRectangle26 from "figma:asset/899e148af0dc83343a399c3eca87404e530a278f.png";

type Game = {
  id: GameId;
  title: string;
  subtitle: string;
  image: string;
  /** Accent color sampled from the icon — used for the hover-reveal overlay */
  accent: string;
  /** Darker shade of the accent for readable text on the overlay */
  accentText: string;
};

const GAMES: Game[] = [
  {
    id: "which-song",
    title: "איזה שיר?",
    subtitle: "אבודים בתרגום? אפשר לשמוע רמז",
    image: imgRectangle18,
    accent: "#d8d4f5",
    accentText: "#2d2d2d",
  },
  {
    id: "cover-story",
    title: "סיפור כיסוי",
    subtitle: "בכמה צעדים תצליחו למלא את הלוח?",
    image: imgRectangle19,
    accent: "#f0e4db",
    accentText: "#2d2d2d",
  },
  {
    id: "connections",
    title: "מה הקשר",
    subtitle: "חברו ארבע קבוצות של ארבע מילים",
    image: imgRectangle20,
    accent: "#fff3c2",
    accentText: "#2d2d2d",
  },
  {
    id: "five-letters",
    title: "5 אותיות",
    subtitle: "לא תאמינו כמה מילים בנות 5 אותיות יש בעברית",
    image: imgRectangle21,
    accent: "#cddc9a",
    accentText: "#2d2d2d",
  },
  {
    id: "twenty-questions",
    title: "20 שאלות",
    subtitle: "הטקס הקבוע שלכם בפרלמנט שישי",
    image: imgRectangle22,
    accent: "#bfd4f9",
    accentText: "#1a3a7a",
  },
  {
    id: "sudoku",
    title: "סודוקו",
    subtitle: "שלוש שורות, שלושה טורים, שלוש רמות קושי",
    image: imgRectangle23,
    accent: "#b6d9b8",
    accentText: "#1a3a1a",
  },
  {
    id: "who-am-i",
    title: "מי אני?",
    subtitle: "התמונה מפוקסלת והדמות לא ברורה. בכמה נסיונות תזהו אותה?",
    image: imgRectangle24,
    accent: "#f7d96b",
    accentText: "#3a2f00",
  },
  {
    id: "logical",
    title: "הגיונית",
    subtitle: "חידת הגיון מילולית יומית",
    image: imgRectangle25,
    accent: "#f5c9cc",
    accentText: "#3a1a1f",
  },
  {
    id: "not-for-quoting",
    title: "לא לציטוט",
    subtitle: "שלוש שורות, שלושה טורים, שלוש רמות קושי",
    image: imgRectangle26,
    accent: "#f0b8b8",
    accentText: "#3a1a1f",
  },
];

type Props = {
  onPlay: (id: GameId) => void;
  onOpenArticle: (id: string) => void;
};

export default function MobileHome({ onPlay, onOpenArticle }: Props) {
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
              onPlay={() => onPlay(game.id)}
            />
          ))}
        </div>
      </section>

      {/* News / weekly summary */}
      <NewsSection onOpenArticle={onOpenArticle} />

      {/* Recommended / Outbrain (animated coverflow carousel) */}
      <RecommendedCarousel />

      {/* Footer */}
      <SiteFooter />

      {/* Hover-reveal animation — circle clip-path expands from the icon position */}
      <style>{`
        .game-card-overlay {
          clip-path: circle(0 at 50% 22%);
          -webkit-clip-path: circle(0 at 50% 22%);
          transition: clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1),
                      -webkit-clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: clip-path;
        }
        .game-card:hover .game-card-overlay,
        .game-card:focus-within .game-card-overlay {
          clip-path: circle(140% at 50% 22%);
          -webkit-clip-path: circle(140% at 50% 22%);
          /* NOTE: keep pointer-events: none so clicks fall through to the
             real (base-layer) button underneath. Without this, the overlay
             catches clicks and nothing happens. */
        }
        @media (prefers-reduced-motion: reduce) {
          .game-card-overlay {
            transition: opacity 0.2s ease;
            clip-path: none;
            -webkit-clip-path: none;
            opacity: 0;
          }
          .game-card:hover .game-card-overlay,
          .game-card:focus-within .game-card-overlay {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function GameCard({ game, onPlay }: { game: Game; onPlay?: () => void }) {
  const isActive = !!onPlay;

  // Inner card content is rendered twice: once as the base layer (white),
  // and once as the overlay (accent color). The overlay is clipped to a
  // small circle at the icon position and expands to cover the whole card
  // on hover/focus via a CSS clip-path transition.
  const renderContent = (variant: "base" | "overlay") => {
    const isOverlay = variant === "overlay";
    const textColor = isOverlay ? game.accentText : "#2d2d2d";
    return (
      <div className="h-full w-full px-3 py-4 sm:p-5 md:p-6 flex flex-col items-center gap-3 sm:gap-4">
        <div className="w-[68px] h-[68px] sm:w-[80px] sm:h-[80px] md:w-[88px] md:h-[88px] shrink-0">
          <img
            src={game.image}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            width="88"
            height="88"
            draggable={false}
          />
        </div>
        <div className="w-full flex flex-col items-center text-center gap-[2px]">
          <h3
            className="font-bold text-[17px] sm:text-[20px] md:text-[22px] leading-[1.25]"
            style={{ color: textColor }}
            dir="rtl"
          >
            {game.title}
          </h3>
          <p
            className="font-normal text-[12px] sm:text-[14px] md:text-[15px] leading-[1.4] min-h-[34px] sm:min-h-[40px] md:min-h-[42px]"
            style={{ color: textColor, opacity: isOverlay ? 0.85 : 1 }}
            dir="rtl"
          >
            {game.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={isOverlay ? undefined : onPlay}
          disabled={!isActive}
          tabIndex={isOverlay ? -1 : 0}
          aria-hidden={isOverlay}
          className={
            "min-h-[44px] w-full sm:w-auto px-5 rounded-[6px] text-[14px] sm:text-[15px] md:text-[16px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#226ee9] focus-visible:ring-offset-2 " +
            (!isActive
              ? "bg-[#c4c4c4] text-white cursor-not-allowed"
              : isOverlay
              ? "bg-[#2d2d2d] text-white cursor-pointer"
              : "bg-[#5b5b5b] text-white hover:bg-[#2d2d2d] active:bg-[#2d2d2d] cursor-pointer")
          }
          aria-label={isActive ? `שחק ${game.title}` : `${game.title} — בקרוב`}
        >
          {isActive ? "רוצה לשחק" : "בקרוב"}
        </button>
      </div>
    );
  };

  return (
    <article
      className="game-card group relative bg-white rounded-[12px] overflow-hidden transition-all duration-300 focus-within:-translate-y-[2px] hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
      style={
        {
          "--accent": game.accent,
        } as React.CSSProperties
      }
    >
      {/* Base layer */}
      <div className="relative z-0">{renderContent("base")}</div>

      {/* Overlay layer — clipped to a small circle at the icon center-top,
          expands to cover the full card on hover/focus */}
      <div
        aria-hidden="true"
        className="game-card-overlay absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: game.accent }}
      >
        {renderContent("overlay")}
      </div>
    </article>
  );
}

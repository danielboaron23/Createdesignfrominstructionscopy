import { useEffect, useRef, useState } from "react";
import SiteFooter from "./SiteFooter";

export type ArticleData = {
  id: string;
  category: string;
  subcategory?: string;
  kickerColor: string;
  title: string;
  dek: string;
  author: string;
  authorRole?: string;
  date: string;
  comments: number;
  readTime: string;
  image: string;
  imageCaption: string;
  body: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "quote"; text: string; attribution?: string }
    | { type: "image"; src: string; caption: string }
  >;
  tags: string[];
};

type Props = {
  article: ArticleData;
  onExit: () => void;
};

// Serif stack for editorial headings + body
const SERIF =
  "'Frank Ruhl Libre', 'Arial Hebrew', 'Times New Roman', Georgia, serif";
// Sans for metadata, UI, bylines
const SANS =
  "'Heebo', 'Open Sans Hebrew', 'Arial Hebrew', system-ui, sans-serif";

export default function ArticlePage({ article, onExit }: Props) {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showStickyShare, setShowStickyShare] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const firstParaIdx = article.body.findIndex((b) => b.type === "p");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [article.id]);

  // Reading progress indicator + sticky state
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalH > 0 ? Math.min(100, (scrollY / totalH) * 100) : 0;
      setProgress(pct);
      setScrolled(scrollY > 120);

      // Show floating share bar when body enters viewport
      if (bodyRef.current) {
        const rect = bodyRef.current.getBoundingClientRect();
        setShowStickyShare(rect.top < window.innerHeight / 2 && rect.bottom > 200);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      dir="rtl"
      className="min-h-dvh w-full bg-[#fafafa]"
      style={{
        fontFamily: SANS,
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Sticky masthead with reading progress */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e4e4e7]">
        <div className="mx-auto w-full max-w-[1280px] h-[56px] sm:h-[60px] flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={onExit}
            className="min-h-[44px] flex items-center gap-1.5 text-[#09090b] text-[14px] font-bold hover:text-[#ec4899] transition-colors"
            aria-label="חזרה"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">חזרה לעמוד הבית</span>
          </button>

          {/* Article title appears in header after scroll */}
          <div
            className={
              "flex-1 mx-4 text-center text-[13px] font-bold text-[#09090b] truncate transition-opacity duration-300 " +
              (scrolled ? "opacity-100" : "opacity-0")
            }
            style={{ fontFamily: SERIF }}
          >
            {article.title}
          </div>

          <div
            className="font-bold text-[18px] sm:text-[22px] text-[#09090b] shrink-0"
            style={{ fontFamily: "'Arial Hebrew', serif" }}
          >
            הארץ
          </div>
        </div>
        {/* Reading progress bar */}
        <div
          className="h-[3px] bg-[#ec4899] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="התקדמות קריאה"
        />
      </header>

      {/* Full-bleed hero with overlay title */}
      <div className="relative w-full bg-[#09090b] overflow-hidden" style={{ aspectRatio: "16 / 9", maxHeight: "640px" }}>
        <img
          src={article.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          width="1280"
          height="720"
        />
        {/* Gradient for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,9,11,0.2) 0%, rgba(9,9,11,0.4) 50%, rgba(9,9,11,0.92) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Kicker + title overlay (bottom of hero) */}
        <div className="absolute inset-x-0 bottom-0 px-4 sm:px-6 lg:px-12 pb-8 sm:pb-10 lg:pb-14">
          <div className="mx-auto w-full max-w-[720px]">
            <div
              className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 py-1 rounded-full text-[12px] sm:text-[13px] font-bold text-white"
              style={{ backgroundColor: article.kickerColor, fontFamily: SANS }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" />
              {article.category}
              {article.subcategory && <span className="opacity-80">› {article.subcategory}</span>}
            </div>

            <h1
              className="text-white text-[28px] sm:text-[40px] lg:text-[52px] font-bold leading-[1.15] tracking-[-0.01em] text-right drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              style={{ fontFamily: SERIF }}
              dir="rtl"
            >
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Image credit — sits just under hero */}
      <div className="w-full border-b border-[#e4e4e7] bg-white">
        <p
          className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-2 text-[11px] sm:text-[12px] text-[#71717a] text-right"
          dir="rtl"
        >
          {article.imageCaption}
        </p>
      </div>

      {/* Article body container */}
      <article className="mx-auto w-full max-w-[720px] px-4 sm:px-6 lg:px-0 pt-8 sm:pt-12 relative">
        {/* Dek / lede */}
        <p
          className="text-[19px] sm:text-[22px] lg:text-[24px] text-[#3f3f46] leading-[1.5] text-right mb-8 font-[400]"
          style={{ fontFamily: SERIF }}
          dir="rtl"
        >
          {article.dek}
        </p>

        {/* Byline + share row */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b-2 border-[#18181b]" dir="rtl">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div
              className="w-[44px] h-[44px] rounded-full flex items-center justify-center font-bold text-[16px] text-white shrink-0"
              style={{ backgroundColor: article.kickerColor }}
              aria-hidden="true"
            >
              {article.author.charAt(0)}
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-[14px] sm:text-[15px] text-[#09090b]">{article.author}</span>
              {article.authorRole && (
                <span className="text-[12px] text-[#71717a]">{article.authorRole}</span>
              )}
            </div>
          </div>

          {/* Meta + actions */}
          <div className="flex items-center gap-3 sm:gap-4 text-[12px] sm:text-[13px] text-[#71717a]">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
            <div className="sm:hidden text-[11px] leading-tight text-right">
              <div>{article.date}</div>
              <div>{article.readTime}</div>
            </div>
            <div className="h-8 w-px bg-[#e4e4e7]" aria-hidden="true" />
            <ShareIconButton label="שיתוף בפייסבוק">
              <path d="M13 22v-8h3l.5-3.5H13V8.5c0-1 .3-1.7 1.7-1.7h1.8V3.8C16 3.7 14.9 3.5 13.7 3.5c-2.7 0-4.5 1.6-4.5 4.6V10.5H6V14h3.2v8H13z" />
            </ShareIconButton>
            <ShareIconButton label="שיתוף בטוויטר">
              <path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.5L4.7 21H1.5l7.5-8.5L1 3h6.6l4.5 6 5.4-6z" />
            </ShareIconButton>
          </div>
        </div>

        {/* Body with drop cap on first paragraph */}
        <div ref={bodyRef} className="article-body text-right" dir="rtl">
          {article.body.map((block, i) => {
            if (block.type === "p") {
              const isFirst = i === firstParaIdx;
              return (
                <p
                  key={i}
                  className={
                    "text-[18px] sm:text-[19px] lg:text-[20px] leading-[1.75] text-[#18181b] mb-6 " +
                    (isFirst ? "first-paragraph" : "")
                  }
                  style={{ fontFamily: SERIF }}
                >
                  {block.text}
                </p>
              );
            }
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#09090b] leading-[1.25] mt-12 mb-5 tracking-[-0.01em]"
                  style={{ fontFamily: SERIF }}
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="my-10 px-4 sm:px-6 relative"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill={article.kickerColor}
                    aria-hidden="true"
                    className="absolute -top-2 right-0 opacity-90"
                  >
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                  <p
                    className="text-[22px] sm:text-[26px] lg:text-[30px] leading-[1.4] text-[#09090b] font-medium pt-6"
                    style={{ fontFamily: SERIF }}
                  >
                    {block.text}
                  </p>
                  {block.attribution && (
                    <footer className="mt-4 flex items-center gap-2 text-[13px] text-[#71717a]">
                      <span className="h-px w-6 bg-[#71717a]" aria-hidden="true" />
                      <span>{block.attribution}</span>
                    </footer>
                  )}
                </blockquote>
              );
            }
            if (block.type === "image") {
              return (
                <figure key={i} className="my-10 -mx-4 sm:mx-0">
                  <div className="w-full aspect-[16/9] bg-[#e4e4e7] overflow-hidden sm:rounded-[4px]">
                    <img src={block.src} alt={block.caption} className="w-full h-full object-cover" />
                  </div>
                  <figcaption className="px-4 sm:px-0 text-[12px] text-[#71717a] text-right mt-2 leading-relaxed">
                    {block.caption}
                  </figcaption>
                </figure>
              );
            }
            return null;
          })}
        </div>

        {/* End-of-article divider */}
        <div className="my-10 flex items-center justify-center gap-2">
          <span className="h-px w-12 bg-[#e4e4e7]" aria-hidden="true" />
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: article.kickerColor }} aria-hidden="true" />
          <span className="h-px w-12 bg-[#e4e4e7]" aria-hidden="true" />
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mb-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#71717a] mb-3 text-right">
              תגיות
            </div>
            <div className="flex flex-wrap gap-2 justify-end" dir="rtl">
              {article.tags.map((tag) => (
                <a
                  key={tag}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="px-3 py-1.5 rounded-full border border-[#e4e4e7] bg-white hover:bg-[#18181b] hover:text-white hover:border-[#18181b] text-[12px] sm:text-[13px] font-bold text-[#18181b] transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Author card */}
        <div className="mb-10 p-5 sm:p-6 rounded-[4px] bg-white border border-[#e4e4e7]">
          <div className="flex items-start gap-4" dir="rtl">
            <div
              className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-bold text-[20px] text-white shrink-0"
              style={{ backgroundColor: article.kickerColor }}
              aria-hidden="true"
            >
              {article.author.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#71717a] mb-1">
                המחבר/ת
              </div>
              <div className="font-bold text-[18px] text-[#09090b]" style={{ fontFamily: SERIF }}>
                {article.author}
              </div>
              {article.authorRole && (
                <div className="text-[13px] text-[#71717a] mt-0.5">{article.authorRole}</div>
              )}
              <p className="text-[14px] text-[#3f3f46] leading-relaxed mt-2">
                עוקבת ומדווחת על עולם המשחקים במדור המשחקים של הארץ. יוצרת תוכן חינוכי ומבקרת על טרנדים חדשים בתחום.
              </p>
            </div>
          </div>
        </div>

        {/* Comments CTA strip */}
        <div className="mb-10 p-5 sm:p-6 rounded-[4px] border-2 border-dashed border-[#e4e4e7] text-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#71717a"
            strokeWidth="1.5"
            className="mx-auto mb-3"
            aria-hidden="true"
          >
            <path d="M21 12c0 4.4-4 8-9 8-1.3 0-2.5-.2-3.6-.6L4 21l1.4-4c-1.5-1.4-2.4-3.1-2.4-5 0-4.4 4-8 9-8s9 3.6 9 8z" strokeLinejoin="round" />
          </svg>
          <div className="text-[16px] font-bold text-[#09090b] mb-1" style={{ fontFamily: SERIF }}>
            {article.comments} תגובות
          </div>
          <p className="text-[13px] text-[#71717a] mb-3">הצטרפו לדיון — מה דעתכם על הכתבה?</p>
          <button
            type="button"
            className="min-h-[44px] px-5 rounded-[4px] bg-[#18181b] text-white text-[14px] font-bold hover:bg-[#09090b] transition-colors"
          >
            הוסיפו תגובה
          </button>
        </div>

        {/* Back-home CTA (ghost) */}
        <div className="mb-16 flex justify-center">
          <button
            onClick={onExit}
            className="min-h-[44px] px-6 rounded-[4px] bg-transparent text-[#18181b] text-[14px] font-bold hover:bg-[#18181b] hover:text-white border-2 border-[#18181b] transition-colors flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            חזרה לעמוד הבית
          </button>
        </div>
      </article>

      {/* Floating share rail (desktop only) */}
      <div
        className={
          "hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-2 z-20 transition-all duration-300 " +
          (showStickyShare ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none")
        }
      >
        <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#71717a] text-center mb-1">
          שתפו
        </div>
        <FloatingShare label="פייסבוק">
          <path d="M13 22v-8h3l.5-3.5H13V8.5c0-1 .3-1.7 1.7-1.7h1.8V3.8C16 3.7 14.9 3.5 13.7 3.5c-2.7 0-4.5 1.6-4.5 4.6V10.5H6V14h3.2v8H13z" />
        </FloatingShare>
        <FloatingShare label="טוויטר">
          <path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.5L4.7 21H1.5l7.5-8.5L1 3h6.6l4.5 6 5.4-6z" />
        </FloatingShare>
        <FloatingShare label="וואטסאפ">
          <path d="M20 4A11 11 0 0 0 4 20l-1 4 4-1A11 11 0 0 0 20 4zM12 21a9 9 0 0 1-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3A9 9 0 1 1 21 12a9 9 0 0 1-9 9zm5-6.3c-.3-.2-1.7-.8-2-.9-.2 0-.4 0-.6.2l-.8 1c-.2.2-.3.2-.5.1-.3-.1-1.3-.5-2.5-1.5-1-.8-1.6-1.8-1.7-2.1 0-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3.2-.5s0-.3 0-.5L9 6.5c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4 0 1.5 1 2.8 1.2 3 .2.2 2.1 3.2 5.1 4.5 2.4 1 2.9 1 3.5 1 .5-.1 1.7-.8 2-1.4.2-.7.2-1.2.1-1.4l-.6-.3z" />
        </FloatingShare>
      </div>

      <SiteFooter />

      {/* Drop cap + reduced-motion */}
      <style>{`
        .article-body .first-paragraph::first-letter {
          font-family: ${SERIF};
          font-size: 4.5em;
          line-height: 0.9;
          font-weight: 700;
          float: right;
          margin-left: 0.12em;
          margin-top: 0.05em;
          color: ${article.kickerColor};
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

function ShareIconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => e.preventDefault()}
      className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full hover:bg-[#f4f4f5] text-[#71717a] hover:text-[#18181b] transition-colors"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}

function FloatingShare({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => e.preventDefault()}
      className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-white border border-[#e4e4e7] shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-[#3f3f46] hover:text-[#ec4899] hover:border-[#ec4899] hover:scale-110 active:scale-95 transition-all"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}

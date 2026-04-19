import { ARTICLES } from "./articles";

type Props = {
  onOpenArticle: (id: string) => void;
};

export default function NewsSection({ onOpenArticle }: Props) {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Section title — aligned to RIGHT in RTL */}
      <div className="mb-5 sm:mb-6 lg:mb-8 flex flex-col items-start gap-[4px]">
        <div className="bg-[#226ee9] h-[10px] w-[40px] sm:h-[12px] sm:w-[49px]" />
        <h2 className="font-bold text-[#2d2d2d] text-[26px] sm:text-[32px] lg:text-[40px] leading-tight">
          סיכום שבועי
        </h2>
      </div>

      {/* Grid of 6 news cards: 1 col mobile, 2 col tablet+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
        {ARTICLES.map((item) => (
          <NewsCard key={item.id} item={item} onOpen={() => onOpenArticle(item.id)} />
        ))}
      </div>
    </section>
  );
}

function NewsCard({
  item,
  onOpen,
}: {
  item: (typeof ARTICLES)[number];
  onOpen: () => void;
}) {
  return (
    <article
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`פתח כתבה: ${item.title}`}
      className="bg-white rounded-[12px] overflow-hidden flex items-stretch h-[180px] sm:h-[220px] lg:h-[264px] transition-all hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#226ee9] focus-visible:ring-offset-2"
    >
      {/* Image on the RIGHT (RTL start — first in DOM) */}
      <div className="shrink-0 w-[45%] h-full bg-[#ececf0] rounded-l-[0] rounded-r-[12px] overflow-hidden">
        <img
          src={item.image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
          width="352"
          height="264"
        />
      </div>
      {/* Text on the LEFT (RTL end — last in DOM) */}
      <div className="flex-1 min-w-0 flex flex-col justify-between p-3 sm:p-4 lg:p-5">
        <h3
          className="font-bold text-[#2d2d2d] text-[16px] sm:text-[18px] lg:text-[21px] leading-[1.35] text-right"
          dir="rtl"
        >
          {item.title}
        </h3>
        <div className="flex items-center justify-end gap-2" dir="rtl">
          <span className="text-[12px] text-[#5b5b5b]">{item.author}</span>
          <span className="w-1 h-1 rounded-full bg-[#737373]" aria-hidden="true" />
          <span className="flex items-center gap-[4px] text-[12px] font-bold text-[#737373]">
            <span>{item.comments}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 12c0 4.4-4 8-9 8-1.3 0-2.5-.2-3.6-.6L4 21l1.4-4c-1.5-1.4-2.4-3.1-2.4-5 0-4.4 4-8 9-8s9 3.6 9 8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}

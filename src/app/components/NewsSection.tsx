import imgRectangle2 from "figma:asset/734a2e522d4d80b55bfa8930990722566a35544a.png";
import imgRectangle3 from "figma:asset/752143c87f5aa0ff57750945a7936786784b74d9.png";
import imgRectangle4 from "figma:asset/1756e49d365b8988d28cb418bb75c13085be2df9.png";
import imgRectangle5 from "figma:asset/95a5f39cb014c72bfcc06474d8a002863a68561e.png";
import imgRectangle6 from "figma:asset/3b6d2b2e8f979034d19c6ccc948c7849579b8adf.png";
import imgRectangle7 from "figma:asset/f61f12346f3d30f50a807a55154593765b83e1a9.png";

type NewsItem = {
  title: string;
  image: string;
  author: string;
  comments: number;
};

const NEWS: NewsItem[] = [
  {
    title: 'סיכום השבוע במשחקים: ד"ש ממגילת אסתר',
    image: imgRectangle2,
    author: "ניצן פינקו",
    comments: 26,
  },
  {
    title: "סיכום השבוע במשחקים: בין בשאר אל-אסד לריקי גל",
    image: imgRectangle3,
    author: "ניצן פינקו",
    comments: 26,
  },
  {
    title: 'סיכום השבוע במשחקים: ידעתם שהחיה שנחה על "סיפור כיסוי" מתחלפת?',
    image: imgRectangle4,
    author: "ניצן פינקו",
    comments: 26,
  },
  {
    title: "סיכום השבוע במשחקים: הצלחה נאה בסיפור כיסוי, אבל מה יהיה עם מרתה?",
    image: imgRectangle5,
    author: "ניצן פינקו",
    comments: 26,
  },
  {
    title: "סיכום השבוע במשחקים: קטשוף וסליחות",
    image: imgRectangle6,
    author: "ניצן פינקו",
    comments: 26,
  },
  {
    title: "סיכום השבוע במשחקים: ניר ברקת הוא לא יריב לוין, ואיזה שיא נשבר בניו יורק טיימס?",
    image: imgRectangle7,
    author: "ניצן פינקו",
    comments: 26,
  },
];

export default function NewsSection() {
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
        {NEWS.map((item, i) => (
          <NewsCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="bg-white rounded-[12px] overflow-hidden flex items-stretch h-[180px] sm:h-[220px] lg:h-[264px] transition-all hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] cursor-pointer">
      {/* Image on the RIGHT (RTL start — first in DOM) */}
      <div className="shrink-0 w-[45%] h-full bg-[#ececf0] rounded-l-[0] rounded-r-[12px] overflow-hidden">
        <img
          src={item.image}
          alt=""
          className="w-full h-full object-cover"
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

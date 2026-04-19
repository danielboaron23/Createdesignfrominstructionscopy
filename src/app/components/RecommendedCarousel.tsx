import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

type RecItem = {
  category: string;
  categoryColor: string;
  title: string;
  blurb: string;
  image: string;
  sponsored?: boolean;
};

const ITEMS: RecItem[] = [
  {
    category: "תיירות",
    categoryColor: "#22a06b",
    title: "5 יעדים נסתרים בישראל שעוד לא גיליתם",
    blurb: "מהגליל העליון ועד הנגב — מקומות קסומים הרחוקים מההמון",
    image: "https://picsum.photos/seed/travel-israel/800/500",
  },
  {
    category: "מטבח",
    categoryColor: "#e9a937",
    title: "המתכון המנצח לחלה של שישי — תוך שעה",
    blurb: "ללא לישה מייגעת, עם חמאה רכה וריח שממלא את הבית",
    image: "https://picsum.photos/seed/bread-bake/800/500",
  },
  {
    category: "טכנולוגיה",
    categoryColor: "#226ee9",
    title: "האפליקציות החדשות שישנו לכם את היום",
    blurb: "מכלי הפרודוקטיביות של 2026 שתרצו להתקין עכשיו",
    image: "https://picsum.photos/seed/tech-apps/800/500",
    sponsored: true,
  },
  {
    category: "בריאות",
    categoryColor: "#a30c15",
    title: "7 הרגלי בוקר שיגבירו לכם את האנרגיה",
    blurb: "רופאי משפחה ממליצים: שינויים קטנים שעושים הבדל גדול",
    image: "https://picsum.photos/seed/morning-coffee/800/500",
  },
  {
    category: "עיצוב",
    categoryColor: "#7a3ce8",
    title: "הבית שכובש את רשתות החברתיות",
    blurb: "דירת סטודיו של 40 מ״ר בתל אביב מוכיחה שגודל לא משנה",
    image: "https://picsum.photos/seed/home-design/800/500",
  },
  {
    category: "תרבות",
    categoryColor: "#d4183d",
    title: "סדרת הטלוויזיה הישראלית שכולם מדברים עליה",
    blurb: "מה סוד ההצלחה? חמישה פרקים, שתי עונות ועלילה שלא תרפה",
    image: "https://picsum.photos/seed/tv-culture/800/500",
  },
  {
    category: "ספורט",
    categoryColor: "#22a06b",
    title: "הכוכב הצעיר שהפתיע את אירופה",
    blurb: "בן 19, חתם בליגה אדירה ומבטיח להביא אותנו למונדיאל",
    image: "https://picsum.photos/seed/soccer-star/800/500",
    sponsored: true,
  },
  {
    category: "פיננסים",
    categoryColor: "#1a3a7a",
    title: "מה לעשות עם הכסף שלכם בשנה הקרובה?",
    blurb: "יועצים פיננסיים מסבירים: השקעות חכמות מול חיסכון שקט",
    image: "https://picsum.photos/seed/finance-2026/800/500",
  },
];

export default function RecommendedCarousel() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Header row */}
      <div className="mb-5 sm:mb-6 lg:mb-8 flex items-end justify-between">
        <div className="flex flex-col items-start gap-[4px]">
          <div className="bg-[#226ee9] h-[10px] w-[40px] sm:h-[12px] sm:w-[49px]" />
          <h2 className="font-bold text-[#2d2d2d] text-[22px] sm:text-[26px] lg:text-[32px] leading-tight">
            מרחבי הרשת
          </h2>
        </div>
        <span className="text-[11px] sm:text-[12px] text-[#737373] flex items-center gap-1.5">
          <span
            className="inline-block w-[14px] h-[14px] rounded-full bg-[#f7b439]"
            aria-hidden="true"
          />
          Recommended by
        </span>
      </div>

      {/* Carousel */}
      <div className="rec-carousel relative" dir="ltr">
        <Swiper
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          spaceBetween={16}
          speed={600}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".rec-next",
            prevEl: ".rec-prev",
          }}
          breakpoints={{
            // Tailwind-ish breakpoints
            0: { slidesPerView: 1.1, spaceBetween: 12 },
            640: { slidesPerView: 1.8, spaceBetween: 16 },
            1024: { slidesPerView: 2.6, spaceBetween: 20 },
            1280: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {ITEMS.map((item, i) => (
            <SwiperSlide key={i} className="!h-auto">
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom arrow buttons — RTL-aware:
            "הבא" (next) points LEFT and sits on the LEFT edge
            "הקודם" (prev) points RIGHT and sits on the RIGHT edge */}
        <button
          aria-label="הקודם"
          className="rec-prev hidden sm:flex absolute right-2 top-[45%] -translate-y-1/2 z-10 w-[44px] h-[44px] rounded-full bg-white/95 backdrop-blur shadow-[0_4px_12px_rgba(0,0,0,0.12)] items-center justify-center hover:bg-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 6l6 6-6 6"
              stroke="#2d2d2d"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          aria-label="הבא"
          className="rec-next hidden sm:flex absolute left-2 top-[45%] -translate-y-1/2 z-10 w-[44px] h-[44px] rounded-full bg-white/95 backdrop-blur shadow-[0_4px_12px_rgba(0,0,0,0.12)] items-center justify-center hover:bg-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 6l-6 6 6 6"
              stroke="#2d2d2d"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Swiper styling overrides to match site palette */}
      <style>{`
        .rec-carousel .swiper {
          padding-top: 6px;
          padding-bottom: 48px;
        }
        .rec-carousel .swiper-slide {
          transition: transform 0.5s ease, opacity 0.5s ease;
          opacity: 0.6;
        }
        .rec-carousel .swiper-slide-active,
        .rec-carousel .swiper-slide-prev,
        .rec-carousel .swiper-slide-next {
          opacity: 1;
        }
        .rec-carousel .swiper-pagination {
          bottom: 8px !important;
        }
        .rec-carousel .swiper-pagination-bullet {
          background: #c4c4c4;
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .rec-carousel .swiper-pagination-bullet-active {
          background: #226ee9;
          width: 24px;
          border-radius: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .rec-carousel .swiper-slide {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

function Card({ item }: { item: RecItem }) {
  return (
    <article
      className="group relative bg-white rounded-[14px] overflow-hidden h-full cursor-pointer transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.14)] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      dir="rtl"
    >
      {/* Image */}
      <div className="w-full aspect-[16/10] bg-[#ececf0] relative overflow-hidden">
        <img
          src={item.image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          width="800"
          height="500"
        />
        {item.sponsored && (
          <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-[4px] rounded">
            ממומן
          </span>
        )}
        {/* Category pill */}
        <span
          className="absolute top-2 right-2 text-white text-[11px] font-bold px-2.5 py-[4px] rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
          style={{ backgroundColor: item.categoryColor }}
        >
          {item.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-2">
        <h3
          className="font-bold text-[15px] sm:text-[16px] leading-[1.35] text-[#2d2d2d] line-clamp-2 text-right"
          dir="rtl"
        >
          {item.title}
        </h3>
        <p
          className="text-[13px] sm:text-[13.5px] leading-[1.45] text-[#5b5b5b] line-clamp-2 text-right"
          dir="rtl"
        >
          {item.blurb}
        </p>

        {/* Read-more affordance */}
        <div className="flex items-center justify-end gap-1 mt-1 text-[#226ee9] text-[12px] font-bold transition-transform duration-200 group-hover:-translate-x-1">
          <span>קרא עוד</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}

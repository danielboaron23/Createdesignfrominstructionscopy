import imgRectangle27 from "figma:asset/f8bcf42085fc602a7f420404250b5edd07b40020.png";

type RecItem = {
  category: string;
  title: string;
  image: string;
};

const REC_ITEMS: RecItem[] = [
  {
    category: "בריאות",
    title: "אפגניסטאן מסתירה את כישלונותיה במלחמה מול הטליבאן",
    image: imgRectangle27,
  },
  {
    category: "בריאות",
    title: "אפגניסטאן מסתירה את כישלונותיה במלחמה מול הטליבאן",
    image: imgRectangle27,
  },
  {
    category: "בריאות",
    title: "אפגניסטאן מסתירה את כישלונותיה במלחמה מול הטליבאן",
    image: imgRectangle27,
  },
  {
    category: "בריאות",
    title: "אפגניסטאן מסתירה את כישלונותיה במלחמה מול הטליבאן",
    image: imgRectangle27,
  },
];

export default function RecommendedSection() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Header row: title on right, "Recommended by" on left */}
      <div className="mb-5 sm:mb-6 lg:mb-8 flex items-end justify-between">
        <div className="flex flex-col items-start gap-[4px]">
          <div className="bg-[#226ee9] h-[10px] w-[40px] sm:h-[12px] sm:w-[49px]" />
          <h2 className="font-bold text-[#2d2d2d] text-[22px] sm:text-[26px] lg:text-[32px] leading-tight">
            מרחבי הרשת
          </h2>
        </div>
        <span className="text-[11px] sm:text-[12px] text-[#737373] flex items-center gap-1">
          Recommended by
          <span className="inline-block w-[14px] h-[14px] rounded-full bg-[#f7b439]" aria-hidden="true" />
        </span>
      </div>

      {/* Grid: 2 cols mobile, 2 cols tablet, 4 cols desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {REC_ITEMS.map((item, i) => (
          <RecCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}

function RecCard({ item }: { item: RecItem }) {
  return (
    <article className="bg-[#f3f3f3] rounded-[12px] overflow-hidden flex flex-col cursor-pointer transition-all hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
      <div className="w-full aspect-[16/10] bg-[#ececf0] relative">
        <img
          src={item.image}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          width="320"
          height="200"
        />
        <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-[3px] rounded">
          ממומן
        </span>
      </div>
      <div className="p-3 sm:p-4 flex flex-col gap-1" dir="rtl">
        <p className="leading-[1.35]">
          <span className="font-bold text-[#a30c15] text-[13px] sm:text-[14px]">
            {item.category} /{" "}
          </span>
          <span className="font-bold text-[#2d2d2d] text-[13px] sm:text-[14px]">
            {item.title}
          </span>
        </p>
      </div>
    </article>
  );
}

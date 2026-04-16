import imgRectangle18 from "figma:asset/b468fe1f59c2ed9c7ef3a2cab4fd006d08cfa2ad.png";
import imgRectangle19 from "figma:asset/c8f494e6316c0a5254f99b0601bd4324a561c8e0.png";
import imgRectangle20 from "figma:asset/581b66b1cffde581028a271bd3a9bdbf5296fe44.png";
import imgRectangle21 from "figma:asset/26e8d384c27556bf780614681a3736fdd21be15f.png";
import imgRectangle22 from "figma:asset/3e0bb0cb66ddf9690c925dcc6ef62e16d6180289.png";
import imgRectangle23 from "figma:asset/99c713a0193a0163bb1f1794a205c8ae472346bb.png";
import imgRectangle24 from "figma:asset/64bac39cbebe016b41d28d7deb8d47c97bf0417d.png";
import imgRectangle25 from "figma:asset/d072cf7f47e03e6e12c5ba7c5426e6f606d9c968.png";
import imgRectangle26 from "figma:asset/899e148af0dc83343a399c3eca87404e530a278f.png";

function Title() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[72px] items-end relative shrink-0" data-name="Title">
      <div className="bg-[#226ee9] h-[16px] shrink-0 w-[49px]" />
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[52px] not-italic relative shrink-0 text-[#2d2d2d] text-[42px] text-right whitespace-nowrap" dir="auto">
        משחקים
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[20px] h-[72px] items-end justify-end relative shrink-0">
      <Title />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-end leading-[32px] not-italic relative shrink-0 text-[#2d2d2d] text-center w-full">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] overflow-hidden relative shrink-0 text-[24px] text-ellipsis w-full" dir="rtl">
        איזה שיר?
      </p>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] min-h-[56px] overflow-hidden relative shrink-0 text-[21px] text-ellipsis w-full" dir="rtl">
        אבודים בתרגום? אפשר לשמוע רמז
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-end leading-[32px] not-italic relative shrink-0 text-[#2d2d2d] text-center w-full">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] overflow-hidden relative shrink-0 text-[24px] text-ellipsis w-full" dir="rtl">
        סיפור כיסוי
      </p>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] min-h-[56px] overflow-hidden relative shrink-0 text-[21px] text-ellipsis w-full" dir="rtl">
        בכמה צעדים תצליחו למלא את הלוח?
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-end leading-[32px] not-italic relative shrink-0 text-[#2d2d2d] text-center w-full">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] overflow-hidden relative shrink-0 text-[24px] text-ellipsis w-full" dir="rtl">
        מה הקשר
      </p>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] min-h-[56px] overflow-hidden relative shrink-0 text-[21px] text-ellipsis w-full" dir="rtl">
        חברו ארבע קבוצות של ארבע מילים
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-end leading-[32px] not-italic relative shrink-0 text-[#2d2d2d] text-center w-full">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] overflow-hidden relative shrink-0 text-[24px] text-ellipsis w-full" dir="rtl">
        5 אותיות
      </p>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] min-h-[56px] overflow-hidden relative shrink-0 text-[21px] text-ellipsis w-full" dir="rtl">
        לא תאמינו כמה מילים בנות 5 אותיות יש בעברית
      </p>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[20px] items-start justify-end relative shrink-0 w-[1468px]" data-name="01">
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-center overflow-clip px-[40px] py-[28px] relative rounded-[12px] shrink-0 w-[352px]" data-name="Section / Games">
        <div className="relative shrink-0 size-[88px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle18} />
        </div>
        <Frame />
        <div className="bg-[#5b5b5b] content-stretch flex gap-[4px] h-[36px] items-center justify-center overflow-clip px-[16px] py-[4px] relative rounded-[3px] shrink-0" data-name="Button">
          <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap" dir="auto">
            רוצה לשחק
          </p>
        </div>
      </div>
      <div className="bg-white relative rounded-[12px] self-stretch shrink-0 w-[352px]" data-name="Section / Games">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[16px] items-center px-[40px] py-[28px] relative size-full">
            <div className="relative shrink-0 size-[88px]">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle19} />
            </div>
            <Frame1 />
            <div className="bg-[#5b5b5b] content-stretch flex gap-[4px] h-[36px] items-center justify-center overflow-clip px-[16px] py-[4px] relative rounded-[3px] shrink-0" data-name="Button">
              <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap" dir="auto">
                רוצה לשחק
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-center overflow-clip px-[40px] py-[28px] relative rounded-[12px] shrink-0 w-[352px]" data-name="Section / Games">
        <div className="relative shrink-0 size-[88px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle20} />
        </div>
        <Frame2 />
        <div className="bg-[#5b5b5b] content-stretch flex gap-[4px] h-[36px] items-center justify-center overflow-clip px-[16px] py-[4px] relative rounded-[3px] shrink-0" data-name="Button">
          <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap" dir="auto">
            רוצה לשחק
          </p>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-center overflow-clip px-[40px] py-[28px] relative rounded-[12px] shrink-0 w-[352px]" data-name="Section / Games">
        <div className="relative shrink-0 size-[88px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle21} />
        </div>
        <Frame3 />
        <div className="bg-[#5b5b5b] content-stretch flex gap-[4px] h-[36px] items-center justify-center overflow-clip px-[16px] py-[4px] relative rounded-[3px] shrink-0" data-name="Button">
          <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap" dir="auto">
            רוצה לשחק
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-end leading-[32px] not-italic relative shrink-0 text-[#2d2d2d] text-center w-full">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] overflow-hidden relative shrink-0 text-[24px] text-ellipsis w-full" dir="rtl">{`20 שאלות `}</p>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] min-h-[56px] overflow-hidden relative shrink-0 text-[21px] text-ellipsis w-full" dir="rtl">
        הטקס הקבוע שלכם בפרלמנט שישי
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-end leading-[32px] not-italic relative shrink-0 text-[#2d2d2d] text-center w-full">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] overflow-hidden relative shrink-0 text-[24px] text-ellipsis w-full" dir="rtl">
        סודוקו
      </p>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] min-h-[56px] overflow-hidden relative shrink-0 text-[21px] text-ellipsis w-full" dir="rtl">
        שלוש שורות, שלושה טורים, שלוש רמות קושי
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-end leading-[32px] not-italic relative shrink-0 text-[#2d2d2d] text-center w-full">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] overflow-hidden relative shrink-0 text-[24px] text-ellipsis w-full" dir="rtl">
        מי אני?
      </p>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] min-h-[56px] overflow-hidden relative shrink-0 text-[21px] text-ellipsis w-full" dir="rtl">
        התמונה מפוקסלת והדמות לא ברורה. בכמה נסיונות תזהו אותה?
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-end leading-[32px] not-italic relative shrink-0 text-[#2d2d2d] text-center w-full">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] overflow-hidden relative shrink-0 text-[24px] text-ellipsis w-full" dir="rtl">
        הגיונית
      </p>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] min-h-[56px] overflow-hidden relative shrink-0 text-[21px] text-ellipsis w-full" dir="rtl">
        חידת הגיון מילולית יומית
      </p>
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex gap-[20px] items-start justify-end relative shrink-0" data-name="02">
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-center overflow-clip px-[40px] py-[28px] relative rounded-[12px] shrink-0 w-[352px]" data-name="Section / Games">
        <div className="relative shrink-0 size-[88px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle22} />
        </div>
        <Frame4 />
        <div className="bg-[#5b5b5b] content-stretch flex gap-[4px] h-[36px] items-center justify-center overflow-clip px-[16px] py-[4px] relative rounded-[3px] shrink-0" data-name="Button">
          <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap" dir="auto">
            רוצה לשחק
          </p>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-center overflow-clip px-[40px] py-[28px] relative rounded-[12px] shrink-0 w-[352px]" data-name="Section / Games">
        <div className="relative shrink-0 size-[88px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle23} />
        </div>
        <Frame5 />
        <div className="bg-[#5b5b5b] content-stretch flex gap-[4px] h-[36px] items-center justify-center overflow-clip px-[16px] py-[4px] relative rounded-[3px] shrink-0" data-name="Button">
          <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap" dir="auto">
            רוצה לשחק
          </p>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-center overflow-clip px-[40px] py-[28px] relative rounded-[12px] shrink-0 w-[352px]" data-name="Section / Games">
        <div className="relative shrink-0 size-[88px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle24} />
        </div>
        <Frame6 />
        <div className="bg-[#5b5b5b] content-stretch flex gap-[4px] h-[36px] items-center justify-center overflow-clip px-[16px] py-[4px] relative rounded-[3px] shrink-0" data-name="Button">
          <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap" dir="auto">
            רוצה לשחק
          </p>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-center overflow-clip px-[40px] py-[28px] relative rounded-[12px] shrink-0 w-[352px]" data-name="Section / Games">
        <div className="relative shrink-0 size-[88px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle25} />
        </div>
        <Frame7 />
        <div className="bg-[#5b5b5b] content-stretch flex gap-[4px] h-[36px] items-center justify-center overflow-clip px-[16px] py-[4px] relative rounded-[3px] shrink-0" data-name="Button">
          <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap" dir="auto">
            רוצה לשחק
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-end leading-[32px] not-italic relative shrink-0 text-[#2d2d2d] text-center w-full">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] overflow-hidden relative shrink-0 text-[24px] text-ellipsis w-full" dir="rtl">
        לא לציטוט
      </p>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] min-h-[56px] overflow-hidden relative shrink-0 text-[21px] text-ellipsis w-full" dir="rtl">
        שלוש שורות, שלושה טורים, שלוש רמות קושי
      </p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-end leading-[32px] not-italic relative shrink-0 text-[#2d2d2d] text-center w-full">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] overflow-hidden relative shrink-0 text-[24px] text-ellipsis w-full" dir="rtl">{`20 שאלות `}</p>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] min-h-[56px] overflow-hidden relative shrink-0 text-[21px] text-ellipsis w-full" dir="rtl">
        הטקס הקבוע שלכם בפרלמנט שישי
      </p>
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex gap-[12px] items-start justify-end relative shrink-0 w-full" data-name="03">
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-center overflow-clip px-[40px] py-[28px] relative rounded-[12px] shrink-0 w-[352px]" data-name="Section / Games">
        <div className="relative shrink-0 size-[88px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle26} />
        </div>
        <Frame8 />
        <div className="bg-[#5b5b5b] content-stretch flex gap-[4px] h-[36px] items-center justify-center overflow-clip px-[16px] py-[4px] relative rounded-[3px] shrink-0" data-name="Button">
          <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap" dir="auto">
            רוצה לשחק
          </p>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-center overflow-clip px-[40px] py-[28px] relative rounded-[12px] shrink-0 w-[352px]" data-name="Section / Games">
        <div className="relative shrink-0 size-[88px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle22} />
        </div>
        <Frame9 />
        <div className="bg-[#5b5b5b] content-stretch flex gap-[4px] h-[36px] items-center justify-center overflow-clip px-[16px] py-[4px] relative rounded-[3px] shrink-0" data-name="Button">
          <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-center text-white whitespace-nowrap" dir="auto">
            רוצה לשחק
          </p>
        </div>
      </div>
    </div>
  );
}

function GameMain() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-end relative shrink-0 w-[1468px]" data-name="Game_Main">
      <Component />
      <Component1 />
      <Component2 />
    </div>
  );
}

export default function MainListXxl() {
  return (
    <div className="content-stretch flex flex-col gap-[28px] items-end relative size-full" data-name="Main List XXL">
      <div className="content-stretch flex h-[72px] items-start justify-end relative shrink-0 w-[1468px]" data-name="Horizontal Title-Section Page">
        <Frame10 />
      </div>
      <GameMain />
    </div>
  );
}
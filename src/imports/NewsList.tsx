import svgPaths from "./svg-o9wkpx7gfg";
import imgRectangle2 from "figma:asset/734a2e522d4d80b55bfa8930990722566a35544a.png";
import imgRectangle3 from "figma:asset/752143c87f5aa0ff57750945a7936786784b74d9.png";
import imgRectangle4 from "figma:asset/1756e49d365b8988d28cb418bb75c13085be2df9.png";
import imgRectangle5 from "figma:asset/95a5f39cb014c72bfcc06474d8a002863a68561e.png";
import imgRectangle6 from "figma:asset/3b6d2b2e8f979034d19c6ccc948c7849579b8adf.png";
import imgRectangle7 from "figma:asset/f61f12346f3d30f50a807a55154593765b83e1a9.png";

function Comment() {
  return (
    <div className="content-stretch flex gap-[2px] h-[20px] items-center justify-end relative shrink-0" data-name="Comment">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#737373] text-[12px] text-right whitespace-nowrap">26</p>
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Chat">
        <div className="absolute inset-[16.68%_12.5%_8.4%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 8.99078">
            <path d={svgPaths.p5c710c0} fill="var(--fill-0, #737373)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Name() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-end relative shrink-0" data-name="Name">
      <div className="relative shrink-0 size-[4px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #737373)" id="Ellipse 1" r="2" />
        </svg>
      </div>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5b5b5b] text-[12px] text-right whitespace-nowrap" dir="auto">
        ניצן פינקו
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end justify-between min-h-px min-w-px relative w-full">
      <div className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#2d2d2d] text-[21px] text-right w-full">
        <p className="leading-[32px] mb-0" dir="auto">{`סיכום השבוע במשחקים: ד"ש ממגילת אסתר`}</p>
        <p className="leading-[32px]">&nbsp;</p>
      </div>
      <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="Teaser-Credit">
        <Comment />
        <Name />
      </div>
    </div>
  );
}

function Texts() {
  return (
    <div className="content-stretch flex flex-col h-[264px] items-end p-[12px] relative shrink-0 w-[249px]" data-name="texts">
      <Frame />
    </div>
  );
}

function Comment1() {
  return (
    <div className="content-stretch flex gap-[2px] h-[20px] items-center justify-end relative shrink-0" data-name="Comment">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#737373] text-[12px] text-right whitespace-nowrap">26</p>
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Chat">
        <div className="absolute inset-[16.68%_12.5%_8.4%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 8.99078">
            <path d={svgPaths.p5c710c0} fill="var(--fill-0, #737373)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Name1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-end relative shrink-0" data-name="Name">
      <div className="relative shrink-0 size-[4px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #737373)" id="Ellipse 1" r="2" />
        </svg>
      </div>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5b5b5b] text-[12px] text-right whitespace-nowrap" dir="auto">
        ניצן פינקו
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end justify-between min-h-px min-w-px relative w-full">
      <div className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#2d2d2d] text-[21px] text-right w-full">
        <p className="leading-[32px] mb-0" dir="auto">
          סיכום השבוע במשחקים: בין בשאר אל-אסד לריקי גל
        </p>
        <p className="leading-[32px]">&nbsp;</p>
      </div>
      <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="Teaser-Credit">
        <Comment1 />
        <Name1 />
      </div>
    </div>
  );
}

function Texts1() {
  return (
    <div className="content-stretch flex flex-col h-[264px] items-end p-[12px] relative shrink-0 w-[249px]" data-name="texts">
      <Frame1 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[20px] items-start justify-center px-[6px] relative rounded-[12px] shrink-0 w-[1468px]" data-name="Row 1">
      <div className="content-stretch flex flex-col gap-[12px] items-end relative shrink-0 w-[228px]" data-name="Vertical Title">
        <div className="content-stretch flex flex-col gap-[4px] items-end relative shrink-0 w-[163px]" data-name="Titles">
          <div className="bg-[#226ee9] h-[12px] shrink-0 w-[49px]" />
          <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[36px] min-w-full not-italic relative shrink-0 text-[#2d2d2d] text-[28px] text-right w-[min-content]" dir="auto">
            סיכום שבועי
          </p>
        </div>
      </div>
      <div className="bg-white content-stretch flex items-start justify-end relative rounded-[12px] shrink-0 w-[601px]" data-name="Teaser/Section/w pic">
        <div className="h-[264px] relative rounded-br-[12px] rounded-tr-[12px] shrink-0 w-[352px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-br-[12px] rounded-tr-[12px] size-full" src={imgRectangle2} />
        </div>
        <Texts />
      </div>
      <div className="bg-white content-stretch flex items-start justify-end relative rounded-[12px] shrink-0 w-[601px]" data-name="Section / Picture">
        <div className="h-[264px] relative rounded-br-[12px] rounded-tr-[12px] shrink-0 w-[352px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-br-[12px] rounded-tr-[12px] size-full" src={imgRectangle3} />
        </div>
        <Texts1 />
      </div>
    </div>
  );
}

function Comment2() {
  return (
    <div className="content-stretch flex gap-[2px] h-[20px] items-center justify-end relative shrink-0" data-name="Comment">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#737373] text-[12px] text-right whitespace-nowrap">26</p>
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Chat">
        <div className="absolute inset-[16.68%_12.5%_8.4%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 8.99078">
            <path d={svgPaths.p5c710c0} fill="var(--fill-0, #737373)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Name2() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-end relative shrink-0" data-name="Name">
      <div className="relative shrink-0 size-[4px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #737373)" id="Ellipse 1" r="2" />
        </svg>
      </div>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5b5b5b] text-[12px] text-right whitespace-nowrap" dir="auto">
        ניצן פינקו
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end justify-between min-h-px min-w-px relative w-full">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#2d2d2d] text-[21px] text-right w-full" dir="auto">
        סיכום השבוע במשחקים: הצלחה נאה בסיפור כיסוי, אבל מה יהיה עם מרתה?
      </p>
      <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="Teaser-Credit">
        <Comment2 />
        <Name2 />
      </div>
    </div>
  );
}

function Texts2() {
  return (
    <div className="content-stretch flex flex-col h-[264px] items-end p-[12px] relative shrink-0 w-[249px]" data-name="texts">
      <Frame2 />
    </div>
  );
}

function Comment3() {
  return (
    <div className="content-stretch flex gap-[2px] h-[20px] items-center justify-end relative shrink-0" data-name="Comment">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#737373] text-[12px] text-right whitespace-nowrap">26</p>
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Chat">
        <div className="absolute inset-[16.68%_12.5%_8.4%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 8.99078">
            <path d={svgPaths.p5c710c0} fill="var(--fill-0, #737373)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Name3() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-end relative shrink-0" data-name="Name">
      <div className="relative shrink-0 size-[4px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #737373)" id="Ellipse 1" r="2" />
        </svg>
      </div>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5b5b5b] text-[12px] text-right whitespace-nowrap" dir="auto">
        ניצן פינקו
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end justify-between min-h-px min-w-px relative w-full">
      <div className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#2d2d2d] text-[21px] text-right w-full">
        <p className="leading-[32px] mb-0" dir="auto">{`סיכום השבוע במשחקים: ידעתם שהחיה שנחה על "סיפור כיסוי" מתחלפת?`}</p>
        <p className="leading-[32px]">&nbsp;</p>
      </div>
      <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="Teaser-Credit">
        <Comment3 />
        <Name3 />
      </div>
    </div>
  );
}

function Texts3() {
  return (
    <div className="content-stretch flex flex-col h-[264px] items-end p-[12px] relative shrink-0 w-[249px]" data-name="texts">
      <Frame3 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[1468px]" data-name="content">
      <div className="bg-white content-stretch flex items-start justify-end relative rounded-[12px] shrink-0 w-[601px]" data-name="Section / Picture">
        <div className="h-[264px] relative rounded-br-[12px] rounded-tr-[12px] shrink-0 w-[352px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-br-[12px] rounded-tr-[12px] size-full" src={imgRectangle4} />
        </div>
        <Texts2 />
      </div>
      <div className="bg-white content-stretch flex items-start justify-end relative rounded-[12px] shrink-0 w-[601px]" data-name="Section / Picture">
        <div className="h-[264px] relative rounded-br-[12px] rounded-tr-[12px] shrink-0 w-[352px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-br-[12px] rounded-tr-[12px] size-full" src={imgRectangle5} />
        </div>
        <Texts3 />
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start relative rounded-[12px] shrink-0 w-[1468px]" data-name="Row 2">
      <Content />
    </div>
  );
}

function Comment4() {
  return (
    <div className="content-stretch flex gap-[2px] h-[20px] items-center justify-end relative shrink-0" data-name="Comment">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#737373] text-[12px] text-right whitespace-nowrap">26</p>
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Chat">
        <div className="absolute inset-[16.68%_12.5%_8.4%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 8.99078">
            <path d={svgPaths.p5c710c0} fill="var(--fill-0, #737373)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Name4() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-end relative shrink-0" data-name="Name">
      <div className="relative shrink-0 size-[4px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #737373)" id="Ellipse 1" r="2" />
        </svg>
      </div>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5b5b5b] text-[12px] text-right whitespace-nowrap" dir="auto">
        ניצן פינקו
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end justify-between min-h-px min-w-px relative w-full">
      <div className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#2d2d2d] text-[21px] text-right w-full">
        <p className="leading-[32px] mb-0" dir="auto">
          סיכום השבוע במשחקים: קטשוף וסליחות
        </p>
        <p className="leading-[32px]">&nbsp;</p>
      </div>
      <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="Teaser-Credit">
        <Comment4 />
        <Name4 />
      </div>
    </div>
  );
}

function Texts4() {
  return (
    <div className="content-stretch flex flex-col h-[264px] items-end p-[12px] relative shrink-0 w-[249px]" data-name="texts">
      <Frame4 />
    </div>
  );
}

function Comment5() {
  return (
    <div className="content-stretch flex gap-[2px] h-[20px] items-center justify-end relative shrink-0" data-name="Comment">
      <p className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#737373] text-[12px] text-right whitespace-nowrap">26</p>
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Chat">
        <div className="absolute inset-[16.68%_12.5%_8.4%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 8.99078">
            <path d={svgPaths.p5c710c0} fill="var(--fill-0, #737373)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Name5() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-end relative shrink-0" data-name="Name">
      <div className="relative shrink-0 size-[4px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #737373)" id="Ellipse 1" r="2" />
        </svg>
      </div>
      <p className="font-['Open_Sans_Hebrew:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5b5b5b] text-[12px] text-right whitespace-nowrap" dir="auto">
        ניצן פינקו
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end justify-between min-h-px min-w-px relative w-full">
      <div className="font-['Open_Sans_Hebrew:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#2d2d2d] text-[21px] text-right w-full">
        <p className="leading-[32px] mb-0" dir="auto">
          סיכום השבוע במשחקים: ניר ברקת הוא לא יריב לוין, ואיזה שיא נשבר בניו יורק טיימס?
        </p>
        <p className="leading-[32px]">&nbsp;</p>
      </div>
      <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="Teaser-Credit">
        <Comment5 />
        <Name5 />
      </div>
    </div>
  );
}

function Texts5() {
  return (
    <div className="content-stretch flex flex-col h-[264px] items-end p-[12px] relative shrink-0 w-[249px]" data-name="texts">
      <Frame5 />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[1468px]" data-name="content">
      <div className="bg-white content-stretch flex items-start justify-end relative rounded-[12px] shrink-0 w-[601px]" data-name="Section / Picture">
        <div className="h-[264px] relative rounded-br-[12px] rounded-tr-[12px] shrink-0 w-[352px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-br-[12px] rounded-tr-[12px] size-full" src={imgRectangle6} />
        </div>
        <Texts4 />
      </div>
      <div className="bg-white content-stretch flex items-start justify-end relative rounded-[12px] shrink-0 w-[601px]" data-name="Section / Picture">
        <div className="h-[264px] relative rounded-br-[12px] rounded-tr-[12px] shrink-0 w-[352px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-br-[12px] rounded-tr-[12px] size-full" src={imgRectangle7} />
        </div>
        <Texts5 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-start relative rounded-[12px] shrink-0 w-[1468px]" data-name="Row 3">
      <Content1 />
    </div>
  );
}

export default function NewsList() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative size-full" data-name="News-List">
      <Row />
      <Row1 />
      <Row2 />
    </div>
  );
}
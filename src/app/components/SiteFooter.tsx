const SOCIAL_ICONS: { label: string; path: string }[] = [
  {
    label: "Facebook",
    path: "M13 22v-8h3l.5-3.5H13V8.5c0-1 .3-1.7 1.7-1.7h1.8V3.8C16 3.7 14.9 3.5 13.7 3.5c-2.7 0-4.5 1.6-4.5 4.6V10.5H6V14h3.2v8H13z",
  },
  {
    label: "X",
    path: "M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.5L4.7 21H1.5l7.5-8.5L1 3h6.6l4.5 6 5.4-6z",
  },
  {
    label: "Instagram",
    path: "M12 3c-2.4 0-2.7 0-3.7.1-1 0-1.6.2-2.2.4a4.5 4.5 0 0 0-1.6 1 4.5 4.5 0 0 0-1 1.6c-.2.6-.4 1.3-.4 2.3C3 9.3 3 9.6 3 12s0 2.7.1 3.7c0 1 .2 1.6.4 2.2.2.7.5 1.2 1 1.6.5.5 1 .8 1.6 1 .6.3 1.3.4 2.3.5C9.3 21 9.6 21 12 21s2.7 0 3.7-.1c1-.1 1.6-.2 2.2-.5.7-.2 1.2-.5 1.6-1 .5-.4.8-1 1-1.6.3-.6.4-1.3.5-2.2 0-1 .1-1.3.1-3.7s0-2.7-.1-3.6c-.1-1-.2-1.7-.5-2.3a4.5 4.5 0 0 0-1-1.6 4.5 4.5 0 0 0-1.6-1c-.6-.2-1.3-.4-2.2-.4C14.7 3 14.4 3 12 3zm0 1.6c2.3 0 2.6 0 3.6.1.8 0 1.3.2 1.6.3.4.2.7.4 1 .7s.5.6.6 1c.2.4.3.8.3 1.7 0 .9.1 1.2.1 3.6s0 2.6-.1 3.6c0 .9-.1 1.3-.3 1.7-.1.4-.3.7-.6 1s-.6.5-1 .6c-.3.2-.8.3-1.6.3-1 .1-1.3.1-3.6.1s-2.6 0-3.6-.1c-.9 0-1.3-.1-1.7-.3-.4-.1-.7-.3-1-.6s-.5-.6-.6-1c-.2-.4-.3-.8-.3-1.7-.1-1-.1-1.3-.1-3.6s0-2.7.1-3.6c0-.9.1-1.3.3-1.7.1-.4.3-.7.6-1s.6-.5 1-.6c.4-.2.8-.3 1.7-.3 1-.1 1.3-.1 3.6-.1zm0 2.7a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z",
  },
  {
    label: "WhatsApp",
    path: "M20 4A11 11 0 0 0 4 20l-1 4 4-1A11 11 0 0 0 20 4zM12 21a9 9 0 0 1-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3A9 9 0 1 1 21 12a9 9 0 0 1-9 9zm5-6.3c-.3-.2-1.7-.8-2-.9-.2 0-.4 0-.6.2l-.8 1c-.2.2-.3.2-.5.1-.3-.1-1.3-.5-2.5-1.5-1-.8-1.6-1.8-1.7-2.1 0-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3.2-.5s0-.3 0-.5L9 6.5c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4 0 1.5 1 2.8 1.2 3 .2.2 2.1 3.2 5.1 4.5 2.4 1 2.9 1 3.5 1 .5-.1 1.7-.8 2-1.4.2-.7.2-1.2.1-1.4l-.6-.3z",
  },
];

const FOOTER_LINKS = [
  "מודעות",
  "הכחשה",
  "אודות הארץ",
  "צור קשר",
  "דרושים",
  "עשה מינוי",
  "שאלות ותשובות",
  "ביטול מינוי דיגיטלי",
  "פרסם אצלנו",
];

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white mt-6 sm:mt-8 lg:mt-12">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col gap-6">
          {/* Row: social icons + subscribe + logo */}
          <div className="flex flex-col sm:flex-row-reverse sm:items-center sm:justify-between gap-4">
            {/* Logo (at the RTL start / right) */}
            <div
              className="font-bold text-[20px] text-white self-end sm:self-auto"
              style={{ fontFamily: "'Arial Hebrew', serif" }}
            >
              הארץ
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-5">
              {SOCIAL_ICONS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  onClick={(e) => e.preventDefault()}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Subscribe CTA */}
            <button
              type="button"
              className="bg-[#226ee9] text-white text-[13px] font-bold px-4 py-2 rounded-[4px] self-end sm:self-auto hover:bg-[#1a5ed4] transition-colors"
            >
              הצג עוד
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/15" />

          {/* Nav links */}
          <nav
            className="flex flex-wrap gap-x-3 gap-y-2 justify-end text-[12px] sm:text-[13px]"
            dir="rtl"
          >
            {FOOTER_LINKS.map((link, i) => (
              <span key={i} className="flex items-center gap-3">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-white/85 hover:text-white transition-colors"
                >
                  {link}
                </a>
                {i < FOOTER_LINKS.length - 1 && (
                  <span className="text-white/30" aria-hidden="true">
                    |
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* Copyright */}
          <p
            className="text-[11px] sm:text-[12px] text-white/60 text-right leading-relaxed"
            dir="rtl"
          >
            כל הזכויות שמורות לידיעות והחדשות בעיתון הארץ. סקופים, מאמרים, פרשנויות ותחקירי עומק באתר
            <br />
            עיתון הארץ בע"מ
          </p>
        </div>
      </div>
    </footer>
  );
}

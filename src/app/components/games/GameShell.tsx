import React from "react";

type Props = {
  title: string;
  accent?: string; // Blue bar accent color
  onExit: () => void;
  rightSlot?: React.ReactNode; // For stats/timer
  children: React.ReactNode;
  /** Max-width of the main content area */
  maxWidth?: string;
};

/**
 * Shared layout shell for every game: sticky header with back button + title,
 * RTL-aware, safe-area aware, min-h-dvh bg.
 */
export default function GameShell({
  title,
  accent = "#226ee9",
  onExit,
  rightSlot,
  children,
  maxWidth = "720px",
}: Props) {
  return (
    <div
      dir="rtl"
      className="min-h-dvh w-full bg-[#f3f3f3] flex flex-col items-center"
      style={{
        fontFamily: "'Open Sans Hebrew', 'Arial Hebrew', sans-serif",
        touchAction: "manipulation",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Sticky header */}
      <header className="w-full bg-white border-b border-[#e5e5e5] sticky top-0 z-20">
        <div className="mx-auto w-full max-w-[1200px] flex items-center justify-between px-4 sm:px-6 lg:px-8 h-[56px] sm:h-[60px]">
          <button
            onClick={onExit}
            className="flex items-center gap-[6px] text-[#2d2d2d] text-[14px] font-bold hover:text-[#226ee9] transition-colors min-h-[44px] min-w-[44px] px-2 -mx-2"
            aria-label="חזרה לעמוד הבית"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">חזרה למשחקים</span>
            <span className="sm:hidden">חזרה</span>
          </button>

          <div className="flex items-center gap-[8px] sm:gap-[10px]">
            {rightSlot && <div className="flex items-center">{rightSlot}</div>}
            <div className="h-[12px] w-[36px] sm:h-[16px] sm:w-[49px]" style={{ backgroundColor: accent }} />
            <h1 className="text-[#2d2d2d] text-[20px] sm:text-[24px] lg:text-[28px] font-bold leading-none">
              {title}
            </h1>
          </div>
        </div>
      </header>

      <main
        className="w-full flex flex-col items-center gap-4 sm:gap-5 px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
        style={{ maxWidth }}
      >
        {children}
      </main>
    </div>
  );
}

/** Reusable stat pill for game headers (mistakes/time/score) */
export function StatPill({
  label,
  value,
  highlight,
  mono,
}: {
  label: string;
  value: string;
  highlight?: string;
  mono?: boolean;
}) {
  return (
    <div className="bg-white rounded-[8px] py-1.5 px-2.5 sm:py-2 sm:px-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="text-[10px] sm:text-[11px] text-[#737373] font-normal leading-tight">{label}</div>
      <div
        className={"text-[14px] sm:text-[16px] font-bold leading-tight mt-0.5 " + (mono ? "tabular-nums" : "")}
        style={highlight ? { color: highlight } : undefined}
      >
        {value}
      </div>
    </div>
  );
}

/** Primary button (dark, pill-ish) */
export function PrimaryButton({
  children,
  onClick,
  disabled,
  fullWidth,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={
        "min-h-[44px] px-5 sm:px-6 rounded-[6px] text-[14px] sm:text-[15px] font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#226ee9] focus-visible:ring-offset-2 " +
        (fullWidth ? "w-full " : "") +
        (disabled
          ? "bg-[#c4c4c4] text-white cursor-not-allowed"
          : "bg-[#2d2d2d] text-white hover:bg-[#1a1a1a] active:scale-[0.98] cursor-pointer")
      }
    >
      {children}
    </button>
  );
}

/** Secondary (outline) button */
export function SecondaryButton({
  children,
  onClick,
  disabled,
  fullWidth,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        "min-h-[44px] px-5 sm:px-6 rounded-[6px] text-[14px] sm:text-[15px] font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#226ee9] focus-visible:ring-offset-2 " +
        (fullWidth ? "w-full " : "") +
        (disabled
          ? "bg-[#ececf0] text-[#c4c4c4] cursor-not-allowed"
          : "bg-white text-[#2d2d2d] border border-[#e5e5e5] hover:bg-[#ececf0] active:scale-[0.98] cursor-pointer")
      }
    >
      {children}
    </button>
  );
}

/** Full-card overlay used for win/lose/intro states */
export function GameOverlay({
  emoji,
  title,
  subtitle,
  children,
}: {
  emoji?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full bg-white rounded-[12px] p-6 sm:p-8 flex flex-col items-center gap-3 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      {emoji && <div className="text-[56px] leading-none" aria-hidden="true">{emoji}</div>}
      <h2 className="text-[24px] sm:text-[28px] text-[#2d2d2d] font-bold">{title}</h2>
      {subtitle && <p className="text-[14px] sm:text-[16px] text-[#5b5b5b] leading-relaxed">{subtitle}</p>}
      {children && <div className="w-full flex flex-col sm:flex-row gap-2 mt-3 justify-center">{children}</div>}
    </div>
  );
}

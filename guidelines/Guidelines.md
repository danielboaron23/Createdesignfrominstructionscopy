# System Guidelines

* This is a **Hebrew (RTL) web page**. All layouts, text alignment, and reading direction must be right-to-left. Apply `dir="rtl"` globally on the root element.
* Use `direction: rtl` and `text-align: right` as the default for all text elements. Never default to LTR.
* All flex containers that arrange items horizontally must use `flex-direction: row` with items flowing from right to left. Use `justify-content: flex-end` as the default for row containers.
* Use responsive, well-structured layouts with flexbox and grid by default.
* Only use absolute positioning when strictly necessary (e.g., overlaid badges, image captions).
* Keep code clean and refactor as you go.
* Follow the established spacing scale — never use arbitrary values.
* Maintain consistent border-radius across similar elements.
* Use semantic color tokens, not raw hex values.
* Font: always load **Open Sans Hebrew** as the primary font family. Fall back to `Arial Hebrew`, then `sans-serif`.
* All buttons, labels, and interactive text must use `Open Sans Hebrew Bold` (700 weight).

---

# Design System Guidelines

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-page` | `#f3f3f3` | Page background, Outbrain card background |
| `--color-bg-card` | `#ffffff` | Game cards, news teaser cards, default card surface |
| `--color-bg-emphasis` | `#2d2d2d` | Footer background, dark card surface |
| `--color-bg-outbrain` | `#f3f3f3` | Outbrain/sponsored content cards |
| `--color-border-subtle` | `#e7e7e7` | Outbrain card borders, popover borders |
| `--color-primary` | `#226ee9` | Section title accent bar (blue), primary CTA button |
| `--color-secondary` | `#a30c15` | Category label accent (e.g., "בריאות /") — red |
| `--color-text-primary` | `#2d2d2d` | Headlines, card titles, body text |
| `--color-text-secondary` | `#5b5b5b` | Subtext, author names, button text (dark), footer body |
| `--color-text-muted` | `#737373` | Comment counts, timestamps |
| `--color-text-dim` | `#8a8a8a` | Decorative bars, section subtitle accents |
| `--color-text-negative` | `#ffffff` | Text on dark backgrounds (buttons, footer) |
| `--color-neutral-darkest` | `#191919` | "ממומן" (sponsored) badge background |
| `--color-banner` | `#f7b439` | Top promotional banner background (yellow) |

## Typography

All fonts use `Open Sans Hebrew`. Apply `dir="rtl"` on all text elements. Never use LTR text direction on Hebrew content.

| Element | Font Family | Size | Weight | Line Height | Usage |
|---------|-------------|------|--------|-------------|-------|
| Section Title (XXL) | Open Sans Hebrew | 42px | 700 | 52px | Main section headings (e.g., "משחקים") |
| Card Title H1 | Open Sans Hebrew | 28px | 700 | 36px | Section title in "סיכום שבועי", Outbrain title |
| Card Title H2 | Open Sans Hebrew | 24px | 700 | 32px | Game card title |
| Body Large | Open Sans Hebrew | 21px | 400 | 32px | Game card subtitle/description |
| Body Large Bold | Open Sans Hebrew | 21px | 700 | 32px | News teaser headline |
| Body Medium | Open Sans Hebrew | 18px | 700 | 28px | Play button label ("רוצה לשחק"), Outbrain sponsored text |
| Body Small | Open Sans Hebrew | 14px | 700 | 20px | Masthead nav buttons (search, user, menu) |
| Caption Bold | Open Sans Hebrew | 12px | 700 | 20px | Comment counts |
| Caption Regular | Open Sans Hebrew | 12px | 400 | 20px | Author name |
| Sponsored Badge | Arial Regular | 16px | 400 | 24px | "ממומן" badge text |
| Footer Nav | Open Sans Hebrew | 18px | 700 | 28px | Footer navigation links |
| Footer Body | Open Sans Hebrew | 14px | 400 | 20px | Footer legal and description text |

## Spacing

Base unit: **4px**. Use this scale consistently:

| Token | Value | Common Usage |
|-------|-------|--------------|
| `--space-xs` | 4px | Icon-label gaps, inner button padding |
| `--space-sm` | 8px | Intra-card gaps, badge padding |
| `--space-md` | 12px | News card inner padding, outbrain gap |
| `--space-lg` | 16px | Game card internal gap between elements |
| `--space-xl` | 20px | Gap between cards in grid rows |
| `--space-2xl` | 28px | Game card horizontal padding (px-[40px] and py-[28px]) |
| `--space-3xl` | 56px | Gap between major page sections |

- Game card padding: `40px` horizontal, `28px` vertical
- Section gap (between Masthead, Banner, Games, News, Outbrain): `56px`
- News card inner padding: `12px`

## Border Radius

| Element | Value |
|---------|-------|
| Game cards | 12px |
| News teaser cards | 12px |
| Outbrain cards | 12px |
| Play button ("רוצה לשחק") | 3px |
| Primary CTA (footer "הצג עוד") | 3px |
| Sponsored badge ("ממומן") | 0px (sharp) |

## Shadows

- Cards: no shadow (clean flat design)
- Outbrain cards: `border: 1px solid #e7e7e7` (border replaces shadow)

---

## Components

### Masthead (Header)

- Height: 52px, full-width (1600px container)
- Background: transparent (inherits page bg)
- Logo: centered absolutely (הארץ wordmark SVG)
- Right side: user greeting button + hamburger nav button (RTL: right-anchored)
- Left side: accessibility icon + tag icon + search button (RTL: left-anchored — this is the visually "start" side in LTR, but in RTL this is the trailing/end side)
- Button style: `Open Sans Hebrew Bold`, 14px, `#2d2d2d`, no background, `height: 28px`, `border-radius: 3px`, flex row with icon + label

| ✅ Do | 🚫 Don't |
|-------|----------|
| Place logo absolutely centered | Use CSS float or margin auto for logo |
| Keep nav items as flex rows with gap: 24px | Use absolute positioning for nav items |
| Use `dir="rtl"` on all text nodes | Leave direction as default (LTR) |

---

### Top Banner

- Size: 970×250px, centered
- Background: `#f7b439` (amber/yellow)
- Used as an ad/promo placeholder
- Do NOT add rounded corners to the banner

---

### Section Title Block

- Accent bar: `49×16px`, color `#226ee9` (blue), placed above the title
- Title: 42px / 700 / `#2d2d2d`, `text-align: right`
- Layout: `flex-col`, `items-end`, `gap: 4px`
- Always right-aligned (RTL flow)

---

### Game Card (Section / Games)

- Size: 352×auto (min ~308px height)
- Background: `#ffffff`, border-radius: 12px
- Padding: 40px horizontal, 28px vertical
- Layout: `flex-col`, `items-center`, `gap: 16px`
- Game icon: 88×88px image, centered
- Title: 24px / 700 / `#2d2d2d`, `text-align: right`, `dir="rtl"`, `overflow: hidden`, `text-overflow: ellipsis`
- Subtitle: 21px / 400 / `#2d2d2d`, `text-align: right`, `dir="rtl"`, `min-height: 56px`, ellipsis
- Button: "רוצה לשחק"
  - Background: `#5b5b5b`
  - Height: 36px, padding: 4px 16px
  - Border-radius: 3px
  - Font: 18px / 700 / `#ffffff`, `text-align: center`

Grid layout:
- Row 1: 4 cards, gap: 20px, `justify-content: flex-end`
- Row 2: 4 cards, gap: 20px, height: 308px
- Row 3: 2 cards, gap: 12px (uses smaller gap for partial row)

| ✅ Do | 🚫 Don't |
|-------|----------|
| Use `dir="rtl"` on all card text | Default to `text-align: center` without RTL |
| Ensure min-height on subtitle for visual consistency | Let cards vary in height unevenly |
| Use ellipsis for long titles | Let titles break layout |

---

### News Teaser Card (Section / Picture)

- Size: 601×264px, background: `#ffffff`, border-radius: 12px
- Layout: `flex-row`, `justify-content: flex-end` (image on right, text on left — RTL reversal)
- Image: 352×264px, rounded only on right side (`border-radius: 0 12px 12px 0`)
- Text area: 249×264px, padding: 12px
  - Headline: 21px / 700 / `#2d2d2d`, `text-align: right`, `dir="rtl"`
  - Author + comment credit bar: bottom of text area, `flex-row`, `justify-content: flex-end`, `gap: 4px`
    - Author dot separator: 4px circle, `#5b5b5b`
    - Author name: 12px / 400 / `#5b5b5b`
    - Comment count: 12px / 700 / `#737373`
    - Chat icon: 12×12px

---

### Weekly Summary Section (סיכום שבועי)

- Section title: vertical block, right-aligned, with blue accent bar (12px height, `#226ee9`)
- Title text: 28px / 700 / `#2d2d2d`
- Layout: title placed to the right of the first row of news cards
- News cards arranged in 3 rows × 2 cards per row
- Row gap: 20px; card gap: 20px

---

### Outbrain / Sponsored Content Card

- Size: 353×294px (XXL breakpoint)
- Background: `#f3f3f3`, border: `1px solid #e7e7e7`, border-radius: 12px
- Image: full-width top, 210px height
- Category label: mixed red (`#a30c15`) + dark (`#2d2d2d`) text, 21px / 700, `text-align: right`, `dir="rtl"`
  - Category prefix in `#a30c15` (e.g., "בריאות / ")
  - Title in `#2d2d2d`
- "ממומן" badge: absolute, right-aligned, vertically centered on image bottom edge
  - Background: `#191919`, height: 24px, padding: 0 8px
  - Font: Arial Regular, 16px, `#ffffff`
- Padding bottom: 12px; gap: 8px between image and text

---

### Footer

- Background: `#2d2d2d`, height: 316px, full-width (1920px)
- Content container: 1224px wide, centered
- Layout (RTL): logo right-anchored, social icons left-anchored
- Social icons: Apple, Android, WhatsApp, Instagram, X, Facebook — each 24×24px, white
- Divider line: 1px `#ffffff` (or subtle) at y=140px within footer
- Nav links: 18px / 700 / `#ffffff`, `text-align: right`, `dir="rtl"`
- "הצג עוד" button: `#226ee9`, 36px height, border-radius: 3px, 18px / 700 / `#ffffff`
- Footer description + copyright: 14px / 400 / `#ffffff`, `text-align: right`, `dir="rtl"`

---

## Layout

- Page max-width: 1600px for masthead, 1468px for content, 1920px for footer
- All content sections: `flex-col`, `items-center`, `gap: 56px`
- Page background: `#f3f3f3`
- All grids: `flex-row`, `flex-wrap`, `justify-content: flex-end` (RTL)
- Never use `margin: auto` for text centering — use `text-align: right` and `dir="rtl"`
- Images: always `object-fit: cover`

### RTL Checklist (apply to every element)

- [ ] Root element has `dir="rtl"`
- [ ] All `<p>` and text elements have `dir="rtl"` or `dir="auto"`
- [ ] Flex rows use `justify-content: flex-end` by default
- [ ] Images that appear on the "right" in design appear on the correct visual right in RTL
- [ ] Border-radius on images: round only the right side for card thumbnails (`border-radius: 0 12px 12px 0`)
- [ ] Section titles and accent bars are aligned to the right (`items-end`)
- [ ] Absolute-positioned elements (logo, badge) use `right:` not `left:` when anchored to the visual right
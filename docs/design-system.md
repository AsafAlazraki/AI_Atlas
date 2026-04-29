# Design system

The Atlas is customer-facing. Every screen will be shown to a prospect at some point. The design system is what keeps every screen on-brand without anyone needing to second-guess it.

If a design choice isn't covered here, look at how the existing Dashboard, Capabilities, or Rovo pages handle it before inventing.

---

## 1. Brand foundation

PhoenixDX brand: **red and dark navy**, with a light-blue accent for highlighted phrases.

| Token             | Hex       | Usage                                                              |
| ----------------- | --------- | ------------------------------------------------------------------ |
| `phoenix-500`     | `#E11D2B` | Brand red. CTAs, active state, badge backgrounds, accent ring      |
| `phoenix-400`     | `#F26773` | Hover state on red, accent text                                    |
| `phoenix-700`     | `#A8121C` | Deeper red for gradients (`bg-phoenix-cta`)                        |
| `azure-300`       | `#9CC8E8` | Accent phrase highlight (`.accent-phrase`), informational badges   |
| `midnight-950`    | `#020617` | Page background                                                    |
| `midnight-900`    | `#050B1F` | Sidebar background                                                 |
| `midnight-800`    | `#0F172A` | Card surface                                                       |
| `midnight-700`    | `#1E293B` | Borders                                                            |
| `midnight-300`    | `#94A3B8` | Secondary / muted body text                                        |
| `midnight-400`    | `#64748B` | Even more muted (timestamps, labels)                               |
| `white`           | `#FFFFFF` | Primary text                                                       |

Source the live values from `tailwind.config.ts` — that file is the single source of truth, this table is summary.

### When to use red vs. azure

- **Red** = the brand. Use for primary CTAs, active nav state, "this matters" emphasis.
- **Azure** = highlighted phrase / informational accent. Use for `<CyclingText>`, "Roadmap" badges, secondary feature icons. Don't use as a primary CTA.

### Don't

- Don't use plain Tailwind colours like `bg-blue-600` or `text-red-500`. They drift from the brand.
- Don't use light Tailwind backgrounds (`bg-white`, `bg-slate-50`). The Atlas is dark-only.
- Don't introduce new colours without a token. If you need one, add it to `tailwind.config.ts` and document it here.

---

## 2. Typography

Inter is the only font family. Loaded via Google Fonts in `index.html`.

Display sizes for hero / page titles (defined in `tailwind.config.ts`):

| Class               | Size       | Use                                  |
| ------------------- | ---------- | ------------------------------------ |
| `text-display-sm`   | 2.25 rem   | Section heading on overview pages    |
| `text-display-md`   | 3 rem      | Page hero (default)                  |
| `text-display-lg`   | 3.75 rem   | Dashboard hero, biggest impact       |

Body sizes — use Tailwind defaults: `text-base` for paragraphs, `text-sm` for muted/secondary text.

**Kicker** (uppercase eyebrow above display headings):

```tsx
<p className="text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
  PhoenixDX · AI Atlas
</p>
```

Use this on every hero. It anchors the visual rhythm.

---

## 3. Layout primitives

### Component classes (defined in `src/index.css`)

| Class            | What it gives you                                                 |
| ---------------- | ----------------------------------------------------------------- |
| `card`           | Standard surface — rounded-2xl, dark border, subtle inner highlight |
| `card-glow`      | Like `card` plus diagonal corner glow (red top-left, blue top-right) |
| `btn-primary`    | Phoenix-red pill CTA with glow shadow on hover                    |
| `btn-ghost`      | Outlined pill with dark fill, secondary CTA                       |
| `accent-phrase`  | `text-azure-300` — for highlighted phrases inside headings        |
| `hairline`       | Subtle horizontal divider with gradient                           |

Prefer these over hand-rolling card or button styles. If you need a variant, extend the class — don't bypass it.

### Spacing rhythm

- Section gap: `space-y-8` to `space-y-12` between major page sections.
- Card padding: `p-6` (small), `p-8` (medium), `p-10` (large hero card).
- Element gap inside a card: `gap-3` to `gap-5`.
- Always use Tailwind's spacing scale; never hard-code `padding: 17px`.

### Page max-width

`DashboardLayout` already constrains content to `max-w-7xl` and pads it. Pages don't need to set their own max-width.

---

## 4. Motion system

Three motion *modes* with strict separation:

### a) Entrance — staggered fade-up on page load

Implementation: `useEntrance` hook (in `src/lib/useEntrance.ts`) targets every `.gsap-fade` element inside a scoped ref. Uses GSAP `power3.out` ease, 0.7s, 0.07s stagger.

```tsx
const scope = useRef<HTMLDivElement>(null);
useEntrance(scope);

return (
  <div ref={scope}>
    <h1 className="gsap-fade">…</h1>
    <p className="gsap-fade">…</p>
  </div>
);
```

Slideshow pages use this pattern internally — page authors get it for free.

### b) Ambient — continuous, subtle background motion

Implementation: `<AnimatedBackground>` (mounted in `DashboardLayout`). Renders flowing dotted SVG curves that animate via `stroke-dashoffset`. **Always on**, behind all content, pointer-events: none.

The animated `<PhoenixVisual>` on the Dashboard is the other ambient element — orbital particles, breathing icon, pulse rings.

### c) Interaction — Tailwind transitions on hover / focus

Hover transitions stay in CSS (Tailwind `transition-*`, `hover:*`, `group-hover:*`). Don't reach for GSAP for hover effects — overkill and breaks consistency.

### Reduced motion

**All ambient and entrance animation must respect `prefers-reduced-motion: reduce`.** Pattern used in this codebase:

```tsx
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) return;
```

---

## 5. Page composition patterns

### Hero block (every page top)

```tsx
<header>
  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">
    Kicker line
  </p>
  <h1 className="mt-3 text-display-md sm:text-display-lg">
    Heading <span className="accent-phrase">accent phrase</span>
  </h1>
  <p className="mt-4 max-w-2xl text-midnight-300">
    Subtitle / tagline.
  </p>
  <div className="mt-7 flex flex-wrap items-center gap-3">
    <Link className="btn-primary">Primary CTA <ArrowRightIcon className="h-4 w-4" /></Link>
    <Link className="btn-ghost">Secondary</Link>
  </div>
</header>
```

### Capability page

Always uses `<Slideshow>` from `src/components/Slideshow.tsx`. Stages compose `<ContentStage>` / `<VideoStage>` / `<FAQStage>`. See [recipes.md](recipes.md#add-a-new-ai-capability).

### Stat / metric card

```tsx
<div className="rounded-2xl border border-midnight-700/60 bg-midnight-900/40 p-5">
  <div className="text-xs font-semibold uppercase tracking-wider text-midnight-400">
    {label}
  </div>
  <div className="mt-1 text-3xl font-semibold tracking-tight text-white">{value}</div>
  <div className="mt-1 text-xs text-midnight-300">{hint}</div>
</div>
```

---

## 6. Iconography

Heroicons throughout. Two styles, used differently:

- `@heroicons/react/24/outline` — body content, feature icons, nav, CTAs. **Default.**
- `@heroicons/react/20/solid` — chevrons, status dots, dense compact UI.

Don't mix in icons from other libraries (Lucide, Feather, etc.). Consistency over personal preference.

---

## 7. Brand assets

| Asset                          | Path                                | Use                                            |
| ------------------------------ | ----------------------------------- | ---------------------------------------------- |
| `phoenixdx-wordmark.png`       | `public/phoenixdx-wordmark.png`     | Sidebar header (expanded), any horizontal lockup |
| `phoenixdx-icon.jpg`           | `public/phoenixdx-icon.jpg`         | Sidebar header (collapsed), favicon, dashboard PhoenixVisual centre |

The wordmark is dark-bg-ready (white "Phoenix" + red "DX" + icon, transparent background). Don't place it on a light background — readability dies.

If you need a new brand asset variant (small icon, white-only, etc.) request from PhoenixDX and store it in `public/` with a clear filename like `phoenixdx-icon-white.svg`.

---

## 8. Accessibility floor

Non-negotiables:

- Every interactive element is keyboard-reachable.
- Focus rings are visible (handled globally in `src/index.css` via `*:focus-visible`).
- Decorative SVGs / images have `aria-hidden="true"`.
- Buttons that are icon-only have an `aria-label`.
- Animation respects `prefers-reduced-motion` (see Motion section).
- Colour contrast: white on `midnight-950` is fine; `midnight-300` on `midnight-950` is body-text fine; never put `midnight-500` text on `midnight-800` cards (failing contrast).

When in doubt, run a browser accessibility audit before opening the PR.

# Design — QueueWise

A locked design system for the QueueWise mobile app. Every screen redesign reads
this file before changing visual structure. Extend this system when a new pattern
is needed; do not create per-screen themes.

## Product context

- Audience: customers finding and joining queues, and merchants serving them.
- Primary job: show the current queue state and the next useful action quickly.
- Tone: nocturnal, focused, technical.
- Accessibility: 48 px minimum touch targets, visible focus, icon-plus-text state
  communication, and readable contrast at all supported widths.

## Genre

Atmospheric modern-minimal with a focused operational voice. The visual DNA is
near-black, deep green, and luminous light green; it never borrows crypto
imagery or decorative dashboard chrome from the reference.

## Macrostructure family

- App pages: Workbench — status and primary task first, supporting detail second.
- Auth pages: Workbench onboarding variation — brand context, then one clear form.
- Content pages: Workbench index variation — search/filter controls, then results.
- Public legal pages: Long Document — direct prose for policy content, with a
  Workbench form variation for account deletion.

## Theme

- `--color-paper`       `oklch(11.5% 0.018 150)`
- `--color-paper-2`     `oklch(16% 0.024 150)`
- `--color-paper-3`     `oklch(21% 0.032 150)`
- `--color-ink`         `oklch(96% 0.012 150)`
- `--color-ink-2`       `oklch(86% 0.020 150)`
- `--color-rule`        `oklch(27% 0.040 150)`
- `--color-rule-2`      `oklch(38% 0.055 150)`
- `--color-muted`       `oklch(63% 0.025 150)`
- `--color-neutral`     `oklch(74% 0.030 150)`
- `--color-accent`      `oklch(89% 0.220 145)`
- `--color-accent-soft` `oklch(25% 0.075 148)`
- `--color-accent-ink`  `oklch(12% 0.025 150)`
- `--color-focus`       `oklch(93% 0.150 145)`

The light-green accent is a signal: active navigation, focus, live status, and
primary actions. Large surfaces stay green-black. Depth comes from surface
lightness and fine borders rather than glow, blur, or heavy shadow.

## Typography

- Display: Bricolage Grotesque, weight 700, roman.
- Body: IBM Plex Sans, weight 400; controls use 600.
- Numerals: IBM Plex Sans with tabular figures where alignment matters.
- Display tracking: -0.025 em.
- Scale: 1.25 major-third, adapted to Flutter's Material text roles.

## Spacing

Four-point named scale. Runtime values live in
`mobile/lib/core/theme/app_tokens.dart`; portable values live in `tokens.css`.
Screens use 20 px phone gutters, 32 px section breaks, and varied internal gaps.

## Motion

- Easings: exponential ease-out for entry, ease-in for exit, symmetric for state.
- Durations: 120 ms micro, 220 ms short, 420 ms long.
- Reveal pattern: state crossfades only; no decorative page-load animation.
- Reduced-motion fallback: functional state updates remain, spatial motion is cut.

## Microinteractions stance

- Silent success when the result is visible.
- Floating feedback only for hidden async outcomes or failures.
- Focus is immediate; loading remains inline with the action.
- No hover-only behavior and no decorative bounce.

## CTA voice

- Primary: solid light green with near-black text, 52 px height, 12 px radius,
  and a specific verb.
- Secondary: deep-green surface with a visible neutral outline.
- Destructive: outlined by default; red is reserved for the confirmed action.

## Per-page allowances

- App pages use no decorative enrichment; function carries the screen.
- Business photography may appear only when supplied by the API.
- Empty states use one small Material icon and one useful next action.

## What pages MUST share

- QueueWise brand mark and wordmark.
- The light-green accent and nocturnal green-tinted neutrals.
- Bricolage Grotesque display and IBM Plex Sans body typography.
- Button/input height, radius, spacing, and state behavior.
- Status-first hierarchy and left-aligned page headings.

## What pages MAY differ on

- Density: merchant operations may be denser than customer discovery.
- Hero/status surface size based on urgency.
- Search and filter controls when the page is an index.

## Exports

### tokens.css

See the project-root `tokens.css`, which is the portable source of truth.

### Tailwind v4 `@theme`

```css
@theme {
  --color-paper: oklch(11.5% 0.018 150);
  --color-paper-2: oklch(16% 0.024 150);
  --color-paper-3: oklch(21% 0.032 150);
  --color-ink: oklch(96% 0.012 150);
  --color-ink-2: oklch(86% 0.020 150);
  --color-rule: oklch(27% 0.040 150);
  --color-muted: oklch(63% 0.025 150);
  --color-accent: oklch(89% 0.220 145);
  --color-focus: oklch(93% 0.150 145);
  --font-display: "Bricolage Grotesque", sans-serif;
  --font-body: "IBM Plex Sans", sans-serif;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --radius-card: 1rem;
  --radius-input: 0.75rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### DTCG `tokens.json`

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "paper": { "$value": "oklch(11.5% 0.018 150)", "$type": "color" },
    "ink": { "$value": "oklch(96% 0.012 150)", "$type": "color" },
    "accent": { "$value": "oklch(89% 0.220 145)", "$type": "color" },
    "focus": { "$value": "oklch(93% 0.150 145)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Bricolage Grotesque", "$type": "fontFamily" },
    "body": { "$value": "IBM Plex Sans", "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1rem", "$type": "dimension" },
    "lg": { "$value": "1.5rem", "$type": "dimension" }
  },
  "duration": {
    "micro": { "$value": "120ms", "$type": "duration" },
    "short": { "$value": "220ms", "$type": "duration" },
    "long": { "$value": "420ms", "$type": "duration" }
  }
}
```

### shadcn/ui CSS variables

```css
:root {
  --background: 11.5% 0.018 150;
  --foreground: 96% 0.012 150;
  --card: 16% 0.024 150;
  --card-foreground: 96% 0.012 150;
  --primary: 89% 0.220 145;
  --primary-foreground: 12% 0.025 150;
  --secondary: 21% 0.032 150;
  --secondary-foreground: 86% 0.020 150;
  --muted: 27% 0.040 150;
  --muted-foreground: 74% 0.030 150;
  --border: 27% 0.040 150;
  --input: 27% 0.040 150;
  --ring: 93% 0.150 145;
  --radius: 0.75rem;
}
```

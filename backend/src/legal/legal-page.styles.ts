export const legalPageStyles = String.raw`/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V4
 * Hallmark · genre: modern-minimal · macrostructure: Long Document · design-system: design.md
 * audience: QueueWise customers and Play reviewers · use: understand privacy or delete an account · tone: austere
 * theme: QueueWise locked system · axes: light / geometric-sans / chromatic-green
 * enrichment: none · nav: N1 left/right split, text links, non-sticky · footer: Ft2 wordmark/links/credit, spaced
 * contrast: pass (40–41) · slop: pass (42–45) · honest: pass (46) · chrome: pass (47)
 * tokens: pass (48) · responsive: pass (34, 49, 50–57) · icons: pass (30) · Slop test: 58/58
 */
@font-face {
  font-family: "QueueWise Display";
  src: url("/legal-fonts/BricolageGrotesque-Variable.ttf") format("truetype");
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
}
@font-face {
  font-family: "QueueWise Body";
  src: url("/legal-fonts/IBMPlexSans-Variable.ttf") format("truetype");
  font-style: normal;
  font-weight: 100 700;
  font-display: swap;
}
:root {
  --color-paper: oklch(97.5% 0.01 155);
  --color-paper-2: oklch(95% 0.014 155);
  --color-paper-3: oklch(91% 0.018 155);
  --color-ink: oklch(21% 0.018 155);
  --color-ink-2: oklch(35% 0.022 155);
  --color-rule: oklch(84% 0.018 155);
  --color-rule-2: oklch(72% 0.024 155);
  --color-muted: oklch(52% 0.022 155);
  --color-neutral: oklch(42% 0.024 155);
  --color-accent: oklch(52% 0.13 158);
  --color-accent-ink: oklch(98% 0.008 155);
  --color-focus: oklch(60% 0.17 158);
  --font-display: "QueueWise Display", "Arial Narrow", sans-serif;
  --font-body: "QueueWise Body", "Segoe UI", sans-serif;
  --space-3xs: 0.25rem;
  --space-2xs: 0.5rem;
  --space-xs: 0.75rem;
  --space-sm: 1rem;
  --space-md: 1.25rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-md: 1.25rem;
  --text-lg: 1.5625rem;
  --text-xl: 1.953rem;
  --text-2xl: 2.441rem;
  --text-display: clamp(2.5rem, 7vw, 4.75rem);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 120ms;
  --dur-short: 220ms;
  --dur-long: 420ms;
  --rule-hair: 1px;
  --rule-fine: 2px;
  --radius-card: 1rem;
  --radius-input: 0.75rem;
}

*, *::before, *::after { box-sizing: border-box; }
html, body { overflow-x: clip; }
html { color-scheme: light; }
body {
  margin: 0;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.65;
  text-rendering: optimizeLegibility;
}

a { color: inherit; text-decoration-thickness: var(--rule-hair); text-underline-offset: var(--space-3xs); }
a:active { color: var(--color-ink-2); }
a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: var(--rule-fine) solid var(--color-focus);
  outline-offset: var(--space-3xs);
}

.shell { width: min(100%, 72rem); margin-inline: auto; padding-inline: clamp(var(--space-sm), 5vw, var(--space-3xl)); }
.nav-min {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  min-height: 4.5rem;
  border-block-end: var(--rule-hair) solid var(--color-rule);
}
.wordmark {
  font-family: var(--font-display);
  font-size: var(--text-md);
  font-weight: 700;
  letter-spacing: -0.025em;
  text-decoration: none;
  white-space: nowrap;
}
.nav-min ul { display: flex; gap: var(--space-md); margin: 0; padding: 0; list-style: none; }
.nav-min a { min-height: 2.75rem; display: inline-flex; align-items: center; white-space: nowrap; }
.nav-min a[aria-current="page"] { color: var(--color-accent); text-decoration-thickness: var(--rule-fine); }

main { padding-block: clamp(var(--space-2xl), 8vw, calc(var(--space-3xl) * 2)); }
.document { width: min(100%, 65ch); }
.document__meta { margin: 0 0 var(--space-md); color: var(--color-neutral); font-size: var(--text-sm); font-variant-numeric: tabular-nums; }
h1, h2 { min-width: 0; overflow-wrap: anywhere; font-family: var(--font-display); font-style: normal; color: var(--color-ink); }
h1 { margin: 0; max-width: 12ch; font-size: var(--text-display); line-height: 1.05; letter-spacing: -0.035em; }
.lede { margin: var(--space-xl) 0 var(--space-2xl); color: var(--color-ink-2); font-size: var(--text-md); line-height: 1.55; }
.document section { display: grid; gap: var(--space-sm); margin-block-start: var(--space-2xl); }
.document h2 { margin: 0; font-size: var(--text-lg); line-height: 1.2; letter-spacing: -0.02em; }
.document p, .document ul { margin: 0; }
.document ul { display: grid; gap: var(--space-xs); padding-inline-start: var(--space-lg); }
.document strong { font-weight: 700; }
.plain-link { color: var(--color-accent); font-weight: 600; }

.deletion-layout { display: grid; gap: var(--space-2xl); }
.deletion-copy { width: min(100%, 55ch); }
.deletion-copy h1 { max-width: 11ch; }
.deletion-form {
  display: grid;
  gap: var(--space-md);
  width: min(100%, 36rem);
  padding-block-start: var(--space-xl);
  border-block-start: var(--rule-fine) solid var(--color-ink);
}
.field { display: grid; gap: var(--space-2xs); }
.field label { font-weight: 600; }
.field input {
  width: 100%;
  min-height: 3.25rem;
  padding-inline: var(--space-sm);
  border: var(--rule-hair) solid var(--color-rule-2);
  border-radius: var(--radius-input);
  outline: var(--rule-fine) solid transparent;
  outline-offset: var(--rule-hair);
  background: var(--color-paper);
  color: var(--color-ink);
  font: inherit;
}
.field input::placeholder { color: var(--color-muted); }
.field input:focus-visible { border-color: var(--color-ink-2); }
.field input[aria-invalid="true"] { border-color: var(--color-ink); background: var(--color-paper-2); }
.field input:disabled { cursor: not-allowed; opacity: 0.55; }
.field__help { min-height: 1.65em; color: var(--color-neutral); font-size: var(--text-sm); }
.form-status {
  min-height: 1.65em;
  margin: 0;
  color: var(--color-ink-2);
  font-weight: 600;
}
.form-status[data-tone="error"] { padding-inline-start: var(--space-sm); border-inline-start: var(--rule-fine) solid var(--color-ink); }
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 3.25rem;
  padding-inline: var(--space-lg);
  border: var(--rule-hair) solid var(--color-ink);
  border-radius: var(--radius-input);
  background: var(--color-ink);
  color: var(--color-paper);
  font: 600 var(--text-base)/1 var(--font-body);
  white-space: nowrap;
  cursor: pointer;
  transition: background-color var(--dur-short) var(--ease-out), transform var(--dur-micro) var(--ease-out);
}
.button:active { transform: translateY(var(--rule-hair)); }
.button:disabled, .button[aria-disabled="true"] { cursor: not-allowed; opacity: 0.55; }
.button[data-state="loading"] { background: var(--color-ink-2); }
.button[data-state="error"] { background: var(--color-paper); color: var(--color-ink); }
.button[data-state="success"] { background: var(--color-accent); color: var(--color-accent-ink); border-color: var(--color-accent); }
.result {
  width: min(100%, 36rem);
  padding-block-start: var(--space-xl);
  border-block-start: var(--rule-fine) solid var(--color-accent);
}
.result h2 { margin: 0 0 var(--space-sm); }
[hidden] { display: none !important; }

.foot-line {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-sm) var(--space-lg);
  padding-block: var(--space-lg);
  border-block-start: var(--rule-hair) solid var(--color-rule);
  color: var(--color-neutral);
  font-size: var(--text-sm);
}
.foot-line p { margin: 0; }
.foot-line a { white-space: nowrap; }

@media (hover: hover) and (pointer: fine) {
  .nav-min a:hover, .foot-line a:hover { color: var(--color-accent); }
  .field input:hover { background: var(--color-paper-2); }
  .button:hover:not(:disabled) { background: var(--color-ink-2); }
}

@media (min-width: 48rem) {
  .deletion-layout { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); align-items: start; gap: var(--space-3xl); }
  .deletion-form { margin-block-start: var(--space-xs); }
}

@media (max-width: 24rem) {
  .nav-min { align-items: flex-start; padding-block: var(--space-xs); }
  .nav-min ul { flex-direction: column; align-items: flex-end; gap: 0; }
  .button { width: 100%; }
}

@media (pointer: coarse) {
  .nav-min a, .foot-line a { min-height: 3rem; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 150ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 150ms !important;
  }
}`;

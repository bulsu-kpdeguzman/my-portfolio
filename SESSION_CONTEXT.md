# Project Context — `my-portfolio` (Next.js terminal portfolio)

> Handoff notes for the next session. Generated 2026-08-12, updated 2026-08-13 (real content swap + **theme toggle & sound IMPLEMENTED**).

## Goal & Identity
- **Owner:** Kenji — **student** (no work experience yet), strong on **business logic** + **UX/flow judgment**, hackathon-proven (2 PH competitions: IT Marketing Challenge, eGov PH Hackathon 2026), weak at executing visual design (hence prescriptive design tokens).
- **IMPORTANT (user directive, 2026-08-12):** the site currently contains **fabricated/dummy content** baked into the template (fake projects, fake work history, fake stats/links). The user wants it removed — nothing false may be presented as fact. Real content only, or literal `[your X]` / visible placeholder markers until real data exists.
- **Purpose:** multi-page portfolio for jobs + freelance + personal brand.
- **Design direction:** Bryl Lim's structure/content (`bryllim.com/projects`) fused with a **dark-terminal** aesthetic (unslop.site dark-terminal ref). Blue accent chosen. Multi-page.

## Tech Stack
- **Next.js 16.3.0** (App Router, Turbopack) — ⚠️ newer than typical training data; per AGENTS.md check `node_modules/next/dist/docs/` before writing code. Key APIs verified: `params` is a `Promise` (must `await params`), `generateStaticParams` + `dynamicParams = false` for static dynamic routes, `next/font` (Geist Sans + Geist Mono already wired in layout), global `LayoutProps` type helper.
- **Tailwind CSS v4.3** — CSS-first config: theme tokens in `src/app/globals.css` `@theme`. No `tailwind.config.js`.
- **TypeScript**, ESLint (react-hooks v6 has a strict **no setState-in-effect** rule — avoid that pattern; refactors already comply).
- **sharp** (devDep) used by the optional pixelate script.

## Design System (locked)
- bg `#0d1117` · surface `#161b22` · surface-hi `#1c2129` · line `#30363d`
- text `#e6edf3` · muted `#8b949e` · faint `#646d78`
- accent **blue `#4F8CFF`** · accent-dim `#1f6feb` · ok `#3fb950` · warn `#d29922` · danger `#f85149`
- Type: **Geist Mono** (structural: headings, paths, tags, labels) + **Geist** (body)
- Radius 6px, flat (no shadows/gradients) — depth via 1px borders only
- Blinking cursor class `cursor-blink` (hero only)

## Pages (all static)
| Route | Notes |
|---|---|
| `/` | `$ whoami` hero + blinking cursor + full-name line, stats row (3·2·3·1: projects listed · hackathon wins · Google AI certs · capstone client), 3 featured `ProjectRow`s, `$ cat about.txt` TerminalWindow, contact band |
| `/work` | 3 real projects (`ProjectList` filter chips: All · Capstone · eGov PH · Concept — eSkolar listed first since it's the most recent) |
| `/work/[slug]` | 3 real case studies (`generateStaticParams`, `dynamicParams=false`): easecert (shipped) · eskolar (shipped) · diwa (concept — amber `text-warn` status), terminal-window shell, `$ cat PROBLEM.md`, `$ tail results.log` qualitative metrics, prev/next nav |
| `/about` | `$ whoami` narrative (student framing), skills grid (React/Laravel/PHP/MySQL/etc.), values, real timeline (education + 2026 milestones) |
| `/stack` | `~/.config/…` grouped real tools incl. `gov integrations` group |
| `/credentials` | **Two terminal windows**: `credentials.lock` (3 Google AI certs, `verify ↗` → Credly) + `highlights.log --honors` (2 competition wins, color-coded placement chips, `verify ↗` → Facebook) |
| `/contact` | mailto CTA + client `ContactForm` + "resume: coming soon" note |

## Key Components (`src/components/`)
- <code>TerminalBackground</code> (client, all pages): fixed <code>z-0</code> ambient terminal — a **typing log** top-left (`left-3 top-16 lg:left-60`), grows **downward** from the top: one <code>setInterval</code> (<code>CHAR_MS=140</code>, slow) types a line char-by-char with a blinking <code>▌</code> caret (<code>cursor-blink</code>), pauses ~700ms (<code>PAUSE_TICKS=5</code>), then appends a random line from <code>liveLines</code> (cap 12; oldest prunes from the top, <code>max-h-[70vh]</code>). Single combined state object, all <code>setState</code> in the timer callback (no setState-in-effect/refs); deterministic seed (module-level <code>lineSeq</code>), prefers-reduced-motion freezes it. Opacity 0.06/0.08/0.14, <code>aria-hidden</code>+<code>pointer-events-none</code>. Content via <code>z-10</code> on <code>main</code>/<code>Footer</code>. (Option A chosen over B — user tried B's single prompt and preferred A.)
- `PaletteProvider` (client: owns ⌘K state + keydown, renders `CommandPalette`, exposes `usePalette().open()`) · `SnakeProvider`/`SnakeOverlay` (client: owns **⌘J/Alt+J** keydown — `meta||alt` + J, mirrors PaletteProvider; renders the snake game overlay, remounts-on-open; grid 17×17, arrows/WASD + mobile D-pad, score + `snake-highscore` localStorage, 180→90ms tick, sounds: open/theme/success) · `Sidebar` (desktop left rail, `hidden lg:flex w-68`, tmux-style active border, **⌘K chip in the top row beside `~/kenjie`**, bottom section grouping theme pill + sound button + Bryl-style email block — no internal dividers; `snake ⌘J` row in links group) · `Navbar` (mobile-only, `lg:hidden` — compact single row: `~/kenjie` + ⌘K + **hamburger** → full-screen drawer menu mirroring the sidebar (directory nav, github/linkedin links, theme/sound + email block) + `snake ⌘J` row; Escape/close button/link click closes) · **no Footer** (removed 2026-08-13 — sidebar email block replaced it) · `CommandPalette` (⌘K, remounts-on-open to satisfy the no-setState-in-effect rule; has `play` → snake overlay command) · `TerminalWindow` (traffic-light chrome) · `SectionHeader` (`~/path` style) · `TagChip` · `ProjectRow` (Bryl text row) · `ProjectList` (filter chips, client) · `ContactForm`
- **Nav links:** work · **ongoing** · credentials · about · stack · contact (Sidebar + mobile Navbar + CommandPalette)
- **Mobile Navbar:** two-row layout — row 1: `~/kenjie` + ⌘K button; row 2: all 6 links in one `whitespace-nowrap` line (overflow-x-auto fallback). `lg:hidden`; desktop uses the Sidebar.
- **Layout:** `layout.tsx` body `lg:pl-56` beside the fixed rail; all pages keep their self-centered `max-w-3xl` containers (zero per-page edits). Active panel color helper `placementAccent/chipClass` lives in the credentials page.

## Data Files (`src/data/`)
- `site.ts` — **ALL REAL as of 2026-08-13**: `name: "Kenjie"` · `fullName: "Kenjie De Guzman"` · `handle: "kenjie"` · `tagline: "Student · Full-Stack Developer"` · `role:` BSIT student copy · `description` · `email: Kenjie.deguzman.bsit@gmail.com` · `location: "Pampanga, PH"` · `github: bulsu-kpdeguzman` · `linkedin: /in/kenjie-deguzman-bsit/` · `resume: "#"` (⚠️ **no resume yet** — user confirmed; /contact shows "resume: coming soon"; `resume` field unused in UI).
- `projects.ts` — **ALL 3 REAL**: EaseCert (capstone, BJMP Region III, shipped) · eSkolar (eGovPH Top 30, shipped) · DIWA (concept — **explicitly a concept/pitch, never a build**; status `concept` added to the union, rendered amber `text-warn`). No `architecture` (never fabricated), results are qualitative. eSkolar has no external link yet. `Project` type: slug/name/category/tagline/year/stack/tags/featured/status (`shipped|in progress|archived|concept`)/externalUrl/overview/problem/role/approach/architecture?/results/retro?.
- `certs.ts` — **REAL**: 3 Google AI certs (Coursera) with Credly URLs.
- `achievements.ts` — **REAL**: 2 competition wins. **DIWA stays as achievement note only + concept project — never a built claim**; **eSkolar** is a real build.
- `commands.ts` — `liveLines` pool for the background typing console. Decorative only (designed ambience, not a claim); keep.

## Credentials & Honors (most recent work)
- `/certs` was renamed **`/credentials`** — one page, **two terminal windows**:
  - **credentials** — `✓ cat credentials.lock && openssl verify --all`: 3 Google AI certs (Coursera) from `src/data/certs.ts`, each with a `verify ↗` to its Credly badge.
  - **honors** — `✓ cat highlights.log --honors`: 2 competitions from `src/data/achievements.ts`, placement chips color-coded (`win/best/champion` → `ok` green, `finalist/top` → accent blue, else muted), organizer + product `note` line, `verify ↗` to the public FB post.
- **Nav → sidebar:** desktop left rail (`Sidebar`, tmux-style active border) + mobile topbar (`Navbar` is now `lg:hidden` with `flex-wrap` — the old single-row topbar overflowed below ~420px). ⌘K lifted into `PaletteProvider` (`usePalette().open()`).
- **User follow-up:** FB `verify ↗` links must be **public** — user should double-check them logged-out / incognito before sharing the site.

## CURRENT OPEN WORK — dummy content REMOVED (2026-08-13) ✅
- **Done:** 6 fabricated projects → 3 real (EaseCert/eSkolar/DIWA-concept); fake job timeline → education + real 2026 milestones; dummy contacts → real values; fake home stats → 3·2·3·1; skills/stack rebuilt from real tools; copy re-framed to honest student positioning; `Kenji` → `Kenjie` everywhere (hero, titles via `site.handle`, about); full name `site.fullName` shown under hero.
- **Remaining small items:**
  - `resume: "#"` — no resume yet; swap in real link when ready (and drop the "resume: coming soon" note on /contact).
  - eSkolar: add `externalUrl` (repo/deck) when one exists.
  - User should double-check the 2 FB `verify ↗` links are public (logged-out/incognito).
  - `location: "Pampanga, PH"` — set per user request (was Manila).
  - Copy still pending user approval on wording nuances if they want tweaks.

## NEXT SESSION (user request 2026-08-13) — Theme toggle + Sound, Bryl Lim-inspired — ✅ IMPLEMENTED 2026-08-13
User wanted: **(1) dark / light / system theme toggle** and **(2) interaction sound**, inspired by `bryllim.com`. **Done** — both shipped, lint + prod build pass, all 10 pages render. Details below (also see History Notes).

### What was built
- **Theme:** dark (default) / light / system cycle. Tokens stay in `@theme` (dark); light is a pure `[data-theme="light"]` CSS-variable override in `globals.css` (GitHub-light neutrals: bg `#ffffff` · surface `#f6f8fa` · surface-hi `#eef1f4` · line `#d0d7de` · text `#1f2328` · muted `#59636e` · faint `#8d959e`; accent/ok/warn/danger unchanged). `color-scheme` synced per theme (scrollbars/inputs). New `--color-overlay` token (palette scrim: `rgba(1,4,9,.55)` dark / `.35` light). Tailwind v4 `@custom-variant light (&:where([data-theme="light"], [data-theme="light"] *))` added for light-specific tweaks (TerminalBackground opacity bump: 0.06/0.08/0.14 → 0.12/0.14/0.18 light).
- **ThemeProvider** (`src/components/ThemeProvider.tsx`, client): `useTheme()` → `{ mode, resolved, setMode, toggle }`. `mode` persisted in localStorage (`theme`); `resolved` derived (`system` → `matchMedia`). Sets `document.documentElement.dataset.theme` (always a resolved value) + listens for OS theme change while in `system`. Window-guarded lazy init (SSR-safe). Complies with no-setState-in-effect (state only in handlers/listeners; DOM writes in effect).
- **FOUC script:** inline `<script>` in `layout.tsx` `<head>` reads localStorage + matchMedia and sets `data-theme` before first paint (try/catch). `<html>` got `suppressHydrationWarning` (React would warn about the script-added attribute).
- **SoundProvider** (`src/components/SoundProvider.tsx`, client): WebAudio only, zero assets. `useSound()` → `{ enabled, setEnabled, play(kind) }`; kinds `click` (global capture `pointerdown` on `a/button/[role=button]`), `open` (palette), `enter` (palette run), `success` (form), `theme` (toggle). Lazy `AudioContext` created/resumed on first user gesture (autoplay-safe). Gain ~0.02–0.03, square/triangle blips, short envelopes. `sound` persisted in localStorage (**default on**), not gated on reduced-motion (manual toggle only). Elements that play their own sound opt out of the generic click via `data-no-click-sound` (⌘K buttons, palette rows, ThemeToggle).
- **ThemeToggle** (`src/components/ThemeToggle.tsx`): **Bryl-style segmented pill** (fetched bryllim.com for reference) — rounded-full `border-line bg-surface` pill with 3 icon buttons (system/monitor · light/sun · dark/moon, 24px circles), active = `bg-surface-hi text-text`, hover ticks. **Round sound button** (26px, speaker on/off icon, `aria-pressed`) beside the pill. Placed in **Sidebar** bottom (above ⌘K, own `border-t` row) and **mobile Navbar** row 1 (right side, `ml-auto`). Selecting a theme plays the PS confirm tone; sound toggle uses `play(kind, force=true)` so toggling on still confirms.
- **Sounds re-tuned PS-menu style** (user: "like choosing game on PlayStation"): navigate/hover = soft high sine tick (1500Hz, 35ms, gain 0.018), select/click = low triangle tock (420Hz, 60ms, 0.03), palette open/enter = 660/880Hz, theme = 520Hz confirm, success = 523→784 two-note. **Global `mouseenter` (capture) delegated listener** in SoundProvider → tick on every `a/button/[role=button]` hover (Bryl-style; `data-no-hover-sound` opt-out), pointerdown click → tock (`data-no-click-sound` opt-out).
- **⌘K palette** gained commands: `theme dark` · `theme light` · `theme system` · `sound on` · `sound off` (hint `set theme`/`set sound`); scrim now `bg-overlay` (was `bg-black/60`). Open plays `open` blip (PaletteProvider), run plays `enter`.
- **ContactForm** plays `success` two-note triangle on send OK.

### Do NOT forget
- Keep the dark-terminal aesthetic as the default; light mode is a light-terminal (token swap only — components never changed to accommodate it except the two hardcoded spots above).
- `text-white` on accent buttons (hero CTA, ProjectList active chip, form submit) is intentional — accent stays blue in both modes.
- Remaining manual check for the user: eyeball every page in BOTH modes in a real browser (chips on /credentials + /ongoing, statusColor in work/[slug], TerminalBackground legibility, palette overlay, form success) and confirm the sounds feel right (volume ~0.02–0.03; `localStorage.theme`/`sound` to reset).

### Theme toggle — implementation notes (verified)
- All colors are **CSS variables in `src/app/globals.css` `@theme`** (Tailwind v4 CSS-first, no config file): `--color-bg #0d1117` · `surface #161b22` · `surface-hi #1c2129` · `line #30363d` · `text #e6edf3` · `muted #8b949e` · `faint #646d78` · `accent #4f8cff` · `accent-dim #1f6feb` · `ok #3fb950` · `warn #d29922` · `danger #f85149`. `:root { color-scheme: dark }` is hardcoded at globals.css:21-23.
- Components reference **only token classes** (`bg-bg`, `text-muted`, `border-line`, `bg-surface`, etc.) — so a light theme is mostly a **token swap**, not a component pass. Plan: move token values out of `@theme` into `:root`/`[data-theme]` selectors (or keep `@theme` for dark + override via a `.light`/`data-theme` block; pick one strategy and keep it simple). Tailwind v4 resolves `bg-bg` → `var(--color-bg)` at build time, so runtime overrides via CSS variables work.
- **System mode:** `@media (prefers-color-scheme: light)` + a `system` state; standard three-state cycle: `dark → light → system` (or a select). **Persist choice in localStorage**; add a tiny inline `<script>` in `layout.tsx` `<head>` (or `initColorScheme()`) to set the class/attribute **before first paint** to avoid FOUC. Keep `color-scheme` synced so scrollbars/inputs match.
- **Hardcoded-color watchlist** (things that won't auto-adapt):
  - `TerminalBackground` — fixed opacities 0.06/0.08/0.14 (components/TerminalBackground.tsx) — nearly invisible on white; needs a light-mode opacity bump or a light-specific color
  - `CommandPalette` overlay `bg-black/60` — dims wrong on light mode; make it theme-aware (e.g. token `--color-overlay` or conditional)
  - `text-white` on accent buttons (hero CTA, chips, ProjectList active chip) — fine (accent stays blue) but verify contrast on light
  - `bg-accent/10` active sidebar item, `bg-accent/15` palette active row — alpha over surface is fine both ways, just check
  - `::selection` (accent-dim bg + white text) — ok
  - `cursor-blink` (accent bar) — ok
  - `Navbar` `bg-bg/90 backdrop-blur` — fine via token
- **Light palette direction (propose to user, don't invent):** keep the terminal identity in both modes — e.g. GitHub-light-ish neutrals: bg `#ffffff`/`#f6f8fa` · surface `#f6f8fa` · surface-hi `#eef1f4` · line `#d0d7de` · text `#1f2328` · muted `#59636e` · faint `#8d959e` · accent stays blue `#4f8cff` (or darken to `#0969da`-style for contrast). Confirm with user before locking.
- **Toggle placement (propose):** Sidebar bottom (near ⌘K), mobile Navbar row 1, and a ⌘K palette command (`theme`). Label like `dark/light/system` cycle. New client component (e.g. `ThemeProvider`) wrapping layout, mirroring `PaletteProvider` pattern (layout.tsx wraps children in `PaletteProvider` — theme provider should wrap too).

### Sound — implementation notes
- **No audio files needed:** use **WebAudio API** (`AudioContext` + short oscillator/envelope blips) — zero asset weight, fits the terminal aesthetic. Respect browser autoplay policy: create/resume `AudioContext` on first user gesture.
- Bryl-style intent: *subtle* feedback, not notifications — e.g. quiet terminal-key click on nav link hover/click, ⌘K open/close, palette Enter, form submit success (`ok`-colored tone), theme switch. Don't add ambient/music.
- Add a **sound on/off toggle** (persist in localStorage alongside theme; same provider or a tiny `useSound` hook + context). Respect `prefers-reduced-motion`? (motion ≠ audio; still offer the manual toggle — ask user preference). Keep volume low (~0.02-0.05 gain), short attack/decay to avoid annoying.
- Wire points: `PaletteProvider`/`CommandPalette`, `Sidebar` + `Navbar` links (or a single global click listener in the provider), `ContactForm.submit`, project row links.

### Do NOT forget
- Keep the dark-terminal aesthetic as the default; light mode must still feel like a terminal (light-terminal, not a generic landing page).
- Both features are client-side state — follow the existing **no setState-in-effect** eslint rule (react-hooks v6).
- After implementing: `npm run lint` + `npm run build`; visually check every page in BOTH modes (esp. `/credentials` chips, `/ongoing` status chips, `work/[slug]` statusColor map, TerminalBackground legibility).

## Build / Verification
- `npm run dev` (port 3000) · `npm run build` · `npm run lint`
- `npm run pixelate` — orphaned but harmless: `scripts/pixelate.mjs` (sharp nearest-neighbor, expects `public/avatar.png` → writes `public/avatar.pixel.png`), included in case the user wants the pixel avatar back.
- Verified: 14 static pages (home + about/contact/credentials/ongoing/stack/work + 3 project slugs + not-found) + dynamic `/api/contact` (Resend), prod build passes.

## History Notes (decisions already made)
- **Pixel avatar** (hero, `PixelAvatar`) was built, then **removed at user request**. Deleted `src/components/PixelAvatar.tsx`, `public/avatar.png`, `public/avatar.pixel.png`. The `pixelate` script was kept for optional re-add.
- **Credly embeds** (official badge iframes via `embed.js` + `CredentialsBadges`) were built, then **removed at user request** in favor of the current text-only list.
- **`/certs` → `/credentials`** merge (honors window added). **Topbar → sidebar** (`Sidebar` on desktop, mobile-only `Navbar` with wrap fix); ⌘K centralized in `PaletteProvider`.
- **TerminalBackground** iterated to its final form: scrolling columns were removed (too distracting) → typing console; **Option A** (top-anchored downward log) chosen over **Option B** (single prompt) after the user tried both; slow `CHAR_MS=140` + ~700ms pause between lines; reduced-motion freezes it; opacity 0.06/0.08/0.14.
- **User directive:** **no dummy data** — replace all fabricated content with real facts (or visible `[ ]` markers). **EXECUTED 2026-08-13** (see CURRENT OPEN WORK).
- **Name correction:** user goes by **Kenjie** (full: Kenjie De Guzman); `Kenji` → `Kenjie` across site; `site.handle` now drives all `@portfolio` terminal titles (single source of truth).
- **DIWA decision:** added as a real project page but **status `concept`** (amber) with explicit "concept only — no fabricated metrics" result row + retro note. Never presented as a build.
- **Resend (2026-08-13):** contact form now POSTs to `/api/contact` → Resend API. Sender `Kenjie De Guzman <onboarding@resend.dev>` (no domain yet; free tier sends only to the account's own verified email — exactly the use case). `.env.local`: `RESEND_API_KEY` + `RESEND_FROM`. On deploy, add the key to Vercel env. Switching to a real domain later = verify domain in Resend + change `RESEND_FROM`.

## Possible Next Steps
1. **Manual browser pass** — verify both themes + sound feel on every page (see "Do NOT forget" above). This is the only open item from the theme/sound work.
2. Replace `resume: "#"` with a real resume link when available (also drop /contact "coming soon" note).
3. Add eSkolar `externalUrl` (repo/deck) when one exists.
4. Verify the 2 FB `verify ↗` links are public (logged-out incognito check).
5. Add more `achievements.ts` rows as new competitions happen.
6. Optional: blog page, deploy to Vercel (`vercel` — add `RESEND_API_KEY` env var there), favicon/metadata polish.
7. **Git status:** commit `7ff3d7b` is the last commit; uncommitted changes now include the theme+Sound work (see below). Commit when user asks.

## Uncommitted changes (2026-08-13 session, post-`7ff3d7b`)
- **Snake game overlay (user request — "tiny terminal game" + Bryl-style shortcut)**: `SnakeProvider` (⌘J/Alt+J global toggle, Escape closes, renders overlay) + `SnakeOverlay` (17×17 grid in a TerminalWindow titled `~/play/snake`, `$ ./snake --arcade`, arrows/WASD + mobile D-pad `lg:hidden`, score/best row, `snake-highscore` in localStorage, 180→90ms tick speedup, wall/self collision → retry from any arrow, sounds: open/theme/success via `useSound`). Entry points: Sidebar `snake ⌘J` row (links group), mobile drawer `snake ⌘J` row, palette `play` command. **No route** — it's an overlay like Bryl's typing test. New files: `src/components/SnakeProvider.tsx`, `src/components/SnakeOverlay.tsx`; layout wraps it inside SoundProvider.
- **Sidebar restructure (user request):** width `w-56` → **`w-68`** (body `lg:pl-68`, bg console `lg:left-68` also moved); **⌘K chip moved to top row** inline with `~/kenjie` (role text wraps below, no truncate); bottom area is one section (`border-t`) holding theme pill + sound button + "For work, collabs…" email block with **no internal dividers**; email `text-[11px]` single line, no ellipsis (`break-all` fallback).
- **Footer removed** (`src/components/Footer.tsx` deleted, layout cleaned up) — replaced by the Bryl-style sidebar email block ("For work, collabs & everything else, reach me at" + mailto + mail icon, bottom of Sidebar, user request). Mobile (no sidebar) now has no footer — nav links + ⌘K cover it.
- **Theme toggle (dark/light/system) + interaction sound — the NEXT SESSION block, IMPLEMENTED**: `ThemeProvider` (localStorage `theme` + system resolution + FOUC inline script in layout `<head>`), `SoundProvider` (WebAudio PS-style blips, localStorage `sound`, default on, `useSound()` hook, global hover-tick + click-tock listeners, 110ms tick throttle, gesture unlock), `ThemeToggle` (Bryl-style segmented pill + round sound button; Sidebar bottom + mobile Navbar row 1), ⌘K commands `theme dark|light|system` + `sound on|off`, `--color-overlay` token + `@custom-variant light` + `[data-theme="light"]` token block in `globals.css`, palette scrim → `bg-overlay`, TerminalBackground light opacity bump, sounds wired to palette open/enter + form success.
- `/ongoing` page added (route + data + all 3 navs) — RJAG chatbot (in progress) + Can You Hack It Clark (participating, ITBPAP)
- Hero/about copy refinement (systems mindset), stats cards → clickable links, `recent` badge (achievements.ts `recent?: boolean`), eSkolar category → `eGov PH` + reorder to top, DIWA IRCITE/PSITE-CL detail, skills/stack additions (Java, C#, Next.js, PostgreSQL, Docker)
- `site.email` → lowercase (Resend case-sensitivity fix — **do not revert**; route sends `site.email.toLowerCase()`)
- Email links: **sidebar email block is now a `mailto:`** (Bryl-style, "For work, collabs & everything else, reach me at" + address + mail icon, bottom of Sidebar — user request 2026-08-13). Sidebar "email" nav entry removed; ⌘K `email` command still routes to `/contact` (Resend form) as the primary send path.
- Sidebar ⌘K button lost its `border-t` (misaligned with footer's border-t); mobile Navbar restructured (2-row, one-line nav, ⌘K visible on mobile)
- `.gitignore` + `dev.log`; `.env.local` has the REAL `RESEND_API_KEY` + `RESEND_FROM` (gitignored — never commit)

## Environment
- Path: `C:\Users\kenji\Desktop\my-portfolio` · OS: **win32 / PowerShell 5.1** (no `&&`; chain with `;` and `if ($?)`)
- Node v24.15.0, npm 11.12.1
- Restart gotcha: kill running node processes (`Get-Process node | Stop-Process -Force`) before starting dev/prod on ports 3000/3999 (port conflict).

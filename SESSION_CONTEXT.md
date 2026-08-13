# Project Context — `my-portfolio` (Next.js terminal portfolio)

> Handoff notes for the next session. Generated 2026-08-12, updated 2026-08-13 (real content swap).

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
| `/work` | 3 real projects (`ProjectList` filter chips: All · Capstone · GovTech · Concept) |
| `/work/[slug]` | 3 real case studies (`generateStaticParams`, `dynamicParams=false`): easecert (shipped) · eskolar (shipped) · diwa (concept — amber `text-warn` status), terminal-window shell, `$ cat PROBLEM.md`, `$ tail results.log` qualitative metrics, prev/next nav |
| `/about` | `$ whoami` narrative (student framing), skills grid (React/Laravel/PHP/MySQL/etc.), values, real timeline (education + 2026 milestones) |
| `/stack` | `~/.config/…` grouped real tools incl. `gov integrations` group |
| `/credentials` | **Two terminal windows**: `credentials.lock` (3 Google AI certs, `verify ↗` → Credly) + `highlights.log --honors` (2 competition wins, color-coded placement chips, `verify ↗` → Facebook) |
| `/contact` | mailto CTA + client `ContactForm` + "resume: coming soon" note |

## Key Components (`src/components/`)
- <code>TerminalBackground</code> (client, all pages): fixed <code>z-0</code> ambient terminal — a **typing log** top-left (`left-3 top-16 lg:left-60`), grows **downward** from the top: one <code>setInterval</code> (<code>CHAR_MS=140</code>, slow) types a line char-by-char with a blinking <code>▌</code> caret (<code>cursor-blink</code>), pauses ~700ms (<code>PAUSE_TICKS=5</code>), then appends a random line from <code>liveLines</code> (cap 12; oldest prunes from the top, <code>max-h-[70vh]</code>). Single combined state object, all <code>setState</code> in the timer callback (no setState-in-effect/refs); deterministic seed (module-level <code>lineSeq</code>), prefers-reduced-motion freezes it. Opacity 0.06/0.08/0.14, <code>aria-hidden</code>+<code>pointer-events-none</code>. Content via <code>z-10</code> on <code>main</code>/<code>Footer</code>. (Option A chosen over B — user tried B's single prompt and preferred A.)
- `PaletteProvider` (client: owns ⌘K state + keydown, renders `CommandPalette`, exposes `usePalette().open()`) · `Sidebar` (desktop left rail, `hidden lg:flex w-56`, tmux-style active border, ⌘K button pinned bottom) · `Navbar` (mobile-only, `lg:hidden`, flex-wrap so links never overflow) · `Footer` · `CommandPalette` (⌘K, remounts-on-open to satisfy the no-setState-in-effect rule) · `TerminalWindow` (traffic-light chrome) · `SectionHeader` (`~/path` style) · `TagChip` · `ProjectRow` (Bryl text row) · `ProjectList` (filter chips, client) · `ContactForm`
- **Nav links:** work · **credentials** · about · stack · contact (Sidebar + mobile Navbar + CommandPalette)
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

## Build / Verification
- `npm run dev` (port 3000) · `npm run build` · `npm run lint`
- `npm run pixelate` — orphaned but harmless: `scripts/pixelate.mjs` (sharp nearest-neighbor, expects `public/avatar.png` → writes `public/avatar.pixel.png`), included in case the user wants the pixel avatar back.
- Verified: 12 static pages (home + about/contact/credentials/stack/work + 3 project slugs + not-found), prod build passes.

## History Notes (decisions already made)
- **Pixel avatar** (hero, `PixelAvatar`) was built, then **removed at user request**. Deleted `src/components/PixelAvatar.tsx`, `public/avatar.png`, `public/avatar.pixel.png`. The `pixelate` script was kept for optional re-add.
- **Credly embeds** (official badge iframes via `embed.js` + `CredentialsBadges`) were built, then **removed at user request** in favor of the current text-only list.
- **`/certs` → `/credentials`** merge (honors window added). **Topbar → sidebar** (`Sidebar` on desktop, mobile-only `Navbar` with wrap fix); ⌘K centralized in `PaletteProvider`.
- **TerminalBackground** iterated to its final form: scrolling columns were removed (too distracting) → typing console; **Option A** (top-anchored downward log) chosen over **Option B** (single prompt) after the user tried both; slow `CHAR_MS=140` + ~700ms pause between lines; reduced-motion freezes it; opacity 0.06/0.08/0.14.
- **User directive:** **no dummy data** — replace all fabricated content with real facts (or visible `[ ]` markers). **EXECUTED 2026-08-13** (see CURRENT OPEN WORK).
- **Name correction:** user goes by **Kenjie** (full: Kenjie De Guzman); `Kenji` → `Kenjie` across site; `site.handle` now drives all `@portfolio` terminal titles (single source of truth).
- **DIWA decision:** added as a real project page but **status `concept`** (amber) with explicit "concept only — no fabricated metrics" result row + retro note. Never presented as a build.

## Possible Next Steps
1. Replace `resume: "#"` with a real resume link when available (also drop /contact "coming soon" note).
2. Add eSkolar `externalUrl` (repo/deck) when one exists.
3. Verify the 2 FB `verify ↗` links are public (logged-out incognito check).
4. Add more `achievements.ts` rows as new competitions happen.
5. Optional: blog page, deploy to Vercel (`vercel`), favicon/metadata polish.
6. Git repo IS initialized (commit `d68ce62`) — commit this content swap when user asks.

## Environment
- Path: `C:\Users\kenji\Desktop\my-portfolio` · OS: **win32 / PowerShell 5.1** (no `&&`; chain with `;` and `if ($?)`)
- Node v24.15.0, npm 11.12.1
- Restart gotcha: kill running node processes (`Get-Process node | Stop-Process -Force`) before starting dev/prod on ports 3000/3999 (port conflict).

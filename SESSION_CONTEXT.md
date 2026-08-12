# Project Context — `my-portfolio` (Next.js terminal portfolio)

> Handoff notes for the next session. Generated 2026-08-12.

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
| `/` | `$ whoami` hero + blinking cursor, stats row, 3 featured `ProjectRow`s, `$ cat about.txt` TerminalWindow, contact band |
| `/work` | ⚠️ **DUMMY-DRIVEN** — content pending restructure (see CURRENT OPEN WORK). Currently renders the fabricated `projects.ts` rows + filter chips (client `ProjectList`) |
| `/work/[slug]` | Same as above — 6 fake case studies (`generateStaticParams`, `dynamicParams=false`), terminal-window shell, `$ cat PROBLEM.md`, ASCII architecture (green), `$ tail results.log` metrics, prev/next nav |
| `/about` | `$ whoami` narrative, skills grid, values, experience timeline |
| `/stack` | `~/.config/…` grouped tool lists |
| `/credentials` | **Two terminal windows**: `credentials.lock` (3 Google AI certs, `verify ↗` → Credly) + `highlights.log --honors` (2 competition wins, color-coded placement chips, `verify ↗` → Facebook) |
| `/contact` | mailto CTA + client `ContactForm` |

## Key Components (`src/components/`)
- <code>TerminalBackground</code> (client, all pages): fixed <code>z-0</code> ambient terminal — a **typing log** top-left (`left-3 top-16 lg:left-60`), grows **downward** from the top: one <code>setInterval</code> (<code>CHAR_MS=140</code>, slow) types a line char-by-char with a blinking <code>▌</code> caret (<code>cursor-blink</code>), pauses ~700ms (<code>PAUSE_TICKS=5</code>), then appends a random line from <code>liveLines</code> (cap 12; oldest prunes from the top, <code>max-h-[70vh]</code>). Single combined state object, all <code>setState</code> in the timer callback (no setState-in-effect/refs); deterministic seed (module-level <code>lineSeq</code>), prefers-reduced-motion freezes it. Opacity 0.06/0.08/0.14, <code>aria-hidden</code>+<code>pointer-events-none</code>. Content via <code>z-10</code> on <code>main</code>/<code>Footer</code>. (Option A chosen over B — user tried B's single prompt and preferred A.)
- `PaletteProvider` (client: owns ⌘K state + keydown, renders `CommandPalette`, exposes `usePalette().open()`) · `Sidebar` (desktop left rail, `hidden lg:flex w-56`, tmux-style active border, ⌘K button pinned bottom) · `Navbar` (mobile-only, `lg:hidden`, flex-wrap so links never overflow) · `Footer` · `CommandPalette` (⌘K, remounts-on-open to satisfy the no-setState-in-effect rule) · `TerminalWindow` (traffic-light chrome) · `SectionHeader` (`~/path` style) · `TagChip` · `ProjectRow` (Bryl text row) · `ProjectList` (filter chips, client) · `ContactForm`
- **Nav links:** work · **credentials** · about · stack · contact (Sidebar + mobile Navbar + CommandPalette)
- **Layout:** `layout.tsx` body `lg:pl-56` beside the fixed rail; all pages keep their self-centered `max-w-3xl` containers (zero per-page edits). Active panel color helper `placementAccent/chipClass` lives in the credentials page.

## Data Files (`src/data/`)
- `site.ts` — `name` / `handle` / `tagline` / `role` / `location` are **REAL**; email/GitHub/LinkedIn/resume are **DUMMY** (`hello@kenji.dev`, `github.com/you`, `linkedin.com/in/you`, `#`) → replace with real values or `[your email]`-style markers.
- `projects.ts` — **ALL 6 case studies are FABRICATED dummy data** (LedgerCore, CargoGrid, NovaAuth, Relay, PipelineDash, BizRules) incl. fake metrics + `https://example.com/...` URLs. User wants them **gone** (see CURRENT OPEN WORK). `Project` type: slug/name/category/tagline/year/stack/tags/featured/status/externalUrl/overview/problem/role/approach/architecture/results/retro.
- `certs.ts` — **REAL**: 3 Google AI certs (Coursera) with Credly URLs.
- `achievements.ts` — **REAL**: 2 competition wins. **DIWA is a PLAN ONLY** (do NOT promote to a built project — keep only as the achievement note); **eSkolar is a real eGov PH hackathon build** — candidate flagship case study once user provides role/stack/repo.
- `commands.ts` — `liveLines` pool for the background typing console. Decorative only (designed ambience, not a claim); keep.

## Credentials & Honors (most recent work)
- `/certs` was renamed **`/credentials`** — one page, **two terminal windows**:
  - **credentials** — `✓ cat credentials.lock && openssl verify --all`: 3 Google AI certs (Coursera) from `src/data/certs.ts`, each with a `verify ↗` to its Credly badge.
  - **honors** — `✓ cat highlights.log --honors`: 2 competitions from `src/data/achievements.ts`, placement chips color-coded (`win/best/champion` → `ok` green, `finalist/top` → accent blue, else muted), organizer + product `note` line, `verify ↗` to the public FB post.
- **Nav → sidebar:** desktop left rail (`Sidebar`, tmux-style active border) + mobile topbar (`Navbar` is now `lg:hidden` with `flex-wrap` — the old single-row topbar overflowed below ~420px). ⌘K lifted into `PaletteProvider` (`usePalette().open()`).
- **User follow-up:** FB `verify ↗` links must be **public** — user should double-check them logged-out / incognito before sharing the site.

## CURRENT OPEN WORK — remove all dummy content (user directive)
- **Context:** user is a **student with no work experience**; the template content assumed an experienced backend engineer. Nothing fabricated may ship.
- **Dummy inventory to remove / replace:**
  - `projects.ts` — all 6 fabricated case studies (drives `/work`, `/work/[slug]`, and the home "featured" rows + stats numbers like `40M events/day` / `99.98%`).
  - `/about` timeline — fake companies (Laterra, Northstack, Slice Collective).
  - `site.ts` — fake email/github/linkedin/resume (see Data Files).
  - Home hero + `about.txt` copy, `/work` `/contact` `/stack` copy + skills grid/values — generic template copy; confirm what is actually true before keeping.
- **Real anchors to build on:** 3 Google AI certs · 2 competition wins · **eSkolar** (real eGov PH build) · **DIWA** (plan only — achievement mention, never a project).
- **Pending question checklist (ask the user — do NOT invent answers):**
  1. eSkolar: your role, tech stack, what it does (2–3 sentences), repo/link?
  2. Other REAL projects (school / capstone / personal / hackathon) — names + one-liners + actually built?
  3. `/work` fate: **A** keep the page with real projects only · **B** drop `/work` from nav until real builds exist · **C** merge real builds into `/credentials` as "notable builds" for now. (Lean B if 0 builds, A if ≥1.)
  4. Education: school, degree/program, expected graduation year?
  5. Contact: real email / GitHub / LinkedIn / location — or visible `[your email]` markers for later?
  6. Skills: which of the currently-listed stack (Go, TypeScript, PostgreSQL, Redis, Kafka, ClickHouse, Docker, gRPC, REST, OAuth2/OIDC, AWS, GCP, event-driven) are genuinely used?
- **Tone:** reframe copy from "senior backend engineer" to honest student positioning (e.g. "backend developer in the making, hackathon-proven"); never claim experience.

## Build / Verification
- `npm run dev` (port 3000) · `npm run build` · `npm run lint`
- `npm run pixelate` — orphaned but harmless: `scripts/pixelate.mjs` (sharp nearest-neighbor, expects `public/avatar.png` → writes `public/avatar.pixel.png`), included in case the user wants the pixel avatar back.
- Verified: 15 static pages, prod build passes (Lighthouse-style curl checks done earlier).

## History Notes (decisions already made)
- **Pixel avatar** (hero, `PixelAvatar`) was built, then **removed at user request**. Deleted `src/components/PixelAvatar.tsx`, `public/avatar.png`, `public/avatar.pixel.png`. The `pixelate` script was kept for optional re-add.
- **Credly embeds** (official badge iframes via `embed.js` + `CredentialsBadges`) were built, then **removed at user request** in favor of the current text-only list.
- **`/certs` → `/credentials`** merge (honors window added). **Topbar → sidebar** (`Sidebar` on desktop, mobile-only `Navbar` with wrap fix); ⌘K centralized in `PaletteProvider`.
- **TerminalBackground** iterated to its final form: scrolling columns were removed (too distracting) → typing console; **Option A** (top-anchored downward log) chosen over **Option B** (single prompt) after the user tried both; slow `CHAR_MS=140` + ~700ms pause between lines; reduced-motion freezes it; opacity 0.06/0.08/0.14.
- **User directive:** **no dummy data** — replace all fabricated content with real facts (or visible `[ ]` markers). See CURRENT OPEN WORK.

## Possible Next Steps
1. **Execute CURRENT OPEN WORK** — remove all dummy content and replace with real facts using the pending-question checklist (eSkolar, other real projects, `/work` decision, education, contact, skills). Do NOT invent data.
2. Once real content is settled, adjust tone across copy (student positioning) and re-verify `/work` page count (currently 15 static pages; will drop if `/work` is trimmed/removed).
3. Verify the 2 FB `verify ↗` links are public (logged-out incognito check).
4. Add more `achievements.ts` rows as new competitions happen.
5. Optional: blog page, deploy to Vercel (`vercel`), favicon/metadata polish.
6. Git repo is NOT initialized (scaffold used `--no-git`) — init + first commit when user asks.

## Environment
- Path: `C:\Users\kenji\Desktop\my-portfolio` · OS: **win32 / PowerShell 5.1** (no `&&`; chain with `;` and `if ($?)`)
- Node v24.15.0, npm 11.12.1
- Restart gotcha: kill running node processes (`Get-Process node | Stop-Process -Force`) before starting dev/prod on ports 3000/3999 (port conflict).

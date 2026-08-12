export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  year: string;
  stack: string[];
  tags: string[];
  featured?: boolean;
  status: "shipped" | "in progress" | "archived";
  externalUrl?: string;
  overview: string;
  problem: string;
  role: string;
  approach: string[];
  architecture?: string;
  results: ProjectMetric[];
  retro?: string;
};

export const projects: Project[] = [
  {
    slug: "ledgercore",
    name: "LedgerCore",
    category: "Fintech",
    tagline:
      "An offline-first budget & expense tracking API with on-device analytics.",
    year: "2025",
    stack: ["Go", "PostgreSQL", "Redis", "gRPC", "Docker"],
    tags: ["api", "payments", "offline-first"],
    featured: true,
    status: "shipped",
    externalUrl: "https://example.com/ledgercore",
    overview:
      "The backend powering a personal finance app used by 40k+ people. LedgerCore ingests bank feeds, builds a ledger, and serves budgets while staying usable during flaky connections.",
    problem:
      "The original MVP was a single monolithic REST server. Every report query scanned the whole transactions table, response times crept past 4s during month-end, and offline usage was impossible because everything required a round trip.",
    role: "Sole backend engineer — owned architecture, data model, APIs and the analytics pipeline end to end. Collaborated with the product lead on UX flow: what to surface on-device vs server-side.",
    approach: [
      "Split the monolith into three services: ledger, ingestion, and analytics.",
      "Designed an event-first model — every transaction change emits an event to Redis streams; analytics subscribe and write materialized summaries.",
      "Introduced an offline-first sync protocol (oplog diffing) so the app kept working with zero connectivity.",
      "Wrote the query optimizer: range-partitioned ledger by month plus composite (account_id, date) indexes.",
      "Interviewed 12 users early to confirm which reports actually mattered — 40% of the old reports were never used, so I dropped them.",
    ],
    architecture: `client ──▶ API gateway ──▶ ledger (Go)
                         │                │
                         ├─ ingestion ◀───┘ bank feeds (events)
                         │
                         ▼
                    analytics (materialized views) ──▶ report service`,
    results: [
      { label: "p95 report latency", value: "-62%" },
      { label: "peak requests/day", value: "1.2M" },
      { label: "uptime (SLA)", value: "99.98%" },
      { label: "offline session support", value: "full" },
    ],
    retro:
      "I'd start with the event model from day one instead of retrofitting it after the monolith — the re-platform took a full sprint. Also: less index-tuning, more load testing earlier.",
  },
  {
    slug: "cargogrid",
    name: "CargoGrid",
    category: "Logistics",
    tagline: "A geo-aware dispatch engine for a mid-size delivery fleet.",
    year: "2024",
    stack: ["Node.js", "TypeScript", "MongoDB", "Kafka", "GCP"],
    tags: ["dispatch", "geolocation", "event-driven"],
    featured: true,
    status: "shipped",
    overview:
      "Backend that matches packages to drivers in real time. CargoGrid tracks 800+ drivers, batches orders by route, and re-dispatches on the fly when a driver drops out.",
    problem:
      "Existing dispatch was manual (a spreadsheet). Drivers spent ~30% of the day waiting or driving dead miles, and customers had no live status — support calls about 'where's my package' were the top ticket.",
    role: "Backend lead on a team of two. I designed the event pipeline, the geofencing model, and the business rules engine that encodes each client's delivery SLAs.",
    approach: [
      "Built a Kafka-based event stream: every GPS ping, order, and driver-status change is an event.",
      "Encoded client SLAs as declarative rules in a small rules engine instead of hard-coded if/else chains — each client's contract is now a config file.",
      "Used a time-windowed route clustering to minimize total driver hours, not just distance.",
      "Added a dead-letter + replay UI for the ops team to reprocess failed events.",
      "Wrote an internal 'what-if' tool letting ops simulate a driver leaving the fleet before committing.",
    ],
    architecture: `GPS pings ─▶ ingest ─▶ Kafka ┐
orders ──────▶ dispatcher ────────┤
                                  └▶ matcher (SLA rules) ─▶ ride-assign topic
                                        │
                                        ▼
                                   notification svc ─▶ push/SMS`,
    results: [
      { label: "wait time reduced", value: "-27%" },
      { label: "dead miles", value: "-19%" },
      { label: "support tickets (where is my parcel)", value: "-52%" },
      { label: "fleet uptime", value: "99.9%" },
    ],
    retro: "Kafka was overkill for the first 50 drivers — a simpler queue would have cut early complexity. The rules engine, though, was the single best decision we made.",
  },
  {
    slug: "novaauth",
    name: "NovaAuth",
    category: "Infrastructure",
    tagline: "A drop-in OAuth2 / OIDC identity service for internal apps.",
    year: "2025",
    stack: ["Rust", "PostgreSQL", "Redis", "Docker", "OIDC"],
    tags: ["auth", "security", "sso"],
    featured: true,
    status: "shipped",
    overview:
      "A self-hosted single sign-on service that lets a team's tools log in through one identity provider. NovaAuth handles OAuth2, OIDC, MFA, and session rotation for 15 internal products.",
    problem:
      "Each internal tool had its own login, its own password table, and inconsistent security. One audit flagged plain-insecure session handling, and onboarding a new hire meant creating 15 accounts.",
    role: "Architect and implementer. Owned the token lifecycle, the upgrade path for existing apps, and the developer experience — a 15-minute migration, not a rewrite.",
    approach: [
      "Implemented OAuth2 + OIDC against the spec, with refresh-token rotation and MFA (TOTP/WebAuthn).",
      "Designed an upgrade path: a compatibility shim that old apps point at, so teams migrate incrementally.",
      "Shorted the 'new hire' flow from 15 manual accounts to a single IdP switch and automatic group sync.",
      "Wrote an audit log that records every sensitive action — dealbreaker requirement from the security review.",
      "Kept dependencies minimal: Rust + one Postgres + one Redis. Attack surface is tiny by construction.",
    ],
    results: [
      { label: "apps migrated", value: "15/15 in 3 weeks" },
      { label: "onboarding time", value: "from 45m to 5m" },
      { label: "audit findings", value: "0 critical" },
      { label: "token issuance p99", value: "14ms" },
    ],
    retro: "I under-scoped documentation. The spec-compliant parts were easy; the docs for app teams were what actually took time. I'd write migration guides first next time.",
  },
  {
    slug: "relay",
    name: "Relay",
    category: "Infrastructure",
    tagline: "An event-driven notification service with delivery guarantees.",
    year: "2023",
    stack: ["Node.js", "BullMQ", "Redis", "PostgreSQL", "AWS"],
    tags: ["notifications", "queues", "retries"],
    status: "shipped",
    overview:
      "A reliable notification pipeline for email, push, and SMS across 6 products. Relay batches, dedupes, and re-tries delivery so a downstream outage never loses a message.",
    problem:
      "Notifications were sent inline in request handlers. A single slow email provider timed out user-facing requests, and when a provider went down, messages were silently lost with no retry.",
    role: "Designer and primary engineer. I built the queue architecture, the retry/backoff policy, and the message-deduplication layer.",
    approach: [
      "Moved all sends onto a persistent queue (BullMQ) with per-channel worker pools.",
      "Implemented exponential backoff with max-retry caps and a DLQ for poison messages.",
      "Added idempotency keys so at-least-once delivery never produces double emails.",
      "Built a message inspector UI for support to see delivery state per message.",
      "Defined clear SLA tiers: transactional (fast path) vs marketing (cheap lane).",
    ],
    results: [
      { label: "messages/day", value: "3M" },
      { label: "delivery success", value: "99.97%" },
      { label: "p50 send time", value: "1.1s" },
      { label: "silent-loss incidents", value: "0" },
    ],
    retro: "I'd add per-provider health probes earlier — the first outage affected all channels at once because we had no circuit breaker per provider.",
  },
  {
    slug: "pipelinedash",
    name: "PipelineDash",
    category: "Data",
    tagline: "A realtime analytics ingestion and reporting backend.",
    year: "2024",
    stack: ["Python", "ClickHouse", "Kafka", "FastAPI", "Redis"],
    tags: ["analytics", "streaming", "dashboards"],
    status: "shipped",
    overview:
      "Backend that ingests millions of product events and serves realtime dashboards to operations teams. Built to handle 100x burst scaling on launch days.",
    problem:
      "Realtime dashboards lagged 15+ minutes because batch jobs recomputed everything nightly. Ops made decisions on stale data, and a viral spike could bring the whole analytics path down.",
    role: "Backend engineer. Owned the ingestion path, the ClickHouse schema, and the aggregation strategy.",
    approach: [
      "Streamed events through Kafka into ClickHouse with micro-batch flushes (1–3s freshness).",
      "Pre-aggregated metrics per minute-per-key in materialized views; dashboards read grams-sized results, not raw events.",
      "Tuned ClickHouse partitions by hour and primary keys for the top query patterns.",
      "Put an in-memory cache layer in front of the API to absorb dashboard polling.",
      "Load-tested to 10x normal traffic before every major product launch.",
    ],
    results: [
      { label: "data freshness", value: "from 15m to 3s" },
      { label: "events/day", value: "40M" },
      { label: "dashboard query p95", value: "38ms" },
      { label: "burst load handled", value: "150x steady" },
    ],
    retro: "I should have invested in schema-on-write validation sooner — bad events silently polluted metrics for weeks before we added a validation layer.",
  },
  {
    slug: "bizrules",
    name: "BizRules",
    category: "Platform",
    tagline: "A no-code business-rules engine for a lending platform.",
    year: "2023",
    stack: ["TypeScript", "PostgreSQL", "Redis", "NestJS"],
    tags: ["rules engine", "no-code", "lending"],
    status: "shipped",
    overview:
      "A rules engine that lets product managers change lending eligibility criteria in minutes, without a deploy. Encodes policy as data, not code.",
    problem:
      "Lending rules lived inside if/else blocks. Every policy tweak meant a code change, a review, and a deploy — and nobody outside engineering could see or own the rules.",
    role: "Lead engineer for the engine. I designed the rule model, the evaluator, and the strategy that keeps evaluation fast and auditable.",
    approach: [
      "Modeled rules as versioned, composable criteria (JSON) with an AST-based evaluator.",
      "Every rule evaluation writes an audit trace — regulators ask 'why was this approved' and we can answer.",
      "Built a sandboxed 'test borrower' simulator in the admin UI so PMs validate changes before publishing.",
      "Stored drafts with staged rollout: publish to X% of traffic, compare approval outcomes, then 100%.",
      "Hard performance budget: single-borrower evaluation under 5ms.",
    ],
    results: [
      { label: "rule changes/month", value: "from 6 to 120" },
      { label: "avg policy turnaround", value: "from 3 days to 15 min" },
      { label: "evaluation p99", value: "4.2ms" },
      { label: "audit trail coverage", value: "100%" },
    ],
    retro: "I initially over-generalized the rule syntax. Tightening it to the ~8 patterns the business actually used made everything — UX included — dramatically simpler.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

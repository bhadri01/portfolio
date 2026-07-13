export interface Project {
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  github?: string;
  live?: string;
  year: string;
  featured?: boolean;
  /** Optional screenshot/cover image (e.g. "/screenshots/algotrade.png").
   *  When set it's shown in the list row + modal; otherwise the icon cover is used. */
  cover?: string;
}

export const projects: Project[] = [
  {
    title: "AlgoTrade Platform",
    description:
      "Fully automated algo-trading platform for Indian markets (NSE/BSE) on Zerodha Kite Connect — a React 19 dashboard over a FastAPI + Celery backend with a Rust risk-engine.",
    highlights: [
      "Hand-wrote a Rust risk-engine (position sizing, Black-Scholes Greeks, Sharpe/Sortino, per-tick risk checks) invoked over stdin/stdout at µs latency — no HTTP, no JSON framing.",
      "Owned a single broker WebSocket and fanned every tick out through Redis, so bot loops, the paper engine and the browser all read from Redis instead of opening their own socket.",
      "Built a 16-section React 19 dashboard backed by FastAPI plus Celery workers for paper fills, deployed strategy loops and a supervisor/heartbeat manager.",
      "Stored ticks in TimescaleDB, sealed broker credentials with Fernet, and shipped it behind a shared Traefik proxy at algo.bha3.me.",
    ],
    tech: ["React", "TypeScript", "FastAPI", "Rust", "Celery", "TimescaleDB", "Redis", "Docker", "Traefik", "WebSockets"],
    live: "https://algo.bha3.me",
    year: "2026",
    featured: true,
  },
  {
    title: "ZeroVPN",
    description:
      "Self-hosted WireGuard VPN management platform — a multi-crate Rust (Axum) backend with a React frontend, run from a single docker compose up.",
    highlights: [
      "Designed a multi-crate Rust workspace (auth with TOTP + sessions + API tokens, WireGuard control, stats poller, DNS writer, mail) behind an Axum HTTP + WebSocket API.",
      "Shared one wire schema between backend and frontend by compiling a Rust crate to WASM and speaking MessagePack over WebSocket.",
      "Wired internal pub/sub over ZeroMQ, per-peer DNS via dnsmasq, and TLS + routing through Caddy — with optional AmneziaWG obfuscation.",
      "Made it production-safe by design: the API refuses to boot with placeholder secrets or a default domain.",
    ],
    tech: ["Rust", "Axum", "React", "WireGuard", "PostgreSQL", "Redis", "ZeroMQ", "WebAssembly", "Docker", "Networking"],
    year: "2026",
    featured: true,
  },
  {
    title: "NullVeil",
    description:
      "Cross-platform, strictly read-only deleted-file recovery and filesystem-forensics tool, hand-rolled in Rust — ~7k lines across 116 tests.",
    highlights: [
      "Hand-wrote every filesystem parser from scratch — FAT12/16/32, exFAT, NTFS (MFT walker + USA fixup), ext2/3/4 and APFS (B+-tree) — with no external filesystem crates.",
      "Built a filesystem-agnostic signature carver with SHA-256 manifests, dedupe, --verify re-reads, and a JSON-lines audit trail for chain-of-custody.",
      "Made it read-only by construction: the BlockReader trait has no write method, and the exporter refuses to write output onto the source device.",
      "Shipped an interactive ratatui TUI with a multi-select basket, live/deleted toggle and hex preview.",
    ],
    tech: ["Rust", "Filesystems", "Forensics", "CLI/TUI", "Systems Programming"],
    year: "2026",
    featured: true,
  },
  {
    title: "FastAPI QueryBuilder",
    description:
      "Published PyPI package that turns URL query params into SQLAlchemy filters for FastAPI — 14+ operators with nested and relationship filtering.",
    highlights: [
      "Turned request query strings into safe, composable SQLAlchemy filters with 14+ operators.",
      "Added dynamic sorting, recursive search across relationships, pagination and soft-delete support.",
      "Packaged it as a drop-in dependency and published it to PyPI under an MIT license.",
    ],
    tech: ["Python", "FastAPI", "SQLAlchemy", "PyPI"],
    github: "https://github.com/bhadri01/fastapi-querybuilder",
    year: "2025",
    featured: true,
  },
  {
    title: "FastAPI SSE Events",
    description:
      "Published PyPI package for real-time Server-Sent Events in FastAPI, backed by Redis Pub/Sub and built for horizontal scale.",
    highlights: [
      "Designed a decorator-based API that cuts common SSE integration boilerplate by roughly 75%.",
      "Backed event delivery with Redis Pub/Sub so it works across horizontally scaled, multi-worker deployments.",
      "Published and maintained it on PyPI under an MIT license.",
    ],
    tech: ["Python", "FastAPI", "Redis", "SSE", "WebSockets"],
    github: "https://github.com/bhadri01/fastapi_sse_events",
    year: "2025",
    featured: true,
  },
  {
    title: "RAG Knowledge System",
    description:
      "Retrieval-Augmented Generation system with document ingestion, pgvector semantic search, and LangGraph agent orchestration.",
    highlights: [
      "Built a document ingestion pipeline with pgvector-backed semantic search.",
      "Orchestrated retrieval and answering as a LangGraph agent workflow.",
      "Added an LLM evaluation harness to measure answer quality and faithfulness.",
    ],
    tech: ["Python", "LangChain", "LangGraph", "pgvector", "RAG Systems", "AI Agents", "LLM Evaluation", "PostgreSQL"],
    year: "2025",
    featured: true,
  },
  {
    title: "Hackminds",
    description:
      "Gemini-powered quiz-question generator API — a FastAPI service that produces unique questions across six question types.",
    highlights: [
      "Generated MCQ, MSQ, True/False, Fill-up, Short and Coding questions with Google Gemini.",
      "Built an anti-duplication engine using Jaccard, LCS and SimHash similarity over a corpus of known stems.",
      "Handled scale with automatic request chunking on token limits, schema validation, retry logic and background corpus updates.",
    ],
    tech: ["Python", "FastAPI", "Google Gemini", "SQLAlchemy", "AI Agents"],
    year: "2025",
  },
  {
    title: "Crypton API",
    description:
      "Unified authentication, authorization and case-management platform API built on FastAPI and SQLAlchemy.",
    highlights: [
      "Built a unified auth + authorization + case-management API on FastAPI and SQLAlchemy.",
      "Used PostgreSQL as the primary store with Redis sessions/cache and MinIO for object storage.",
      "Managed schema with Alembic and the toolchain with uv, on a microservices-to-monolith migration path.",
    ],
    tech: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Redis", "MinIO"],
    year: "2025",
  },
  {
    title: "WireGuard VPN Platform",
    description:
      "VPN management dashboard with live traffic stats, custom DNS and peer control.",
    highlights: [
      "Built a VPN management dashboard with live RX/TX traffic visualization.",
      "Added custom DNS, peer control and automatic IP assignment.",
    ],
    tech: ["WireGuard", "Python", "React", "DNS", "Linux", "Networking"],
    year: "2024",
  },
  {
    title: "Docker Stats Monitor",
    description:
      "Web-based Docker monitoring dashboard streaming real-time container metrics.",
    highlights: [
      "Streamed real-time container status, CPU/memory usage and network/block I/O metrics over WebSockets.",
      "Presented it all in a clean, live web dashboard.",
    ],
    tech: ["Docker", "Python", "WebSockets", "SSE / WebSockets", "Linux"],
    year: "2024",
  },
  {
    title: "Voxiloud",
    description:
      "React Native text-to-speech mobile app — playback, translation and file-to-text on the go.",
    highlights: [
      "Built a React Native app for text-to-speech with speed/volume controls, translation and file-to-text.",
      "Managed global state with Recoil and styled with NativeWind (Tailwind).",
      "Added saved-activity history with search and filtering.",
    ],
    tech: ["React Native", "Recoil", "Tailwind CSS", "JavaScript"],
    year: "2025",
  },
  {
    title: "Crime Records CRM",
    description:
      "Full-stack case-management and timeline-tracking system built for the Cyber Crime Police Station, Salem.",
    highlights: [
      "Built full-stack case management with timeline tracking for a real police station.",
      "Wrote the backend in Go with a React frontend on PostgreSQL.",
      "Containerized and deployed the whole system with Docker.",
    ],
    tech: ["Go", "React", "PostgreSQL", "Docker"],
    year: "2023",
  },
  {
    title: "Bha3.me Portfolio",
    description:
      "This portfolio — a light design system with Framer Motion, shipped through a Docker + Traefik + Jenkins pipeline.",
    highlights: [
      "Designed and built a light design system with Framer Motion animation.",
      "Deployed via Docker with a Traefik reverse proxy and Jenkins CI/CD.",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Docker", "Traefik", "Jenkins", "CI/CD"],
    github: "https://github.com/bhadri01/portfolio",
    live: "https://bha3.me",
    year: "2025",
  },
];

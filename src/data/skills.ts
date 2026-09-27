import type { ComponentType } from "react";
import {
  SiCelery, SiDocker, SiExpress, SiFastapi, SiGithubactions, SiGo, SiLangchain, SiLinux, SiMongodb, SiNginx, SiNodedotjs, SiPostgresql, SiPytest, SiPython, SiReact, SiRedis, SiRust, SiSqlalchemy, SiTypescript, SiWebassembly, SiWireguard,
} from "react-icons/si";
import {
  BrainCircuit, Database, KeyRound, Network, RadioTower, Sparkles, Webhook, Workflow, Plug, ShieldCheck, ScanSearch, Fingerprint, Trophy,
} from "lucide-react";

type IconType = ComponentType<{ size?: number; className?: string }>;

/**
 * wt  = weight / importance in the toolkit (drives treemap tile size)
 * level = proficiency %
 * what = what the tool actually is. Objective, and true regardless of who's writing.
 * how  = first-person: how it was actually used.
 *
 * `how` is deliberately optional and deliberately sparse. It is only filled in
 * where the claim is backed by a real project in src/data/projects.ts or by the
 * résumé. Writing a usage story for a tool with no evidence behind it
 * would put invented experience in Bhadri's own voice on a page recruiters read
 * before interviewing him — the one place a nice-sounding sentence costs the
 * most. If a `how` is missing here, it's missing on purpose: supply the real
 * story or drop the skill.
 */
export type Skill = {
  label: string;
  Icon: IconType;
  color: string;
  level: number | null;
  status?: "Hands-on use" | "Project experience" | "Team competition" | "Learning focus";
  mom: number;
  cat: string;
  wt: number;
  what: string;
  how?: string;
};

export const skills: Skill[] = [
  // ---------------- Core ----------------
  {
    label: "Python", Icon: SiPython, color: "#3776AB", level: 95, mom: 3.1, cat: "Core", wt: 10,
    what: "A general-purpose language that trades raw speed for speed of writing — the default for web backends, data work and anything AI-adjacent.",
    how: "My primary backend language. Both of my published packages are Python, and it's what the Succeedex backend, CrimeTracker Pro API and the WireGuard platform are written in.",
  },
  {
    label: "FastAPI", Icon: SiFastapi, color: "#009688", level: 95, mom: 6.2, cat: "Core", wt: 10,
    what: "A Python web framework that derives validation and API docs from type hints, and runs async by default.",
    how: "My default for building an API. Both published packages extend it, and it's the backend of AlgoTrade and CrimeTracker Pro. I use it for authentication, case workflows and real-time services.",
  },
  {
    label: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1", level: 90, mom: 5.2, cat: "Core", wt: 9,
    what: "The relational database I default to — strict about correctness, and extensible enough to absorb jobs you'd otherwise add another system for.",
    how: "ZeroCode uses it as more than storage: LISTEN/NOTIFY dispatches jobs and SELECT … FOR UPDATE SKIP LOCKED lets workers race for them safely — a queue without a queue broker.",
  },
  {
    label: "SQLAlchemy", Icon: SiSqlalchemy, color: "#D71F00", level: 90, mom: 5.1, cat: "Core", wt: 8,
    what: "Python's ORM and SQL toolkit — maps database rows to objects without giving up hand-written SQL when you need it.",
    how: "fastapi-querybuilder is built directly on it: 14 operators, nested relationship joins, pagination and soft-delete, all generated into SQLAlchemy rather than string-built.",
  },
  {
    label: "Redis", Icon: SiRedis, color: "#D82C20", level: 85, mom: 6.0, cat: "Core", wt: 7,
    what: "An in-memory data store used as a cache, a queue and a pub/sub bus — fast because it never touches disk on the hot path.",
    how: "In AlgoTrade I own a single broker WebSocket and fan every tick out through Redis, so bot loops, the paper engine and the browser all read from Redis instead of each opening their own socket. fastapi_sse_events uses its pub/sub to scale SSE horizontally.",
  },
  {
    label: "Docker", Icon: SiDocker, color: "#2496ED", level: 90, mom: 5.0, cat: "Core", wt: 9,
    what: "Packages an app with its dependencies so it runs identically everywhere — and gives you the isolation primitives underneath.",
    how: "Everything I ship runs in it. On the cloud labs platform it was the product itself: containerized environments provisioned per session, so reproducibility was the feature.",
  },
  {
    label: "REST & SSE APIs", Icon: Webhook, color: "#0EA5E9", level: 92, mom: 4.3, cat: "Core", wt: 8,
    what: "REST is the dominant convention for HTTP APIs — resources as URLs, verbs as methods. Server-Sent Events is the other half: one long-lived response the server keeps writing to, for progress and streams.",
    how: "The interface of nearly everything I've built. ZeroCode's submissions API is the one I'd point at — tokens, polling, SSE streaming and readiness probes in one small surface. I also published fastapi_sse_events, which backs SSE with Redis pub/sub so streams survive more than one server.",
  },
  {
    label: "Linux", Icon: SiLinux, color: "#C9930A", level: 88, mom: 4.0, cat: "Core", wt: 8,
    what: "The kernel everything server-side runs on. Namespaces, cgroups and capabilities are its isolation primitives — the things containers are actually made of.",
    how: "Where I'm most at home. ZeroCode's sandbox is Linux internals end to end: user namespaces, pivot_root, cgroup v2, seccomp BPF, Landlock and capability drops.",
  },

  // ---------------- AI Engineering ----------------
  {
    label: "RAG (pgvector)", Icon: BrainCircuit, color: "#0358fc", level: 78, mom: 22.4, cat: "AI Engineering", wt: 9,
    what: "Retrieval-Augmented Generation: fetch relevant documents first, then let the model answer from them — grounding it in your data instead of its memory. pgvector is the PostgreSQL extension that does the similarity search, so the embeddings live next to the relational data instead of in a second database.",
    how: "My current AI learning work covers retrieval pipelines, embeddings and pgvector semantic search, building on my PostgreSQL backend experience.",
  },
  {
    label: "LangChain", Icon: SiLangchain, color: "#1C3C3C", level: 76, mom: 20.1, cat: "AI Engineering", wt: 7,
    what: "A framework for wiring LLM calls together with retrieval, tools and memory instead of hand-rolling the plumbing.",
    how: "Exploring retrieval chains, model calls and tool integration as part of my AI engineering learning.",
  },
  {
    label: "LangGraph", Icon: Workflow, color: "#2563EB", level: 72, mom: 24.6, cat: "AI Engineering", wt: 6,
    what: "Models an agent as a state graph rather than a chain, so loops, branches and retries are explicit and inspectable.",
    how: "Learning stateful agent workflows, branching and recovery as part of my backend-to-AI engineering development.",
  },
  {
    label: "OpenAI API", Icon: Sparkles, color: "#10A37F", level: 82, mom: 14.0, cat: "AI Engineering", wt: 6,
    what: "Hosted access to frontier models — no infrastructure, but you pay per token and give up control of the weights.",
  },
  {
    label: "MCP Servers", Icon: Plug, color: "#d97757", level: 74, mom: 26.0, cat: "AI Engineering", wt: 7,
    what: "Model Context Protocol: a standard way to expose real tools and data to an LLM client, so a model calls your services instead of guessing at their contents.",
    how: "Studying MCP tools, resources and client/server boundaries to connect LLM applications with existing backend services.",
  },

  // ---------------- Also ship with ----------------
  {
    label: "TypeScript", Icon: SiTypescript, color: "#3178C6", level: 86, mom: 5.4, cat: "Also ship with", wt: 7,
    what: "JavaScript with a type system layered on top, checked before the code ever runs rather than in production.",
    how: "Every frontend I build. The AlgoTrade dashboard and the Succeedex test portal are both TypeScript — on a 16-section dashboard the types are what make refactors survivable.",
  },
  {
    label: "React", Icon: SiReact, color: "#149ECA", level: 82, mom: 4.1, cat: "Also ship with", wt: 7,
    what: "The component model that won the frontend: describe the UI for a given state and let it work out the DOM changes.",
    how: "Every interface I've shipped, this site included. The 16-section AlgoTrade dashboard is the biggest — enough surface that state discipline stops being optional.",
  },
  {
    label: "MongoDB", Icon: SiMongodb, color: "#47A248", level: 75, mom: 5.0, cat: "Also ship with", wt: 5,
    what: "A document database used to store JSON-like records for web applications.",
    how: "Used MongoDB as the data layer in MERN-stack application work.",
  },
  {
    label: "Express", Icon: SiExpress, color: "#666666", level: 75, mom: 4.7, cat: "Also ship with", wt: 5,
    what: "A lightweight Node.js framework for routing HTTP requests and building APIs.",
    how: "Built server-side APIs with Express as part of MERN-stack application work.",
  },
  {
    label: "Node.js", Icon: SiNodedotjs, color: "#339933", level: 78, mom: 4.8, cat: "Also ship with", wt: 5,
    what: "A JavaScript runtime for server-side applications and development tooling.",
    how: "Used Node.js with Express behind React interfaces in MERN-stack work.",
  },
  {
    label: "Rust", Icon: SiRust, color: "#B7410E", level: 76, mom: 9.5, cat: "Also ship with", wt: 7,
    what: "A systems language that proves memory safety at compile time instead of trusting the programmer or paying for a garbage collector.",
    how: "What I reach for when correctness has to be structural rather than remembered. ZeroCode's sandbox, ZeroVPN's multi-crate backend, NullVeil's filesystem parsers, and AlgoTrade's risk engine are all Rust.",
  },
  {
    label: "Celery", Icon: SiCelery, color: "#37814A", level: 80, mom: 3.0, cat: "Also ship with", wt: 5,
    what: "Python's distributed task queue — moves slow work out of the request cycle and onto workers.",
    how: "Runs AlgoTrade's background work: paper fills, deployed strategy loops, and the supervisor/heartbeat manager that keeps them alive.",
  },
  {
    label: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF", level: 85, mom: 4.2, cat: "Also ship with", wt: 6,
    what: "CI/CD that lives in the repository — workflows triggered by pushes and pull requests, running on hosted runners.",
    how: "This site ships through one: lint, type-check, tests and a production build gate every push before it reaches Pages. At BloomSkillTech I set up the same shape for the team.",
  },
  {
    label: "Go", Icon: SiGo, color: "#00ADD8", level: 70, mom: 2.0, cat: "Also ship with", wt: 4,
    what: "A small, fast compiled language built for servers — goroutines make concurrency cheap, and the toolchain produces a single static binary.",
    how: "The backend of the crime-records CRM I built for the Cyber Crime Police Station in Salem: Go APIs behind a React frontend, on PostgreSQL, containerized with Docker.",
  },
  {
    label: "Nginx/Traefik", Icon: SiNginx, color: "#009639", level: 82, mom: 3.1, cat: "Also ship with", wt: 6,
    what: "The two reverse proxies I use in front of a service. Nginx is configured by hand and does TLS termination, static files and load balancing; Traefik discovers containers and routes to them without a config rewrite per deploy.",
  },
  {
    label: "Pytest", Icon: SiPytest, color: "#0A9EDC", level: 86, mom: 3.0, cat: "Also ship with", wt: 6,
    what: "Python's testing framework — fixtures and plain assert statements instead of boilerplate.",
  },
  {
    label: "WireGuard", Icon: SiWireguard, color: "#9B1C31", level: 78, mom: 8.0, cat: "Also ship with", wt: 6,
    what: "A modern VPN protocol that secures network traffic with a small, auditable cryptographic design.",
    how: "Built ZeroVPN around WireGuard peer management, configuration and connection statistics.",
  },
  {
    label: "WebSockets", Icon: RadioTower, color: "#3975A8", level: 82, mom: 6.0, cat: "Also ship with", wt: 6,
    what: "A persistent, two-way connection between client and server for real-time updates without repeated polling.",
    how: "Used WebSockets for live market ticks in AlgoTrade and for the live API connection in ZeroVPN.",
  },
  {
    label: "OAuth", Icon: KeyRound, color: "#635BBD", level: 75, mom: 4.0, cat: "Also ship with", wt: 5,
    what: "An authorization framework that lets applications grant scoped access without sharing account passwords.",
    how: "Helped shape Succeedex's centralized OAuth flow shared by its student, college, company and admin services.",
  },
  {
    label: "Axum", Icon: SiRust, color: "#A0472E", level: 76, mom: 9.0, cat: "Also ship with", wt: 7,
    what: "A Rust web framework built on Tokio and Tower for strongly typed HTTP APIs and middleware.",
    how: "Used Axum for ZeroCode's HTTP API and ZeroVPN's HTTP and WebSocket backend.",
  },
  {
    label: "TimescaleDB", Icon: SiPostgresql, color: "#4258A8", level: 73, mom: 6.0, cat: "Also ship with", wt: 6,
    what: "A PostgreSQL extension for time-series data, including efficient storage and queries over timestamped records.",
    how: "Stored market ticks in TimescaleDB for the AlgoTrade platform.",
  },
  {
    label: "MinIO", Icon: Database, color: "#A3273D", level: 75, mom: 4.0, cat: "Also ship with", wt: 5,
    what: "An S3-compatible object store for files and other unstructured data used by applications.",
    how: "Used MinIO for object storage in the earlier CrimeTracker Pro backend alongside PostgreSQL and Redis.",
  },
  {
    label: "React Native", Icon: SiReact, color: "#087EA4", level: 74, mom: 4.0, cat: "Also ship with", wt: 5,
    what: "A framework for building mobile applications with React components and native platform views.",
    how: "Built Voxiloud, a text-to-speech mobile app with playback controls, translation and saved history, using React Native.",
  },
  {
    label: "WebAssembly", Icon: SiWebassembly, color: "#654FF0", level: 72, mom: 10.0, cat: "Also ship with", wt: 6,
    what: "A portable binary format that runs compiled code in browsers and other sandboxed runtimes.",
    how: "Compiled a shared Rust wire-schema crate to WebAssembly for ZeroVPN's frontend and backend protocol.",
  },
  {
    label: "DNS & Networking", Icon: Network, color: "#286D72", level: 77, mom: 7.0, cat: "Also ship with", wt: 6,
    what: "The addressing, name-resolution and routing fundamentals that connect services, clients and private networks.",
    how: "Built peer addressing and custom DNS into the WireGuard VPN Platform, and per-peer DNS into ZeroVPN.",
  },
  {
    label: "Burp Suite", Icon: ShieldCheck, color: "#B74722", level: null, status: "Hands-on use", mom: 0, cat: "Cybersecurity", wt: 7,
    what: "A toolkit for inspecting HTTP requests and responses during web application security testing.",
    how: "I've used Burp Suite hands-on for examining web traffic during application security testing.",
  },
  {
    label: "Wireshark", Icon: RadioTower, color: "#176A9C", level: null, status: "Hands-on use", mom: 0, cat: "Cybersecurity", wt: 7,
    what: "A network protocol analyzer for examining captured packets and understanding communication between systems.",
    how: "I've used Wireshark hands-on to inspect packet captures and understand network traffic.",
  },
  {
    label: "Nmap", Icon: ScanSearch, color: "#285782", level: null, status: "Hands-on use", mom: 0, cat: "Cybersecurity", wt: 7,
    what: "A network discovery tool for identifying hosts, exposed ports and the services running on them.",
    how: "I've used Nmap hands-on to explore hosts, ports and network services in security work.",
  },
  {
    label: "API Security", Icon: KeyRound, color: "#21715B", level: null, status: "Project experience", mom: 0, cat: "Cybersecurity", wt: 6,
    what: "Protecting application endpoints through authentication, authorization, session controls and scoped access.",
    how: "Worked on shared OAuth in Succeedex, authorization in CrimeTracker Pro, and TOTP, sessions and API tokens in ZeroVPN.",
  },
  {
    label: "Linux Sandboxing", Icon: ShieldCheck, color: "#47682B", level: null, status: "Project experience", mom: 0, cat: "Cybersecurity", wt: 6,
    what: "Restricting untrusted processes with namespaces, cgroup limits, seccomp BPF, Landlock and reduced capabilities.",
    how: "Built ZeroCode's layered isolation for untrusted programs, combining resource limits, filesystem restrictions and capability drops.",
  },
  {
    label: "Threat Modelling", Icon: ShieldCheck, color: "#72522E", level: null, status: "Project experience", mom: 0, cat: "Cybersecurity", wt: 6,
    what: "Identifying threats and trust boundaries before testing how a system behaves under adversarial conditions.",
    how: "Used a STRIDE threat model and 130+ adversarial tests for ZeroCode, covering resource exhaustion and sandbox escape attempts.",
  },
  {
    label: "VPN Isolation", Icon: Network, color: "#386662", level: null, status: "Project experience", mom: 0, cat: "Cybersecurity", wt: 5,
    what: "Separating network access with encrypted tunnels, peer configuration, addressing and private DNS.",
    how: "Built private lab access and VPN peer management, with per-peer DNS, addressing and traffic visibility across the WireGuard projects.",
  },
  {
    label: "Digital Forensics", Icon: Fingerprint, color: "#70488D", level: null, status: "Project experience", mom: 0, cat: "Cybersecurity", wt: 6,
    what: "Recovering and examining digital artifacts while preserving the source and recording verification information.",
    how: "Built NullVeil's read-only recovery workflow with filesystem parsers, signature carving, SHA-256 verification, deduplication and audit manifests.",
  },
  {
    label: "CTF", Icon: Trophy, color: "#946715", level: null, status: "Team competition", mom: 0, cat: "Cybersecurity", wt: 6,
    what: "Capture the Flag competitions test practical security problem-solving through technical challenges.",
    how: "Member of the first-place TOM CTF team and third-place YUKTHI CTF team. YUKTHI was conducted by Selfmade Ninja Academy.",
  },
  {
    label: "Gemini API", Icon: Sparkles, color: "#3755B5", level: null, status: "Learning focus", mom: 0, cat: "AI Engineering", wt: 5,
    what: "A model API for integrating generative AI capabilities into applications and backend workflows.",
    how: "Exploring Gemini API integration alongside OpenAI as part of my AI engineering learning.",
  },
  {
    label: "Structured Outputs", Icon: Webhook, color: "#6553A4", level: null, status: "Learning focus", mom: 0, cat: "AI Engineering", wt: 5,
    what: "Schema-constrained model responses that applications can validate and process as structured data.",
    how: "Exploring prompt design, JSON schemas and response validation for integrating model output with backend services.",
  },
  {
    label: "LLM Evaluation", Icon: ScanSearch, color: "#725080", level: null, status: "Learning focus", mom: 0, cat: "AI Engineering", wt: 5,
    what: "Repeatable assessment of model answers and retrieval results for relevance, supporting evidence and failure cases.",
    how: "Learning to compare retrieval results and assess grounded answers with test datasets and repeatable examples.",
  },
  {
    label: "AI Security", Icon: ShieldCheck, color: "#385A8D", level: null, status: "Learning focus", mom: 0, cat: "AI Engineering", wt: 5,
    what: "Protecting AI applications from prompt injection, excessive tool permissions and unintended access to data.",
    how: "Exploring input validation, scoped tool permissions and boundaries between trusted instructions and retrieved content.",
  },
  {
    label: "Embeddings", Icon: BrainCircuit, color: "#5340A1", level: null, status: "Learning focus", mom: 0, cat: "AI Engineering", wt: 5,
    what: "Numerical representations of content used to compare meaning and retrieve semantically related information.",
    how: "Learning document chunking, embedding generation and semantic retrieval over pgvector as part of RAG exploration.",
  },
];

/**
 * Applied skills and engineering practices. Deliberately NOT `Skill[]`: these have no
 * vendor icon, no brand colour, and no honest percentage — "code review, 82%"
 * is a number pretending to be a measurement. They render as uniform boxes
 * under the treemap instead, so the page can claim them without scoring them.
 */
export type Practice = { label: string; what: string };

export const practices: Practice[] = [
  {
    label: "System design (HLD/LLD)",
    what: "Deciding the shape of a system before writing it — services, data model, and where the boundaries fall — then taking it down to the level someone can build from.",
  },
  {
    label: "Code review",
    what: "Reading other people's changes as the main way correctness and context spread through a team, rather than as a gate at the end.",
  },
  {
    label: "Automated testing",
    what: "Tests that run on every push and are trusted enough to block a merge. The point is being able to change things later without fear.",
  },
  {
    label: "CI/CD",
    what: "Automating the path from commit to production so a release is routine rather than an event. I set this up for the team at BloomSkillTech.",
  },
  {
    label: "Phased delivery",
    what: "Shipping in slices that each stand on their own, so scope can move without the launch date moving with it.",
  },
  {
    label: "IoT & gesture control",
    what: "Built a final-year electronics project that controls electronic components through gestures, combining IoT prototyping with hardware-software integration.",
  },
  {
    label: "Technical training",
    what: "Trained 1,000+ students from multiple colleges, bringing hands-on software development experience into teaching and mentorship.",
  },
];

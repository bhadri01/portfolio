import type { ComponentType } from "react";
import {
  SiPython, SiTypescript, SiJavascript, SiC, SiGo, SiRust, SiHtml5, SiFastapi,
  SiSqlalchemy, SiNodedotjs, SiGraphql, SiRedis, SiPostgresql, SiReact,
  SiTailwindcss, SiVite, SiDocker, SiJenkins, SiTraefikproxy, SiNginx, SiLinux,
  SiWireguard, SiGit, SiLangchain, SiWireshark, SiBurpsuite, SiOwasp,
  SiPostman, SiMetasploit, SiGnubash, SiMongodb, SiCelery,
  SiPydantic, SiRabbitmq, SiPytest, SiVitest,
  SiPrometheus, SiGrafana, SiHuggingface,
  SiTimescale, SiReactquery, SiWebassembly, SiNextdotjs,
} from "react-icons/si";
import {
  Database, Webhook, RadioTower, ArrowLeftRight, BrainCircuit, Workflow, Boxes, Gauge,
  Bot, Infinity as InfinityIcon, Radar, Cloud, Sparkles, Drama,
  Layers, Smartphone,
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
 * résumé. Of 58 skills only ~30 qualify; the rest fall back to the category note
 * in Skills.tsx. Writing a usage story for a tool with no evidence behind it
 * would put invented experience in Bhadri's own voice on a page recruiters read
 * before interviewing him — the one place a nice-sounding sentence costs the
 * most. If a `how` is missing here, it's missing on purpose: supply the real
 * story or drop the skill.
 */
export type Skill = {
  label: string;
  Icon: IconType;
  color: string;
  level: number;
  mom: number;
  cat: string;
  wt: number;
  what: string;
  how?: string;
};

export const skills: Skill[] = [
  // ---------------- Languages ----------------
  {
    label: "Python", Icon: SiPython, color: "#3776AB", level: 95, mom: 3.1, cat: "Languages", wt: 10,
    what: "A general-purpose language that trades raw speed for speed of writing — the default for web backends, data work and anything AI-adjacent.",
    how: "My primary backend language. Both of my published packages are Python, and it's what the Succeedex backend, Crypton API and the WireGuard platform are written in.",
  },
  {
    label: "TypeScript", Icon: SiTypescript, color: "#3178C6", level: 86, mom: 5.4, cat: "Languages", wt: 7,
    what: "JavaScript with a type system layered on top, checked before the code ever runs rather than in production.",
    how: "Every frontend I build. The AlgoTrade dashboard and the Succeedex test portal are both TypeScript — on a 16-section dashboard the types are what make refactors survivable.",
  },
  {
    label: "JavaScript", Icon: SiJavascript, color: "#EAB308", level: 88, mom: 2.2, cat: "Languages", wt: 6,
    what: "The language browsers actually run. Everything on the frontend compiles down to it eventually.",
    how: "Underneath all the TypeScript, and directly in Voxiloud.",
  },
  {
    label: "Go", Icon: SiGo, color: "#00ADD8", level: 76, mom: 6.0, cat: "Languages", wt: 4,
    what: "A small, fast, compiled language built for servers — easy concurrency and a single static binary to deploy.",
    how: "The backend of the crime-records CRM I built for the Cyber Crime Police Station. A single binary was the right call for a system that had to run on their hardware.",
  },
  {
    label: "Rust", Icon: SiRust, color: "#B7410E", level: 76, mom: 9.5, cat: "Languages", wt: 7,
    what: "A systems language that proves memory safety at compile time instead of trusting the programmer or paying for a garbage collector.",
    how: "What I reach for when correctness has to be structural rather than remembered. ZeroCode's sandbox, ZeroVPN's multi-crate backend, NullVeil's filesystem parsers, and AlgoTrade's risk engine are all Rust.",
  },
  {
    label: "C", Icon: SiC, color: "#5A6E8C", level: 78, mom: 1.5, cat: "Languages", wt: 3,
    what: "The language the operating system is written in. No abstractions, no safety net — you manage memory yourself.",
  },
  {
    label: "SQL", Icon: Database, color: "#4479A1", level: 85, mom: 4.0, cat: "Languages", wt: 7,
    what: "The declarative language for relational data — you describe the result you want, the planner works out how to get it.",
    how: "Behind every backend I've shipped. fastapi-querybuilder is essentially an exercise in generating it safely: turning URL query strings into SQLAlchemy joins without opening an injection hole.",
  },
  {
    label: "HTML/CSS", Icon: SiHtml5, color: "#E34F26", level: 82, mom: 1.8, cat: "Languages", wt: 5,
    what: "The structure and presentation layer of the web. Everything a browser renders is these two underneath the framework.",
  },
  {
    label: "Bash", Icon: SiGnubash, color: "#4EAA25", level: 84, mom: 2.5, cat: "Languages", wt: 6,
    what: "The shell that glues Unix together — the language of build scripts, CI steps and container entrypoints.",
  },
  {
    label: "WebAssembly", Icon: SiWebassembly, color: "#654FF0", level: 66, mom: 9.0, cat: "Languages", wt: 3,
    what: "A compilation target that runs native-speed code in the browser, letting languages like Rust ship to the frontend.",
    how: "In ZeroVPN I compile a Rust crate to WASM so the backend and frontend share one wire schema — the types can't drift apart because both sides are generated from the same source.",
  },

  // ---------------- Backend ----------------
  {
    label: "FastAPI", Icon: SiFastapi, color: "#009688", level: 95, mom: 6.2, cat: "Backend", wt: 10,
    what: "A Python web framework that derives validation and API docs from type hints, and runs async by default.",
    how: "My default for building an API. Both published packages extend it, and it's the backend of AlgoTrade and Crypton API. Enough hours in its internals to know where the extension points are.",
  },
  {
    label: "SQLAlchemy", Icon: SiSqlalchemy, color: "#D71F00", level: 90, mom: 5.1, cat: "Backend", wt: 8,
    what: "Python's ORM and SQL toolkit — maps database rows to objects without giving up hand-written SQL when you need it.",
    how: "fastapi-querybuilder is built directly on it: 14 operators, nested relationship joins, pagination and soft-delete, all generated into SQLAlchemy rather than string-built.",
  },
  {
    label: "Node.js", Icon: SiNodedotjs, color: "#5FA04E", level: 78, mom: 3.0, cat: "Backend", wt: 5,
    what: "JavaScript on the server, event-driven and non-blocking — strong at I/O-bound work, weak at CPU-bound.",
  },
  {
    label: "REST APIs", Icon: Webhook, color: "#0EA5E9", level: 92, mom: 4.3, cat: "Backend", wt: 8,
    what: "The dominant convention for HTTP APIs: resources as URLs, verbs as methods, state left on the client.",
    how: "The interface of nearly everything I've built. ZeroCode's submissions API is the one I'd point at — tokens, polling, SSE streaming and readiness probes in one small surface.",
  },
  {
    label: "GraphQL", Icon: SiGraphql, color: "#E10098", level: 80, mom: 5.5, cat: "Backend", wt: 5,
    what: "A query language where the client specifies exactly what it wants back — one endpoint instead of many, at the cost of a more complex server.",
  },
  {
    label: "Redis", Icon: SiRedis, color: "#D82C20", level: 85, mom: 6.0, cat: "Backend", wt: 7,
    what: "An in-memory data store used as a cache, a queue and a pub/sub bus — fast because it never touches disk on the hot path.",
    how: "In AlgoTrade I own a single broker WebSocket and fan every tick out through Redis, so bot loops, the paper engine and the browser all read from Redis instead of each opening their own socket. fastapi_sse_events uses its pub/sub to scale SSE horizontally.",
  },
  {
    label: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1", level: 90, mom: 5.2, cat: "Backend", wt: 9,
    what: "The relational database I default to — strict about correctness, and extensible enough to absorb jobs you'd otherwise add another system for.",
    how: "ZeroCode uses it as more than storage: LISTEN/NOTIFY dispatches jobs and SELECT … FOR UPDATE SKIP LOCKED lets workers race for them safely — a queue without a queue broker.",
  },
  {
    label: "SSE", Icon: RadioTower, color: "#7C3AED", level: 86, mom: 7.1, cat: "Backend", wt: 6,
    what: "Server-Sent Events: a one-way stream from server to browser over plain HTTP, with reconnection handled by the browser itself.",
    how: "My default when data only flows one way. ZeroCode streams a job's stdout/stderr to the browser with it, and I published fastapi_sse_events to make it straightforward in FastAPI — backed by Redis pub/sub so it still works across more than one server.",
  },
  {
    label: "WebSockets", Icon: ArrowLeftRight, color: "#6D28D9", level: 84, mom: 6.4, cat: "Backend", wt: 6,
    what: "A persistent, bidirectional connection between browser and server — full duplex, but you own the reconnection and heartbeat logic yourself.",
    how: "Where both ends need to talk. AlgoTrade holds one broker WebSocket and fans every tick out through Redis rather than letting each consumer open its own; Docker Stats Monitor pushes live container metrics over one; ZeroVPN's Axum backend serves an HTTP + WebSocket API.",
  },
  {
    label: "MongoDB", Icon: SiMongodb, color: "#47A248", level: 78, mom: 3.5, cat: "Backend", wt: 5,
    what: "A document database that stores JSON-like records without a fixed schema — flexible early, unforgiving once the data has shape.",
  },
  {
    label: "Celery", Icon: SiCelery, color: "#37814A", level: 80, mom: 3.0, cat: "Backend", wt: 5,
    what: "Python's distributed task queue — moves slow work out of the request cycle and onto workers.",
    how: "Runs AlgoTrade's background work: paper fills, deployed strategy loops, and the supervisor/heartbeat manager that keeps them alive.",
  },
  {
    label: "Pydantic", Icon: SiPydantic, color: "#E92063", level: 88, mom: 4.0, cat: "Backend", wt: 6,
    what: "Runtime validation driven by Python type hints — the thing that makes FastAPI's request parsing and docs work.",
  },
  {
    label: "RabbitMQ", Icon: SiRabbitmq, color: "#FF6600", level: 74, mom: 3.5, cat: "Backend", wt: 4,
    what: "A message broker with real routing — exchanges, queues and acknowledgements for work that must not be dropped.",
  },
  {
    label: "TimescaleDB", Icon: SiTimescale, color: "#FDB515", level: 74, mom: 6.5, cat: "Backend", wt: 4,
    what: "A PostgreSQL extension for time-series data — keeps SQL while handling the write volume timestamps bring.",
    how: "Stores AlgoTrade's market ticks. Market data is the textbook case: append-only, ordered by time, and queried by range.",
  },

  // ---------------- AI Engineering ----------------
  {
    label: "RAG Systems", Icon: BrainCircuit, color: "#0358fc", level: 78, mom: 22.4, cat: "AI Engineering", wt: 8,
    what: "Retrieval-Augmented Generation: fetch relevant documents first, then let the model answer from them — grounding it in your data instead of its memory.",
    how: "Built a knowledge system on this pattern: pgvector for semantic search, LangGraph to orchestrate the agent, and an evaluation harness to check the answers held up.",
  },
  {
    label: "LangChain", Icon: SiLangchain, color: "#1C3C3C", level: 76, mom: 20.1, cat: "AI Engineering", wt: 7,
    what: "A framework for wiring LLM calls together with retrieval, tools and memory instead of hand-rolling the plumbing.",
    how: "Used across the RAG work — the retrieval and chaining layer under the knowledge system.",
  },
  {
    label: "LangGraph", Icon: Workflow, color: "#2563EB", level: 72, mom: 24.6, cat: "AI Engineering", wt: 6,
    what: "Models an agent as a state graph rather than a chain, so loops, branches and retries are explicit and inspectable.",
    how: "Orchestrates the RAG knowledge system's agent. A graph beats a chain the moment you need to loop or recover from a bad step.",
  },
  {
    label: "pgvector", Icon: Boxes, color: "#3E63DD", level: 74, mom: 18.3, cat: "AI Engineering", wt: 5,
    what: "A PostgreSQL extension for embeddings and similarity search — vector search without running a separate vector database.",
    how: "The semantic search layer in my RAG system. Keeping vectors next to the relational data meant one database to operate instead of two.",
  },
  {
    label: "LLM Evaluation", Icon: Gauge, color: "#0891B2", level: 70, mom: 19.2, cat: "AI Engineering", wt: 5,
    what: "Measuring whether model output is actually correct — the part that separates a demo from something you'd let users near.",
    how: "Built an evaluation harness for the RAG system. Without one you can't tell a prompt change from a regression.",
  },
  {
    label: "AI Agents", Icon: Bot, color: "#0246d4", level: 73, mom: 21.5, cat: "AI Engineering", wt: 6,
    what: "LLMs given tools and a loop, deciding their own next step rather than answering in one shot.",
    how: "The agentic side of the RAG knowledge system, orchestrated with LangGraph.",
  },
  {
    label: "Hugging Face", Icon: SiHuggingface, color: "#FFD21E", level: 74, mom: 12.0, cat: "AI Engineering", wt: 5,
    what: "The registry for open models plus the libraries to run them — the default place to find a model you can host yourself.",
  },
  {
    label: "OpenAI API", Icon: Sparkles, color: "#10A37F", level: 82, mom: 14.0, cat: "AI Engineering", wt: 6,
    what: "Hosted access to frontier models — no infrastructure, but you pay per token and give up control of the weights.",
  },

  // ---------------- Frontend ----------------
  {
    label: "React", Icon: SiReact, color: "#149ECA", level: 82, mom: 4.1, cat: "Frontend", wt: 7,
    what: "The component model that won the frontend: describe the UI for a given state and let it work out the DOM changes.",
    how: "Every interface I've shipped, this site included. The 16-section AlgoTrade dashboard is the biggest — enough surface that state discipline stops being optional.",
  },
  {
    label: "Next.js", Icon: SiNextdotjs, color: "#0EA5E9", level: 78, mom: 6.5, cat: "Frontend", wt: 6,
    what: "React with a backend attached — server rendering, routing and API routes, so a React app can ship as a real product rather than a bundle.",
    how: "My React framework of choice on the Succeedex edtech platform, where pages need to render on the server rather than shipping an empty shell.",
  },
  {
    label: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4", level: 88, mom: 3.3, cat: "Frontend", wt: 6,
    what: "Utility classes instead of stylesheets — styles live with the markup, so nothing breaks in a file you forgot existed.",
    how: "How this portfolio and Voxiloud are styled. The payoff is deleting a component and knowing its CSS went with it.",
  },
  {
    label: "Vite", Icon: SiVite, color: "#646CFF", level: 80, mom: 5.0, cat: "Frontend", wt: 4,
    what: "A build tool that serves native ES modules in dev, so startup and hot reload stay instant as a project grows.",
    how: "Builds this site and ZeroCode's playground frontend.",
  },
  {
    label: "React Native", Icon: Smartphone, color: "#087EA4", level: 74, mom: 7.5, cat: "Frontend", wt: 5,
    what: "React that renders real native components — one codebase for iOS and Android, at the cost of a native bridge.",
    how: "Voxiloud, a text-to-speech app with playback controls, translation and file-to-text — built with Recoil for state and NativeWind for styling.",
  },
  {
    label: "Zustand", Icon: Layers, color: "#6E5A43", level: 82, mom: 6.0, cat: "Frontend", wt: 4,
    what: "Minimal state management — a store you can read outside React, without the ceremony of a reducer framework.",
    how: "Drives this site's 3D hero: the scene reads pointer state imperatively inside the render loop, so cursor movement never triggers a React re-render.",
  },
  {
    label: "TanStack Query", Icon: SiReactquery, color: "#FF4154", level: 82, mom: 7.0, cat: "Frontend", wt: 5,
    what: "Treats server data as a cache to synchronise rather than state to own — handles refetching, staleness and dedupe for you.",
  },

  // ---------------- Infrastructure ----------------
  {
    label: "Docker", Icon: SiDocker, color: "#2496ED", level: 90, mom: 5.0, cat: "Infrastructure", wt: 9,
    what: "Packages an app with its dependencies so it runs identically everywhere — and gives you the isolation primitives underneath.",
    how: "Everything I ship runs in it. On the cloud labs platform it was the product itself: containerized environments provisioned per session, so reproducibility was the feature.",
  },
  {
    label: "Jenkins", Icon: SiJenkins, color: "#D24939", level: 80, mom: 3.2, cat: "Infrastructure", wt: 5,
    what: "The self-hosted CI server — old, and still what you use when builds can't leave your own network.",
  },
  {
    label: "Traefik", Icon: SiTraefikproxy, color: "#24A1C1", level: 78, mom: 4.4, cat: "Infrastructure", wt: 5,
    what: "A reverse proxy that discovers containers automatically and handles TLS itself — routing that updates as services come and go.",
    how: "Fronts my deployments. AlgoTrade sits behind a shared Traefik proxy at algo.bha3.me, with certificates handled for me.",
  },
  {
    label: "Nginx", Icon: SiNginx, color: "#009639", level: 82, mom: 3.1, cat: "Infrastructure", wt: 6,
    what: "The workhorse web server and reverse proxy — static files, TLS termination and load balancing, configured by hand.",
  },
  {
    label: "Linux", Icon: SiLinux, color: "#C9930A", level: 88, mom: 4.0, cat: "Infrastructure", wt: 8,
    what: "The kernel everything server-side runs on. Namespaces, cgroups and capabilities are its isolation primitives — the things containers are actually made of.",
    how: "Where I'm most at home. ZeroCode's sandbox is Linux internals end to end: user namespaces, pivot_root, cgroup v2, seccomp BPF, Landlock and capability drops.",
  },
  {
    label: "WireGuard", Icon: SiWireguard, color: "#88171A", level: 76, mom: 5.3, cat: "Infrastructure", wt: 5,
    what: "A VPN that fits in a few thousand lines of kernel code — small enough to audit, which is why it displaced the alternatives.",
    how: "ZeroVPN is a self-hosted manager for it, and I built a secure per-session VPN layer on the cloud labs platform so each lab got private network access.",
  },
  {
    label: "Git", Icon: SiGit, color: "#F05032", level: 92, mom: 2.1, cat: "Infrastructure", wt: 8,
    what: "Distributed version control — the shared history every team workflow is built on.",
  },
  {
    label: "CI/CD", Icon: InfinityIcon, color: "#0358fc", level: 85, mom: 4.2, cat: "Infrastructure", wt: 6,
    what: "Automating the path from commit to production so releases are routine rather than an event.",
    how: "As Technical Lead I established the team's CI/CD pipelines, automated testing and code review — the process, not just the YAML.",
  },
  {
    label: "AWS", Icon: Cloud, color: "#FF9900", level: 76, mom: 8.0, cat: "Infrastructure", wt: 6,
    what: "The largest cloud provider — rent compute, storage and managed services instead of racking hardware.",
  },
  {
    label: "Prometheus", Icon: SiPrometheus, color: "#E6522C", level: 78, mom: 3.5, cat: "Infrastructure", wt: 5,
    what: "Scrapes and stores metrics as time series, and alerts on them — the standard for knowing what a system is doing.",
  },
  {
    label: "Grafana", Icon: SiGrafana, color: "#F46800", level: 80, mom: 3.0, cat: "Infrastructure", wt: 5,
    what: "The dashboard layer over metrics — turns time series into something a human can read at a glance.",
  },

  // ---------------- Security & Testing ----------------
  {
    label: "Nmap", Icon: Radar, color: "#5D3FD3", level: 85, mom: 3.0, cat: "Security & Testing", wt: 6,
    what: "The network scanner — maps hosts, open ports and services. Usually the first step in understanding an unfamiliar network.",
  },
  {
    label: "Wireshark", Icon: SiWireshark, color: "#1679A7", level: 82, mom: 3.5, cat: "Security & Testing", wt: 5,
    what: "Packet capture and inspection — the ground truth when a protocol isn't behaving the way the docs claim.",
  },
  {
    label: "Burp Suite", Icon: SiBurpsuite, color: "#FF6633", level: 84, mom: 4.0, cat: "Security & Testing", wt: 6,
    what: "An intercepting proxy for web security testing — sits between browser and server so requests can be inspected and tampered with.",
  },
  {
    label: "OWASP ZAP", Icon: SiOwasp, color: "#00A4A6", level: 78, mom: 4.5, cat: "Security & Testing", wt: 4,
    what: "The open-source web application scanner — automated checks against the common vulnerability classes.",
  },
  {
    label: "Postman", Icon: SiPostman, color: "#FF6C37", level: 88, mom: 2.5, cat: "Security & Testing", wt: 6,
    what: "An API client for exercising endpoints by hand — the fastest way to find out what a request actually returns.",
  },
  {
    label: "Metasploit", Icon: SiMetasploit, color: "#2A6BB0", level: 74, mom: 4.0, cat: "Security & Testing", wt: 4,
    what: "An exploitation framework — a catalogue of known vulnerabilities used to prove whether a system is genuinely exposed.",
  },
  {
    label: "Pytest", Icon: SiPytest, color: "#0A9EDC", level: 86, mom: 3.0, cat: "Security & Testing", wt: 6,
    what: "Python's testing framework — fixtures and plain assert statements instead of boilerplate.",
  },
  {
    label: "Vitest", Icon: SiVitest, color: "#6E9F18", level: 84, mom: 5.0, cat: "Security & Testing", wt: 5,
    what: "A test runner that reuses the Vite pipeline, so tests run through the same transforms as the app.",
    how: "The test suite on this site runs on it.",
  },
  {
    label: "Playwright", Icon: Drama, color: "#2EAD33", level: 82, mom: 6.0, cat: "Security & Testing", wt: 5,
    what: "Browser automation for end-to-end tests — drives a real browser, so it catches what unit tests can't.",
  },
];

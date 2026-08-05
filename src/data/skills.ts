import type { ComponentType } from "react";
import {
  SiCelery, SiDocker, SiFastapi, SiLangchain, SiLinux, SiNginx, SiPostgresql, SiPytest, SiPython, SiReact, SiRedis, SiRust, SiSqlalchemy, SiTypescript,
} from "react-icons/si";
import {
  Boxes, BrainCircuit, Infinity as InfinityIcon, Sparkles, Webhook, Workflow, Plug,
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
  // ---------------- Core ----------------
  {
    label: "Python", Icon: SiPython, color: "#3776AB", level: 95, mom: 3.1, cat: "Core", wt: 10,
    what: "A general-purpose language that trades raw speed for speed of writing — the default for web backends, data work and anything AI-adjacent.",
    how: "My primary backend language. Both of my published packages are Python, and it's what the Succeedex backend, Crypton API and the WireGuard platform are written in.",
  },
  {
    label: "FastAPI", Icon: SiFastapi, color: "#009688", level: 95, mom: 6.2, cat: "Core", wt: 10,
    what: "A Python web framework that derives validation and API docs from type hints, and runs async by default.",
    how: "My default for building an API. Both published packages extend it, and it's the backend of AlgoTrade and Crypton API. Enough hours in its internals to know where the extension points are.",
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
    label: "REST APIs", Icon: Webhook, color: "#0EA5E9", level: 92, mom: 4.3, cat: "Core", wt: 8,
    what: "The dominant convention for HTTP APIs: resources as URLs, verbs as methods, state left on the client.",
    how: "The interface of nearly everything I've built. ZeroCode's submissions API is the one I'd point at — tokens, polling, SSE streaming and readiness probes in one small surface.",
  },
  {
    label: "Linux", Icon: SiLinux, color: "#C9930A", level: 88, mom: 4.0, cat: "Core", wt: 8,
    what: "The kernel everything server-side runs on. Namespaces, cgroups and capabilities are its isolation primitives — the things containers are actually made of.",
    how: "Where I'm most at home. ZeroCode's sandbox is Linux internals end to end: user namespaces, pivot_root, cgroup v2, seccomp BPF, Landlock and capability drops.",
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
    label: "OpenAI API", Icon: Sparkles, color: "#10A37F", level: 82, mom: 14.0, cat: "AI Engineering", wt: 6,
    what: "Hosted access to frontier models — no infrastructure, but you pay per token and give up control of the weights.",
  },
  {
    label: "MCP Servers", Icon: Plug, color: "#d97757", level: 74, mom: 26.0, cat: "AI Engineering", wt: 7,
    what: "Model Context Protocol: a standard way to expose real tools and data to an LLM client, so a model calls your services instead of guessing at their contents.",
    how: "Wrote a server exposing live platform operations to an LLM client, so questions resolve against real records rather than a stale export.",
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
    label: "CI/CD", Icon: InfinityIcon, color: "#0358fc", level: 85, mom: 4.2, cat: "Also ship with", wt: 6,
    what: "Automating the path from commit to production so releases are routine rather than an event.",
    how: "As Technical Lead I established the team's CI/CD pipelines, automated testing and code review — the process, not just the YAML.",
  },
  {
    label: "Nginx", Icon: SiNginx, color: "#009639", level: 82, mom: 3.1, cat: "Also ship with", wt: 6,
    what: "The workhorse web server and reverse proxy — static files, TLS termination and load balancing, configured by hand.",
  },
  {
    label: "Pytest", Icon: SiPytest, color: "#0A9EDC", level: 86, mom: 3.0, cat: "Also ship with", wt: 6,
    what: "Python's testing framework — fixtures and plain assert statements instead of boilerplate.",
  },
];

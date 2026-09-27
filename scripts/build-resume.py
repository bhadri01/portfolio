"""Build the two-page portfolio resume from verified profile content."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageBreak, PageTemplate, Paragraph,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Bhadrinathan_A_Resume.pdf"
BLUE = colors.HexColor("#0358fc")
INK = colors.HexColor("#142033")
MUTED = colors.HexColor("#526174")

styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=19, leading=22, textColor=INK, alignment=TA_CENTER),
    "tag": ParagraphStyle("tag", fontName="Helvetica", fontSize=9.5, leading=13, textColor=BLUE, alignment=TA_CENTER),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=8, leading=11, textColor=MUTED, alignment=TA_CENTER),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=9.5, leading=13, textColor=BLUE, spaceBefore=11, spaceAfter=4),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=8.8, leading=12, textColor=INK, spaceBefore=5, spaceAfter=2),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=8.25, leading=11.5, textColor=INK, spaceAfter=3),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=8.25, leading=11.5, textColor=INK, leftIndent=10, firstLineIndent=-7, spaceAfter=2),
}


def p(text, kind="body"):
    return Paragraph(text, styles[kind])


def section(text):
    return p(text.upper(), "section")


def bullet(text):
    return p("&#8226; " + text, "bullet")


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#dbe4f0"))
    canvas.line(42, 35, 570, 35)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(42, 25, "BHADRINATHAN A  |  bha3.in")
    canvas.drawRightString(570, 25, f"{doc.page} / 2")
    canvas.restoreState()


doc = BaseDocTemplate(str(OUTPUT), pagesize=(612, 792), leftMargin=42,
                      rightMargin=42, topMargin=37, bottomMargin=45,
                      title="Bhadrinathan A - Resume", author="Bhadrinathan A")
frame = Frame(42, 45, 528, 710, leftPadding=0, rightPadding=0,
              topPadding=0, bottomPadding=0)
doc.addPageTemplates(PageTemplate(id="resume", frames=[frame], onPage=footer))

story = [
    p("BHADRINATHAN A", "name"),
    p("Technical Lead | Backend &amp; Full-Stack Engineer | AI Systems", "tag"),
    p("Salem, Tamil Nadu, India  |  +91 70101 98469  |  bhadrinathan28@gmail.com", "contact"),
    p("linkedin.com/in/bhadri01  |  github.com/bhadri01  |  bha3.in", "contact"),
    section("Profile"),
    p('Engineer with 4+ years of experience spanning production Python backends, React applications, cloud infrastructure and systems programming. Technical Lead at BloomSkillTech, leading an edtech marketplace and engineering delivery. Experienced with the MERN stack and AI retrieval/agent workflows. Trained 1,000+ students from multiple colleges. Published two Python packages, including fastapi-querybuilder. <link href="https://pepy.tech/projects/fastapi-querybuilder" color="#0358fc">View current download statistics.</link>'),
    section("Technical skills"),
    p("<b>Backend &amp; data:</b> Python, FastAPI, Go, PostgreSQL, SQLAlchemy, Redis, REST APIs, SSE, Celery"),
    p("<b>Full stack:</b> MongoDB, Express, React, Node.js (MERN), TypeScript, Next.js"),
    p("<b>AI &amp; systems:</b> RAG, pgvector, LangChain, LangGraph, MCP servers, OpenAI API, Rust, Linux, WireGuard"),
    p("<b>Delivery:</b> Docker, Traefik/Nginx, GitHub Actions, CI/CD, automated testing, code review, system design"),
    section("Professional experience"),
    p("BloomSkillTech  |  Technical Lead, EdTech Platform  |  Jan 2025 - Present", "role"),
    bullet("Lead engineering for a two-sided marketplace connecting trainers and institutions, from architecture and data modelling through production launch."),
    bullet("Guide delivery across React/Next.js frontend, FastAPI/PostgreSQL backend and cloud infrastructure; own technical roadmap and tradeoffs."),
    bullet("Established CI/CD, automated testing, code review and phased delivery practices for the team."),
    p("BloomSkillTech  |  Software Developer  |  May 2023 - Dec 2024", "role"),
    bullet("Built a cloud labs platform that provisions isolated, browser-accessible development environments on demand."),
    bullet("Implemented a WireGuard VPN layer for private lab access and orchestration to provision, scale and tear down containerized sessions."),
    p("Cyber Crime Police Station, Salem  |  Software Engineer Intern  |  Aug 2022 - Mar 2023", "role"),
    bullet("Built a crime-records CRM with case timeline tracking, search and investigation monitoring using React, Go, PostgreSQL and Docker."),
    section("Training &amp; mentorship"),
    p("Trained 1,000+ students from multiple colleges, bringing practical software development experience into the classroom."),
    PageBreak(),
    p("BHADRINATHAN A", "name"),
    p("Selected engineering work &amp; education", "tag"),
    section("Open source &amp; selected projects"),
    p("fastapi-querybuilder  |  Python, FastAPI, SQLAlchemy", "role"),
    bullet("Published an MIT-licensed query builder with 14 comparison operators, nested relationship filtering, recursive search, sorting, pagination and soft-delete support."),
    p("fastapi_sse_events  |  Python, FastAPI, Redis", "role"),
    bullet("Published a Server-Sent Events library backed by Redis pub/sub so event streams work across multiple workers."),
    p("ZeroCode  |  Rust, Axum, PostgreSQL, Linux", "role"),
    bullet("Built a code-execution service supporting 20 languages with layered Linux isolation: namespaces, read-only rootfs, cgroup v2, Landlock, seccomp BPF and dropped capabilities."),
    bullet("Organized a seven-crate workspace with an API, worker pool and PostgreSQL job dispatch; exercised the sandbox with 130+ adversarial tests."),
    p("ZeroVPN  |  Rust, React, WireGuard", "role"),
    bullet("Built a self-hosted VPN management platform with an Axum backend and React frontend; shared a Rust wire schema with the browser through WebAssembly and MessagePack."),
    p("NullVeil  |  Rust, filesystem forensics", "role"),
    bullet("Built read-only filesystem recovery tooling with hand-written parsers, a signature carver, SHA-256 manifests and an interactive terminal UI."),
    p("Succeedex  |  Python, TypeScript, React", "role"),
    bullet("Contributed to a multi-tenant edtech suite spanning role-based CRMs, an assessment portal, shared authentication and containerized services."),
    p("AI knowledge system  |  pgvector, LangGraph, MCP", "role"),
    bullet("Built retrieval over PostgreSQL/pgvector, agent orchestration with LangGraph, evaluation checks and MCP tooling for live platform operations."),
    section("Education"),
    p("B.E. Electronics and Communication Engineering  |  Muthayammal Engineering College  |  2019 - 2023"),
    section("Additional experience"),
    p("Hands-on MERN development with MongoDB, Express, React and Node.js. Also built full-stack tools spanning trading workflows, case management, container monitoring and VPN administration. See bha3.in for project details and public repositories."),
]

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
doc.build(story)
print(OUTPUT)

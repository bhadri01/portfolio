"""Build the archived September two-page resume for reference only.

Requires reportlab and pypdf. Original files in profile-assets are preserved.
"""
from pathlib import Path
from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import BaseDocTemplate, Frame, HRFlowable, KeepTogether, PageBreak, PageTemplate, Paragraph, Spacer

ROOT = Path(__file__).resolve().parents[1]
# Legacy September resume: never overwrite the user-supplied October final PDF.
OUTPUT = ROOT / "output/pdf/Bhadrinathan_A_Resume_Legacy.pdf"
BLUE, INK, MUTED = [colors.HexColor(c) for c in ("#174B79", "#172536", "#49586A")]
WIDTH, HEIGHT = A4
MARGIN = 40
styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=22, leading=25, textColor=INK, spaceAfter=3),
    "tag": ParagraphStyle("tag", fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=BLUE, spaceAfter=4),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=9, leading=12, textColor=MUTED),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=10.4, leading=14, textColor=BLUE, spaceBefore=10, spaceAfter=4, keepWithNext=True),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=INK, spaceBefore=5, spaceAfter=2, keepWithNext=True),
    "meta": ParagraphStyle("meta", fontName="Helvetica", fontSize=9, leading=12, textColor=MUTED, spaceAfter=3, keepWithNext=True),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.3, leading=12.5, textColor=INK, spaceAfter=3),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.3, leading=12.5, textColor=INK, leftIndent=9, firstLineIndent=-7, spaceAfter=2.5),
}

def p(text, kind="body"):
    return Paragraph(text, styles[kind])

def section(text):
    return p(text.upper(), "section")

def bullet(text):
    return p("&#8226; " + text, "bullet")

def project(title, stack, points, url=None):
    heading = f'<link href="{url}" color="#174B79">{title}</link>' if url else title
    return KeepTogether([p(heading + " | " + stack, "role"), *[bullet(point) for point in points]])

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#D6DFE8"))
    canvas.line(MARGIN, 32, WIDTH - MARGIN, 32)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN, 20, "bha3.in  |  github.com/bhadri01")
    canvas.drawRightString(WIDTH - MARGIN, 20, f"{doc.page} / 2")
    canvas.restoreState()

def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(str(OUTPUT), pagesize=A4, leftMargin=MARGIN,
                         rightMargin=MARGIN, topMargin=34, bottomMargin=44,
                         title="Bhadrinathan A - Backend and Full-Stack Engineer", author="Bhadrinathan A")
    frame = Frame(MARGIN, 44, WIDTH - 2 * MARGIN, HEIGHT - 78,
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates(PageTemplate(id="resume", frames=[frame], onPage=footer))
    story = [
        p("BHADRINATHAN A", "name"),
        p("Backend &amp; Full-Stack Engineer | Technical Lead", "tag"),
        p('Salem, Tamil Nadu, India | +91 70101 98469 | <link href="mailto:bhadrinathan28@gmail.com">bhadrinathan28@gmail.com</link>', "contact"),
        p('<link href="https://bha3.in" color="#0358FC"><b>bha3.in</b></link> | <link href="https://github.com/bhadri01" color="#0358FC"><b>github.com/bhadri01</b></link> | <link href="https://linkedin.com/in/bhadri01" color="#0358FC"><b>linkedin.com/in/bhadri01</b></link>', "contact"),
        Spacer(1, 7), HRFlowable(width="100%", thickness=1, color=BLUE),
        section("Professional summary"),
        p("Backend and full-stack engineer with four years across internship and full-time engineering, progressing to Technical Lead at BloomSkillTech. Own architecture, API and data-model design, implementation and deployment across Python/FastAPI, React and containerized infrastructure. Published two FastAPI libraries; built real-time platforms and Rust security tooling. Hands-on MERN experience, team CTF wins and training delivered to 1,000+ students across colleges. Expanding into AI retrieval and agent workflows."),
        section("Technical skills"),
        p("<b>Backend:</b> Python, FastAPI, SQLAlchemy, Go, Rust, Axum, REST APIs, SSE, WebSockets, Celery"),
        p("<b>Web &amp; mobile:</b> JavaScript, TypeScript, React, Next.js, MongoDB, Express, Node.js (MERN), React Native"),
        p("<b>Data &amp; messaging:</b> PostgreSQL, Redis/Valkey, TimescaleDB, Alembic, MinIO/S3-compatible storage, pub/sub"),
        p("<b>Infrastructure &amp; quality:</b> Linux, Docker, WireGuard, DNS, Traefik/Nginx, GitHub Actions, CI/CD, Pytest"),
        p("<b>Security &amp; systems:</b> OAuth, access control, Linux sandboxing, filesystem forensics, CTF problem-solving"),
        p("<b>AI learning &amp; applied exploration:</b> RAG, pgvector, LangChain, LangGraph, MCP, LLM APIs"),
        section("Professional experience"),
        p("BloomSkillTech | Technical Lead - EdTech Platform", "role"),
        p("Jan 2025 - Present | Salem, Tamil Nadu (Hybrid)", "meta"),
        bullet("Led the end-to-end build of a two-sided marketplace connecting trainers and institutions, taking requirements through architecture, data modelling, implementation and production launch."),
        bullet("Directed engineering across React/Next.js interfaces, FastAPI/PostgreSQL services and cloud infrastructure; owned the technical roadmap and tradeoffs in delivery, infrastructure cost and scalability."),
        bullet("Established CI/CD pipelines, automated testing, code review and phased delivery so features could move through repeatable validation and release workflows."),
        bullet("Combined hands-on development with engineering guidance, coordinating frontend, backend and deployment work across the product lifecycle."),
        p("BloomSkillTech | Software Developer", "role"),
        p("May 2023 - Dec 2024 | Salem, Tamil Nadu (Hybrid)", "meta"),
        bullet("Built the full stack of a cloud labs platform: browser-accessible interfaces, backend APIs and environment-provisioning services, enabling development sessions without local setup."),
        bullet("Implemented containerized lab environments for reproducible sessions and a WireGuard VPN layer providing private, isolated access to each lab."),
        bullet("Built orchestration to provision, scale and tear down environments automatically, managing the session lifecycle and reducing unnecessary idle infrastructure."),
        p("Cyber Crime Police Station, Salem | Software Engineer Intern", "role"),
        p("Aug 2022 - Mar 2023 | Salem, Tamil Nadu", "meta"),
        bullet("Sole developer of a crime-records CRM with case timelines, record search and investigation tracking, allowing officers to log and monitor cases through one interface."),
        bullet("Implemented the React frontend, Go backend APIs and PostgreSQL data layer; containerized and deployed the application with Docker."),
        section("Achievements & training"),
        p("<b>TOM CTF:</b> Member of the 1st-place team. <b>YUKTHI CTF:</b> Member of the 3rd-place team, conducted by Selfmade Ninja Academy."),
        p("<b>Technical training:</b> Trained 1,000+ students from multiple colleges, bringing practical software development experience into teaching and mentorship."),
        PageBreak(),
        section("Selected engineering projects & open source"),
        project("fastapi-querybuilder", "Python, FastAPI, SQLAlchemy", [
            "Published an MIT-licensed library that converts URL query parameters into SQLAlchemy expressions, with 14 comparison operators, nested relationship joins, recursive search, sorting, pagination and soft-delete support.",
        ], "https://github.com/bhadri01/fastapi-querybuilder"),
        project("fastapi_sse_events", "FastAPI, Redis, SSE", [
            "Published a decorator-based event-streaming library; Redis pub/sub distributes events across workers so real-time updates can operate across multi-process deployments.",
        ], "https://github.com/bhadri01/fastapi_sse_events"),
        project("ZeroCode", "Rust, Axum, PostgreSQL, Linux", [
            "Built a 7-crate service for executing untrusted code across 20 languages. Applied namespaces, read-only rootfs, cgroup v2, seccomp BPF, Landlock and capability restrictions; exercised isolation with 130+ adversarial tests.",
            "Used PostgreSQL LISTEN/NOTIFY and SKIP LOCKED for job dispatch and competing workers, with SSE for live output streaming.",
        ], "https://github.com/bhadri01/ZeroCode"),
        project("ZeroVPN", "Rust, Axum, React, WireGuard, WebAssembly", [
            "Built a VPN management platform with peer control, traffic statistics, DNS and authentication; shared a Rust wire schema with the browser through WebAssembly and MessagePack over WebSocket.",
            "Organized authentication, WireGuard control, statistics and DNS into a multi-crate backend; added TOTP, sessions and API tokens, with startup checks rejecting placeholder secrets.",
        ], "https://github.com/bhadri01/ZeroVPN"),
        project("NullVeil", "Rust, Filesystems, Digital Forensics", [
            "Built read-only recovery tooling with hand-written FAT, exFAT, NTFS, ext and APFS parsers, signature carving, SHA-256 manifests and an interactive terminal UI; kept write operations outside the source-disk reader.",
            "Implemented NTFS MFT traversal and APFS B+-tree parsing, plus deduplication, verification re-reads and a JSON-lines audit trail for recovered artifacts.",
        ], "https://github.com/bhadri01/NullVeil"),
        project("AlgoTrade", "FastAPI, React, Rust, Celery, Redis, TimescaleDB", [
            "Built a 16-section dashboard and trading workflows with a Rust risk engine. Fanned broker WebSocket ticks through Redis to strategy loops and the browser, stored ticks in TimescaleDB, and ran background tasks through Celery.",
            "Implemented position sizing, options Greeks and per-tick risk checks in Rust; supported paper-trading fills and strategy supervision through Celery workers.",
        ]),
        project("Voxiloud", "React Native, Recoil, NativeWind", [
            "Built a text-to-speech mobile app with speed and volume controls, translation, file-to-text and searchable saved history; managed global state with Recoil.",
        ]),
        project("Docker Stats Monitor", "Python, Docker, WebSockets", [
            "Built a live dashboard streaming container status, CPU, memory, network and block-I/O metrics over WebSockets for ongoing runtime visibility.",
        ]),
        section("Education & academic project"),
        p("B.E. Electronics and Communication Engineering | 2019 - 2023", "role"),
        p("Muthayammal Engineering College, Rasipuram, Tamil Nadu | First Class"),
        p("<b>Final-year project - Gesture-Controlled Electronics:</b> Built an IoT/electronics prototype to control electronic components through gestures, applying hardware-software integration to an interactive control system."),
    ]
    doc.build(story)
    reader = PdfReader(OUTPUT)
    text = "\n".join(page.extract_text() for page in reader.pages)
    if len(reader.pages) != 2:
        raise RuntimeError(f"Expected two pages; generated {len(reader.pages)}. Adjust spacing before publication.")
    if text.count("BHADRINATHAN A") != 1:
        raise RuntimeError("The full name must appear exactly once.")
    for required in ["TOM CTF", "YUKTHI CTF", "Gesture-Controlled", "1,000+", "MERN"]:
        if required not in text:
            raise RuntimeError(f"Missing resume content: {required}")
    print(f"Validated legacy 2-page resume, {len(text.split())} words: {OUTPUT}. Current public resume unchanged.")

if __name__ == "__main__":
    build()

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from pathlib import Path

OUT = Path('output/pdf/bhadrinathan_profile_audit.pdf')
OUT.parent.mkdir(parents=True, exist_ok=True)

navy = colors.HexColor('#0B1020')
ink = colors.HexColor('#182235')
muted = colors.HexColor('#5A6578')
blue = colors.HexColor('#3157D5')
cyan = colors.HexColor('#16A6B6')
light = colors.HexColor('#F2F5FA')
green = colors.HexColor('#1F8A62')
amber = colors.HexColor('#B06D12')
red = colors.HexColor('#B83C4A')

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CoverTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=30, leading=35, textColor=colors.white, alignment=TA_CENTER, spaceAfter=10))
styles.add(ParagraphStyle(name='CoverSub', parent=styles['BodyText'], fontSize=12, leading=18, textColor=colors.HexColor('#C9D3E7'), alignment=TA_CENTER))
styles.add(ParagraphStyle(name='H1x', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=navy, spaceAfter=10))
styles.add(ParagraphStyle(name='H2x', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=13, leading=17, textColor=blue, spaceBefore=9, spaceAfter=5))
styles.add(ParagraphStyle(name='Bodyx', parent=styles['BodyText'], fontSize=9.4, leading=14, textColor=ink, spaceAfter=6))
styles.add(ParagraphStyle(name='Smallx', parent=styles['BodyText'], fontSize=7.8, leading=11, textColor=muted))
styles.add(ParagraphStyle(name='TableHead', parent=styles['BodyText'], fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=colors.white))
styles.add(ParagraphStyle(name='Callout', parent=styles['BodyText'], fontName='Helvetica-Bold', fontSize=11, leading=16, textColor=navy, backColor=light, borderColor=colors.HexColor('#DCE3F0'), borderWidth=.6, borderPadding=10, spaceAfter=10))
styles.add(ParagraphStyle(name='Bulletx', parent=styles['BodyText'], fontSize=9.2, leading=13.5, leftIndent=12, firstLineIndent=-8, bulletIndent=2, textColor=ink, spaceAfter=4))

def P(text, style='Bodyx'):
    return Paragraph(text, styles[style])

def bullet(text):
    return Paragraph('• ' + text, styles['Bulletx'])

def footer(canvas, doc):
    canvas.saveState()
    if doc.page > 1:
        canvas.setStrokeColor(colors.HexColor('#DCE3F0'))
        canvas.line(18*mm, 14*mm, 192*mm, 14*mm)
        canvas.setFont('Helvetica', 7.5)
        canvas.setFillColor(muted)
        canvas.drawString(18*mm, 9*mm, 'Bhadrinathan - Profile Audit | 11 July 2026')
        canvas.drawRightString(192*mm, 9*mm, str(doc.page))
    canvas.restoreState()

def score_row(area, score, finding):
    color = green if score >= 7 else amber if score >= 5 else red
    return [P(f'<b>{area}</b>'), P(f'<font color="{color.hexval()}"><b>{score}/10</b></font>'), P(finding)]

doc = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=17*mm, bottomMargin=19*mm, title='Bhadrinathan Profile Audit')
story = []

# Cover
cover = Table([[P('BHADRINATHAN', 'CoverTitle')], [P('Complete LinkedIn, GitHub & Portfolio Audit', 'CoverSub')], [Spacer(1, 22)], [P('Positioning, evidence gaps, recruiter-readiness, and a practical 30/60/90-day roadmap', 'CoverSub')]], colWidths=[174*mm], rowHeights=[38*mm, 14*mm, 15*mm, 25*mm])
cover.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),navy),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('BOX',(0,0),(-1,-1),0,navy),('LEFTPADDING',(0,0),(-1,-1),15*mm),('RIGHTPADDING',(0,0),(-1,-1),15*mm)]))
story += [Spacer(1, 28*mm), cover, Spacer(1, 15*mm), P('<b>Executive verdict</b>', 'H2x'), P('You have credible backend engineering substance, especially in the FastAPI ecosystem. The main constraint is not capability; it is proof packaging. Your public profiles currently make recruiters infer impact, ownership, and specialization instead of seeing them immediately.', 'Callout'), P('<b>Best-fit positioning:</b> Backend / Platform Engineer specializing in Python, FastAPI, real-time systems, and developer infrastructure.', 'Bodyx'), P('Evidence reviewed: public GitHub profile and repositories, publicly indexed LinkedIn surface, and the portfolio source in this workspace. LinkedIn displayed an authentication wall, so non-public sections were not treated as verified.', 'Smallx'), PageBreak()]

story += [P('1. Scorecard and diagnosis', 'H1x')]
data = [[P('Area', 'TableHead'), P('Score', 'TableHead'), P('What a recruiter sees', 'TableHead')],
        score_row('Technical depth', 8, 'Strong backend focus, reusable packages, infrastructure interests, and unusually detailed package documentation.'),
        score_row('Positioning clarity', 5, 'Three rotating identities - Software Engineer, Open Source Creator, Backend Architect - dilute one memorable pitch.'),
        score_row('Evidence of impact', 5, 'Feature claims are strong, but adoption, benchmarks, users, tests, releases, and business outcomes are not consistently surfaced.'),
        score_row('GitHub discoverability', 4, '63 public repositories and only one visible pinned project create noise. Profile bio is too casual and generic.'),
        score_row('LinkedIn conversion', 5, 'The public headline shows Bloomskilltech, but visible activity is dominated by likes rather than authored technical proof.'),
        score_row('Portfolio conversion', 6, 'Visually focused and well positioned, but some metrics/claims appear hard-coded or unverified and two project links point only to the profile.'),
        score_row('Overall recruiter readiness', 5.5, 'Good engineer; incomplete proof system. A focused cleanup can materially improve interview conversion.')]
t = Table(data, colWidths=[38*mm, 22*mm, 114*mm], repeatRows=1)
t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),navy),('TEXTCOLOR',(0,0),(-1,0),colors.white),('GRID',(0,0),(-1,-1),.4,colors.HexColor('#D8DFEA')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),6),('RIGHTPADDING',(0,0),(-1,-1),6),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,light])]))
story += [t, Spacer(1,8), P('Core diagnosis', 'H2x'), bullet('<b>Signal:</b> You build useful backend tools. <b>Noise:</b> many experiments, forks, generic repo names, and inflated-looking metrics compete with the signal.'), bullet('<b>Strength:</b> fastapi-querybuilder and fastapi-sse-events demonstrate product thinking, documentation discipline, and ecosystem focus.'), bullet('<b>Risk:</b> claims such as 100K+ connections, 889 contributions, 86+ repositories, and 500+ connections should be dynamically sourced or backed by a public methodology.'), bullet('<b>Opportunity:</b> own a narrow category: production-grade FastAPI tooling and real-time backend infrastructure.')]

story += [P('2. GitHub audit', 'H1x'), P('Verified public profile signals', 'H2x'), bullet('Profile shows 63 repositories, 34 followers, 5 following, 5 stars, a personal site link, and the bio “Haappy Hacking!!!”.'), bullet('Only fastapi-querybuilder was visibly pinned on the public overview. It showed Python, 1 star, and 2 forks.'), bullet('The account contains a wide mix of original work, exercises, forks, copied upstream projects, utilities, and experiments. That breadth shows curiosity but weakens seniority signaling.'), P('What is genuinely strong', 'H2x'), bullet('<b>fastapi-querybuilder:</b> clear problem statement, PyPI presence, MIT license, Python/FastAPI/SQLAlchemy requirements, filtering/sorting/search/pagination, nested relationships, and a substantial README.'), bullet('<b>fastapi-sse-events:</b> versioned package, PyPI and documentation links, Redis-backed SSE architecture, decorator API, deployment guidance, authorization topics, and production-oriented documentation.'), P('Highest-priority GitHub changes', 'H2x'), bullet('<b>Rewrite the bio:</b> “Backend Engineer building production FastAPI tools, real-time systems, and developer infrastructure. Python | Redis | PostgreSQL | Docker.”'), bullet('<b>Create bhadri01/bhadri01:</b> use the profile README as a curated landing page with one sentence, three flagship projects, measurable proof, current focus, and contact links.'), bullet('<b>Pin six repositories:</b> fastapi-querybuilder, fastapi_sse_events, portfolio, one deployed production-style app, one infrastructure project, and one collaborative/open-source contribution.'), bullet('<b>Archive or unfeature noise:</b> tutorials, abandoned experiments, duplicate/forked upstream code, typo-named repos, and repos without a clear purpose.'), bullet('<b>Standardize every flagship repo:</b> screenshot or architecture diagram, quickstart, demo, tests, CI badge, license, changelog, roadmap, contributing guide, typed API, and benchmark methodology.'), PageBreak()]

story += [P('3. LinkedIn audit', 'H1x'), P('Verified scope', 'H2x'), P('The publicly indexed page identifies “Bhadrinathan A - Bloomskilltech.” The accessible surface was largely activity snippets and an authentication wall, so exact About, Experience, Education, and Skills wording could not be fully verified.', 'Bodyx'), P('Likely conversion problem', 'H2x'), bullet('The visible activity footprint emphasizes likes and other people’s posts more than authored demonstrations of your own engineering work.'), bullet('A company-only headline is weak for search. Recruiters search by role, stack, problem domain, and seniority signals.'), bullet('If the Experience section resembles the portfolio copy, it describes responsibilities but not measurable outcomes, team context, scale, or ownership.'), P('Recommended LinkedIn rewrite', 'H2x'), P('<b>Headline</b><br/>Backend Engineer at Bloomskilltech | Python, FastAPI, PostgreSQL, Redis | Open-source FastAPI tooling | Real-time systems & developer infrastructure', 'Callout'), P('<b>About structure</b>', 'H2x'), bullet('Line 1: identity + specialization.'), bullet('Lines 2-4: the problems you solve and systems you build.'), bullet('Proof block: 2 packages, one production system, tests/benchmarks/adoption numbers that are verifiable.'), bullet('Closing: target roles and contact/portfolio links.'), P('<b>Experience bullets should follow:</b> action + system + scale + outcome. Example: “Designed a Redis-backed SSE layer for FastAPI applications, reducing integration boilerplate from roughly 50 lines to 10 and publishing the implementation as an MIT-licensed package.”'), P('Content strategy', 'H2x'), bullet('Post one technical artifact every 7-10 days: benchmark, architecture trade-off, incident lesson, release note, or before/after API design.'), bullet('Comment substantively on FastAPI, SQLAlchemy, Redis, and platform engineering posts. Avoid generic congratulations as the dominant visible activity.'), bullet('Add Featured links for both packages, documentation, portfolio, and one concise case study PDF/page.')]

story += [P('4. Portfolio audit', 'H1x'), P('What works', 'H2x'), bullet('Clear backend and infrastructure direction, strong visual hierarchy, direct contact CTA, and curated flagship projects.'), bullet('The hero language - developer tools, real-time systems, and infrastructure - is differentiated and aligned with the strongest GitHub work.'), P('Critical fixes', 'H2x'), bullet('<b>Fix the contact form immediately:</b> it simulates sending and reports success without transmitting anything. This can lose genuine leads and erode trust.'), bullet('<b>Remove or source hard-coded metrics:</b> 86+ repositories conflicts with the current public GitHub count of 63. “500+ connections” and “889 contributions” need a date/source.'), bullet('<b>Prove performance claims:</b> “100K+ connections” requires a reproducible load test, environment specification, graphs, and limitations. Until then, use “designed for horizontal scaling.”'), bullet('<b>Deep-link projects:</b> WireGuard VPN Platform and Docker Stats Monitor currently link to the generic GitHub profile rather than a repository, demo, or case study.'), bullet('<b>Clarify contribution claims:</b> link directly to accepted pull requests or merged commits for Succeedex-org/shadcn-ui.'), bullet('<b>Add recruiter essentials:</b> downloadable resume, LinkedIn link above the fold, location/time-zone, role preference, and availability context.'), bullet('<b>Improve metadata:</b> unique page title, meta description, Open Graph image, structured Person data, project schema, sitemap, and analytics.'), PageBreak()]

story += [P('5. The next steps - ordered by return', 'H1x'), P('Next 72 hours', 'H2x'), bullet('Choose one positioning sentence and use it identically on LinkedIn, GitHub, portfolio, and resume.'), bullet('Rewrite GitHub bio and create the profile README.'), bullet('Pin exactly six intentional repositories; archive/unpin obvious noise.'), bullet('Fix the fake-success contact form or replace it with a mailto CTA until a real backend is connected.'), bullet('Replace unverifiable portfolio metrics and claims.'), P('Next 30 days', 'H2x'), bullet('Turn fastapi-querybuilder into the flagship: add tests/coverage, CI, benchmark suite, release notes, semantic versioning, typed examples, and a 2-minute demo.'), bullet('Do the same for fastapi-sse-events, including a documented load test and production limitations.'), bullet('Publish two case studies: one package design story and one Bloomskilltech system story with sensitive details removed.'), bullet('Rewrite LinkedIn About and Experience with outcomes; add all flagship artifacts to Featured.'), P('Days 31-60', 'H2x'), bullet('Build one deployable reference system combining FastAPI, PostgreSQL, Redis, Docker, observability, CI/CD, tests, and a small React interface.'), bullet('Recruit 3-5 real external users for one package. Track issues, feedback, usage, releases, and adoption honestly.'), bullet('Contribute focused pull requests to FastAPI/SQLAlchemy/Redis-adjacent projects and document the accepted contributions.'), P('Days 61-90', 'H2x'), bullet('Apply to Backend Engineer, Python Engineer, Platform Engineer, and Developer Tools roles with a tailored top-third resume.'), bullet('Create a 10-company target list per week; send project-led outreach rather than generic applications.'), bullet('Prepare six interview stories: architecture trade-off, debugging, performance, production failure, collaboration, and open-source ownership.'), P('Recommended north-star metrics', 'H2x')]
metrics = [[P('Metric', 'TableHead'),P('90-day target', 'TableHead')], [P('Flagship repos'),P('3 polished, tested, documented, and pinned')], [P('External adoption'),P('At least 3 users or contributors with attributable feedback')], [P('Technical writing'),P('6 substantive posts/case studies')], [P('Open-source collaboration'),P('3 meaningful PRs, preferably merged')], [P('Hiring funnel'),P('40 targeted applications, 20 warm outreaches, 6 interviews')]]
mt = Table(metrics, colWidths=[70*mm,104*mm])
mt.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),blue),('TEXTCOLOR',(0,0),(-1,0),colors.white),('GRID',(0,0),(-1,-1),.4,colors.HexColor('#D8DFEA')),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,light]),('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),6)]))
story += [mt, Spacer(1,8), P('Do not optimize for more repositories or more certificates. Optimize for fewer, stronger artifacts; external users; measurable outcomes; and a consistent professional story.', 'Callout')]

story += [P('6. Suggested messaging assets', 'H1x'), P('One-line positioning', 'H2x'), P('Backend Engineer specializing in Python and FastAPI, building open-source developer tools, real-time systems, and production infrastructure.', 'Callout'), P('GitHub profile intro', 'H2x'), P('I build production-focused backend tools with Python, FastAPI, SQLAlchemy, Redis, PostgreSQL, and Docker. My current work focuses on reusable API infrastructure, real-time event delivery, and developer experience.', 'Bodyx'), P('Portfolio hero replacement', 'H2x'), P('<b>Backend Engineer building production FastAPI systems.</b><br/>I create open-source API tooling, real-time infrastructure, and scalable backend platforms with Python, Redis, PostgreSQL, and Docker.', 'Callout'), P('Evidence checklist before publishing any claim', 'H2x'), bullet('Can a reviewer click through to the code, release, benchmark, PR, or demo?'), bullet('Is the metric current, dated, and generated from a credible source?'), bullet('Does the claim state the environment and limitation?'), bullet('Did someone other than you use, review, merge, or depend on the work?'), P('Sources reviewed', 'H2x'), P('GitHub profile: https://github.com/bhadri01<br/>LinkedIn profile: https://www.linkedin.com/in/bhadrinathan-a-90b8bb361/<br/>FastAPI QueryBuilder: https://github.com/bhadri01/fastapi-querybuilder<br/>FastAPI SSE Events: https://github.com/bhadri01/fastapi_sse_events<br/>Portfolio: https://bha3.me and local source in the portfolio workspace', 'Smallx')]

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUT)

"""Generate model-specific operational profile cards for each subheading.

Follows .agent/instructions/create_diagram.md:
- 800 units wide (1 unit = 1 screen px in post column)
- Minimum text size: 18px
- Site palette: paper #f3efe6, ink #1f1d1a, secondary ink #57514a, rules #cfc6b6
- Font stack matches blog exactly: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
- Explicit <style> block embedded so SVG rendered in <img> tags inherits site sans font
- Dedicated subtle watermark 'rdjarbeng.com' on its own line at the bottom right
- Multi-line labels with explicit vertical offsets and bounded widths
- No em dashes or en dashes
"""
import os
from xml.sax.saxutils import escape as esc

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "assets", "images", "diagrams")
os.makedirs(OUT_DIR, exist_ok=True)

PAPER = "#f3efe6"
PAPER2 = "#e8e2d5"
PAPER3 = "#dfd7c7"
INK = "#1f1d1a"
INK2 = "#57514a"
RULE = "#cfc6b6"

# Brand colors
BLUE = "#1a73e8"       # Gemini blue
TERRA = "#d97757"      # Claude terracotta
DARK_INK = "#111111"   # Grok dark
GREEN = "#10a37f"      # OpenAI green

STATUS_AMBER = "#b87a12"

FONT_STACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

W = 800
T = 18       # minimum text size
TL = 19      # column headers / labels
TH = 24      # card title


def svg_style_block():
    return (
        f'<style>'
        f'text {{ font-family: {FONT_STACK}; }} '
        f'.card-title {{ font-family: {FONT_STACK}; font-size: {TH}px; font-weight: 700; fill: {INK}; }} '
        f'.card-sub {{ font-family: {FONT_STACK}; font-size: {T}px; fill: {INK2}; }} '
        f'.badge-text {{ font-family: {FONT_STACK}; font-size: {T}px; font-weight: 700; fill: #ffffff; text-anchor: middle; }} '
        f'.col-hdr {{ font-family: {FONT_STACK}; font-size: {T}px; font-weight: 700; fill: {INK}; }} '
        f'.col-item {{ font-family: {FONT_STACK}; font-size: {T}px; fill: {INK2}; }} '
        f'.boundary-label {{ font-family: {FONT_STACK}; font-size: {T}px; font-weight: 700; fill: {STATUS_AMBER}; }} '
        f'.boundary-val {{ font-family: {FONT_STACK}; font-size: {T}px; fill: {INK2}; }} '
        f'</style>'
    )


def brand_icon(name, x, y, size=26):
    """Render clean vector brand marks."""
    s = size
    if name == "gemini":
        return (
            f'<g transform="translate({x},{y})">'
            f'<path d="M {s*0.5} 0 C {s*0.5} {s*0.28} {s*0.28} {s*0.5} 0 {s*0.5} '
            f'C {s*0.28} {s*0.5} {s*0.5} {s*0.72} {s*0.5} {s} '
            f'C {s*0.5} {s*0.72} {s*0.72} {s*0.5} {s} {s*0.5} '
            f'C {s*0.72} {s*0.5} {s*0.5} {s*0.28} {s*0.5} 0 Z" fill="{BLUE}"/>'
            '</g>'
        )
    elif name == "claude":
        return (
            f'<g transform="translate({x},{y})">'
            f'<rect x="{s*0.38}" y="0" width="{s*0.24}" height="{s}" rx="{s*0.08}" fill="{TERRA}"/>'
            f'<rect x="0" y="{s*0.38}" width="{s}" height="{s*0.24}" rx="{s*0.08}" fill="{TERRA}"/>'
            f'<rect x="{s*0.38}" y="0" width="{s*0.24}" height="{s}" rx="{s*0.08}" fill="{TERRA}" transform="rotate(45 {s*0.5} {s*0.5})"/>'
            f'<rect x="{s*0.38}" y="0" width="{s*0.24}" height="{s}" rx="{s*0.08}" fill="{TERRA}" transform="rotate(-45 {s*0.5} {s*0.5})"/>'
            '</g>'
        )
    elif name == "grok":
        return (
            f'<g transform="translate({x},{y})">'
            f'<rect width="{s}" height="{s}" rx="{s*0.15}" fill="{DARK_INK}"/>'
            f'<path d="M {s*0.25} {s*0.78} L {s*0.62} {s*0.22} H {s*0.78} L {s*0.41} {s*0.78} Z" fill="#ffffff"/>'
            f'<circle cx="{s*0.32}" cy="{s*0.35}" r="{s*0.1}" fill="#ffffff"/>'
            '</g>'
        )
    elif name == "chatgpt":
        return (
            f'<g transform="translate({x},{y})">'
            f'<rect width="{s}" height="{s}" rx="{s*0.15}" fill="{GREEN}"/>'
            f'<circle cx="{s*0.5}" cy="{s*0.5}" r="{s*0.28}" fill="none" stroke="#ffffff" stroke-width="{s*0.12}"/>'
            f'<circle cx="{s*0.5}" cy="{s*0.5}" r="{s*0.1}" fill="#ffffff"/>'
            '</g>'
        )
    return ""


def generate_single_card(filename, title_text, desc_text, model_info):
    """Generate a clean, self-contained 800x280 operational profile card."""
    h = 280
    m = model_info
    o = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {h}" width="100%" role="img" aria-labelledby="c-t c-d">',
        f'<title id="c-t">{esc(title_text)}</title>',
        f'<desc id="c-d">{esc(desc_text)}</desc>',
        '<defs>',
        svg_style_block(),
        '</defs>',
        f'<rect width="{W}" height="{h}" fill="{PAPER}"/>',
        # Outer Card
        f'<rect x="32" y="16" width="736" height="{h - 32}" fill="{PAPER2}" stroke="{RULE}" stroke-width="1"/>',
        f'<rect x="32" y="16" width="6" height="{h - 32}" fill="{m["color"]}"/>',
        # Header Row
        brand_icon(m["icon"], 48, 28, 26),
        f'<text x="84" y="44" class="card-title">{esc(m["name"])}</text>',
        f'<text x="84" y="66" class="card-sub">{esc(m["tier"])}</text>',
        # Role Badge
        f'<rect x="556" y="26" width="200" height="34" fill="{m["color"]}"/>',
        f'<text x="656" y="49" class="badge-text">{esc(m["badge"])}</text>',
        f'<line x1="48" y1="76" x2="756" y2="76" stroke="{RULE}" stroke-width="1"/>',
    ]

    # 3 Columns: Inputs, Engine/Tools, Deliverables
    cols = [
        {"x": 48, "w": 224, "hdr": "INPUTS ACCEPTED", "l1": m["in_1"], "l2": m["in_2"], "l3": m["in_3"]},
        {"x": 284, "w": 224, "hdr": "ENGINE & TOOLS", "l1": m["eng_1"], "l2": m["eng_2"], "l3": m["eng_3"]},
        {"x": 520, "w": 236, "hdr": "DELIVERABLE FORMAT", "l1": m["out_1"], "l2": m["out_2"], "l3": m["out_3"]},
    ]

    for col in cols:
        o.append(f'<rect x="{col["x"]}" y="86" width="{col["w"]}" height="106" fill="{PAPER}" stroke="{RULE}" stroke-width="1"/>')
        o.append(f'<text x="{col["x"] + 12}" y="108" class="col-hdr">{esc(col["hdr"])}</text>')
        o.append(f'<text x="{col["x"] + 12}" y="132" class="col-item">* {esc(col["l1"])}</text>')
        o.append(f'<text x="{col["x"] + 12}" y="156" class="col-item">* {esc(col["l2"])}</text>')
        o.append(f'<text x="{col["x"] + 12}" y="180" class="col-item">* {esc(col["l3"])}</text>')

    # Bottom Boundary Line
    o.append(f'<line x1="48" y1="202" x2="756" y2="202" stroke="{RULE}" stroke-width="1"/>')
    o.append(f'<text x="48" y="226" class="boundary-label">Hard boundary:</text>')
    o.append(f'<text x="190" y="226" class="boundary-val">{esc(m["boundary"])}</text>')

    # Watermark
    o.append(f'<text x="756" y="252" fill="{INK2}" font-size="{T}" font-weight="700" letter-spacing="1" text-anchor="end">rdjarbeng.com</text>')
    o.append('</svg>')

    path = os.path.join(OUT_DIR, filename)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(o) + "\n")
    print(f"Wrote {path}")
    return path


def generate_all_cards():
    cards_data = [
        {
            "file": "gemini-argon-capability-card.svg",
            "title": "Gemini 4 Argon Operational Profile",
            "desc": "Input, engine, deliverable, and boundary specifications for Gemini 4 Argon.",
            "data": {
                "name": "Gemini 4 Argon",
                "tier": "Google DeepMind (Paid tier)",
                "icon": "gemini",
                "color": BLUE,
                "badge": "Code & Architecture",
                "in_1": "Native audio & video",
                "in_2": "Multi-file repositories",
                "in_3": "PDFs, spreadsheets, images",
                "eng_1": "Google Search index",
                "eng_2": "Extended context window",
                "eng_3": "Static AST reasoning",
                "out_1": "Source code & LaTeX",
                "out_2": "Interactive Canvas HTML",
                "out_3": "Python scripts to run locally",
                "boundary": "No direct binary files; expects local code execution.",
            },
        },
        {
            "file": "claude-sonnet-capability-card.svg",
            "title": "Claude Sonnet 5.5 Operational Profile",
            "desc": "Input, engine, deliverable, and boundary specifications for Claude Sonnet 5.5.",
            "data": {
                "name": "Claude Sonnet 5.5",
                "tier": "Anthropic (Web platform)",
                "icon": "claude",
                "color": TERRA,
                "badge": "Docs & Hosted Apps",
                "in_1": "PDFs & office docs",
                "in_2": "Code repositories",
                "in_3": "CSV & data tables",
                "eng_1": "Live search index fetch",
                "eng_2": "Curated sandbox network",
                "eng_3": "Multi-file synthesis",
                "out_1": "Downloadable Word (.docx)",
                "out_2": "Formula Excel (.xlsx)",
                "out_3": "Instant hosted web app URL",
                "boundary": "Rejects audio/video uploads; no generative art.",
            },
        },
        {
            "file": "grok-capability-card.svg",
            "title": "Grok 4.5 Operational Profile",
            "desc": "Input, engine, deliverable, and boundary specifications for Grok 4.5.",
            "data": {
                "name": "Grok 4.5",
                "tier": "xAI (Web & Sandbox)",
                "icon": "grok",
                "color": DARK_INK,
                "badge": "Real-Time X & Tools",
                "in_1": "Video & audio via ffmpeg",
                "in_2": "Uploaded documents",
                "in_3": "Live URLs & screenshots",
                "eng_1": "Real-time X platform posts",
                "eng_2": "Sandboxed Linux bash shell",
                "eng_3": "Headless browser tabs",
                "out_1": "Grok Imagine images",
                "out_2": "Slices & transcode files",
                "out_3": "Office docs & zip bundles",
                "boundary": "Processes media via tools rather than neural tokens.",
            },
        },
        {
            "file": "chatgpt-capability-card.svg",
            "title": "ChatGPT Operational Profile",
            "desc": "Input, engine, deliverable, and boundary specifications for ChatGPT GPT-4o.",
            "data": {
                "name": "ChatGPT",
                "tier": "OpenAI (GPT-4o with Tools)",
                "icon": "chatgpt",
                "color": GREEN,
                "badge": "Data & Cloud Sandbox",
                "in_1": "CSV, Excel & raw datasets",
                "in_2": "PDFs, images & documents",
                "in_3": "Voice conversational audio",
                "eng_1": "Sandboxed Python runner",
                "eng_2": "Web browsing tool",
                "eng_3": "Code canvas environment",
                "out_1": "DALL-E 3 image generation",
                "out_2": "Cleaned datasets & charts",
                "out_3": "Generated Excel reports",
                "boundary": "Web browsing frequently blocked by anti-bot gates.",
            },
        },
    ]

    for c in cards_data:
        generate_single_card(c["file"], c["title"], c["desc"], c["data"])


if __name__ == "__main__":
    generate_all_cards()

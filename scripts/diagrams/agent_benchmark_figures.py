"""Generate high-impact visual SVG diagrams for the AI agent benchmark post.

Follows .agent/instructions/create_diagram.md:
- 800 units wide (1 unit = 1 screen px in post column)
- Minimum text size: 18px
- Site palette: paper #f3efe6, ink #1f1d1a, secondary ink #57514a, rules #cfc6b6
- Font stack matches blog exactly: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
- Explicit <style> block embedded so SVG rendered in <img> tags inherits the site sans font
- Multi-line labels with explicit vertical offsets and bounded widths to prevent collisions or text cutoffs
- Dedicated subtle watermark 'rdjarbeng.com' on its own line at the bottom right
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

# Status badge colors (accessible site palette)
STATUS_GREEN = "#1e7e34"   # Native
STATUS_AMBER = "#b87a12"   # Via Tool / Restricted
STATUS_RED = "#c92a2a"     # Blocked / None
STATUS_BLUE = "#2f3d66"    # Code only

FONT_STACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

W = 800
T = 18       # minimum text size
TL = 19      # column headers / labels
TH = 28      # figure title


def svg_style_block():
    return (
        f'<style>'
        f'text {{ font-family: {FONT_STACK}; }} '
        f'.fig-title {{ font-family: {FONT_STACK}; font-size: {TH}px; font-weight: 700; fill: {INK}; }} '
        f'.fig-label {{ font-family: {FONT_STACK}; font-size: {T}px; font-weight: 600; fill: {INK2}; letter-spacing: 1.5px; }} '
        f'.fig-sub {{ font-family: {FONT_STACK}; font-size: {T}px; fill: {INK2}; }} '
        f'.col-hdr {{ font-family: {FONT_STACK}; font-size: {TL}px; font-weight: 700; fill: {INK}; }} '
        f'.row-hdr {{ font-family: {FONT_STACK}; font-size: {T}px; font-weight: 700; fill: {INK}; }} '
        f'.row-sub {{ font-family: {FONT_STACK}; font-size: {T}px; fill: {INK2}; }} '
        f'.cell-main {{ font-family: {FONT_STACK}; font-size: {T}px; font-weight: 700; fill: #ffffff; text-anchor: middle; }} '
        f'.cell-sub {{ font-family: {FONT_STACK}; font-size: {T}px; font-weight: 500; fill: #ffffff; text-anchor: middle; opacity: 0.92; }} '
        f'</style>'
    )


def brand_icon(name, x, y, size=24):
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


def generate_pipeline_figure():
    """FIG. 1: Audio and video ingestion pipeline comparison."""
    h = 670
    o = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {h}" width="100%" role="img" aria-labelledby="p-t p-d">',
        '<title id="p-t">Audio and Video Ingestion Pipelines</title>',
        '<desc id="p-d">Visual flowchart comparing how Gemini 4 Argon, Grok 4.5, ChatGPT, and Claude Sonnet 5.5 handle incoming video and audio files.</desc>',
        '<defs>',
        svg_style_block(),
        '</defs>',
        f'<rect width="{W}" height="{h}" fill="{PAPER}"/>',
        # Header
        f'<text x="32" y="38" class="fig-label">FIG. 1: INGESTION ARCHITECTURE</text>',
        f'<text x="32" y="74" class="fig-title">What Happens When You Upload Audio or Video</text>',
        f'<text x="32" y="102" class="fig-sub">Direct multi-modal neural tokens vs. ffmpeg tool bridges vs. format rejection</text>',
        f'<line x1="32" y1="116" x2="{W - 32}" y2="116" stroke="{INK}" stroke-width="1.5"/>',
    ]

    models = [
        {
            "name": "Gemini 4",
            "sub": "Google",
            "icon": "gemini",
            "proc_l1": "Direct Neural Stream",
            "proc_l2": "Tokenized video frames",
            "res_l1": "Native Ingestion",
            "res_l2": "1-Step Neural",
            "res_bg": STATUS_GREEN,
        },
        {
            "name": "Grok 4.5",
            "sub": "xAI",
            "icon": "grok",
            "proc_l1": "ffmpeg Tool Bridge",
            "proc_l2": "Slices audio and frames",
            "res_l1": "Tool Execution",
            "res_l2": "2-Step ffmpeg",
            "res_bg": STATUS_AMBER,
        },
        {
            "name": "ChatGPT",
            "sub": "OpenAI",
            "icon": "chatgpt",
            "proc_l1": "Voice Mode Only",
            "proc_l2": "Video upload blocked",
            "res_l1": "Voice Only",
            "res_l2": "No Video Files",
            "res_bg": STATUS_AMBER,
        },
        {
            "name": "Claude 5.5",
            "sub": "Anthropic",
            "icon": "claude",
            "proc_l1": "Format Blocked",
            "proc_l2": "Requires transcript",
            "res_l1": "Upload Blocked",
            "res_l2": "Text Only",
            "res_bg": STATUS_RED,
        },
    ]

    y = 130
    row_h = 92
    for m in models:
        # Card background
        o.append(f'<rect x="32" y="{y}" width="736" height="{row_h}" fill="{PAPER2}" stroke="{RULE}" stroke-width="1"/>')

        # Model identifier (ends by x=175)
        o.append(brand_icon(m["icon"], 44, y + 20, 24))
        o.append(f'<text x="76" y="{y + 38}" class="col-hdr">{esc(m["name"])}</text>')
        o.append(f'<text x="76" y="{y + 62}" class="fig-sub">{esc(m["sub"])}</text>')

        # Box 1: Input file (x: 195 to 305, w: 110)
        bx1 = 195
        bw1 = 110
        o.append(f'<rect x="{bx1}" y="{y + 13}" width="{bw1}" height="66" fill="{PAPER}" stroke="{RULE}" stroke-width="1"/>')
        o.append(f'<text x="{bx1 + bw1/2}" y="{y + 40}" class="row-hdr" text-anchor="middle">Input File</text>')
        o.append(f'<text x="{bx1 + bw1/2}" y="{y + 64}" class="row-sub" text-anchor="middle">MP4 or WAV</text>')

        # Arrow 1 (x: 311 to 331)
        a1_x1 = bx1 + bw1 + 6
        a1_x2 = a1_x1 + 14
        o.append(f'<line x1="{a1_x1}" y1="{y + 46}" x2="{a1_x2}" y2="{y + 46}" stroke="{INK2}" stroke-width="2"/>')
        o.append(f'<polygon points="{a1_x2},{y+42} {a1_x2+6},{y+46} {a1_x2},{y+50}" fill="{INK2}"/>')

        # Box 2: Processing mechanism (x: 341 to 551, w: 210)
        bx2 = a1_x2 + 10
        bw2 = 210
        o.append(f'<rect x="{bx2}" y="{y + 13}" width="{bw2}" height="66" fill="{PAPER}" stroke="{RULE}" stroke-width="1"/>')
        o.append(f'<text x="{bx2 + bw2/2}" y="{y + 40}" class="row-hdr" text-anchor="middle">{esc(m["proc_l1"])}</text>')
        o.append(f'<text x="{bx2 + bw2/2}" y="{y + 64}" class="row-sub" text-anchor="middle">{esc(m["proc_l2"])}</text>')

        # Arrow 2 (x: 557 to 577)
        a2_x1 = bx2 + bw2 + 6
        a2_x2 = a2_x1 + 14
        o.append(f'<line x1="{a2_x1}" y1="{y + 46}" x2="{a2_x2}" y2="{y + 46}" stroke="{INK2}" stroke-width="2"/>')
        o.append(f'<polygon points="{a2_x2},{y+42} {a2_x2+6},{y+46} {a2_x2},{y+50}" fill="{INK2}"/>')

        # Box 3: Result badge (x: 587 to 757, w: 170, h: 66)
        bx3 = a2_x2 + 10
        bw3 = 170
        o.append(f'<rect x="{bx3}" y="{y + 13}" width="{bw3}" height="66" fill="{m["res_bg"]}"/>')
        o.append(f'<text x="{bx3 + bw3/2}" y="{y + 40}" class="cell-main">{esc(m["res_l1"])}</text>')
        o.append(f'<text x="{bx3 + bw3/2}" y="{y + 64}" class="cell-sub">{esc(m["res_l2"])}</text>')

        y += row_h + 10

    # Summary Takeaway lines
    o.append(f'<line x1="32" y1="{y + 4}" x2="{W - 32}" y2="{y + 4}" stroke="{RULE}" stroke-width="1"/>')
    o.append(f'<text x="32" y="{y + 28}" class="row-hdr">Takeaway:</text>')
    o.append(f'<text x="122" y="{y + 28}" class="fig-sub">Gemini is the only model with native end-to-end video reasoning.</text>')
    o.append(f'<text x="32" y="{y + 52}" class="fig-sub">Grok bridges media via ffmpeg; Claude and ChatGPT require text transcripts.</text>')

    # Watermark on its OWN separate line at the bottom
    y_wm = y + 84
    o.append(f'<line x1="32" y1="{y_wm - 16}" x2="{W - 32}" y2="{y_wm - 16}" stroke="{RULE}" stroke-width="0.75" stroke-dasharray="3,3"/>')
    o.append(f'<text x="{W - 32}" y="{y_wm}" fill="{INK2}" font-size="{T}" font-weight="700" letter-spacing="1" text-anchor="end">rdjarbeng.com</text>')
    o.append('</svg>')

    path = os.path.join(OUT_DIR, "ai-agent-media-pipeline.svg")
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(o) + "\n")
    print(f"Wrote {path}")
    return path


def generate_matrix_figure():
    """FIG. 2: Visual capability scorecard."""
    h = 720
    o = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {h}" width="100%" role="img" aria-labelledby="m-t m-d">',
        '<title id="m-t">AI Agent Capability Matrix</title>',
        '<desc id="m-d">Visual comparison grid showing verified capabilities for Gemini, Claude, Grok, and ChatGPT across six core operational tasks.</desc>',
        '<defs>',
        svg_style_block(),
        '</defs>',
        f'<rect width="{W}" height="{h}" fill="{PAPER}"/>',
        # Header
        f'<text x="32" y="38" class="fig-label">FIG. 2: CAPABILITY SCORECARD</text>',
        f'<text x="32" y="74" class="fig-title">Model Capabilities at a Glance</text>',
        f'<text x="32" y="102" class="fig-sub">Comparing media, office files, live web access, and code execution</text>',
        f'<line x1="32" y1="116" x2="{W - 32}" y2="116" stroke="{INK}" stroke-width="1.5"/>',
    ]

    col_meta = {
        "gemini":  {"mid": 307.5, "icon_x": 250, "text_x": 278, "name": "Gemini 4"},
        "claude":  {"mid": 438.5, "icon_x": 381, "text_x": 409, "name": "Claude 5.5"},
        "grok":    {"mid": 569.5, "icon_x": 515, "text_x": 543, "name": "Grok 4.5"},
        "chatgpt": {"mid": 701.5, "icon_x": 645, "text_x": 673, "name": "ChatGPT"},
    }

    # Header Row
    y_hdr = 126
    hdr_h = 56
    o.append(f'<rect x="32" y="{y_hdr}" width="736" height="{hdr_h}" fill="{PAPER3}"/>')
    o.append(f'<text x="44" y="{y_hdr + 35}" class="col-hdr">Core Capability</text>')

    for m_id in ["gemini", "claude", "grok", "chatgpt"]:
        info = col_meta[m_id]
        o.append(brand_icon(m_id, info["icon_x"], y_hdr + 16, 22))
        o.append(f'<text x="{info["text_x"]}" y="{y_hdr + 35}" class="col-hdr">{esc(info["name"])}</text>')

    # Rows (64px each for vertical padding)
    rows = [
        {
            "l1": "Audio & Video",
            "l2": "Ingestion",
            "gemini":  ("Native", "1-Step Neural", STATUS_GREEN),
            "claude":  ("Blocked", "Text Only", STATUS_RED),
            "grok":    ("Via Tool", "ffmpeg Bridge", STATUS_AMBER),
            "chatgpt": ("Voice Only", "No Video", STATUS_AMBER),
        },
        {
            "l1": "Office Files",
            "l2": "Deliverables",
            "gemini":  ("Code Script", "Run Locally", STATUS_BLUE),
            "claude":  ("Native", ".docx .xlsx", STATUS_GREEN),
            "grok":    ("Native", "Files & Zip", STATUS_GREEN),
            "chatgpt": ("Sandbox", "Python Run", STATUS_GREEN),
        },
        {
            "l1": "Hosted Apps",
            "l2": "& Web URLs",
            "gemini":  ("Code Script", "HTML File", STATUS_BLUE),
            "claude":  ("Hosted URL", "Live Link", STATUS_GREEN),
            "grok":    ("Preview", "In Sandbox", STATUS_AMBER),
            "chatgpt": ("Preview", "Canvas Tab", STATUS_AMBER),
        },
        {
            "l1": "Live Web &",
            "l2": "Search Data",
            "gemini":  ("Search Index", "Google Web", STATUS_AMBER),
            "claude":  ("Live Search", "Web Fetch", STATUS_AMBER),
            "grok":    ("Web + Live X", "Real-Time", STATUS_GREEN),
            "chatgpt": ("Web Tool", "Citations", STATUS_AMBER),
        },
        {
            "l1": "Code Execution",
            "l2": "Environment",
            "gemini":  ("Local Only", "No Cloud", STATUS_BLUE),
            "claude":  ("Sandbox", "Package Net", STATUS_GREEN),
            "grok":    ("Linux Shell", "Bash Env", STATUS_GREEN),
            "chatgpt": ("Sandbox", "Python Env", STATUS_GREEN),
        },
        {
            "l1": "Visual &",
            "l2": "Image Edits",
            "gemini":  ("Code Script", "SVG/Canvas", STATUS_BLUE),
            "claude":  ("SVG Vectors", "Code Charts", STATUS_AMBER),
            "grok":    ("Imagine", "+ ffmpeg", STATUS_GREEN),
            "chatgpt": ("DALL-E 3", "Generative", STATUS_GREEN),
        },
    ]

    y_cur = y_hdr + hdr_h + 4
    row_h = 66
    for idx, r in enumerate(rows):
        bg = PAPER2 if idx % 2 == 0 else PAPER
        o.append(f'<rect x="32" y="{y_cur}" width="736" height="{row_h}" fill="{bg}" stroke="{RULE}" stroke-width="0.5"/>')

        # Row headers
        o.append(f'<text x="44" y="{y_cur + 28}" class="row-hdr">{esc(r["l1"])}</text>')
        o.append(f'<text x="44" y="{y_cur + 50}" class="row-sub">{esc(r["l2"])}</text>')

        # Model cells
        cell_w = 122
        cell_h = 52
        for m_id in ["gemini", "claude", "grok", "chatgpt"]:
            info = col_meta[m_id]
            cell_x = info["mid"] - cell_w / 2
            cell_y = y_cur + (row_h - cell_h) / 2
            main_t, sub_t, status_col = r[m_id]

            o.append(f'<rect x="{cell_x}" y="{cell_y}" width="{cell_w}" height="{cell_h}" fill="{status_col}"/>')
            o.append(f'<text x="{info["mid"]}" y="{cell_y + 23}" class="cell-main">{esc(main_t)}</text>')
            o.append(f'<text x="{info["mid"]}" y="{cell_y + 44}" class="cell-sub">{esc(sub_t)}</text>')

        y_cur += row_h + 2

    # Legend at bottom (x=32 to 768)
    y_leg = y_cur + 16
    o.append(f'<line x1="32" y1="{y_leg - 6}" x2="{W - 32}" y2="{y_leg - 6}" stroke="{RULE}" stroke-width="1"/>')
    o.append(f'<text x="32" y="{y_leg + 18}" class="row-hdr">Legend:</text>')

    legend_items = [
        ("Native", STATUS_GREEN, 115),
        ("Via Tool", STATUS_AMBER, 255),
        ("Code Script", STATUS_BLUE, 410),
        ("Blocked", STATUS_RED, 595),
    ]

    for label, col, lx in legend_items:
        o.append(f'<rect x="{lx}" y="{y_leg + 4}" width="16" height="16" fill="{col}"/>')
        o.append(f'<text x="{lx + 24}" y="{y_leg + 18}" class="fig-sub">{label}</text>')

    # Watermark on its own line
    y_wm = y_leg + 48
    o.append(f'<line x1="32" y1="{y_wm - 16}" x2="{W - 32}" y2="{y_wm - 16}" stroke="{RULE}" stroke-width="0.75" stroke-dasharray="3,3"/>')
    o.append(f'<text x="{W - 32}" y="{y_wm}" fill="{INK2}" font-size="{T}" font-weight="700" letter-spacing="1" text-anchor="end">rdjarbeng.com</text>')
    o.append('</svg>')

    path = os.path.join(OUT_DIR, "ai-agent-capability-matrix.svg")
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(o) + "\n")
    print(f"Wrote {path}")
    return path


if __name__ == "__main__":
    generate_pipeline_figure()
    generate_matrix_figure()

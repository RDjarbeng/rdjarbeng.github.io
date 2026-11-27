"""Figure for "Ambient air quality standards in West Africa": particle limits as multiples of the WHO 2021 guideline.

Numbers are the "How it compares" column of the post's Particles table (nothing else).
Palette: Muted Primaries (Terracotta #b84d43, Slate Ink #2d4763, Ochre Gold #cfa14a) plus black/white.

    python scripts/diagrams/west_africa_pm_limits_figure.py
    node scripts/diagrams/render.js assets/images/diagrams/west-africa-pm-limits-vs-who.svg
"""
import os
from xml.sax.saxutils import escape as esc

OUT = os.path.join(os.path.dirname(__file__), "..", "..", "assets", "images", "diagrams", "west-africa-pm-limits-vs-who.svg")
PAPER, INK, INK2 = "#f4f1e6", "#141414", "#57514a"
SLATE, TERRA, OCHRE = "#2d4763", "#b84d43", "#cfa14a"
SANS = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

# None = no limit in the table
PANELS = [
    ("PM2.5, annual (WHO 5)", [("Côte d'Ivoire", 5), ("Senegal", 5), ("Nigeria", None), ("Benin", None)]),
    ("PM2.5, 24 hours (WHO 15)", [("Ghana", 2.3), ("Senegal", 5), ("Côte d'Ivoire", None), ("Nigeria", None), ("Benin", None)]),
    ("PM10, annual (WHO 15)", [("Côte d'Ivoire", 2.7), ("Senegal", 2.7), ("Benin", 3.3), ("Nigeria", 4)]),
    ("PM10, 24 hours (WHO 45)", [("Côte d'Ivoire", 1.1), ("Nigeria", 3.3), ("Senegal", 3.3), ("Benin", 5.1)]),
]
W = 800
X0, X1, MAXV = 190, 740, 6
sx = lambda v: X0 + (X1 - X0) * v / MAXV
ROW, PH = 32, 42  # row height, panel header height

title = "Legal particle limits as a multiple of the WHO 2021 guideline"
desc = ("Dot chart of national PM2.5 and PM10 limits in Côte d'Ivoire, Ghana, Nigeria, Senegal and Benin, "
        "shown as times the WHO 2021 guideline, with a reference line at 1 times. PM2.5 annual: Côte d'Ivoire 5, Senegal 5, "
        "Nigeria and Benin no limit. PM2.5 24 hours: Ghana 2.3, Senegal 5, Côte d'Ivoire, Nigeria and Benin no limit. "
        "PM10 annual: Côte d'Ivoire 2.7, Senegal 2.7, Benin 3.3, Nigeria 4. PM10 24 hours: Côte d'Ivoire 1.1, Nigeria 3.3, Senegal 3.3, Benin 5.1.")

body, y, SEG = [], 100, []
top = y
for name, rows in PANELS:
    body.append(f'<text x="32" y="{y+26}" fill="{INK}" font-size="20" font-weight="bold">{esc(name)}</text>')
    y += PH
    seg0 = y
    for c, v in rows:
        cy = y + ROW / 2
        body.append(f'<text x="{X0-14}" y="{cy+6}" fill="{INK}" font-size="18" text-anchor="end">{esc(c)}</text>')
        if v is None:
            body.append(f'<text x="{sx(1)+14}" y="{cy+6}" fill="{TERRA}" font-size="18" font-weight="bold" font-style="italic">no limit</text>')
        else:
            body.append(f'<line x1="{sx(0)}" y1="{cy}" x2="{sx(v)}" y2="{cy}" stroke="{SLATE}" stroke-width="3"/>')
            body.append(f'<circle cx="{sx(v)}" cy="{cy}" r="9" fill="{SLATE}"/>')
            body.append(f'<text x="{sx(v)+17}" y="{cy+6}" fill="{INK}" font-size="18" font-weight="bold">{v:g}x</text>')
        y += ROW
    SEG.append((seg0, y))
    y += 14
bottom = y - 8

grid = []
for t in range(0, MAXV + 1):
    if t == 1:
        continue
    grid.append(f'<line x1="{sx(t)}" y1="{bottom}" x2="{sx(t)}" y2="{bottom+8}" stroke="{INK2}" stroke-width="2"/>')
    grid.append(f'<text x="{sx(t)}" y="{bottom+26}" fill="{INK2}" font-size="18" text-anchor="middle">{t}x</text>')
ref = (''.join(f'<line x1="{sx(1)}" y1="{a}" x2="{sx(1)}" y2="{b}" stroke="{OCHRE}" stroke-width="4"/>' for a, b in SEG) +
       f'<line x1="{sx(1)}" y1="{bottom}" x2="{sx(1)}" y2="{bottom+8}" stroke="{INK2}" stroke-width="2"/>'
       f'<text x="{sx(1)}" y="{bottom+26}" fill="{INK}" font-size="18" font-weight="bold" text-anchor="middle">1x</text>')
H = bottom + 90

svg = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="100%" role="img" aria-labelledby="t d" style="font-family:{SANS};">',
    f'<title id="t">{esc(title)}</title><desc id="d">{esc(desc)}</desc>',
    f'<rect width="{W}" height="{H}" fill="{PAPER}"/>',
    f'<text x="32" y="40" fill="{INK}" font-size="24" font-weight="bold">{esc(title)}</text>',
    f'<text x="32" y="72" fill="{INK2}" font-size="18">Longer line = looser limit. 1x (gold line) = the WHO guideline for the same period.</text>',
    *grid, ref, *body,
    f'<text x="{(X0+X1)/2}" y="{bottom+56}" fill="{INK2}" font-size="18" text-anchor="middle">times the WHO 2021 guideline</text>',
    f'<text x="{W-32}" y="{H-16}" fill="#57514a" font-size="18" font-weight="bold" text-anchor="end">rdjarbeng.com</text>',
    '</svg>',
]
open(OUT, "w", encoding="utf-8", newline="\n").write("\n".join(svg) + "\n")
print("wrote", os.path.normpath(OUT))

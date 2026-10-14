"""Figures for the post "The Six Levels of Autonomous Driving".

Writes six SVGs into assets/images/diagrams/. Follows .agent/instructions/create_diagram.md:
800 units wide (1 unit = 1 screen px in the post column), no text under 18px, site palette.

    python scripts/diagrams/six_levels_figures.py
    node scripts/diagrams/render.js assets/images/diagrams/sae-levels-who-drives.svg
"""
import os
import textwrap
from xml.sax.saxutils import escape as esc

OUT = os.path.join(os.path.dirname(__file__), "..", "..", "assets", "images", "diagrams")

PAPER = "#f3efe6"
PAPER2 = "#e4ddd0"
INK = "#1f1d1a"
INK2 = "#57514a"
RULE = "#cfc6b6"
HUMAN = "#b2477b"     # deepened site raspberry (#c6538c)
MACHINE = "#2f3d66"   # ink blue, near the site's link colour (#4a476e)
OCHRE = "#b87a12"
SERIF = "Georgia, 'Times New Roman', serif"
SANS = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

W = 800
T = 18      # minimum text size
TL = 20     # emphasised labels
TH = 30     # figure title


def head(h, title, desc, extra_defs=""):
    return [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {h}" width="100%" role="img" aria-labelledby="t d" style="font-family:{SANS};">',
        f'<title id="t">{esc(title)}</title>',
        f'<desc id="d">{esc(desc)}</desc>',
        '<defs>'
        f'<pattern id="hatchH" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="{PAPER}"/><line x1="0" y1="0" x2="0" y2="8" stroke="{HUMAN}" stroke-width="2.6"/></pattern>'
        f'<pattern id="hatchM" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="{MACHINE}" stroke-width="1.6"/></pattern>'
        f'<pattern id="hatchO" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="{OCHRE}" stroke-width="2"/></pattern>'
        f'{extra_defs}</defs>',
        f'<rect width="{W}" height="{h}" fill="{PAPER}"/>',
    ]


def heading(o, fig, title, sub_lines):
    o.append(f'<text x="32" y="40" fill="{INK2}" font-size="{T}" letter-spacing="2">FIG. {fig}</text>')
    o.append(f'<text x="32" y="80" fill="{INK}" font-family="{SERIF}" font-size="{TH}">{esc(title)}</text>')
    y = 112
    for line in sub_lines:
        o.append(f'<text x="32" y="{y}" fill="{INK2}" font-size="{T}">{esc(line)}</text>')
        y += 26
    o.append(f'<line x1="32" y1="{y - 8}" x2="{W - 32}" y2="{y - 8}" stroke="{INK}" stroke-width="1.5"/>')
    return y + 10


def footer(o, lines, h):
    y = h - 22 - 26 * (len(lines) - 1)
    o.append(f'<line x1="32" y1="{y - 30}" x2="{W - 32}" y2="{y - 30}" stroke="{RULE}"/>')
    for line in lines:
        o.append(f'<text x="32" y="{y}" fill="{INK2}" font-size="{T}">{esc(line)}</text>')
        y += 26


def save(name, o):
    o.append('</svg>')
    with open(os.path.join(OUT, name), 'w', encoding='utf-8', newline='\n') as f:
        f.write('\n'.join(o) + '\n')


# ---------------------------------------------------------------- Fig 1
def fig_who_drives():
    H = 760
    o = head(H, "Who is driving at each SAE level",
             "Levels 0 to 5 as rows, four driving jobs as columns. Up to Level 2 every job belongs to the human "
             "(except shared steering at Level 1). From Level 3 the machine does them all; at Level 3 the human is "
             "only the fallback when the car asks.")
    y = heading(o, 1, "Who is driving at each level?",
                ["Each row is a level. Watch the colour change between 2 and 3."])

    jobs = ["Steering", "Watching", "Fallback", "Liability"]
    x0, cw, gap, rh = 262, 124, 4, 54
    for j, name in enumerate(jobs):
        o.append(f'<text x="{x0 + j * (cw + gap)}" y="{y + 18}" fill="{INK}" font-size="{T}" font-weight="700">{name}</text>')
    y += 34

    levels = [("0", "No automation"), ("1", "Driver assistance"), ("2", "Partial"),
              ("3", "Conditional"), ("4", "High"), ("5", "Full")]
    cells = [
        ["H", "H", "H", "H:driver"],
        ["S", "H", "H", "H:driver"],
        ["M", "H", "H", "H:driver"],
        ["M", "M", "R:if asked", "M:automaker"],
        ["M", "M", "M", "M:operator"],
        ["M", "M", "M", "M:automaker"],
    ]
    groups = {0: ("Driver support (ADAS): you are driving", HUMAN),
              3: ("Automated driving (ADS): the system drives", MACHINE)}
    for i, ((num, name), row) in enumerate(zip(levels, cells)):
        if i in groups:
            label, col = groups[i]
            if i == 3:
                o.append(f'<line x1="32" y1="{y + 2}" x2="{W - 32}" y2="{y + 2}" stroke="{INK}" stroke-width="2.5"/>')
                y += 12
            o.append(f'<text x="32" y="{y + 22}" fill="{col}" font-size="{T}" font-weight="700">{esc(label)}</text>')
            y += 36
        o.append(f'<text x="32" y="{y + 38}" fill="{INK}" font-family="{SERIF}" font-size="{TH}">{num}</text>')
        o.append(f'<text x="62" y="{y + 34}" fill="{INK2}" font-size="{T}">{esc(name)}</text>')
        for j, cell in enumerate(row):
            kind, _, txt = cell.partition(":")
            x = x0 + j * (cw + gap)
            fg = PAPER
            if kind == "H":
                o.append(f'<rect x="{x}" y="{y}" width="{cw}" height="{rh}" fill="{HUMAN}"/>')
            elif kind == "M":
                o.append(f'<rect x="{x}" y="{y}" width="{cw}" height="{rh}" fill="{MACHINE}"/>')
            elif kind == "S":
                o.append(f'<rect x="{x}" y="{y}" width="{cw / 2}" height="{rh}" fill="{HUMAN}"/>')
                o.append(f'<rect x="{x + cw / 2}" y="{y}" width="{cw / 2}" height="{rh}" fill="{MACHINE}"/>')
            else:
                o.append(f'<rect x="{x}" y="{y}" width="{cw}" height="{rh}" fill="url(#hatchH)"/>')
                o.append(f'<rect x="{x + 1.5}" y="{y + 1.5}" width="{cw - 3}" height="{rh - 3}" fill="none" stroke="{HUMAN}" stroke-width="3"/>')
                o.append(f'<rect x="{x + 10}" y="{y + 14}" width="{cw - 20}" height="26" fill="{PAPER}"/>')
                fg = INK
            if txt:
                o.append(f'<text x="{x + 14}" y="{y + 34}" fill="{fg}" font-size="{T}">{esc(txt)}</text>')
        y += rh + gap

    # key
    y += 30
    o.append(f'<rect x="32" y="{y - 16}" width="18" height="18" fill="{HUMAN}"/><text x="58" y="{y}" fill="{INK}" font-size="{T}">Human</text>')
    o.append(f'<rect x="160" y="{y - 16}" width="18" height="18" fill="{MACHINE}"/><text x="186" y="{y}" fill="{INK}" font-size="{T}">Machine</text>')
    o.append(f'<rect x="300" y="{y - 16}" width="9" height="18" fill="{HUMAN}"/><rect x="309" y="{y - 16}" width="9" height="18" fill="{MACHINE}"/><text x="326" y="{y}" fill="{INK}" font-size="{T}">Shared</text>')
    o.append(f'<rect x="420" y="{y - 16}" width="18" height="18" fill="url(#hatchH)" stroke="{HUMAN}" stroke-width="2"/><text x="446" y="{y}" fill="{INK}" font-size="{T}">Human, only if the car asks</text>')
    footer(o, ["Source: SAE J3016 (2021)."], H)
    save("sae-levels-who-drives.svg", o)


# ---------------------------------------------------------------- Fig 2
def fig_timeline():
    ev = [
        (1999, "P", HUMAN, "Level 1", "Mercedes S-Class gets radar cruise control"),
        (2005, "R", INK2, "Research", "Stanford's Stanley wins the DARPA Grand Challenge"),
        (2009, "R", INK2, "Research", "Google starts its self-driving car project"),
        (2014, "R", INK2, "Standard", "SAE publishes J3016, defining Levels 0 to 5"),
        (2015, "P", HUMAN, "Level 2", "Tesla Autopilot ships as an over-the-air update"),
        (2017, "P", HUMAN, "Level 2", "Cadillac Super Cruise: hands-free on highways"),
        (2018, "I", OCHRE, "Incident", "An Uber test car kills a pedestrian in Tempe"),
        (2020, "P", MACHINE, "Level 4", "Waymo opens driverless rides to anyone in Phoenix"),
        (2021, "P", MACHINE, "Level 3", "Honda Legend, then Mercedes DRIVE PILOT"),
        (2022, "P", MACHINE, "Level 4", "Baidu Apollo Go goes driverless in Wuhan"),
        (2023, "I", OCHRE, "Incident", "California suspends Cruise's driverless permit"),
        (2025, "P", MACHINE, "Level 4", "Waymo on Uber in Austin; Tesla starts a pilot"),
    ]
    ROW, GAP_PER_YEAR = 64, 10
    # height: rows plus extra space for multi-year gaps
    extra = sum(max(0, (b[0] - a[0] - 1)) * GAP_PER_YEAR for a, b in zip(ev, ev[1:]))
    top = 170
    H = top + len(ev) * ROW + extra + 120
    o = head(H, "Timeline of driving automation, 1999 to 2025",
             "Twelve milestones. Driver support arrived first (radar cruise 1999, Autopilot 2015). Driverless Level 4 "
             "rides opened to the public in Phoenix in 2020, a year before the first Level 3 cars in 2021.")
    y = heading(o, 2, "The levels did not arrive in order", ["Level 4 robotaxis reached the public before Level 3 cars did."])

    LX = 140  # spine
    y += 24
    ys = []
    for i, e in enumerate(ev):
        if i:
            gapyears = e[0] - ev[i - 1][0] - 1
            y += ROW + gapyears * GAP_PER_YEAR
        ys.append(y)
    o.append(f'<line x1="{LX}" y1="{ys[0] - 10}" x2="{LX}" y2="{ys[-1] + 10}" stroke="{INK}" stroke-width="2"/>')

    # gaps of several quiet years
    for i in range(1, len(ev)):
        gy = ev[i][0] - ev[i - 1][0] - 1
        if gy >= 3:
            mid = (ys[i - 1] + ys[i]) / 2 + 8
            o.append(f'<text x="{LX + 22}" y="{mid + 6}" fill="{INK2}" font-size="{T}" font-style="italic">{gy} quiet years</text>')

    # the L4-before-L3 bracket
    i20, i21 = 7, 8
    o.append(f'<path d="M{LX - 104} {ys[i20] - 22} h-8 V{ys[i21] + 34} h8" fill="none" stroke="{OCHRE}" stroke-width="2"/>')
    o.append(f'<text transform="translate({LX - 120} {(ys[i20] + ys[i21]) / 2 + 6}) rotate(-90)" fill="{OCHRE}" font-size="{T}" font-weight="700" text-anchor="middle">4 before 3</text>')

    for (yr, kind, col, tag, text), cy in zip(ev, ys):
        o.append(f'<text x="{LX - 22}" y="{cy + 10}" fill="{INK}" font-family="{SERIF}" font-size="26" text-anchor="end">{yr}</text>')
        if kind == "P":
            o.append(f'<rect x="{LX - 8}" y="{cy - 8}" width="16" height="16" fill="{col}"/>')
        elif kind == "R":
            o.append(f'<circle cx="{LX}" cy="{cy}" r="8" fill="{PAPER}" stroke="{col}" stroke-width="3"/>')
        else:
            o.append(f'<path d="M{LX} {cy - 10} l10 17 h-20 z" fill="{col}"/>')
        o.append(f'<text x="{LX + 24}" y="{cy - 2}" fill="{INK}" font-size="{TL}">{esc(text)}</text>')
        o.append(f'<text x="{LX + 24}" y="{cy + 22}" fill="{col}" font-size="{T}" font-weight="700">{esc(tag)}</text>')

    # key
    ky = ys[-1] + 70
    o.append(f'<rect x="32" y="{ky - 15}" width="16" height="16" fill="{INK2}"/><text x="56" y="{ky}" fill="{INK}" font-size="{T}">Product</text>')
    o.append(f'<circle cx="168" cy="{ky - 7}" r="8" fill="{PAPER}" stroke="{INK2}" stroke-width="3"/><text x="184" y="{ky}" fill="{INK}" font-size="{T}">Research or standard</text>')
    o.append(f'<path d="M410 {ky - 17} l10 17 h-20 z" fill="{OCHRE}"/><text x="428" y="{ky}" fill="{INK}" font-size="{T}">Incident</text>')
    footer(o, ["Sources: DARPA, SAE, NTSB, California DMV, company news."], H)
    save("autonomous-driving-timeline.svg", o)


# ---------------------------------------------------------------- Fig 3
def fig_takeover():
    H = 690
    o = head(H, "How far a car travels while a driver takes back control",
             "At 100 km/h a car covers 27.8 metres per second. The fastest takeover, 1.9 seconds, takes 53 metres. "
             "Typical takeovers of 4.5 to 6 seconds take 125 to 167 metres. After about 10 seconds, 278 metres, a Level 3 "
             "car starts stopping itself. The slowest takeover, 25.7 seconds, takes 714 metres.")
    y = heading(o, 4, "The handover gap at 100 km/h",
                ["The car moves 27.8 m every second while the driver", "looks up. Takeover times: Eriksson and Stanton (2017)."])
    X0, X1, M = 60, 760, 720.0

    def X(m):
        return X0 + m * (X1 - X0) / M

    RY0 = y + 236
    RY1 = RY0 + 54
    o.append(f'<rect x="{X0}" y="{RY0}" width="{X1 - X0}" height="{RY1 - RY0}" fill="{PAPER2}"/>')
    o.append(f'<line x1="{X0}" y1="{RY0}" x2="{X1}" y2="{RY0}" stroke="{INK}" stroke-width="2"/>')
    o.append(f'<line x1="{X0}" y1="{RY1}" x2="{X1}" y2="{RY1}" stroke="{INK}" stroke-width="2"/>')
    o.append(f'<line x1="{X0}" y1="{(RY0 + RY1) / 2}" x2="{X1}" y2="{(RY0 + RY1) / 2}" stroke="{PAPER}" stroke-width="3" stroke-dasharray="16 12"/>')
    o.append(f'<rect x="{X(125):.1f}" y="{RY0}" width="{X(167) - X(125):.1f}" height="{RY1 - RY0}" fill="url(#hatchO)"/>')
    o.append(f'<g transform="translate({X0 - 48} {RY0 + 15})"><rect width="44" height="24" fill="{INK}"/>'
             f'<rect x="26" y="4" width="10" height="16" fill="{PAPER2}"/></g>')

    # (metres, big label, small label, colour, label top y, anchor)
    marks = [
        (53, "1.9 s", "fastest, 53 m", MACHINE, y + 10, "start"),
        (146, "4.5 to 6 s", "typical, 125 to 167 m", OCHRE, y + 80, "start"),
        (278, "about 10 s", "car starts to stop itself, 278 m", INK, y + 150, "start"),
        (714, "25.7 s", "slowest, 714 m", HUMAN, y + 80, "end"),
    ]
    for m, big, small, col, ly, anchor in marks:
        x = X(m)
        o.append(f'<line x1="{x:.1f}" y1="{ly + 34}" x2="{x:.1f}" y2="{RY1}" stroke="{col}" stroke-width="2"/>')
        tx = x + 10 if anchor == "start" else x - 10
        o.append(f'<text x="{tx:.1f}" y="{ly + 20}" fill="{col}" font-family="{SERIF}" font-size="26" text-anchor="{anchor}">{esc(big)}</text>')
        o.append(f'<text x="{tx:.1f}" y="{ly + 46}" fill="{INK2}" font-size="{T}" text-anchor="{anchor}">{esc(small)}</text>')

    sy = RY1 + 32
    for m in range(0, 701, 100):
        o.append(f'<line x1="{X(m):.1f}" y1="{RY1 + 6}" x2="{X(m):.1f}" y2="{RY1 + 12}" stroke="{INK}"/>')
        if m % 200 == 0:
            o.append(f'<text x="{X(m):.1f}" y="{sy}" fill="{INK2}" font-size="{T}" text-anchor="middle">{m} m</text>')
    py = sy + 26
    pw = X(105) - X(0)
    o.append(f'<rect x="{X0}" y="{py}" width="{pw:.1f}" height="34" fill="none" stroke="{INK}" stroke-width="1.5"/>')
    o.append(f'<line x1="{X0 + pw / 2:.1f}" y1="{py}" x2="{X0 + pw / 2:.1f}" y2="{py + 34}" stroke="{INK}" stroke-width="1.5"/>')
    o.append(f'<circle cx="{X0 + pw / 2:.1f}" cy="{py + 17}" r="7" fill="none" stroke="{INK}" stroke-width="1.5"/>')
    o.append(f'<text x="{X0 + pw + 16:.1f}" y="{py + 24}" fill="{INK}" font-size="{T}">One football pitch (105 m) at the same scale</text>')
    footer(o, ["After grabbing the wheel, drivers needed another 8 to 10 s", "to steady the car (Gold et al. 2013; Merat et al. 2014)."], H)
    save("level-3-takeover-distance.svg", o)


# ---------------------------------------------------------------- Fig 4
def fig_l4():
    H = 830
    extra = (f'<pattern id="streets" width="34" height="34" patternUnits="userSpaceOnUse">'
             f'<path d="M34 0 H0 V34" fill="none" stroke="{RULE}" stroke-width="3"/></pattern>')
    o = head(H, "Two ways to run Level 4: robotaxis and autonomous buses",
             "Left: a robotaxi may take any route inside a geofenced zone, on demand. Right: an autonomous bus repeats "
             "one fixed route on a timetable. A table compares where, when, vehicle and examples.", extra)
    y = heading(o, 1, "Level 4 comes in two forms",
                ["Level 4 means no driver is needed, but only inside an",
                 "approved area. A robotaxi may use the whole area;",
                 "a driverless bus repeats one route."])

    PW, PH = 360, 230
    LX, RX, MY = 32, 408, y + 44
    o.append(f'<text x="{LX}" y="{MY - 14}" fill="{HUMAN}" font-family="{SERIF}" font-size="24">Robotaxi</text>')
    o.append(f'<text x="{RX}" y="{MY - 14}" fill="{MACHINE}" font-family="{SERIF}" font-size="24">Autonomous bus</text>')

    # robotaxi map
    o.append(f'<rect x="{LX}" y="{MY}" width="{PW}" height="{PH}" fill="url(#streets)"/>')
    o.append(f'<rect x="{LX}" y="{MY}" width="{PW}" height="{PH}" fill="none" stroke="{INK}"/>')
    fx, fy = LX, MY
    fence = (f"M{fx + 40} {fy + 52} L{fx + 130} {fy + 24} L{fx + 270} {fy + 30} L{fx + 340} {fy + 70} "
             f"L{fx + 330} {fy + 170} L{fx + 220} {fy + 200} L{fx + 90} {fy + 192} L{fx + 30} {fy + 140} Z")
    o.append(f'<path d="{fence}" fill="url(#hatchM)" fill-opacity="0.35" stroke="{MACHINE}" stroke-width="2.5" stroke-dasharray="9 6"/>')
    o.append(f'<path d="M{fx + 96} {fy + 160} V{fy + 112} H{fx + 186} V{fy + 78} H{fx + 262} V{fy + 56}" fill="none" stroke="{HUMAN}" stroke-width="4"/>')
    o.append(f'<circle cx="{fx + 96}" cy="{fy + 160}" r="8" fill="{PAPER}" stroke="{HUMAN}" stroke-width="3.5"/>')
    o.append(f'<rect x="{fx + 255}" y="{fy + 49}" width="14" height="14" fill="{HUMAN}"/>')
    o.append(f'<rect x="{fx + 108}" y="{fy + 150}" width="62" height="24" fill="{PAPER}"/><text x="{fx + 112}" y="{fy + 168}" fill="{HUMAN}" font-size="{T}" font-weight="700">pickup</text>')
    o.append(f'<rect x="{fx + 186}" y="{fy + 30}" width="66" height="24" fill="{PAPER}"/><text x="{fx + 190}" y="{fy + 48}" fill="{HUMAN}" font-size="{T}" font-weight="700">drop-off</text>')
    o.append(f'<text x="{LX}" y="{MY + PH + 28}" fill="{INK2}" font-size="{T}">Dashed line: edge of the approved</text>')
    o.append(f'<text x="{LX}" y="{MY + PH + 52}" fill="{INK2}" font-size="{T}">area. Any trip inside it is allowed.</text>')

    # bus map, transit-diagram style
    o.append(f'<rect x="{RX}" y="{MY}" width="{PW}" height="{PH}" fill="none" stroke="{INK}"/>')
    bx, by = RX, MY
    route = f"M{bx + 36} {by + 180} H{bx + 120} L{bx + 170} {by + 130} H{bx + 250} L{bx + 300} {by + 80} V{by + 44}"
    o.append(f'<path d="{route}" fill="none" stroke="{MACHINE}" stroke-width="8" stroke-linejoin="round"/>')
    stops = [(bx + 36, by + 180, "Park and ride", -20, 34, "start"), (bx + 170, by + 130, "Campus", -20, 36, "start"),
             (bx + 236, by + 130, "Clinic", -14, 36, "start"), (bx + 300, by + 44, "Rail", -16, 4, "end")]
    for sx, sy, name, dx, dy, anc in stops:
        o.append(f'<circle cx="{sx}" cy="{sy}" r="9" fill="{PAPER}" stroke="{INK}" stroke-width="3.5"/>')
        o.append(f'<text x="{sx + dx}" y="{sy + dy}" fill="{INK}" font-size="{T}" text-anchor="{anc}">{esc(name)}</text>')
    o.append(f'<text x="{RX}" y="{MY + PH + 28}" fill="{INK2}" font-size="{T}">Thick line: the only road it drives.</text>')
    o.append(f'<text x="{RX}" y="{MY + PH + 52}" fill="{INK2}" font-size="{T}">Same stops, on a timetable.</text>')

    # comparison table
    ty = MY + PH + 110
    cols = [32, 150, 440]
    o.append(f'<text x="{cols[1]}" y="{ty}" fill="{HUMAN}" font-size="{T}" font-weight="700">Robotaxi</text>')
    o.append(f'<text x="{cols[2]}" y="{ty}" fill="{MACHINE}" font-size="{T}" font-weight="700">Autonomous bus</text>')
    rows = [("Where", "any street in the zone", "one fixed route"),
            ("When", "on demand, via an app", "on a timetable"),
            ("Vehicle", "cars and SUVs", "8 to 12 m e-buses"),
            ("Examples", "Waymo, Apollo Go", "Karsan e-ATAK")]
    for i, (k, a, b) in enumerate(rows):
        ry = ty + 40 + i * 36
        o.append(f'<line x1="32" y1="{ry - 25}" x2="{W - 32}" y2="{ry - 25}" stroke="{RULE}"/>')
        o.append(f'<text x="{cols[0]}" y="{ry}" fill="{INK2}" font-size="{T}">{k}</text>')
        o.append(f'<text x="{cols[1]}" y="{ry}" fill="{INK}" font-size="{T}">{esc(a)}</text>')
        o.append(f'<text x="{cols[2]}" y="{ry}" fill="{INK}" font-size="{T}">{esc(b)}</text>')
    footer(o, ["Illustrative maps, not to scale. All examples run in 2025."], H)
    save("level-4-robotaxi-vs-bus.svg", o)


def wrap(text, n):
    return textwrap.wrap(text, n)


def box(o, x, y, w, lines, col, bold_first=False):
    """Square-cornered step box with a coloured edge. Returns its height."""
    h = 22 + 26 * len(lines)
    o.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{PAPER}" stroke="{col}" stroke-width="2.5"/>')
    o.append(f'<rect x="{x}" y="{y}" width="8" height="{h}" fill="{col}"/>')
    for i, line in enumerate(lines):
        weight = ' font-weight="700"' if bold_first and i == 0 else ""
        o.append(f'<text x="{x + 22}" y="{y + 32 + i * 26}" fill="{INK}" font-size="{T}"{weight}>{esc(line)}</text>')
    return h


def arrow(o, x1, y1, x2, y2, col=INK):
    o.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2 - 9}" stroke="{col}" stroke-width="3"/>')
    o.append(f'<path d="M{x2 - 8} {y2 - 12} L{x2} {y2} L{x2 + 8} {y2 - 12} Z" fill="{col}"/>')


# ---------------------------------------------------------------- Fig 3
def fig_l3_flow():
    H = 850
    o = head(H, "What a Level 3 car does when it hands control back",
             "Step 1: the car drives and the automaker is liable. Step 2: it reaches the edge of its approved conditions. "
             "Step 3: it asks the driver to take over. If the driver takes the wheel, the driver is liable again. "
             "If there is no response after about 10 seconds, the car stops itself, switches on the hazard lights and calls for help.")
    y = heading(o, 3, "How a Level 3 car hands control back",
                ["The car drives until it reaches the edge of its limits.", "Then it asks for help, and a clock starts."])
    X, BW = 32, 736
    y += 6
    h = box(o, X, y, BW, ["1  The car is driving", "The automaker is liable. The driver may read or watch a film."], MACHINE, True)
    arrow(o, 400, y + h, 400, y + h + 34)
    y += h + 34
    h = box(o, X, y, BW, ["2  It reaches the edge of its limits", "Roadworks, heavy rain, or the end of an approved road."], MACHINE, True)
    arrow(o, 400, y + h, 400, y + h + 34)
    y += h + 34
    h = box(o, X, y, BW, ["3  It asks the driver to take over", "Chimes, dashboard lights, and a tug on the seat belt."], OCHRE, True)
    y += h
    lx, rx, cw = 32, 412, 356
    o.append(f'<path d="M400 {y} V{y + 22} H{lx + cw / 2} V{y + 40}" fill="none" stroke="{INK}" stroke-width="3"/>')
    o.append(f'<path d="M400 {y + 22} H{rx + cw / 2} V{y + 40}" fill="none" stroke="{INK}" stroke-width="3"/>')
    for ax in (lx + cw / 2, rx + cw / 2):
        o.append(f'<path d="M{ax - 8} {y + 37} L{ax} {y + 49} L{ax + 8} {y + 37} Z" fill="{INK}"/>')
    y += 50
    o.append(f'<text x="{lx}" y="{y + 26}" fill="{HUMAN}" font-family="{SERIF}" font-size="24">Driver responds</text>')
    o.append(f'<text x="{rx}" y="{y + 26}" fill="{MACHINE}" font-family="{SERIF}" font-size="24">No response</text>')
    o.append(f'<text x="{lx}" y="{y + 52}" fill="{INK2}" font-size="{T}">usually within 4.5 to 6 s</text>')
    o.append(f'<text x="{rx}" y="{y + 52}" fill="{INK2}" font-size="{T}">after about 10 s</text>')
    y += 70
    box(o, lx, y, cw, ["Hands on the wheel,", "eyes on the road.", "The human drives again", "and is liable again."], HUMAN)
    box(o, rx, y, cw, ["The car stops itself in", "its lane or on the shoulder,", "turns the hazards on", "and calls for help."], MACHINE)
    footer(o, ["Engineers call the self-stop a minimal risk manoeuvre.", "Timings: Eriksson and Stanton (2017)."], H)
    save("level-3-takeover-flow.svg", o)


# ---------------------------------------------------------------- Fig 6
def fig_l4_remote():
    H = 1110
    o = head(H, "How remote assistance works for a Level 4 robotaxi",
             "Two columns: the car and the remote control room. The car meets an obstacle it cannot resolve, stops "
             "safely, and sends its camera views. A human specialist marks an allowed path and sends it back. The car "
             "then drives that path itself. The remote human never steers the car.")
    y = heading(o, 2, "When a robotaxi gets stuck, a human advises",
                ["The person in the control room suggests a path.", "The car still does all of the driving."])
    lx, rx, cw = 32, 412, 356
    o.append(f'<text x="{lx}" y="{y + 20}" fill="{MACHINE}" font-family="{SERIF}" font-size="24">In the car</text>')
    o.append(f'<text x="{rx}" y="{y + 20}" fill="{HUMAN}" font-family="{SERIF}" font-size="24">In the control room</text>')
    rule_top = y + 34
    rule_at = len(o)
    y += 48
    state = {"y": y}

    def step(side, n, text, col):
        x = lx if side == "car" else rx
        lines = wrap(text, 28)
        lines = [f"{n}  {lines[0]}"] + [f"    {l}" for l in lines[1:]]
        state["y"] += box(o, x, state["y"], cw, lines, col)

    def down(side):
        x = lx + cw / 2 if side == "car" else rx + cw / 2
        arrow(o, x, state["y"], x, state["y"] + 34)
        state["y"] += 34

    def across(to_right, label):
        y0 = state["y"]
        x1, x2 = (lx + cw / 2, rx + cw / 2) if to_right else (rx + cw / 2, lx + cw / 2)
        o.append(f'<path d="M{x1} {y0} V{y0 + 50} H{x2} V{y0 + 78}" fill="none" stroke="{INK}" stroke-width="3"/>')
        o.append(f'<path d="M{x2 - 8} {y0 + 76} L{x2} {y0 + 88} L{x2 + 8} {y0 + 76} Z" fill="{INK}"/>')
        o.append(f'<rect x="270" y="{y0 + 10}" width="260" height="28" fill="{PAPER}"/>')
        o.append(f'<text x="400" y="{y0 + 31}" fill="{INK2}" font-size="{T}" font-style="italic" text-anchor="middle">{esc(label)}</text>')
        state["y"] += 88

    step("car", 1, "Meets something it cannot work out, such as cones across the lane", MACHINE)
    down("car")
    step("car", 2, "Stops safely in its lane", MACHINE)
    across(True, "sends camera views")
    step("room", 3, "A specialist looks at the scene and marks an allowed path", HUMAN)
    across(False, "sends the path back")
    step("car", 4, "Drives the path itself, still braking for anything in the way", MACHINE)
    down("car")
    step("car", 5, "Rejoins normal traffic", MACHINE)
    y = state["y"]
    o.insert(rule_at, f'<line x1="400" y1="{rule_top}" x2="400" y2="{y}" stroke="{RULE}" stroke-width="2" stroke-dasharray="6 6"/>')

    y += 34
    o.append(f'<rect x="32" y="{y}" width="736" height="82" fill="none" stroke="{OCHRE}" stroke-width="2.5"/>')
    o.append(f'<rect x="32" y="{y}" width="8" height="82" fill="{OCHRE}"/>')
    o.append(f'<text x="54" y="{y + 33}" fill="{INK}" font-size="{T}" font-weight="700">No joystick driving.</text>')
    o.append(f'<text x="54" y="{y + 61}" fill="{INK}" font-size="{T}">Mobile network lag would make remote steering unsafe.</text>')
    footer(o, ["Based on public descriptions of Waymo Fleet Response", "and ADASTEC remote operations."], H)
    save("level-4-remote-assistance.svg", o)


if __name__ == "__main__":
    fig_who_drives()
    fig_timeline()
    fig_takeover()
    fig_l4()
    fig_l3_flow()
    fig_l4_remote()
    print("wrote 6 figures to", os.path.normpath(OUT))

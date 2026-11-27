"""Covers for the nine Earth observation organisation drafts (27 Nov 2026).

Follows .agent/workflows/generate-cover-image.md: 1280x720, cream background, all text #141414
(headline, hook, watermark), one palette (Muted Botanical), flat illustration.

    python scripts/diagrams/covers/eo_org_covers.py
    node scripts/diagrams/svg_to_jpg.js scripts/diagrams/covers/<name>.svg assets/images/posts/covers/<name>_cover.jpg
"""
import os
import random

PAPER, INK = "#f4f1e6", "#141414"
PINE, SAGE, SAND = "#1b3b2b", "#3d634e", "#cbb87b"
OUT = os.path.dirname(os.path.abspath(__file__))


def satellite(x, y, s=1.0):
    return (f'<g transform="translate({x} {y}) scale({s})">'
            f'<rect x="-70" y="-14" width="48" height="28" fill="{SAGE}" stroke="{INK}" stroke-width="3"/>'
            f'<rect x="22" y="-14" width="48" height="28" fill="{SAGE}" stroke="{INK}" stroke-width="3"/>'
            f'<line x1="-22" y1="0" x2="-14" y2="0" stroke="{INK}" stroke-width="4"/>'
            f'<line x1="14" y1="0" x2="22" y2="0" stroke="{INK}" stroke-width="4"/>'
            f'<rect x="-16" y="-22" width="32" height="44" fill="{SAND}" stroke="{INK}" stroke-width="3"/>'
            f'<line x1="0" y1="22" x2="0" y2="36" stroke="{INK}" stroke-width="4"/>'
            f'<circle cx="0" cy="40" r="6" fill="{INK}"/></g>')


def beam(x, y1, x2a, x2b, y2):
    return f'<path d="M{x} {y1} L{x2a} {y2} L{x2b} {y2} Z" fill="{SAND}" opacity="0.35"/>'


def pin(x, y, c=SAND):
    return (f'<path d="M{x} {y} C{x - 22} {y - 28} {x - 22} {y - 58} {x} {y - 58} C{x + 22} {y - 58} {x + 22} {y - 28} {x} {y} Z" '
            f'fill="{c}" stroke="{INK}" stroke-width="3"/><circle cx="{x}" cy="{y - 40}" r="7" fill="{INK}"/>')


def ground(y=600):
    return f'<rect x="120" y="{y}" width="1040" height="8" rx="4" fill="{INK}"/>'


def art_dea():
    tiles = []
    cols = [SAGE, SAND, SAGE, SAGE, SAND, SAGE, SAND, SAND, SAGE, SAGE]
    for r in range(3):
        for c in range(10):
            col = PINE if (r == 1 and 3 <= c <= 6) else cols[(c + r * 3) % 10]
            tiles.append(f'<rect x="{240 + c * 80}" y="{420 + r * 58}" width="72" height="50" fill="{col}" stroke="{INK}" stroke-width="2.5"/>')
    return beam(640, 300, 300, 980, 420) + "".join(tiles) + satellite(640, 270, 1.3)


def art_gfw():
    trees = []
    for i, x in enumerate(range(170, 1130, 60)):
        if 560 <= x <= 760:
            trees.append(f'<rect x="{x - 4}" y="575" width="8" height="25" fill="{INK}"/>')  # stumps
            continue
        c = PINE if i % 2 else SAGE
        trees.append(f'<path d="M{x} 470 L{x + 30} 580 L{x - 30} 580 Z" fill="{c}" stroke="{INK}" stroke-width="3"/>'
                     f'<rect x="{x - 4}" y="580" width="8" height="20" fill="{INK}"/>')
    return satellite(640, 270, 1.2) + "".join(trees) + pin(610, 540) + pin(710, 520) + ground()


def art_guf():
    arcs = "".join(f'<path d="M{560 - k * 30} {330 + k * 40} Q640 {360 + k * 46} {720 + k * 30} {330 + k * 40}" fill="none" stroke="{SAGE}" stroke-width="5"/>'
                   for k in range(3))
    spec = [(220, 70, 90), (300, 60, 140), (370, 80, 70), (460, 50, 110), (520, 90, 160), (620, 60, 120),
            (690, 80, 190), (780, 60, 100), (850, 90, 150), (950, 60, 80), (1020, 80, 120)]
    blocks = "".join(f'<rect x="{x}" y="{600 - h}" width="{w}" height="{h}" fill="{PINE if h > 110 else SAGE}" stroke="{INK}" stroke-width="3"/>'
                     for x, w, h in spec)
    return satellite(640, 280, 1.2) + arcs + blocks + ground()


def art_missing_maps():
    out = [f'<rect x="300" y="380" width="680" height="230" fill="{SAND}" stroke="{INK}" stroke-width="3"/>',
           f'<path d="M300 520 C460 470 560 560 980 470" fill="none" stroke="{INK}" stroke-width="6"/>',
           f'<path d="M560 380 L620 610" fill="none" stroke="{INK}" stroke-width="6"/>']
    for x, y in [(360, 410), (420, 430), (380, 560), (680, 420), (740, 440), (820, 410), (700, 540), (860, 540), (900, 560)]:
        out.append(f'<rect x="{x}" y="{y}" width="36" height="28" fill="none" stroke="{PINE}" stroke-width="4" stroke-dasharray="6 4"/>')
    return "".join(out) + pin(640, 450, SAGE) + satellite(640, 290, 1.0)


def art_arset():
    tiles = "".join(f'<rect x="{470 + c * 70}" y="{360 + r * 60}" width="62" height="52" fill="{[SAGE, SAND, PINE][(c + r) % 3]}"/>'
                    for r in range(3) for c in range(5))
    return (f'<rect x="440" y="330" width="400" height="230" rx="10" fill="{PAPER}" stroke="{INK}" stroke-width="5"/>' + tiles +
            f'<path d="M380 600 H900 L860 570 H420 Z" fill="{SAGE}" stroke="{INK}" stroke-width="4"/>'
            f'<path d="M930 320 L1030 285 L1130 320 L1030 355 Z" fill="{PINE}" stroke="{INK}" stroke-width="3"/>'
            f'<path d="M975 338 V385 Q1030 410 1085 385 V338" fill="{PINE}" stroke="{INK}" stroke-width="3"/>'
            f'<line x1="1110" y1="328" x2="1110" y2="390" stroke="{SAND}" stroke-width="5"/>' + satellite(270, 330, 1.0))


def art_black_marble():
    rnd = random.Random(7)
    lights = []
    for cx, cy, n, spread in [(380, 500, 40, 60), (700, 470, 60, 80), (960, 520, 30, 50), (540, 560, 15, 30)]:
        for _ in range(n):
            x, y = cx + rnd.gauss(0, spread), cy + rnd.gauss(0, spread * 0.45)
            if 200 < x < 1080 and 400 < y < 610:
                lights.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{rnd.choice([3, 4, 5, 6])}" fill="{SAND}"/>')
    return (f'<rect x="180" y="390" width="920" height="230" rx="14" fill="{PINE}" stroke="{INK}" stroke-width="4"/>' +
            "".join(lights) + satellite(640, 290, 1.1))


def art_harvest():
    rows = "".join(f'<path d="M{260 - i * 20} {420 + i * 24} H{1020 + i * 20} L{1030 + i * 20} {438 + i * 24} H{250 - i * 20} Z" '
                   f'fill="{SAGE if i % 2 else SAND}" stroke="{INK}" stroke-width="2"/>' for i in range(8))
    return beam(640, 310, 280, 1000, 420) + rows + satellite(640, 280, 1.2)


def art_servir():
    drops = "".join(f'<path d="M{x} {y} q-10 18 0 26 q10 -8 0 -26 Z" fill="{SAGE}" stroke="{INK}" stroke-width="2"/>'
                    for x, y in [(520, 400), (560, 430), (600, 400), (640, 430), (680, 400), (720, 430), (760, 400)])
    cloud = (f'<path d="M500 380 Q480 330 540 330 Q560 290 620 300 Q660 270 710 310 Q780 300 780 350 Q800 380 760 384 H520 Z" '
             f'fill="{PAPER}" stroke="{INK}" stroke-width="4"/>')
    field = "".join(f'<rect x="{300 + c * 100}" y="490" width="92" height="100" fill="{[SAND, SAGE, PINE][c % 3]}" stroke="{INK}" stroke-width="3"/>'
                    for c in range(7))
    return (satellite(1020, 270, 1.0) + f'<path d="M980 300 L780 350" stroke="{INK}" stroke-width="4" stroke-dasharray="12 8"/>'
            + cloud + drops + field + ground())


def art_smos():
    layers = (f'<rect x="200" y="440" width="880" height="50" fill="{SAGE}" stroke="{INK}" stroke-width="3"/>'
              f'<rect x="200" y="490" width="880" height="60" fill="{SAND}" stroke="{INK}" stroke-width="3"/>'
              f'<rect x="200" y="550" width="880" height="60" fill="{PINE}" stroke="{INK}" stroke-width="3"/>')
    drops = "".join(f'<path d="M{x} {y} q-12 20 0 30 q12 -10 0 -30 Z" fill="{PINE}" stroke="{INK}" stroke-width="2"/>'
                    for x, y in [(330, 500), (470, 515), (610, 500), (750, 515), (890, 500), (1010, 512)])
    sprouts = "".join(f'<path d="M{x} 440 V412 M{x} 420 q-14 -12 -24 -6 M{x} 426 q14 -12 24 -6" fill="none" stroke="{PINE}" stroke-width="4"/>'
                      for x in range(260, 1060, 110))
    return beam(640, 300, 300, 980, 440) + layers + drops + sprouts + satellite(640, 270, 1.2)


# name -> (headline, hook, illustration, alt text, post file stem)
COVERS = {
    "digital_earth_africa": ("FREE SATELLITE DATA FOR AFRICA", "DIGITAL EARTH AFRICA: READY-TO-USE IMAGES OF THE WHOLE CONTINENT", art_dea,
                             "A satellite above a grid of map tiles in green and sand with a dark band of water, under the headline 'Free satellite data for africa' and the line 'Digital earth africa: ready-to-use images of the whole continent'",
                             "2026-11-27-digital-earth-africa-free-satellite-data-for-africa"),
    "global_forest_watch": ("SPOTTING FOREST LOSS FROM SPACE", "GLOBAL FOREST WATCH SENDS ALERTS WHEN TREES DISAPPEAR", art_gfw,
                            "A satellite above a row of trees with a cleared gap of stumps marked by alert pins, under the headline 'Spotting forest loss from space' and the line 'Global forest watch sends alerts when trees disappear'",
                            "2026-11-27-global-forest-watch-tracking-tree-loss-from-space"),
    "global_urban_footprint": ("MAPPING EVERY CITY FROM ORBIT", "DLR'S RADAR MAP OF BUILT-UP AREAS ACROSS THE GLOBE", art_guf,
                               "A satellite sending radar waves down to a skyline of city blocks, under the headline 'Mapping every city from orbit' and the line 'Dlr's radar map of built-up areas across the globe'",
                               "2026-11-27-global-urban-footprint-mapping-cities-from-space"),
    "missing_maps": ("VOLUNTEERS MAPPING UNMAPPED COMMUNITIES", "MISSING MAPS: VOLUNTEERS TRACE BUILDINGS SO AID CAN REACH PEOPLE", art_missing_maps,
                     "A map with roads and dashed outlines of buildings being traced, a location pin and a satellite above, under the headline 'Volunteers mapping unmapped communities' and the line 'Missing maps: volunteers trace buildings so aid can reach people'",
                     "2026-11-27-missing-maps-volunteer-mapping-for-humanitarian-response"),
    "nasa_arset": ("LEARN TO USE SATELLITE DATA, FREE", "NASA ARSET RUNS FREE COURSES ON USING SATELLITE DATA", art_arset,
                   "A laptop showing a satellite map, a satellite beside it and a graduation cap, under the headline 'Learn to use satellite data, free' and the line 'Nasa arset runs free courses on using satellite data'",
                   "2026-11-27-nasa-arset-free-remote-sensing-training"),
    "nasa_black_marble": ("NIGHT LIGHTS REVEAL POWER CUTS", "NASA BLACK MARBLE TRACKS LIGHTS AFTER STORMS AND OUTAGES", art_black_marble,
                          "A satellite above a dark landscape dotted with clusters of city lights, under the headline 'Night lights reveal power cuts' and the line 'Nasa black marble tracks lights after storms and outages'",
                          "2026-11-27-nasa-black-marble-night-lights-from-space"),
    "nasa_harvest": ("SATELLITES THAT WATCH CROPS GROW", "NASA HARVEST USES SATELLITES TO MONITOR CROPS AND FOOD SUPPLY", art_harvest,
                     "A satellite looking down on rows of crop fields, under the headline 'Satellites that watch crops grow' and the line 'Nasa harvest uses satellites to monitor crops and food supply'",
                     "2026-11-27-nasa-harvest-satellite-data-for-food-security"),
    "servir": ("SATELLITE DATA FOR DROUGHTS AND FLOODS", "SERVIR HUBS TURN SATELLITE DATA INTO DROUGHT AND FLOOD TOOLS", art_servir,
               "A satellite linked to a rain cloud falling on a row of fields, under the headline 'Satellite data for droughts and floods' and the line 'Servir hubs turn satellite data into drought and flood tools'",
               "2026-11-27-servir-satellite-data-for-development"),
    "smos": ("MEASURING SOIL WATER FROM SPACE", "ESA'S SMOS SATELLITE MEASURES MOISTURE IN THE TOP LAYER OF SOIL", art_smos,
             "A satellite above a cross-section of soil layers holding water drops, with seedlings on top, under the headline 'Measuring soil water from space' and the line 'Esa's smos satellite measures moisture in the top layer of soil'",
             "2026-11-27-smos-measuring-soil-moisture-from-space"),
}


def cover(headline, hook, art):
    # Headline in two balanced lines so it stays at least 64px (workflow rule); the hook is the
    # organisation's name in smaller type below it.
    words = headline.split()
    best = min(range(1, len(words)), key=lambda i: abs(len(" ".join(words[:i])) - len(" ".join(words[i:])))) if len(words) > 1 else 1
    lines = [" ".join(words[:best]), " ".join(words[best:])] if len(words) > 1 else [headline]
    size = max(64, min(80, int(1180 / (0.72 * max(len(l) for l in lines)))))
    y1 = 92 if len(lines) == 2 else 112
    tspans = "".join(f'<tspan x="640" dy="{0 if i == 0 else size + 4}">{l}</tspan>' for i, l in enumerate(lines))
    hook_y = y1 + (size + 4) * (len(lines) - 1) + 46
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <!-- Generated by scripts/diagrams/covers/eo_org_covers.py. Palette per cover (COVER_PALETTE); all text #141414. -->
  <rect width="1280" height="720" fill="{PAPER}"/>
  <g fill="{INK}" font-family="'Arial Black', 'Helvetica Neue', Impact, sans-serif" text-anchor="middle">
    <text x="640" y="{y1}" font-size="{size}" font-weight="900">{tspans}</text>
    <text x="640" y="{hook_y}" font-size="22" font-weight="700" letter-spacing="1.5" font-family="Arial, Helvetica, sans-serif">{hook}</text>
  </g>
  <g transform="translate(115 95) scale(0.82)">{art()}</g>
  <text x="640" y="700" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600" fill="{INK}" text-anchor="middle">rdjarbeng.com</text>
</svg>
'''


# One of the six site palettes per cover, so posts don't all share one look.
# Each maps to the (dark, mid, light) roles the art functions use as PINE, SAGE, SAND.
PALETTES = {
    "botanical":  ("#1b3b2b", "#3d634e", "#cbb87b"),   # Muted Botanical
    "primaries":  ("#2d4763", "#b84d43", "#cfa14a"),   # Muted Primaries
    "risograph":  ("#38233f", "#6d597a", "#d99b26"),   # Muted Risograph
    "stripe":     ("#0a2540", "#635bff", "#ff705a"),   # Stripe Modernist
    "carbon":     ("#121619", "#0f62fe", "#009d9a"),   # IBM Carbon
    "m3":         ("#1a73e8", "#b3261e", "#f59e0b"),   # Google M3 Tonal
}
COVER_PALETTE = {
    "digital_earth_africa": "m3", "global_forest_watch": "botanical", "global_urban_footprint": "carbon",
    "missing_maps": "stripe", "nasa_arset": "primaries", "nasa_black_marble": "risograph",
    "nasa_harvest": "primaries", "servir": "carbon", "smos": "botanical",
}

if __name__ == "__main__":
    for name, (h, k, art, _alt, _post) in COVERS.items():
        PINE, SAGE, SAND = PALETTES[COVER_PALETTE[name]]
        with open(os.path.join(OUT, f"{name}.svg"), "w", encoding="utf-8", newline="\n") as f:
            f.write(cover(h, k, art))
        print(name)

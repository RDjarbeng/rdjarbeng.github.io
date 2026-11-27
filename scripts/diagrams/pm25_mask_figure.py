"""Figure for the PM2.5 explainer: author avatar wearing a respirator, plus particle sizes to scale.

Sizes come from the post (EPA): hair about 70 um, PM10 up to 10 um, PM2.5 up to 2.5 um.
Palette: Muted Primaries (Terracotta #b84d43, Slate Ink #2d4763, Ochre Gold #cfa14a) plus black/white.

    python scripts/diagrams/pm25_mask_figure.py
"""
import os, math
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
SRC = os.path.join(ROOT, "assets", "images", "rd", "rd_avatars_brown_plain_centered.png")
OUT = os.path.join(ROOT, "assets", "images", "posts", "pm25", "pm25-avatar-mask-particle-sizes.jpg")
PAPER, INK, INK2 = "#f4f1e6", "#141414", "#57514a"
SLATE, TERRA, OCHRE = "#2d4763", "#b84d43", "#cfa14a"
S = 3  # supersampling
W, H = 1280, 600

def font(size, bold=False):
    for p in (r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
              r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf"):
        if os.path.exists(p):
            return ImageFont.truetype(p, size * S)
    return ImageFont.load_default()

img = Image.new("RGB", (W * S, H * S), PAPER)
d = ImageDraw.Draw(img)

# ---- left: avatar crop (head and shoulders, sparkle watermark is outside the crop)
src = Image.open(SRC).convert("RGB")
CX0, CY0, CX1, CY1 = 425, 0, 1035, 672
crop = src.crop((CX0, CY0, CX1, CY1))
PW, PH = 520, 572            # panel size
PX, PY = 40, 14
k = PH / crop.height
crop = crop.resize((round(crop.width * k * S), round(PH * S)), Image.LANCZOS)
panel = Image.new("RGB", (PW * S, PH * S), "#c95f0f")
panel.paste(crop, (0, 0))
pd = ImageDraw.Draw(panel)

def to_panel(x, y):
    return ((x - CX0) * k * S, (y - CY0) * k * S)

# mask drawn upright on its own layer, then rotated to the head tilt
MW, MH = 240, 185
LS = 4
layer = Image.new("RGBA", (int(MW * 1.5 * S), int(MH * 1.5 * S)), (0, 0, 0, 0))
ld = ImageDraw.Draw(layer)
cx, cy = layer.width / 2, layer.height / 2
sc = k * S
def P(x, y):  # local mask coords (source px) -> layer
    return (cx + x * sc, cy + y * sc)
lw = max(2, round(3.2 * S))
# ear loops
ld.line([P(-MW/2 + 6, -35), P(-MW/2 - 38, -95), P(-MW/2 - 42, -125)], fill=INK, width=lw, joint="curve")
ld.line([P(MW/2 - 6, -35), P(MW/2 + 30, -70), P(MW/2 + 34, -120)], fill=INK, width=lw, joint="curve")
# body: nose bridge up top, widening, rounded chin
pts = []
N = 40
def bez(p0, p1, p2, p3, n=N):
    out = []
    for i in range(n + 1):
        t = i / n
        out.append(tuple((1-t)**3*a + 3*(1-t)**2*t*b + 3*(1-t)*t**2*c + t**3*e for a, b, c, e in zip(p0, p1, p2, p3)))
    return out
top = -MH * 0.5
pts += bez((-26, top), (-12, top - 14), (12, top - 14), (26, top))                      # nose bridge arc
pts += bez((26, top), (80, top + 6), (MW/2 + 8, -30), (MW/2, 30))                      # right cheek
pts += bez((MW/2, 30), (MW/2 - 6, 105), (60, MH/2 + 10), (0, MH/2 + 14))                # right jaw
pts += bez((0, MH/2 + 14), (-60, MH/2 + 10), (-MW/2 + 6, 105), (-MW/2, 30))             # left jaw
pts += bez((-MW/2, 30), (-MW/2 - 8, -30), (-80, top + 6), (-26, top))                  # left cheek
poly = [P(x, y) for x, y in pts]
ld.polygon(poly, fill="#ffffff")
# fold lines
for fy, inset in ((-30, 12), (25, 20)):
    ld.line([P(-MW/2 + inset + 4, fy), P(0, fy + 10), P(MW/2 - inset - 4, fy)], fill="#c9c4b8", width=lw, joint="curve")
# nose clip
ld.line([P(-30, top + 7), P(0, top - 2), P(30, top + 7)], fill=SLATE, width=round(lw * 1.6), joint="curve")
ld.line(poly + [poly[0]], fill=INK, width=round(lw * 1.5), joint="curve")
# valve
vx, vy = P(0, 40)
r = 16 * sc
ld.ellipse([vx - r, vy - r, vx + r, vy + r], fill=OCHRE, outline=INK, width=lw)
for j in (-1, 0, 1):
    ld.line([(vx - r * 0.55, vy + j * r * 0.4), (vx + r * 0.55, vy + j * r * 0.4)], fill=INK, width=max(2, lw // 2))
TILT = -9
layer = layer.rotate(TILT, resample=Image.BICUBIC)
mx, my = to_panel(813, 372)
panel.paste(layer, (round(mx - layer.width / 2), round(my - layer.height / 2)), layer)

# rounded corners
mask = Image.new("L", panel.size, 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, panel.width - 1, panel.height - 1], radius=22 * S, fill=255)
img.paste(panel, (PX * S, PY * S), mask)
d.rounded_rectangle([PX * S, PY * S, (PX + PW) * S, (PY + PH) * S], radius=22 * S, outline=INK, width=3 * S)

# ---- right: particles to scale (diameters, 3 px per micrometre)
UM = 3.0
RX = 640
d.text((RX * S, 24 * S), "Particle widths, drawn to scale", font=font(26, True), fill=INK)
rows = [("Human hair", "about 70 µm", 70, INK2, "#ffffff"),
        ("PM10", "10 µm or smaller", 10, SLATE, SLATE),
        ("PM2.5", "2.5 µm or smaller", 2.5, TERRA, TERRA)]
y = 84
for name, sub, um, col, fill in rows:
    dia = um * UM
    lx = RX + 215 - dia / 2      # circle centred in a 215 px column
    cyy = y + max(dia, 30) / 2
    d.ellipse([(lx) * S, (cyy - dia / 2) * S, (lx + dia) * S, (cyy + dia / 2) * S], fill=fill, outline=col, width=max(2, round(3 * S)) if um > 20 else 0)
    tx = RX + 360
    d.text((tx * S, (cyy - 30) * S), name, font=font(28, True), fill=INK)
    d.text((tx * S, (cyy + 6) * S), sub, font=font(22), fill=INK)
    y += max(dia, 30) + 56
    if um == 70:
        y += 8
# scale bar note
d.text((RX * S, (H - 78) * S), "Hair is about 28 times wider than the", font=font(20), fill=INK)
d.text((RX * S, (H - 52) * S), "largest PM2.5 particle (70 ÷ 2.5).", font=font(20), fill=INK)
# watermark
wf = font(18, True)
t = "rdjarbeng.com"
tw = d.textlength(t, font=wf)
d.text((W * S - 24 * S - tw, (H - 36) * S), t, font=wf, fill=INK2)

out = img.resize((W, H), Image.LANCZOS)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
q = 90
while True:
    out.save(OUT, "JPEG", quality=q, optimize=True)
    if os.path.getsize(OUT) < 290_000 or q <= 60:
        break
    q -= 5
print(OUT, os.path.getsize(OUT), "bytes, quality", q)

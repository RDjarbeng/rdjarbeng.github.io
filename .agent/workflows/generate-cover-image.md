---
description: To generate cover images for a post for this website rdjarbeng.com
---

# Cover Image Generation Guidelines
When generating cover images for this website, please adhere to the following specifications to ensure consistency and brand identity.

## Specifications

1.  **Text Overlay**:
    *   The image MUST include a short, **interesting hook** to grab the reader's attention or the **title** of the post.
    *   Typography should be modern, bold, and legible.

2.  **Watermark**:
    *   The text `rdjarbeng.com` MUST be included as a watermark on the image.
    *   Placement: subtle but visible, typically at the bottom center or bottom right.

3.  **Color Palette**:
    *   **Text Color (STRICT)**: You MUST pick exactly ONE solid color for the entire text overlay (e.g., solid black, solid white, solid red, yellow or blue). Do NOT use gradients, multiple colors, or mix and match colors in the text.
    *   **Background/Illustration Colors**: Use bold, vibrant, and high-contrast color schemes (Primary Colors like Red, Blue, Yellow).

4.  **Content & Style**:
    *   **Style**: Use **Flat Vector Art**, **Editorial Illustration**, or **Minimalist Geometric** styles.
    *   **Texture**: Use **Matte** finishes. Avoid shiny, glossy, or metallic textures.
    *   **Capture the Essence**: The image should be specific to the post's topic.
    *   **Not Vague**: If the post is about a specific technology, visualize that technology. If it's about a leaderboard, show a leaderboard.
    *   **Aesthetic**: Professional, clean, and distinct.
    *   **Anti-Patterns (STRICT)**:
        *   **NO** glowing blue neon networks.
        *   **NO** "cyberpunk" or generic "matrix" backgrounds.
        *   **NO** "abstract tech nodes" connecting dots.
        *   **NO** typical "AI generated" look (excessive lens flares, hyper-realism).

5.  **Dimensions**: 
    *   The image MUST have an aspect ratio of **16:9**. Recommended dimensions are **1280x720** or **1920x1080**. This is critical as the website cards are fixed to this ratio.
    *   **Performance First**: Prioritize web-optimized images. High-definition (1080p equivalent) is sufficient.

6.  **Directory Placement & Naming**:
    *   Cover images MUST be saved to the `assets/images/posts/covers/` directory.
    *   Other related post images MUST be saved to the `assets/images/posts/` directory.
    *   **The file extension MUST match the real format.** AI image generators usually return JPEG data; saving that as `.png` makes the extension lie about the content, and some link-preview crawlers then reject the image.
    *   **Use `.jpg` for photographic or busy images** (AI art, photos, collages). PNG previews do work on Facebook, X, LinkedIn and WhatsApp, but a busy 1280x720 PNG is about 5x larger (a series collage: 937 KB as PNG, 169 KB as JPG), and WhatsApp drops preview images over roughly 300 KB. Aim for under 300 KB.
    *   **PNG is fine for flat graphics** with few colours (diagrams, logos, text-only covers) when it stays under that size.

7.  **Use an image generator first.** Generate covers with the Antigravity CLI (`agy -p "<prompt>"`, see the example prompt below). A cover is a thumbnail, not an infographic: one large headline of at most about six words, one clear illustration, the watermark, and nothing else.

8.  **No image generator available?**
    *   Agy can also write the SVG: `agy -p "<prompt>" --mode accept-edits --print-timeout 560s`, one run at a time (parallel runs time out). In the prompt, tell it to use its file-writing tool and run no shell commands, give the palette, headline words and minimum size, describe one simple scene, ask for objects drawn from real proportions and facing the right way, and forbid any other text. If something is wrong, ask agy to fix only that thing in the existing file. Simple geometric subjects work best; people and busy scenes are better as generated images.
    *   Draw the cover as a 1280x720 SVG in the same flat style, keep the source in `scripts/diagrams/covers/`, and render it to JPG:
        `node scripts/diagrams/svg_to_jpg.js scripts/diagrams/covers/<name>.svg assets/images/posts/covers/<name>_cover.jpg`
    *   **Keep it to a thumbnail (STRICT)**: at most three text elements (the headline, an optional short hook, the `rdjarbeng.com` watermark). The headline must be at least 64px. No panels, cards, dashboards, code, tables, charts with values or small labels; these are unreadable at card size and break easily when rendered. Example: `scripts/diagrams/covers/level-4-in-the-real-world.svg`.
    *   **Look at the rendered JPG before using it (REQUIRED)**: open the image and check that no text overlaps or runs off the edge, no box is empty, the headline reads at small size and the watermark is there. Do not commit a cover you have not looked at.
    *   Each part of a series needs its own cover; do not reuse one image across parts.
    *   **Series covers** are collages of the parts' covers, made with Collage Studio (the separate image-collage-agent project; see its `docs/agent-cookbook.md`). Pick a layout that shows every cover (e.g. filmstrip for 2 parts, a 2x2 grid for 4, magazine for 5, mosaic for 7+), use a transparent background, save to `assets/images/series/<slug>_cover.png`, and set it as `image` on the series (`_series/<slug>.md` or the CMS). Redo it when a part is added. The website itself does not run the collage tool.

## Example Prompt Structure
When asking for an image generation, the prompt should look something like this:
> "A **flat vector illustration** of [subject] using a **matte** finish. **Solid** primary colors (Red, Blue, Yellow) for the illustration. Clean lines, **white or light background**. Text overlay says '[Title]' in exactly **ONE solid color** (e.g., solid black). Watermark 'rdjarbeng.com' at the bottom. **No neon, no glow, editorial style**. **16:9 Aspect Ratio**."
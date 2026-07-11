---
description: Create a blog post with proper formatting and cover images
---

# Create Post Workflow

When asked to create a new blog post, you MUST follow this sequence of steps to ensure consistency with the site's CMS, design, and file structure.

## 1. Verify Frontmatter Fields
Before creating the file, check `admin/config.yml` (specifically the `posts` collection schema).
- DO NOT add or change frontmatter keys that are not supported by the schema.
- Required/Common fields typically include: `layout: post`, `title`, `date` (format `YYYY-MM-DDTHH:mm:ssZ`), `published`, `author`, `category`, `tags`, `image`, and `image_alt`.

## 2. Follow Writing and Communication Rules
- Write the post content adhering to the guidelines in the `/writing-style` workflow (if applicable).
- DO NOT dumb down technical content. Retain technical depth while making the structure readable.
- Ensure SEO best practices and proper markdown formatting.

## 3. Handle the Cover Image
Every post should have a cover image. You must choose one of the following two approaches:

**Approach A: Generate a Cover Image (Default)**
- Follow the `/generate-cover-image` workflow instructions exactly.
- Generate the image with a 16:9 aspect ratio and save it to the `assets/images/posts/covers/` directory.
- **CRITICAL:** The generated image MUST be saved as a `.jpg` file to prevent link preview bugs. Convert the file if necessary.

**Approach B: Modify an Avatar (When Appropriate)**
- If you feel the post's subject matter (e.g., highly personal updates, specific developer logs) would benefit from a personal touch, pick an existing avatar from `assets/images/rd/`.
- **CRITICAL**: You MUST NOT use the raw avatar image directly (that would look generic and stupid). You must use `generate_image` (passing the avatar as an input) or an image editing script to create a customized version.
- Overlay the post title and relevant UI elements using the empty space in the avatar, or reposition the avatar so the text fits properly to make it a proper cover image.
- Save this modified image as a `.jpg` in `assets/images/posts/covers/` and link that new image in the frontmatter.

**Image Placement Rule**
- If the post does not contain any other images, you MUST embed the cover image inside the post body (e.g., after the first paragraph) so the post isn't just a wall of text. Use standard markdown `![Alt Text](/path/to/image.jpg)`.

## 4. Create the File
- Create the markdown file in the `_posts/` directory.
- Use the naming convention `YYYY-MM-DD-slug.md`.
- Populate the file with the verified frontmatter (including the `image` path) and the post body.

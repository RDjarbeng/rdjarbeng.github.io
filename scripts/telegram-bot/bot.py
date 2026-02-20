import os
import logging
import yaml
import re
import urllib.request
import html
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, MessageHandler, filters, CommandHandler

# Load environment variables
load_dotenv()

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
ALLOWED_USER_ID = os.getenv("ALLOWED_USER_ID")
REPO_ROOT = os.getenv("REPO_ROOT", "../../")

# Logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

def is_authorized(update: Update):
    if not ALLOWED_USER_ID:
        return True
    return str(update.effective_user.id) == str(ALLOWED_USER_ID)

def get_page_title(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req, timeout=5)
        html_content = response.read().decode('utf-8', errors='ignore')
        match = re.search(r'<title>(.*?)</title>', html_content, re.IGNORECASE | re.DOTALL)
        if match:
            title = match.group(1).replace('- YouTube', '').strip()
            return html.unescape(title)
    except Exception as e:
        logging.error(f"Failed to fetch title for {url}: {e}")
    return ""

def extract_youtube_id(url):
    match = re.search(r'(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})', url)
    return match.group(1) if match else None

async def handle_text(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_authorized(update):
        await update.message.reply_text("Unauthorized.")
        return

    text = update.message.text
    
    # Check for youtube link
    urls = re.findall(r'(https?://(?:www\.)?(?:youtube\.com|youtu\.be)[^\s]+)', text)
    if urls:
        for url in urls:
            yt_id = extract_youtube_id(url)
            if yt_id:
                title = get_page_title(url) or "YouTube Video"
                
                # Create Markdown file for gallery_videos
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                safe_title = "".join([c if c.isalnum() else "-" for c in title[:30].lower()]).strip("-")
                if not safe_title:
                    safe_title = f"video-{timestamp}"
                filename = f"{safe_title}-{timestamp}"
                
                root_path = Path(REPO_ROOT).resolve()
                collection_dir = root_path / "_gallery/videos"
                collection_dir.mkdir(parents=True, exist_ok=True)
                
                caption = text.replace(url, '').strip()
                
                frontmatter = {
                    "title": title[:70],
                    "published": True,
                    "date": datetime.now().replace(microsecond=0),
                    "platform": "youtube",
                    "youtube_id": url,
                    "type": "video",
                    "category": "videos"
                }
                
                if caption:
                    frontmatter["caption"] = caption
                
                md_content = f"---\n{yaml.dump(frontmatter, sort_keys=False)}---\n"
                md_path = collection_dir / f"{filename}.md"
                
                with open(md_path, "w", encoding="utf-8") as f:
                    f.write(md_content)
                
                await update.message.reply_text(f"✅ YouTube video added to gallery!\n📄 File: {md_path.name}\n🎥 ID: {yt_id}\n📝 Title: {title}")
        return

    await update.message.reply_text(
        "I didn't recognize any commands or YouTube links in that text. "
        "Send an image to add a file, or send a YouTube link to add a video."
    )

async def handle_media(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_authorized(update):
        await update.message.reply_text("Unauthorized.")
        return

    if update.message.document:
        media_obj = update.message.document
        if not media_obj.mime_type or not media_obj.mime_type.startswith('image/'):
            await update.message.reply_text("Please send an image file.")
            return
        caption = update.message.caption or ""
    elif update.message.photo:
        media_obj = update.message.photo[-1]
        caption = update.message.caption or ""
    else:
        return

    target_type = "meme"
    clean_caption = caption

    # Check for routing commands in caption
    if caption.startswith("/ai "):
        target_type = "ai"
        clean_caption = caption.replace("/ai ", "", 1).strip()
    elif caption.strip() == "/ai":
        target_type = "ai"
        clean_caption = ""
    elif caption.startswith("/gallery "):
        target_type = "gallery"
        clean_caption = caption.replace("/gallery ", "", 1).strip()
    elif caption.strip() == "/gallery":
        target_type = "gallery"
        clean_caption = ""
    elif caption.startswith("/asset "):
        target_type = "asset"
        clean_caption = caption.replace("/asset ", "", 1).strip()
    elif caption.strip() == "/asset":
        target_type = "asset"
        clean_caption = ""
    elif caption.startswith("/meme "):
        target_type = "meme"
        clean_caption = caption.replace("/meme ", "", 1).strip()
    elif caption.strip() == "/meme":
        target_type = "meme"
        clean_caption = ""

    if not clean_caption:
        clean_caption = "Untitled"

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_title = "".join([c if c.isalnum() else "-" for c in clean_caption[:30].lower()]).strip("-")
    if not safe_title:
        safe_title = "image"
        
    filename = f"{safe_title}-{timestamp}"
    
    root_path = Path(REPO_ROOT).resolve()
    
    if target_type == "meme":
        media_rel_dir = "assets/images/memes"
        collection_rel_dir = "_gallery/memes"
    elif target_type == "ai":
        media_rel_dir = "assets/images/ai"
        collection_rel_dir = "_gallery/ai"
    elif target_type == "gallery":
        media_rel_dir = "assets/images"
        collection_rel_dir = "_gallery"
    elif target_type == "asset":
        media_rel_dir = "assets/images"
        collection_rel_dir = None
        
    media_dir = root_path / media_rel_dir
    media_dir.mkdir(parents=True, exist_ok=True)
    if collection_rel_dir:
        collection_dir = root_path / collection_rel_dir
        collection_dir.mkdir(parents=True, exist_ok=True)
    
    new_file = await context.bot.get_file(media_obj.file_id)
    
    valid_exts = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}
    image_ext = Path(new_file.file_path).suffix.lower()
    if image_ext not in valid_exts:
        image_ext = ".jpg"
        
    image_filename = f"{filename}{image_ext}"
    image_path = media_dir / image_filename
    await new_file.download_to_drive(custom_path=str(image_path))
    
    if target_type == "asset":
        await update.message.reply_text(
            f"✅ Image saved as asset!\n\n📄 File: {image_filename}\n"
            f"🔗 Markdown path: `/{media_rel_dir}/{image_filename}`\n\n"
            f"Use this path in your blog posts."
        )
        return

    # Create frontmatter based on admin/config.yml setup
    if target_type == "meme":
        frontmatter = {
            "title": clean_caption[:70],
            "date": datetime.now().replace(microsecond=0),
            "image": f"/{media_rel_dir}/{image_filename}",
            "caption": clean_caption if clean_caption != "Untitled" else "",
            "type": "external",
            "category": "memes"
        }
    elif target_type == "ai":
        frontmatter = {
            "title": clean_caption[:70],
            "image": f"/{media_rel_dir}/{image_filename}",
            "labels": "Grok",
            "caption": clean_caption if clean_caption != "Untitled" else "",
            "type": "external",
            "category": "ai-generations"
        }
    elif target_type == "gallery":
        frontmatter = {
            "title": clean_caption[:70],
            "image": f"/{media_rel_dir}/{image_filename}",
            "type": "external",
            "caption": clean_caption if clean_caption != "Untitled" else "",
            "category": "None",
            "date": datetime.now().replace(microsecond=0)
        }
    
    md_content = f"---\n{yaml.dump(frontmatter, sort_keys=False)}---\n"
    md_path = collection_dir / f"{filename}.md"
    
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(md_content)
    
    await update.message.reply_text(
        f"✅ Uploaded to {target_type}!\n\n📄 File: {md_path.name}\n🖼 Image: {image_filename}\n\n"
        f"💡 Tip: You can change categories by adding `/ai`, `/gallery` or `/asset` as the caption to images."
    )

async def handle_start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Hello! I am your CMS Bot.\n"
        "Here is what I can do:\n\n"
        "🖼 *Images*:\n"
        "Send an image. The default is 'meme'. You can use these commands in the caption:\n"
        "• `/meme <caption...>` - Add to memes gallery\n"
        "• `/ai <caption...>` - Add to AI gallery\n"
        "• `/gallery <caption...>` - Add to General gallery\n"
        "• `/asset <caption...>` - Just upload the image to assets (no post created)\n\n"
        "🎥 *Videos*:\n"
        "Send a text message with a YouTube URL to automatically add it to the video gallery.",
        parse_mode="Markdown"
    )

if __name__ == '__main__':
    if not TOKEN:
        print("Error: TELEGRAM_BOT_TOKEN not found in environment.")
        exit(1)
        
    application = ApplicationBuilder().token(TOKEN).build()
    
    application.add_handler(CommandHandler("start", handle_start))
    application.add_handler(CommandHandler("help", handle_start))
    
    media_handler = MessageHandler(filters.PHOTO | filters.Document.IMAGE, handle_media)
    application.add_handler(media_handler)
    
    text_handler = MessageHandler(filters.TEXT & ~filters.COMMAND, handle_text)
    application.add_handler(text_handler)
    
    print("Bot is starting...")
    application.run_polling()

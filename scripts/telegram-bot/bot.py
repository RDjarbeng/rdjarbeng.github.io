import os
import logging
import yaml
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, MessageHandler, filters

# Load environment variables
load_dotenv()

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
ALLOWED_USER_ID = os.getenv("ALLOWED_USER_ID")
REPO_ROOT = os.getenv("REPO_ROOT", "../../")

# Configuration for Meme Collection (based on admin/config.yml)
MEME_COLLECTION_PATH = "_gallery/memes"
MEME_MEDIA_PATH = "assets/images/memes"

# Logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

def is_authorized(update: Update):
    if not ALLOWED_USER_ID:
        return True # Default to true if not set, but recommended to set it
    return str(update.effective_user.id) == str(ALLOWED_USER_ID)

async def handle_photo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_authorized(update):
        await update.message.reply_text("Unauthorized.")
        return

    # Get the photo and caption
    photo = update.message.photo[-1]
    caption = update.message.caption or "Untitled Meme"
    
    # Create a slug for the filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_title = "".join([c if c.isalnum() else "-" for c in caption[:30].lower()]).strip("-")
    filename = f"{safe_title}-{timestamp}"
    
    # Paths
    root_path = Path(REPO_ROOT).resolve()
    media_dir = root_path / MEME_MEDIA_PATH
    collection_dir = root_path / MEME_COLLECTION_PATH
    
    # Ensure directories exist
    media_dir.mkdir(parents=True, exist_ok=True)
    collection_dir.mkdir(parents=True, exist_ok=True)
    
    # Download image
    new_file = await context.bot.get_file(photo.file_id)
    image_ext = ".jpg" # Default to jpg
    image_filename = f"{filename}{image_ext}"
    image_path = media_dir / image_filename
    await new_file.download_to_drive(custom_path=str(image_path))
    
    # Create Markdown file
    # Based on admin/config.yml 'memes' collection:
    # fields: title, image, caption, type (hidden: external), category (hidden: memes)
    
    frontmatter = {
        "title": caption[:70],
        "date": datetime.now().replace(microsecond=0),
        "image": f"/{MEME_MEDIA_PATH}/{image_filename}",
        "caption": caption,
        "type": "external",
        "category": "memes"
    }
    
    md_content = f"---\n{yaml.dump(frontmatter, sort_keys=False)}---\n"
    md_path = collection_dir / f"{filename}.md"
    
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(md_content)
    
    await update.message.reply_text(f"✅ Meme uploaded!\n\n📄 File: {md_path.name}\n🖼 Image: {image_filename}")

if __name__ == '__main__':
    if not TOKEN:
        print("Error: TELEGRAM_BOT_TOKEN not found in environment.")
        exit(1)
        
    application = ApplicationBuilder().token(TOKEN).build()
    
    photo_handler = MessageHandler(filters.PHOTO, handle_photo)
    application.add_handler(photo_handler)
    
    print("Bot is starting...")
    application.run_polling()

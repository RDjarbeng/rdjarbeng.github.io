import os
import logging
import yaml
import re
import urllib.request
import html
import asyncio
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, ContextTypes, MessageHandler, CallbackQueryHandler, filters, CommandHandler

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
                status_msg = await update.message.reply_text("⏳ Processing YouTube link...")
                # Allow user to provide title and caption by just typing it before/after the link
                text_without_url = text.replace(url, '').strip()
                if text_without_url:
                    parts = text_without_url.split('\n', 1)
                    title = parts[0].strip()
                    caption = parts[1].strip() if len(parts) > 1 else ""
                else:
                    title = get_page_title(url) or "YouTube Video"
                    caption = ""
                
                # Create Markdown file for gallery_videos
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                safe_title = "".join([c if c.isalnum() else "-" for c in title[:30].lower()]).strip("-")
                if not safe_title:
                    safe_title = f"video-{timestamp}"
                filename = f"{safe_title}-{timestamp}"
                
                root_path = Path(REPO_ROOT).resolve()
                collection_dir = root_path / "_gallery/videos"
                collection_dir.mkdir(parents=True, exist_ok=True)
                
                frontmatter = {
                    "title": title[:70],
                    "platform": "youtube",
                    "youtube_id": url,
                    "embed_code": "",
                    "thumbnail": "",
                    "caption": caption if caption else "",
                    "type": "video",
                    "category": "videos",
                    "date": datetime.now().replace(microsecond=0),
                    "published": True
                }
                
                md_content = f"---\n{yaml.dump(frontmatter, sort_keys=False)}---\n"
                md_path = collection_dir / f"{filename}.md"
                
                try:
                    with open(md_path, "w", encoding="utf-8") as f:
                        f.write(md_content)
                    
                    await status_msg.edit_text(f"✅ YouTube video added to gallery!\n📄 File: {md_path.name}\n📝 Title: {title}")
                except Exception as e:
                    await status_msg.edit_text(f"❌ Failed to write file: {e}")
        return

    await update.message.reply_text(
        "I didn't recognize any YouTube links in that text. "
        "Send an image to add a file, or send a YouTube link to add a video."
    )

async def upload_image(app, chat_id, message_id, msg_id_key, target_type, ai_model="Gemini", gallery_cat="None"):
    if msg_id_key not in app.bot_data.get('uploads', {}):
        return  # already processed or cancelled

    payload = app.bot_data['uploads'].pop(msg_id_key)
    file_id = payload['file_id']
    caption = payload['caption']
    
    clean_caption = caption.strip() if caption else "Untitled"
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
    elif target_type == "grouped":
        media_rel_dir = "assets/images/grouped"
        collection_rel_dir = None
    else:
        return
        
    media_dir = root_path / media_rel_dir
    media_dir.mkdir(parents=True, exist_ok=True)
    if collection_rel_dir:
        collection_dir = root_path / collection_rel_dir
        collection_dir.mkdir(parents=True, exist_ok=True)
    
    try:
        new_file = await app.bot.get_file(file_id)
        
        valid_exts = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}
        image_ext = Path(new_file.file_path).suffix.lower()
        if image_ext not in valid_exts:
            image_ext = ".jpg"
            
        image_filename = f"{filename}{image_ext}"
        image_path = media_dir / image_filename
        await new_file.download_to_drive(custom_path=str(image_path))
    except Exception as e:
        await app.bot.edit_message_text(text=f"❌ Failed to download image: {e}", chat_id=chat_id, message_id=message_id)
        return
        
    if target_type == "asset" or target_type == "grouped":
        await app.bot.edit_message_text(
            f"✅ Image saved as asset!\n\n📄 File: {image_filename}\n"
            f"🔗 Markdown path: `/{media_rel_dir}/{image_filename}`\n\n"
            f"Use this path in your blog posts.",
            chat_id=chat_id, message_id=message_id
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
            "labels": ai_model,
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
            "category": gallery_cat,
            "date": datetime.now().replace(microsecond=0)
        }
    
    md_content = f"---\n{yaml.dump(frontmatter, sort_keys=False)}---\n"
    md_path = collection_dir / f"{filename}.md"
    
    try:
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(md_content)
    except Exception as e:
        await app.bot.edit_message_text(text=f"❌ Failed to write markdown file: {e}", chat_id=chat_id, message_id=message_id)
        return
    
    label_text = f" ({gallery_cat})" if target_type == 'gallery' else (f" ({ai_model})" if target_type == 'ai' else "")
    await app.bot.edit_message_text(
        f"✅ Uploaded to {target_type}{label_text}!\n\n📄 File: {md_path.name}\n🖼 Image: {image_filename}",
        chat_id=chat_id, message_id=message_id
    )

async def timeout_callback(context: ContextTypes.DEFAULT_TYPE):
    # Retrieve job data
    job = context.job
    data = job.data
    chat_id = data['chat_id']
    message_id = data['message_id']
    msg_id_key = data['msg_id_key']
    
    app = context.application
    uploads = app.bot_data.get('uploads', {})
    
    if msg_id_key in uploads:
        payload = uploads[msg_id_key]
        state = payload.get('state', 'main')
        
        # Determine defaults based on current state
        if state == 'main':
            target_type = 'gallery'
            ai_model = 'Gemini'
            gallery_cat = 'None'
        elif state == 'ai':
            target_type = 'ai'
            ai_model = 'Gemini'
            gallery_cat = 'None'
        elif state == 'gallery':
            target_type = 'gallery'
            ai_model = 'Gemini'
            gallery_cat = 'None'
        else:
            return
            
        await app.bot.edit_message_text(text="⏳ Timeout reached! Defaulting to General Gallery (None)...", chat_id=chat_id, message_id=message_id)
        await upload_image(app, chat_id, message_id, msg_id_key, target_type, ai_model, gallery_cat)

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

    if update.message.media_group_id:
        status_msg = await update.message.reply_text("⏳ Saving grouped image to assets/grouped...", reply_to_message_id=update.message.message_id)
        msg_id_key = str(status_msg.message_id)
        if 'uploads' not in context.application.bot_data:
            context.application.bot_data['uploads'] = {}
        context.application.bot_data['uploads'][msg_id_key] = {
            'file_id': media_obj.file_id,
            'caption': caption,
            'state': 'main'
        }
        await upload_image(context.application, update.message.chat_id, status_msg.message_id, msg_id_key, "grouped")
        return

    keyboard = [
        [
            InlineKeyboardButton("Meme", callback_data="main_meme"),
            InlineKeyboardButton("Gallery", callback_data="main_gallery")
        ],
        [
            InlineKeyboardButton("AI Gen", callback_data="main_ai"),
            InlineKeyboardButton("Asset Only", callback_data="main_asset")
        ],
        [
            InlineKeyboardButton("Cancel", callback_data="main_cancel")
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    msg = await update.message.reply_text(
        "Where would you like to add this image? (Automatically defaults to Gallery 'None' in 30s)", 
        reply_markup=reply_markup,
        reply_to_message_id=update.message.message_id
    )
    
    msg_id_key = str(msg.message_id)
    if 'uploads' not in context.application.bot_data:
        context.application.bot_data['uploads'] = {}
        
    context.application.bot_data['uploads'][msg_id_key] = {
        'file_id': media_obj.file_id,
        'caption': caption,
        'state': 'main'
    }
    
    # Schedule timeout background task
    if context.job_queue:
        context.job_queue.run_once(
            timeout_callback, 
            30, 
            data={'chat_id': update.message.chat_id, 'message_id': msg.message_id, 'msg_id_key': msg_id_key},
            name=f"timeout_{msg_id_key}"
        )

async def handle_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    
    if not is_authorized(update):
        await query.edit_message_text(text="Unauthorized.")
        return
        
    data = query.data
    msg_id_key = str(query.message.message_id)
    uploads = context.application.bot_data.get('uploads', {})
    
    if msg_id_key not in uploads:
        await query.edit_message_text(text="❌ Session expired or data lost. Please send the image again.")
        return

    # Cancel previous timeout job
    if context.job_queue:
        current_jobs = context.job_queue.get_jobs_by_name(f"timeout_{msg_id_key}")
        for job in current_jobs:
            job.schedule_removal()
        
    payload = uploads[msg_id_key]

    if data.startswith("main_"):
        target_type = data.split("_")[1]
        
        if target_type == "cancel":
            uploads.pop(msg_id_key)
            await query.edit_message_text(text="❌ Upload cancelled.")
            return
            
        if target_type == "ai":
            payload['state'] = 'ai'
            keyboard = [
                [InlineKeyboardButton("Grok", callback_data="ai_Grok"), InlineKeyboardButton("Gemini", callback_data="ai_Gemini")],
                [InlineKeyboardButton("Midjourney", callback_data="ai_Midjourney"), InlineKeyboardButton("DALL-E", callback_data="ai_DALL-E")],
                [InlineKeyboardButton("Stable Diffusion", callback_data="ai_Stable Diffusion"), InlineKeyboardButton("Other", callback_data="ai_Other")],
                [InlineKeyboardButton("Cancel", callback_data="main_cancel")]
            ]
            await query.edit_message_text(
                text="Which AI Model generated this? (Defaults to 'Gemini' in 30s)",
                reply_markup=InlineKeyboardMarkup(keyboard)
            )
            if context.job_queue:
                context.job_queue.run_once(timeout_callback, 30, data={'chat_id': query.message.chat_id, 'message_id': query.message.message_id, 'msg_id_key': msg_id_key}, name=f"timeout_{msg_id_key}")
            return
            
        elif target_type == "gallery":
            payload['state'] = 'gallery'
            keyboard = [
                [InlineKeyboardButton("Ghana", callback_data="gal_Ghana"), InlineKeyboardButton("Rwanda", callback_data="gal_Rwanda")],
                [InlineKeyboardButton("None", callback_data="gal_None"), InlineKeyboardButton("Other", callback_data="gal_Other")],
                [InlineKeyboardButton("Cancel", callback_data="main_cancel")]
            ]
            await query.edit_message_text(
                text="Select a Category for this Gallery Entry: (Defaults to 'None' in 30s)",
                reply_markup=InlineKeyboardMarkup(keyboard)
            )
            if context.job_queue:
                context.job_queue.run_once(timeout_callback, 30, data={'chat_id': query.message.chat_id, 'message_id': query.message.message_id, 'msg_id_key': msg_id_key}, name=f"timeout_{msg_id_key}")
            return
            
        else:
            # direct upload (meme or asset)
            await query.edit_message_text(text="⏳ Downloading and processing image...")
            await upload_image(context.application, query.message.chat_id, query.message.message_id, msg_id_key, target_type)
            return

    elif data.startswith("ai_"):
        ai_model = data.split("_", 1)[1]
        await query.edit_message_text(text="⏳ Downloading and processing image...")
        await upload_image(context.application, query.message.chat_id, query.message.message_id, msg_id_key, "ai", ai_model=ai_model)
        return

    elif data.startswith("gal_"):
        gallery_cat = data.split("_", 1)[1]
        await query.edit_message_text(text="⏳ Downloading and processing image...")
        await upload_image(context.application, query.message.chat_id, query.message.message_id, msg_id_key, "gallery", gallery_cat=gallery_cat)
        return

async def handle_start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Hello! I am your CMS Bot.\n"
        "Here is what I can do:\n\n"
        "🖼 *Images*:\n"
        "Send any image from your gallery or as a file document. "
        "I will reply with an interactive inline menu allowing you to quickly choose a destination (Meme, Gallery, AI, or generic Asset).\n"
        "If you don't respond to the menu within 30 seconds, I will automatically save it to the General Gallery under the 'None' category.\n\n"
        "🎥 *Videos*:\n"
        "Send a YouTube URL. If you send just a URL, I'll attempt to automatically extract the title of the video from YouTube.\n"
        "Or, you can simply type your custom Title in the same message on the first line, then the URL.\n"
        "(Any text below your title will become the description/caption).",
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

    # Add callback query handler for inline buttons
    application.add_handler(CallbackQueryHandler(handle_callback))
    
    print("Bot is starting...")
    application.run_polling()

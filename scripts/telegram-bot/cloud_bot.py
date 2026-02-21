import os
import re
import yaml
import urllib.request
import html
from datetime import datetime
from dotenv import load_dotenv

import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton
from flask import Flask, request, abort
from github import Github

load_dotenv(os.path.join('/home/rdjarbeng/mysite', '.env'))

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
ALLOWED_USER_ID = os.getenv("ALLOWED_USER_ID")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO_NAME = os.getenv("GITHUB_REPO", "RDjarbeng/rdjarbeng.github.io")

# Initialize Telegram Bot (TeleBot must be synchronous for WSGI Webhooks)
bot = telebot.TeleBot(TOKEN, threaded=False)
app = Flask(__name__)

# Very simple in-memory state. In a multi-worker setup on PythonAnywhere, 
# this can theoretically reset between requests, but for a free account with 1 worker, it usually persists well enough for brief menus.
uploads = {}

def is_authorized(user_id):
    if not ALLOWED_USER_ID:
        return True
    return str(user_id) == str(ALLOWED_USER_ID)

def get_page_title(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req, timeout=5)
        html_content = response.read().decode('utf-8', errors='ignore')
        match = re.search(r'<title>(.*?)</title>', html_content, re.IGNORECASE | re.DOTALL)
        if match:
            return html.unescape(match.group(1).replace('- YouTube', '').strip())
    except Exception:
        pass
    return ""

def extract_youtube_id(url):
    match = re.search(r'(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})', url)
    return match.group(1) if match else None

def commit_to_github(path, content, message):
    """Pushes a file directly to the GitHub repository via API"""
    g = Github(GITHUB_TOKEN)
    repo = g.get_repo(REPO_NAME)
    repo.create_file(path, message, content, branch="main")

# ===============================
# WEBHOOK ROUTE FOR PYTHONANYWHERE
# ===============================
@app.route('/' + TOKEN, methods=['POST'])
def webhook():
    if request.headers.get('content-type') == 'application/json':
        json_string = request.get_data().decode('utf-8')
        update = telebot.types.Update.de_json(json_string)
        bot.process_new_updates([update])
        return '', 200
    else:
        abort(403)

# ===============================
# TELEGRAM BOT LOGIC
# ===============================
def process_image_upload(chat_id, message_id, msg_id_key, target_type, ai_model="Gemini", gallery_cat="None"):
    if msg_id_key not in uploads:
        return
    payload = uploads.pop(msg_id_key)
    file_id = payload['file_id']
    caption = payload['caption']

    clean_caption = caption.strip() if caption else "Untitled"
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_title = "".join([c if c.isalnum() else "-" for c in clean_caption[:30].lower()]).strip("-")
    if not safe_title:
        safe_title = "image"
        
    filename = f"{safe_title}-{timestamp}"
    
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

    try:
        # 1. Download image from Telegram servers to memory
        file_info = bot.get_file(file_id)
        image_bytes = bot.download_file(file_info.file_path)
        
        valid_exts = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}
        _, ext = os.path.splitext(file_info.file_path.lower())
        if ext not in valid_exts:
            ext = ".jpg"
            
        image_filename = f"{filename}{ext}"
        image_path = f"{media_rel_dir}/{image_filename}"
        
        # 2. Push image to GitHub
        commit_to_github(image_path, image_bytes, f"Add image {image_filename} via Cloud Bot")
    except Exception as e:
        bot.edit_message_text(f"❌ Failed to download or upload image to GitHub: {e}", chat_id, message_id)
        return

    if target_type in ["asset", "grouped"]:
        bot.edit_message_text(
            f"✅ Image saved directly to GitHub!\n\n📄 File: {image_filename}\n"
            f"🔗 Markdown path: `/{media_rel_dir}/{image_filename}`",
            chat_id, message_id
        )
        return

    # 3. Create Markdown Frontmatter
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
    md_path = f"{collection_rel_dir}/{filename}.md"

    try:
        # 4. Push Markdown to GitHub
        commit_to_github(md_path, md_content, f"Add post {filename}.md via Cloud Bot")
    except Exception as e:
        bot.edit_message_text(f"❌ Failed to upload markdown file to GitHub: {e}", chat_id, message_id)
        return

    label_text = f" ({gallery_cat})" if target_type == 'gallery' else (f" ({ai_model})" if target_type == 'ai' else "")
    bot.edit_message_text(
        f"✅ Live in Production GitHub {target_type}{label_text}!\n\n📄 File: {filename}.md\n🖼 Image: {image_filename}",
        chat_id, message_id
    )

@bot.message_handler(content_types=['document', 'photo'])
def handle_media(message):
    if not is_authorized(message.from_user.id):
        return
        
    if message.document:
        if not message.document.mime_type or not message.document.mime_type.startswith('image/'):
            bot.reply_to(message, "Please send an image file.")
            return
        file_id = message.document.file_id
        caption = message.caption or ""
    elif message.photo:
        file_id = message.photo[-1].file_id
        caption = message.caption or ""
    else:
        return

    if message.media_group_id:
        status_msg = bot.reply_to(message, "⏳ Committing grouped image to GitHub...")
        msg_id_key = str(status_msg.message_id)
        uploads[msg_id_key] = {
            'file_id': file_id,
            'caption': caption,
            'state': 'main'
        }
        process_image_upload(message.chat.id, status_msg.message_id, msg_id_key, "grouped")
        return

    keyboard = [
        [InlineKeyboardButton("Meme", callback_data="main_meme"), InlineKeyboardButton("Gallery", callback_data="main_gallery")],
        [InlineKeyboardButton("AI Gen", callback_data="main_ai"), InlineKeyboardButton("Asset Only", callback_data="main_asset")],
        [InlineKeyboardButton("Cancel", callback_data="main_cancel")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    msg = bot.reply_to(message, "Where would you like this on GitHub? (Note: Cloud version has no timeouts)", reply_markup=reply_markup)
    
    uploads[str(msg.message_id)] = {
        'file_id': file_id,
        'caption': caption,
        'state': 'main'
    }

@bot.callback_query_handler(func=lambda call: True)
def handle_callback(call):
    if not is_authorized(call.from_user.id):
        bot.answer_callback_query(call.id, "Unauthorized")
        return

    data = call.data
    msg_id_key = str(call.message.message_id)
    if msg_id_key not in uploads:
        bot.edit_message_text("❌ Session expired. Re-upload Image.", call.message.chat.id, call.message.message_id)
        return
    
    payload = uploads[msg_id_key]

    if data.startswith("main_"):
        target_type = data.split("_")[1]
        
        if target_type == "cancel":
            uploads.pop(msg_id_key)
            bot.edit_message_text("❌ Upload cancelled.", call.message.chat.id, call.message.message_id)
            return
        
        if target_type == "ai":
            payload['state'] = 'ai'
            keyboard = [
                [InlineKeyboardButton("Gemini", callback_data="ai_Gemini"), InlineKeyboardButton("Grok", callback_data="ai_Grok")],
                [InlineKeyboardButton("Midjourney", callback_data="ai_Midjourney"), InlineKeyboardButton("DALL-E", callback_data="ai_DALL-E")],
                [InlineKeyboardButton("Stable Diffusion", callback_data="ai_Stable Diffusion"), InlineKeyboardButton("Other", callback_data="ai_Other")],
                [InlineKeyboardButton("Cancel", callback_data="main_cancel")]
            ]
            bot.edit_message_text("Which AI Model generated this?", call.message.chat.id, call.message.message_id, reply_markup=InlineKeyboardMarkup(keyboard))
            return
            
        elif target_type == "gallery":
            payload['state'] = 'gallery'
            keyboard = [
                [InlineKeyboardButton("Ghana", callback_data="gal_Ghana"), InlineKeyboardButton("Rwanda", callback_data="gal_Rwanda")],
                [InlineKeyboardButton("None", callback_data="gal_None"), InlineKeyboardButton("Other", callback_data="gal_Other")],
                [InlineKeyboardButton("Cancel", callback_data="main_cancel")]
            ]
            bot.edit_message_text("Select a Category for this Gallery Entry:", call.message.chat.id, call.message.message_id, reply_markup=InlineKeyboardMarkup(keyboard))
            return
            
        else:
            bot.edit_message_text("⏳ Pushing file directly to GitHub...", call.message.chat.id, call.message.message_id)
            process_image_upload(call.message.chat.id, call.message.message_id, msg_id_key, target_type)
            return

    elif data.startswith("ai_"):
        bot.edit_message_text("⏳ Processing AI configuration and sending to GitHub...", call.message.chat.id, call.message.message_id)
        ai_model = data.split("_", 1)[1]
        process_image_upload(call.message.chat.id, call.message.message_id, msg_id_key, "ai", ai_model=ai_model)
        return

    elif data.startswith("gal_"):
        bot.edit_message_text("⏳ Processing Gallery logic and sending to GitHub...", call.message.chat.id, call.message.message_id)
        gallery_cat = data.split("_", 1)[1]
        process_image_upload(call.message.chat.id, call.message.message_id, msg_id_key, "gallery", gallery_cat=gallery_cat)
        return

@bot.message_handler(func=lambda message: True)
def handle_text(message):
    if not is_authorized(message.from_user.id):
        return

    text = message.text
    urls = re.findall(r'(https?://(?:www\.)?(?:youtube\.com|youtu\.be)[^\s]+)', text)
    if urls:
        for url in urls:
            yt_id = extract_youtube_id(url)
            if yt_id:
                status_msg = bot.reply_to(message, "⏳ Connecting to GitHub API to register YouTube Video...")
                
                text_without_url = text.replace(url, '').strip()
                if text_without_url:
                    parts = text_without_url.split('\n', 1)
                    title = parts[0].strip()
                    caption = parts[1].strip() if len(parts) > 1 else ""
                else:
                    title = "YouTube Video"
                    caption = ""
                
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                safe_title = "".join([c if c.isalnum() else "-" for c in title[:30].lower()]).strip("-")
                if not safe_title:
                    safe_title = f"video-{timestamp}"
                filename = f"{safe_title}-{timestamp}"
                
                frontmatter = {
                    "title": title[:70],
                    "platform": "youtube",
                    "youtube_id": url,
                    "embed_code": "",
                    "thumbnail": "",
                    "caption": caption,
                    "type": "video",
                    "category": "videos",
                    "date": datetime.now().replace(microsecond=0),
                    "published": True
                }
                
                md_content = f"---\n{yaml.dump(frontmatter, sort_keys=False)}---\n"
                md_path = f"_gallery/videos/{filename}.md"
                
                try:
                    commit_to_github(md_path, md_content, f"Add YouTube Video {filename}.md")
                    bot.edit_message_text(f"✅ Auto-Committed to GitHub!\n📄 File: {filename}.md\n📝 Title: {title}\n\n💡 Tip: Line 1 of your message becomes the Title. Anything else becomes the Caption.", message.chat.id, status_msg.message_id)
                except Exception as e:
                    bot.edit_message_text(f"❌ Failed to commit to GitHub: {e}", message.chat.id, status_msg.message_id)
        return

    bot.reply_to(message, "I didn't recognize any commands or YouTube links.")

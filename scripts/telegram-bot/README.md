# Telegram Meme Bot for rdjarbeng.com

This bot allows you to upload memes to your website's gallery by simply sending a photo and a caption to a Telegram bot.

## Setup

1.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

2.  **Configure environment**:
    Copy `.env.example` to `.env` and fill in your details:
    - `TELEGRAM_BOT_TOKEN`: Get this from @BotFather.
    - `ALLOWED_USER_ID`: Your Telegram ID (you can get this from @userinfobot).

3.  **Run the bot**:
    ```bash
    python bot.py
    ```

## How it works
- When you send a **Photo** with a **Caption**:
  - The image is saved to `assets/images/memes/`.
  - A markdown file is created in `_gallery/memes/` with the correct frontmatter for your Jekyll site.
  - The structure follows the definition in `admin/config.yml`.

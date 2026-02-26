import json
import urllib.request
import os
from datetime import datetime
import re

# You would normally import an LLM SDK here like:
# import google.generativeai as genai
# from openai import OpenAI

def fetch_top_hn_stories(limit=5):
    """Fetches the top stories from Hacker News."""
    print(f"Fetching top {limit} Hacker News stories...")
    # Get top 500 story IDs
    top_stories_url = "https://hacker-news.firebaseio.com/v0/topstories.json"
    with urllib.request.urlopen(top_stories_url) as response:
        story_ids = json.loads(response.read().decode())[:limit]

    stories = []
    for story_id in story_ids:
        # Get individual story details
        story_url = f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json"
        with urllib.request.urlopen(story_url) as response:
            story = json.loads(response.read().decode())
            stories.append(story)
    
    return stories

def generate_ai_summary(stories):
    """Uses an LLM API to write a cohesive blog post about the stories."""
    print("Sending stories to AI for summarization...")
    
    # In a real implementation, you would format the prompt and call the LLM API.
    # PROMPT: "You are a tech blogger. Write a fun, engaging summary of these top Hacker News stories..."
    
    # ---------------------------------------------------------
    # Example pseudo-code for calling an LLM:
    # ---------------------------------------------------------
    # client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    # response = client.chat.completions.create(
    #     model="gpt-4o-mini",
    #     messages=[{"role": "user", "content": prompt_text}]
    # )
    # return response.choices[0].message.content
    # ---------------------------------------------------------
    
    # For this demonstration, we'll auto-generate a generic markdown summary.
    content = "Welcome to your daily Hacker News tech roundup! Here are the top stories today:\n\n"
    for s in stories:
        title = s.get('title', 'Unknown Title')
        url = s.get('url', f"https://news.ycombinator.com/item?id={s.get('id')}")
        content += f"### [{title}]({url})\n"
        content += f"This article has sparked a lot of discussion today with {s.get('descendants', 0)} comments and {s.get('score', 0)} upvotes. "
        content += "*(An AI would write a 2-3 sentence summary of the actual article content here.)*\n\n"
    
    content += "---\n*This post was completely autonomously written and published by a Python script running via GitHub Actions.*"
    return content

def save_as_jekyll_post(content):
    """Saves the AI's markdown string as a Jekyll post with frontmatter."""
    date_str = datetime.now().strftime("%Y-%m-%d")
    time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S +0000")
    title = f"Daily Tech Roundup: {datetime.now().strftime('%b %d, %Y')}"
    
    # Generate URL-safe slug
    slug = "-".join(re.sub(r'[^a-zA-Z0-9 ]', '', title.lower()).split())
    filename = f"{date_str}-{slug}.md"
    
    # Path inside the Jekyll repository
    filepath = os.path.join(os.getcwd(), "_posts", filename)
    
    frontmatter = f"""---
layout: post
title: "{title}"
date: {time_str}
categories: Autopilot
tags: [Hacker News, Tech, AI]
author: AI Agent Server
---
"""
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(frontmatter + content)
        
    print(f"Jekyll post successfully created at: {filepath}")

def main():
    try:
        # Step 1: Gather external data (Sensors)
        stories = fetch_top_hn_stories(limit=3)
        
        # Step 2: Process data through AI (Brain)
        ai_blog_content = generate_ai_summary(stories)
        
        # Step 3: Take action on the system (Actuators)
        save_as_jekyll_post(ai_blog_content)
        
        print("Daily autonomous pipeline complete!")
    except Exception as e:
        print(f"Pipeline failed: {e}")
        exit(1)

if __name__ == "__main__":
    main()

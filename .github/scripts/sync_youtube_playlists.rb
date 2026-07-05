require 'net/http'
require 'json'
require 'uri'
require 'fileutils'
require 'yaml'
require 'time'

# Ensure the output directory exists
VIDEOS_DIR = '_gallery/videos'
COLLECTIONS_DIR = '_video_collections'
FileUtils.mkdir_p(VIDEOS_DIR)

# Get API key from environment
API_KEY = ENV['YOUTUBE_API_KEY']

if API_KEY.nil? || API_KEY.empty?
  puts "Warning: YOUTUBE_API_KEY environment variable is not set. Skipping sync."
  exit 0
end

def fetch_playlist_items(playlist_id)
  items = []
  next_page_token = nil

  loop do
    url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=#{playlist_id}&key=#{API_KEY}"
    url += "&pageToken=#{next_page_token}" if next_page_token

    uri = URI(url)
    response = Net::HTTP.get_response(uri)
    
    if response.is_a?(Net::HTTPSuccess)
      data = JSON.parse(response.body)
      items.concat(data['items'] || [])
      next_page_token = data['nextPageToken']
      break if next_page_token.nil? || next_page_token.empty?
    else
      puts "Error fetching playlist #{playlist_id}: #{response.body}"
      break
    end
  end

  items
end

def fetch_playlist_title(playlist_id)
  url = "https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=#{playlist_id}&key=#{API_KEY}"
  uri = URI(url)
  response = Net::HTTP.get_response(uri)
  if response.is_a?(Net::HTTPSuccess)
    data = JSON.parse(response.body)
    return data['items'][0]['snippet']['title'] if data['items'] && data['items'].any?
  end
  nil
end

def extract_playlist_id(url)
  return nil unless url
  # Matches ?list=ID or &list=ID
  if url =~ /[?&]list=([^&]+)/
    $1
  else
    nil
  end
end

def slugify(string)
  string.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
end

# Read all existing video files to avoid duplicates based on youtube_id
existing_videos = []
Dir.glob("#{VIDEOS_DIR}/*.md").each do |file|
  content = File.read(file)
  if content =~ /^youtube_id:\s*"?([^"\n]+)"?/
    existing_videos << $1
  end
end

new_videos_count = 0

Dir.glob("#{COLLECTIONS_DIR}/*.md").each do |file|
  content = File.read(file)
  # Extract YAML front matter
  if content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
    front_matter = YAML.safe_load($1)
    
    playlist_url = front_matter['youtube_playlist_url']
    genre = front_matter['genre'] || 'Other'
    
    playlist_id = extract_playlist_id(playlist_url)
    
    if playlist_id
      fetched_title = fetch_playlist_title(playlist_id)
      genre = fetched_title || front_matter['genre'] || 'Other'
      puts "Syncing playlist: #{front_matter['title']} (#{playlist_id}) -> Genre: #{genre}"
      
      items = fetch_playlist_items(playlist_id)
      
      items.each do |item|
        snippet = item['snippet']
        video_id = snippet.dig('resourceId', 'videoId')
        
        # Skip if already exists
        next if existing_videos.include?(video_id)
        
        title = snippet['title']
        # Skip private/deleted videos
        next if title == 'Private video' || title == 'Deleted video'
        
        published_at = snippet['publishedAt']
        description = snippet['description'].to_s.gsub('"', '\"')
        
        thumbnails = snippet['thumbnails'] || {}
        thumbnail_url = thumbnails.dig('maxres', 'url') || thumbnails.dig('high', 'url') || thumbnails.dig('default', 'url') || ""
        
        date = Time.parse(published_at).strftime("%Y-%m-%d")
        slug = slugify(title)[0..50] # Limit slug length
        
        filename = "#{VIDEOS_DIR}/#{date}-#{slug}.md"
        
        file_content = <<~YAML
        ---
        title: "#{title.gsub('"', '\"')}"
        published: true
        date: #{published_at}
        platform: youtube
        youtube_id: "#{video_id}"
        thumbnail: "#{thumbnail_url}"
        type: video
        genre: "#{genre}"
        category: videos
        ---
        
        #{description}
        YAML
        
        File.write(filename, file_content)
        existing_videos << video_id
        new_videos_count += 1
        puts "Created: #{filename}"
      end
    end
  end
end

puts "Sync complete. #{new_videos_count} new videos added."

require 'yaml'
require 'fileutils'

def slugify(string)
  string.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
end

genres = []

Dir.glob('_gallery/**/*.md').each do |file|
  content = File.read(file)
  if content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
    begin
      front_matter = YAML.safe_load($1)
      if front_matter['type'] == 'video' && front_matter['genre']
        genres << front_matter['genre']
      end
    rescue
      # ignore
    end
  end
end

genres = genres.uniq.compact

existing_genres = []
Dir.glob('_video_collections/*.md').each do |file|
  begin
    content = File.read(file)
    if content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
      front_matter = YAML.safe_load($1)
      if front_matter && front_matter['genre']
        existing_genres << front_matter['genre'].downcase.strip
      end
    end
  rescue => e
    puts "Error reading #{file}: #{e}"
  end
end

genres.each do |genre|
  genre_clean = genre.downcase.strip
  next if existing_genres.include?(genre_clean)

  slug = slugify(genre)
  file_path = "_video_collections/#{slug}.md"
  
  unless File.exist?(file_path)
    content = <<~YAML
      ---
      title: "#{genre}"
      icon: "🎥"
      description: "A collection of videos in the #{genre} genre."
      match_by: genre
      genre: "#{genre}"
      layout: video_collection
      ---
    YAML
    File.write(file_path, content)
    puts "Created #{file_path}"
  end
end

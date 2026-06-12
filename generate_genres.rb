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

genres.each do |genre|
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
      ---
    YAML
    File.write(file_path, content)
    puts "Created #{file_path}"
  end
end

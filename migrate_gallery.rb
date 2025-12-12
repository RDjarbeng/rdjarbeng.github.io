require 'yaml'
require 'date'

# Paths
posts_dir = '_posts'
personal_dir = '_personal'
output_file = '_data/gallery_images.yml'

# Helper to extract front matter
def extract_front_matter(file_path)
  content = File.read(file_path)
  if content =~ /^---\s*\n(.*?)\n---\s*\n/m
    YAML.safe_load($1, permitted_classes: [Date, Time])
  else
    {}
  end
end

cover_images = []

# Process Posts
Dir.glob("#{posts_dir}/*.md").each do |file|
  data = extract_front_matter(file)
  if data['image']
    cover_images << {
      'title' => data['title'],
      'image' => data['image'],
      'caption' => data['image_alt'] || data['title'],
      'link' => data['permalink'] || File.basename(file, '.md').sub(/^\d{4}-\d{2}-\d{2}-/, '/')
    }
  end
end

# Process Personal Posts
Dir.glob("#{personal_dir}/*.md").each do |file|
  data = extract_front_matter(file)
  if data['image']
    cover_images << {
      'title' => data['title'],
      'image' => data['image'],
      'caption' => data['image_alt'] || data['title'],
      'link' => data['permalink'] || "/personal/#{File.basename(file, '.md').sub(/^\d{4}-\d{2}-\d{2}-/, '')}/"
    }
  end
end

# Create output data
output_data = {
  'cover_images' => cover_images,
  'external_images' => [] # Initialize empty list for external images
}

# Write to file
File.open(output_file, 'w') do |file|
  file.write(output_data.to_yaml)
end

puts "Migration complete! #{cover_images.length} images migrated to #{output_file}."

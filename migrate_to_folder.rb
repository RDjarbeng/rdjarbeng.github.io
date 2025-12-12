require 'yaml'
require 'fileutils'

# Paths
data_file = '_data/gallery_images.yml'
output_dir = '_gallery'

# Ensure output directory exists
FileUtils.mkdir_p(output_dir)

# Load data
data = YAML.load_file(data_file)

def slugify(text)
  text.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
end

count = 0

# Process Cover Images
if data['cover_images']
  data['cover_images'].each do |item|
    next if item['image'].nil? || item['image'].empty?

    # Derive slug from link if possible, else title
    slug = if item['link']
             item['link'].split('/').last
           else
             slugify(item['title'])
           end
    
    # Fallback if slug is empty
    slug = "image-#{count}" if slug.nil? || slug.empty?

    filename = "#{output_dir}/#{slug}.md"
    
    front_matter = {
      'title' => item['title'],
      'image' => item['image'],
      'type' => 'cover',
      'caption' => item['caption'],
      'link' => item['link']
    }

    File.open(filename, 'w') do |f|
      f.write(front_matter.to_yaml)
      f.write("---\n")
    end
    count += 1
  end
end

# Process External Images
if data['external_images']
  data['external_images'].each do |item|
    next if item['image'].nil? || item['image'].empty?

    slug = slugify(item['title'])
    filename = "#{output_dir}/#{slug}.md"

    front_matter = {
      'title' => item['title'],
      'image' => item['image'],
      'type' => 'external',
      'caption' => item['caption'],
      'category' => item['category'],
      'labels' => item['labels']
    }

    File.open(filename, 'w') do |f|
      f.write(front_matter.to_yaml)
      f.write("---\n")
    end
    count += 1
  end
end

puts "Migration complete! #{count} files created in #{output_dir}."

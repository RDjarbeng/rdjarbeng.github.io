# _plugins/collect_cover_images.rb
#
# Collects all images used as OG cover images (front matter `image:`) and
# video thumbnails (front matter `thumbnail:`) across all posts, personal
# pages, and gallery documents, then writes them to _site/cover-images.txt.
#
# This file is read by the GitHub Actions workflow to selectively compress
# only cover/thumbnail images — leaving full-resolution in-post images alone.

Jekyll::Hooks.register :site, :post_write do |site|
  cover_images = []

  # Collect from all Jekyll collections (posts, personal, gallery, videos, etc.)
  site.documents.each do |doc|
    if (img = doc.data['image'].to_s.strip) && !img.empty?
      cover_images << img.sub(%r{^/}, '')
    end
    if (thumb = doc.data['thumbnail'].to_s.strip) && !thumb.empty?
      cover_images << thumb.sub(%r{^/}, '')
    end
  end

  # Collect from regular pages too (e.g. index.html if it has an image:)
  site.pages.each do |page|
    if (img = page.data['image'].to_s.strip) && !img.empty?
      cover_images << img.sub(%r{^/}, '')
    end
  end

  # Deduplicate and remove blank entries
  cover_images = cover_images.uniq.reject(&:empty?)

  output_path = File.join(site.dest, 'cover-images.txt')
  File.write(output_path, cover_images.join("\n") + "\n")

  Jekyll.logger.info 'Cover Images:', "Wrote #{cover_images.size} image paths to cover-images.txt"
end

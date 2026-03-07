# _plugins/tiktok_expander.rb
require 'net/http'
require 'uri'

module Jekyll
  # This hook automatically intercepts any document being processed by Jekyll
  # before it builds the HTML. It catches Short TikTok links and expands them
  # seamlessly into their native URL format without requiring manual scripts or
  # frontend javascript hacks.
  Jekyll::Hooks.register :documents, :pre_render do |doc|
    # Depending on how the collection is defined, typically _gallery or gallery
    if doc.relative_path.include?('_gallery/')
      ['youtube_id', 'link'].each do |field|
        url = doc.data[field]
        if url && url.match(%r{https?://(v[mt]\.tiktok\.com)/[\w-]+})
          begin
            uri = URI(url)
            # Use HEAD request directly natively exactly like a browser request
            response = Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
              req = Net::HTTP::Head.new(uri.path)
              req['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
              http.request(req)
            end

            final_url = response['location'] || url
            final_url, *_query = final_url.split('?') # strip tracking metadata
            
            # Save the expanded URL seamlessly right back into the memory for Jekyll to compile
            doc.data[field] = final_url
            puts "[TikTok Expander Plugin] Successfully expanded #{url} -> #{final_url}"
          rescue => e
            puts "[TikTok Expander Plugin] Failed to expand #{url}: #{e.message}"
          end
        end
      end
    end
  end
end

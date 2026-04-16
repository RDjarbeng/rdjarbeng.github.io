#!/usr/bin/env ruby
# scripts/expand_tiktok_urls.rb
#
# Scans all _gallery/ markdown files and expands any short TikTok URLs
# (vm.tiktok.com / vt.tiktok.com) found in front matter `youtube_id` or
# `link` fields, writing the expanded URL back in-place to the .md file.
#
# Run from the site root:
#   ruby scripts/expand_tiktok_urls.rb
#
# This is the persistent-on-disk counterpart to _plugins/tiktok_expander.rb,
# which only expands URLs in memory at build time.

require 'net/http'
require 'uri'

TIKTOK_SHORT_PATTERN = %r{https?://(v[mt]\.tiktok\.com)/[\w-]+}
FIELDS = %w[youtube_id link].freeze
GALLERY_DIR = File.expand_path('../_gallery', __dir__)

def expand_url(short_url)
  uri = URI(short_url)
  response = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 10, read_timeout: 10) do |http|
    req = Net::HTTP::Head.new(uri.request_uri)
    req['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    http.request(req)
  end
  expanded = response['location'] || short_url
  expanded.split('?').first # strip tracking params
rescue => e
  warn "  [WARN] Could not expand #{short_url}: #{e.message}"
  nil
end

updated_files = 0
skipped_files = 0

Dir.glob(File.join(GALLERY_DIR, '**', '*.md')).sort.each do |path|
  content = File.read(path, encoding: 'utf-8')
  modified = false

  FIELDS.each do |field|
    content.gsub!(/^(#{Regexp.escape(field)}:\s*)(['"]?)(#{TIKTOK_SHORT_PATTERN.source})(\2)/) do
      prefix   = $1
      quote    = $2
      url      = $3
      expanded = expand_url(url)

      if expanded && expanded != url
        puts "  #{File.basename(path)}: #{field}: #{url}"
        puts "    => #{expanded}"
        modified = true
        "#{prefix}#{quote}#{expanded}#{quote}"
      else
        $& # unchanged
      end
    end
  end

  if modified
    File.write(path, content, encoding: 'utf-8')
    updated_files += 1
  else
    skipped_files += 1
  end
end

puts "\nDone. #{updated_files} file(s) updated, #{skipped_files} already expanded / no TikTok links."

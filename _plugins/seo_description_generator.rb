module Jekyll
  class SEODescriptionGenerator < Generator
    safe true
    priority :lowest

    def generate(site)
      documents = site.pages + site.documents
      processed_count = 0

      documents.each do |doc|
        next unless doc.respond_to?(:output_ext) && doc.output_ext == '.html'

        if doc.data['description'].nil? || doc.data['description'].to_s.strip.empty?
          raw_text = doc.data['excerpt'] ? doc.data['excerpt'].to_s : doc.content.to_s
          
          clean_text = raw_text
            .gsub(/\{%[^%]*%\}/, '')
            .gsub(/\{\{[^\}]*\}\}/, '')
            .gsub(/!\[.*?\]\(.*?\)/, '')
            .gsub(/\[(.*?)\]\(.*?\)/, '\1')
            .gsub(/<[^>]+>/, '')
            .gsub(/^#+\s*/, '')
            .gsub(/[\r\n]+/, ' ')
            .strip

          words = clean_text.split(/\s+/)
          
          page_title = doc.data['title'] ? doc.data['title'] : ""
          
          if words.empty?
            doc.data['description'] = page_title.empty? ? site.config['description'] : "Video/Post: #{page_title}"
          else
            # Prepend the title for more informative context, then take ~30 words (approx 160 chars max)
            desc_text = words[0..29].join(' ')
            desc_text += '...' if words.length > 30
            
            doc.data['description'] = page_title.empty? ? desc_text : "#{page_title} - #{desc_text}"
          end
          
          processed_count += 1
        end
      end
      
      Jekyll.logger.info "SEO Auto-Generator:", "Successfully generated unique descriptions for #{processed_count} files."
    end
  end
end

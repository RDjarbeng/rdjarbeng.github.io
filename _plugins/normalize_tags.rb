# _plugins/normalize_tags.rb

module Jekyll
  class TagNormalizer < Generator
    # We set a low priority to ensure this runs *after*
    # all posts have been read.
    safe true
    priority :highest 

    def generate(site)
      puts "\n\n***** NORMALIZE TAGS (GENERATOR) RUNNING *****\n\n"

      # We need to process all documents that have tags.
      # Based on your redirector, this includes 'posts' and 'personal'.
      
      all_docs = site.posts.docs
      
      if site.collections['personal']
        all_docs += site.collections['personal'].docs
      end

      puts "Normalizing tags for #{all_docs.length} total documents..."

      all_docs.each do |doc|
        # Check if the 'tags' front matter exists and is an Array
        if doc.data['tags'] && doc.data['tags'].is_a?(Array)
          
          # This is the magic:
          # 1. :map(&:downcase) -> converts every tag to lowercase
          # 2. :uniq -> removes any duplicates that were created
          doc.data['tags'] = doc.data['tags'].map(&:downcase).uniq
          
        end
      end

      puts "\n\n***** NORMALIZE TAGS FINISHED *****\n\n"
    end
  end
end
module Jekyll
  class RedirectGenerator < Generator
    safe true
    priority :highest
    
    def generate(site)
      puts "\n\n***** REDIRECT GENERATOR RUNNING *****\n\n"
      
      # Handle personal posts
      if site.collections['personal']
        # puts "Found personal collection with #{site.collections['personal'].docs.length} posts"
        
        site.collections['personal'].docs.each do |post|
        #   puts "\nProcessing: #{post.relative_path}"
        #   puts "Current slug: #{post.data['slug']}"
        #   puts "Current date: #{post.date}"
          
          post.data['redirect_from'] ||= []
          
          # Old format: /personal/YYYY-MM-DD-slug
          date_slug = "#{post.date.strftime('%Y-%m-%d')}-#{post.data['slug']}"
          old_url = "/personal/#{date_slug}"
          
          post.data['redirect_from'] << old_url
          post.data['redirect_from'] << "#{old_url}/"
          
          # Remove duplicates
          post.data['redirect_from'].uniq!
          
        #   puts "Added redirects: #{post.data['redirect_from'].inspect}"
        end
      else
        puts "ERROR: Personal collection not found!"
      end
      
      # Handle regular posts
    #   puts "\n\nProcessing regular posts: #{site.posts.docs.length} posts"
      
      
      puts "\n\n***** REDIRECT GENERATOR FINISHED *****\n\n"
    end
  end
end
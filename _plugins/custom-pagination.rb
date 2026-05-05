module Jekyll
    class Pagination < Generator
      safe true

      def generate(site)
        if site.config['custom_pagination'] && site.config['custom_pagination']['active']
          collection = site.config['custom_pagination']['collection']
          if collection == 'posts'
            paginate_posts(site)
            paginate_personal(site)
            paginate_gallery(site)
          else
            paginate(site)
          end
        end
      end

      def paginate(site)
        all_posts = site.posts.docs.reverse
        paginate_size = site.config['custom_pagination']['paginate'].to_i
        total_pages = (all_posts.size / paginate_size.to_f).ceil

        (1..total_pages).each do |current_page|
          pager = Pager.new(site, current_page, all_posts, total_pages, paginate_size)
          index_page = HomeIndexPage.new(site, current_page)
          index_page.pager = pager
          site.pages << index_page
        end
        Jekyll.logger.info "My custom pagination:", "Paginated home #{total_pages} / #{total_pages}"
      end

      def paginate_posts(site)
        all_posts = site.posts.docs.sort_by { |p| p.date }.reverse  # Sort newest first
        paginate_size = site.config['custom_pagination']['paginate'].to_i
        total_pages = (all_posts.size / paginate_size.to_f).ceil

        (1..total_pages).each do |current_page|
          pager = Pager.new(site, current_page, all_posts, total_pages, paginate_size)
          pager.previous_page_path = current_page > 1 ? (current_page == 2 ? '/posts/' : "/posts/page-#{current_page - 1}/") : nil
          pager.next_page_path = current_page < total_pages ? "/posts/page-#{current_page + 1}/" : nil
          posts_page = PostsIndexPage.new(site, current_page)
          posts_page.pager = pager
          posts_page.data['pager'] = pager.to_liquid  # Make pager available to layout
          posts_page.data['paginator'] = pager.to_liquid # Make available to jekyll-seo-tag
          site.pages << posts_page
        end
        Jekyll.logger.info "My custom pagination:", "Paginated posts #{total_pages} / #{total_pages}"
      end

      def paginate_personal(site)
        if site.collections['personal'].nil?
          Jekyll.logger.warn "My custom pagination:", "Personal collection not found!"
          return
        end
        
        all_posts = site.collections['personal'].docs.sort_by { |p| p.date }.reverse
        
        if all_posts.empty?
          Jekyll.logger.warn "My custom pagination:", "No posts found in personal collection."
          return
        end

        paginate_size = site.config['custom_pagination']['paginate'].to_i
        total_pages = (all_posts.size / paginate_size.to_f).ceil
        Jekyll.logger.info "My custom pagination:", "Total pages: #{total_pages}"

        # Find the existing index page (e.g. personal.md)
        # Prioritize finding by Path which is unique and constant
        index_page = site.pages.find { |page| page.path == 'personal.md' }
        
        if index_page
           Jekyll.logger.info "My custom pagination:", "Found existing index page at #{index_page.path} (URL: #{index_page.url})"
           # We must remove it immediately to avoid conflicts
           site.pages.delete(index_page) 
           Jekyll.logger.info "My custom pagination:", "Removed original #{index_page.path} from site.pages"
        else
           # Fallback to URL search if path fails for some reason
           index_page = site.pages.find { |page| page.url == '/personal/' }
           if index_page
             Jekyll.logger.info "My custom pagination:", "Found existing index page by URL at #{index_page.url}"
             site.pages.delete(index_page)
             Jekyll.logger.info "My custom pagination:", "Removed original page from site.pages"
           else
             Jekyll.logger.warn "My custom pagination:", "Could not find existing index page 'personal.md' or '/personal/'"
           end
        end


        (1..total_pages).each do |current_page|
          pager = Pager.new(site, current_page, all_posts, total_pages, paginate_size)
          pager.previous_page_path = current_page > 1 ? (current_page == 2 ? '/personal/' : "/personal/page-#{current_page - 1}/") : nil
          pager.next_page_path = current_page < total_pages ? "/personal/page-#{current_page + 1}/" : nil
          
          # Create a new page
          personal_page = PersonalIndexPage.new(site, current_page)
          personal_page.pager = pager
          personal_page.data['custom_pager'] = pager.to_liquid
          personal_page.data['paginator'] = pager.to_liquid
          personal_page.data['last_modified_at'] = Time.now
          
          # If we had an original index page, copy its metadata for the first page
          if current_page == 1 && index_page
            # Inject the original content into the template where {{ content }} is
            personal_page.content = personal_page.content.sub('{{ content }}', index_page.content)
            personal_page.data['title'] = index_page.data['title']
          else
            # For other pages, remove the {{ content }} placeholder so it doesn't render recursively
            personal_page.content = personal_page.content.sub('{{ content }}', '')
          end
          
          site.pages << personal_page
        end
        Jekyll.logger.info "My custom pagination:", "Paginated personal #{total_pages} / #{total_pages}"
      end

      def paginate_gallery(site)
        if site.collections['gallery'].nil?
          Jekyll.logger.warn "My custom pagination:", "Gallery collection not found!"
          return
        end
        
        all_gallery = site.collections['gallery'].docs.sort_by { |p| p.data['date'] || Time.at(0) }.reverse
        paginate_size = site.config['custom_pagination']['paginate'].to_i || 12
        
        # Paginate specific gallery index pages we know exist:
        # e.g., gallery/memes/index.html
        
        categories_to_process = []
        if site.collections['gallery_categories']
          site.collections['gallery_categories'].docs.each do |cat|
            cat_title = cat.data['title']
            next if cat_title == 'None' || cat_title == 'Other'
            cat_slug = Jekyll::Utils.slugify(cat_title)
            categories_to_process << { title: cat_title, slug: cat_slug }
          end
        end

        # Add pseudo categories
        pseudo_cats = ['videos', 'youtube', 'tiktok', 'instagram', 'twitter', 'external', 'cover-images']
        pseudo_cats.each do |cat_slug|
          categories_to_process << { title: cat_slug.capitalize.gsub('-', ' '), slug: cat_slug }
        end

        # Extract subfolders for nested pagination
        all_gallery.each do |item|
          parts = item.relative_path.split('/')
          if parts.size >= 4
            cat_slug = parts[1]
            sub_slug = parts[2]
            full_slug = "#{cat_slug}/#{sub_slug}"
            sub_title = sub_slug.split('-').map(&:capitalize).join(' ')
            
            unless categories_to_process.any? { |c| c[:slug] == full_slug }
              categories_to_process << { title: sub_title, slug: full_slug }
            end
          end
        end

        categories_to_process.each do |cat_info|
            cat_title = cat_info[:title]
            cat_slug = cat_info[:slug]
            
            cat_items = all_gallery.select { |item| 
              if cat_slug.include?('/')
                item.relative_path.include?("/#{cat_slug}/")
              else
                next false if cat_slug == 'external' && item.relative_path.include?('_gallery/artemis-ii/')
                cats = item.data['category'] || ''
                labels_data = item.data['labels'] || []
                labels = labels_data.is_a?(Array) ? labels_data.join(' ') : labels_data.to_s
                plat = item.data['platform'] || ''
                type = item.data['type'] || ''
                "#{cats} #{labels} #{plat} #{type}".downcase.include?(cat_slug) || Jekyll::Utils.slugify("#{cats} #{labels} #{plat} #{type}").include?(cat_slug) || (item.url && item.url.include?(cat_slug))
              end
            }
            
            if cat_items.any?
              total_pages = (cat_items.size / paginate_size.to_f).ceil
              # Check if manual index exists
              index_page = site.pages.find { |p| p.path == "gallery/#{cat_slug}/index.html" || p.url.chomp('/') == "/gallery/#{cat_slug}" }
              if index_page
                site.pages.delete(index_page)
              end
              
              (1..total_pages).each do |current_page|
                pager = Pager.new(site, current_page, cat_items, total_pages, paginate_size)
                page = GalleryCategoryIndexPage.new(site, current_page, cat_title, cat_slug, index_page)
                page.pager = pager
                page.data['custom_pager'] = pager.to_liquid
                site.pages << page
              end
            end # ends if cat_items.any?
          end # ends categories_to_process.each
      end # ends def paginate_gallery
    end # ends class Pagination

    class GalleryCategoryIndexPage < Page
      def initialize(site, current_page, cat_title, cat_slug, original_page)
        @site = site
        @base = site.source
        @dir = current_page == 1 ? "gallery/#{cat_slug}" : "gallery/#{cat_slug}/page-#{current_page}"
        @name = "index.html"
        self.process(@name)
        
        if original_page && current_page == 1
          self.read_yaml(File.join(@base, '_layouts'), 'default.html')
          self.content = original_page.content
          self.data.merge!(original_page.data)
        elsif original_page && current_page > 1
          self.read_yaml(File.join(@base, '_layouts'), 'default.html')
          # Remove layout wrapper content if it was injected with {{content}}
          self.content = original_page.content.sub('{{ content }}', '')
          self.data.merge!(original_page.data)
          self.data.delete('permalink') # Prevent conflicting permalinks for paginated pages
        else
          self.read_yaml(File.join(@base, '_layouts'), 'gallery_category.html')
          self.data['title'] = cat_title
        end
      end
    end

    class Pager
      attr_reader :current_page, :total_pages, :posts, :previous_page, :next_page, :total_posts, :per_page
      attr_accessor :previous_page_path, :next_page_path

      def initialize(site, current_page, all_posts, total_pages, paginate_size)
        @current_page = current_page
        @total_pages = total_pages
        @total_posts = all_posts.size
        @per_page = paginate_size
        start = (current_page - 1) * paginate_size
        @posts = all_posts.slice(start, paginate_size)
        @previous_page = current_page > 1 ? current_page - 1 : nil
        @next_page = current_page < total_pages ? current_page + 1 : nil
      end

      def to_liquid
        {
          'current_page' => @current_page,
          'total_pages' => @total_pages,
          'posts' => @posts,
          'previous_page' => @previous_page,
          'next_page' => @next_page,
          'total_posts' => @total_posts,
          'per_page' => @per_page,
          'previous_page_path' => @previous_page_path,
          'next_page_path' => @next_page_path
        }
      end
    end

    class HomeIndexPage < Page
      def initialize(site, current_page)
        @site = site
        @base = site.source
        @dir = '/'
        @name = current_page == 1 ? "index.html" : "page-#{current_page}.html"
        self.process(@name)
        self.read_yaml(File.join(@base, '_layouts'), 'home.html')
        self.data['title'] = @site.config["title"]
        self.data['subtitle'] = @site.config["subtitle"]
      end
    end

    class PostsIndexPage < Page
      def initialize(site, current_page)
        @site = site
        @base = site.source
        @dir = current_page == 1 ? 'posts' : "posts/page-#{current_page}"
        @name = "index.html"
        self.process(@name)
        self.read_yaml(File.join(@base, '_layouts'), 'posts.html')
        self.data['title'] = current_page == 1 ? 'Blog Posts' : "Blog Posts - Page #{current_page}"
        self.data['description'] = current_page == 1 ? "Explore technical and personal blog posts by Richard Djarbeng, covering Artificial Intelligence, Web Development, IoT, and more." : "Explore technical and personal blog posts by Richard Djarbeng - Page #{current_page}."
      end
    end

    class PersonalIndexPage < Page
      def initialize(site, current_page)
        @site = site
        @base = site.source
        @dir = current_page == 1 ? 'personal' : "personal/page-#{current_page}"
        @name = "index.html"
        self.process(@name)
        self.read_yaml(File.join(@base, '_layouts'), 'personal_posts.html')
        self.data['title'] = current_page == 1 ? 'Personal Posts' : "Personal Posts - Page #{current_page}"
        self.data['description'] = current_page == 1 ? "Personal thoughts, adventures and experiences from Richard Djarbeng." : "Personal thoughts, adventures and experiences from Richard Djarbeng - Page #{current_page}."
      end
    end
end

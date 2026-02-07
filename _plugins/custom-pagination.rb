module Jekyll
    class Pagination < Generator
      safe true

      def generate(site)
        if site.config['custom_pagination'] && site.config['custom_pagination']['active']
          collection = site.config['custom_pagination']['collection']
          if collection == 'posts'
            paginate_posts(site)
            paginate_personal(site)
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
          Jekyll.logger.info "My custom pagination:", "Paginating #{current_page} / #{total_pages}"
        end
      end

      def paginate_posts(site)
        all_posts = site.posts.docs.sort_by { |p| p.date }.reverse  # Sort newest first
        paginate_size = site.config['custom_pagination']['paginate'].to_i
        total_pages = (all_posts.size / paginate_size.to_f).ceil

        (1..total_pages).each do |current_page|
          pager = Pager.new(site, current_page, all_posts, total_pages, paginate_size)
          posts_page = PostsIndexPage.new(site, current_page)
          posts_page.pager = pager
          posts_page.data['pager'] = pager.to_liquid  # Make pager available to layout
          site.pages << posts_page
          Jekyll.logger.info "My custom pagination:", "Paginating posts #{current_page} / #{total_pages}"
        end
      end

      def paginate_personal(site)
        if site.collections['personal'].nil?
          Jekyll.logger.warn "My custom pagination:", "Personal collection not found!"
          return
        end
        
        all_posts = site.collections['personal'].docs.sort_by { |p| p.date }.reverse
        Jekyll.logger.info "My custom pagination:", "Found #{all_posts.size} personal posts."
        
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
          Jekyll.logger.info "My custom pagination:", "Paginating personal #{current_page} / #{total_pages}"
          pager = Pager.new(site, current_page, all_posts, total_pages, paginate_size)
          
          # Create a new page
          personal_page = PersonalIndexPage.new(site, current_page)
          personal_page.pager = pager
          personal_page.data['custom_pager'] = pager.to_liquid
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
        Jekyll.logger.info "My custom pagination:", "Finished adding personal pages to site.pages."
      end
    end

    class Pager
      attr_reader :current_page, :total_pages, :posts, :previous_page, :next_page, :total_posts, :per_page

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
          'per_page' => @per_page
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
        self.data['title'] = 'Blog Posts'
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
        self.data['title'] = 'Personal Posts'
      end
    end
end

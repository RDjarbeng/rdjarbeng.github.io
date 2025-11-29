module Jekyll
    class Pagination < Generator
      safe true

      def generate(site)
        if site.config['pagination'] && site.config['pagination']['active']
          collection = site.config['pagination']['collection']
          if collection == 'posts'
            paginate_posts(site)
          else
            paginate(site)
          end
        end
      end

      def paginate(site)
        all_posts = site.posts.docs.reverse
        paginate_size = site.config['pagination']['paginate'].to_i
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
        paginate_size = site.config['pagination']['paginate'].to_i
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
        @dir = current_page == 1 ? '/posts' : "/posts/page-#{current_page}"
        @name = "index.html"
        self.process(@name)
        self.read_yaml(File.join(@base, '_layouts'), 'posts.html')
        self.data['title'] = 'Blog Posts'
      end
    end
end

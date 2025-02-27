module Jekyll
  class RedirectGenerator < Generator
    priority :low

    def generate(site)
      site.posts.docs.each do |post|
        # Generate old URLs
        category_url = "/RDjarbeng/" + post.data['categories'].join('/') + "/" + post.date.strftime('%Y/%m/%d') + "/" + post.data['slug']
        no_category_url = "/RDjarbeng/" + post.date.strftime('%Y/%m/%d') + "/" + post.data['slug']

        # Add these old URLs to redirect_from
        post.data['redirect_from'] ||= []
        post.data['redirect_from'] << category_url
        post.data['redirect_from'] << no_category_url

        # Add a dummy html? method to prevent errors
        def post.html?
          true
        end

        # Debug output
        # puts "Post: #{post.data['title']}"
        # puts "Redirects: #{post.data['redirect_from']}"
      end
    end
  end
end
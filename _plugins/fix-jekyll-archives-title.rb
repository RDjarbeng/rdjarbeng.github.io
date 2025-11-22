# frozen_string_literal: true
puts "\n\n***** Archive title (GENERATOR) RUNNING *****\n\n"
module Jekyll
  module Archives
    class Archive
      # This runs when the archive page is created — BEFORE jekyll-seo-tag reads it
      alias_method :original_initialize, :initialize

      def initialize(site, title, type, posts)
        original_initialize(site, title, type, posts)

        # Override the terrible "tag: publishing" title
        nice_title = case type
                     when "tag"       then "Posts tagged “#{title}”"
                     when "category"  then "Posts in category “#{title}”"
                     else title.to_s
                     end

        self.data["title"] = nice_title
        self.data["description"] = "All posts tagged with “#{title}” on Richard Djarbeng's website" if type == "tag"
        self.data["description"] = "All posts in category “#{title}” on Richard Djarbeng's website" if type == "category"
      end
    end
  end
end
module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
        # Exclude paginated pages completely
        if record[:paginator] || record[:pager] || record[:custom_pager] || record[:url] == '/posts/' || record[:url] == '/personal/' || record[:url] =~ %r{/page-?\d+/}
          return nil
        end
        
        # Delete unused massive frontmatter objects
        record.delete(:card_items)
        record.delete(:content_blocks)
        
        # Truncate overly long HTML or content fields to fit within 10KB free tier limit
        if record[:html] && record[:html].bytesize > 5000
          record[:html] = record[:html].byteslice(0, 5000)
        end
        if record[:content] && record[:content].bytesize > 5000
          record[:content] = record[:content].byteslice(0, 5000)
        end
        
        record
      end
    end
  end
end

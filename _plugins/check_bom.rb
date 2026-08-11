# _plugins/check_bom.rb
# Automatically detects and strips UTF-8 BOM from markdown & HTML files
# so Jekyll never skips pages or fails frontmatter parsing.

module Jekyll
  Hooks.register :site, :after_init do |site|
    Dir.glob("**/*.{md,html,markdown}").each do |file_path|
      next if file_path.start_with?("_site/", "vendor/", "node_modules/", ".git/", ".ruby-lsp/")
      begin
        bytes = File.binread(file_path, 3)
        if bytes == "\xEF\xBB\xBF".b
          content = File.read(file_path, encoding: "BOM|UTF-8")
          File.write(file_path, content, encoding: "UTF-8")
          Jekyll.logger.warn "BOM Guard:", "Auto-stripped UTF-8 BOM from #{file_path}"
        end
      rescue => e
        # Ignore unreadable files
      end
    end
  end
end

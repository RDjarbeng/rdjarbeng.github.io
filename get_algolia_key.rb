require "algoliasearch"

client = Algolia::Client.new({application_id: "IS96FR2E65", api_key: "1bea82f9a1548d7850ab68bdcf5824a0"})
keys = Algolia::APIKey.list
search_key = keys[:keys].find { |k| k[:description].to_s.downcase.include?('search') || k[:acl].include?('search') }

if search_key
  puts "FOUND SEARCH KEY: #{search_key[:value]}"
else
  puts "No search key found."
end

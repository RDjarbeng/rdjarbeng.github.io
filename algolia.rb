require "uri"
require "algolia"

# Fetch sample dataset
uri = URI("https://dashboard.algolia.com/api/1/sample_datasets?type=movie")
response = Net::HTTP.get_response(uri)
movies = JSON.parse(response.body)

# Connect and authenticate with your Algolia app using your app ID and write API key
client = Algolia::SearchClient.create("IS96FR2E65", "1bea82f9a1548d7850ab68bdcf5824a0")

# Save records in Algolia index
client.save_objects("movies_index", movies)

puts("Done!")
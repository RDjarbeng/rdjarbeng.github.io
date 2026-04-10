module Jekyll
  module TitleCaseFilter
    def titleize(input)
      return input if input.nil? || input.to_s.empty?
      
      small_words = %w(a an the at by for in of on to up and as but if or nor)
      words = input.to_s.split(/(\s+)/)
      
      words.each_with_index do |word, index|
        next if word =~ /\s+/
        
        # 1. Preserve words with "internal" uppercase letters
        # This covers Roman numerals (II), Acronyms (NASA), and CamelCase (iPhone)
        if word[1..-1] =~ /[A-Z]/
          next
        end
        
        # 2. Standard Title Case rules for lowercase or start-cap words
        is_first = (index == 0)
        is_last = (index == words.length - 1)
        is_small = small_words.include?(word.downcase)
        
        if is_first || is_last || !is_small
          word.replace(word.downcase.capitalize)
        else
          word.downcase!
        end
      end
      
      words.join
    end
  end
end

Liquid::Template.register_filter(Jekyll::TitleCaseFilter)

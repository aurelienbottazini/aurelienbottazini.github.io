require 'rake'
require 'date'

desc "Create a post with today's date as a prefix"
task :create_post do
  file_name = ENV['NAME'] || 'default-name'  # use a default name if no name is provided
  today = Date.today.to_s
  filename = "_posts/#{today}-#{file_name}.md"

  File.open(filename, 'w') do |f|
    f.write("## #{today}\n\nContent goes here...")
  end

  puts "Created file: #{filename}"
end
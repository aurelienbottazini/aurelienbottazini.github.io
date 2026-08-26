require 'rake'
require 'date'

desc "Verify Jekyll can build the website"
task :test do
  sh "bundle exec jekyll b --strict_front_matter"
end

task default: :test

desc "Build the website"
task :build do
  sh "bundle exec jekyll b"
end

desc "Serve the website locally with live reload, drafts, and future posts"
task :dev do
  sh "bundle exec jekyll serve -l -D --future -H 0.0.0.0"
end

desc "Serve the website for iPad (no live reload)"
task "dev-ipad" do
  sh "bundle exec jekyll serve -D --future -H 0.0.0.0"
end

desc "Create a post with today's date as a prefix. Prints the filename on stdout (e.g. vim \"$(rake create_post)\")."
task :create_post do
  file_name = ENV['NAME'] || 'default-name'  # use a default name if no name is provided
  today = Date.today.to_s
  filename = "_posts/#{today}-#{file_name}.md"

  File.write(filename, "---\ntags:  \n---")

  puts filename
end

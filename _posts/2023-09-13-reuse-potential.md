---
tags: tools ruby
---

I was thinking about tools and how important it is to customize your setup.
I do spend a lot of my time customizing my code editors.
It is hard for me to resist the urge to do so.
All in hope of eventually being faster thanks to my tools.

Today I am thinking this is a bad habit of mine.
When I customize my code editor, I don't have great potential for reuse.
There's reuse for me accross project.
There's almost no reuse potential for others in my company.

I want to replace that habit with a new home.
Now I will create unix tools that make me faster.
To create this blog post I created this rake task:

```ruby
require 'rake'
require 'date'

desc "Create a post with today's date as a prefix"
task :create_post do
  file_name = ENV['NAME'] || 'default-name'  # use a default name if no name is provided
  today = Date.today.to_s
  filename = "_posts/#{today}-#{file_name}.md"

  File.open(filename, 'w') do |f|
    f.write("---\ntags:  \n---")
  end

  puts "Created file: #{filename}"
end
```

1. It is as easy to use it from my code editor.
2. I am not tied to a specific code editor and I can switch if a better one comes up.
3. I can share with others tasks like that. Actually I just did with this post.

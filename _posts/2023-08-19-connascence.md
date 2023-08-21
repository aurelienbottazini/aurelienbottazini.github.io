---
tags: code ruby
---

[Connascence](https://en.wikipedia.org/wiki/Connascence). A quality metric for different types of coupling.
It helped me understand a practice I see many advanced Ruby developers do: use `attr_reader` for instance variables.

```ruby
class Foo
  attr_reader :bar

  def initialize
    @bar = 'baz'
  end

  def output
    bar
  end
end

Foo.new.output                  # => "baz"
```

You hide the the fact that `bar` is an instance variable.
This makes it easier to refactor your code without touching the `output` method.

For example `bar` can become a method

```ruby
class Foo
  def bar
    'bar'
  end

  def output
    bar
  end
end

Foo.new.output                  # => "bar"
```

The is known as **connascence of name**. This the lowest form of
connascence (~= coupling). Notice in that list example that we have
fewer lines and a pure function instead of a variable. Shouldn't we by
default code with methods? And introduce variables when needed? This
is concrete example pushing us in that direction

---
tags: ruby javascript
---
**All code is editable with live results.**

I love Ruby and I love Ruby metaprogramming capabilities. One of the
first metaprogramming tricks I discovered was Ruby's `method_missing`
functionality. To sum it up, it allows you to intercept calls to any
method not implemented—either directly inside your class or indirectly
in the ancestor chain—by your Ruby class.

**Thanks to es2015 Proxies, it is easy to do in JS.**

## Ruby version ##

Here is a simple Ruby example:
<pre>
<code class="krb">
class Foo
  def fooMethod
   'Hello from Foo'
  end

  def method_missing(m, *args, &block)
    "There's no method called #{m} here."
  end
end
</code>
</pre>

Nothing fancy here, if the method is available we call it
<pre>
<code class="krb">
Foo.new.fooMethod
</code>
</pre>

Otherwise we return a default message
<pre>
<code class="krb">
Foo.new.bar
</code>
</pre>

## JavaScript version ##

First let's take a look at a simple JS constructor. This constructor
will just return a new object with a `fooMethod`.
<pre>
<code class="kjs">

function Foo() {
  this.fooMethod = function fooMethod() {
    return 'Hello from Foo';
  };
}


</code>
</pre>

<pre>
<code class="kjs">
const f = new Foo();
f.fooMethod();
</code>
</pre>

<pre>
<code class="kjs">
const f = new Foo();
f.bar();
</code>
</pre>

Ohoh, this is what's *missing* and what we want to implement to match
the ruby implementation. Let's do it now. We will define an handler
for our object returned by the `Foo` constructor. This handler will
specify how to handle `get`s on our object. We will then attach the
handler to the object using a es2015 `Proxy`.

Finally instead of returning the object created by the Foo constructor
we will return the Proxy.

<pre>
<code class="kjs">

function Foo() {
  this.fooMethod = function fooMethod() {
    return 'Hello from Foo';
  };

  const handlers = {
    get(target, key) {
      if(Reflect.has(target, key)) {
        return Reflect.get(target, key);
      }

      return function method_missing(...args) {
        return `There's no method called ${key} here.`
      }
    }
  };

  return new Proxy(this, handlers);
}
</code>
</pre>

Calling a regular function on the object created by the `Foo`
constructor is still possible.
<pre>
<code class="kjs">
const f = new Foo();
f.fooMethod();
</code>
</pre>

But we can now try to call a non-available method and we will have
something similar to Ruby's method missing behaviour.
<pre>
<code class="kjs">
const f = new Foo();
f.bar();
</code>
</pre>

<script>
window.klipse_settings = {
selector_eval_js: '.kjs',
selector_eval_ruby: '.krb',
codemirror_options_in: {
theme: 'zenburnesque'
}
};
</script>
<script src="https://cdn.opalrb.com/opal/0.10.1/opal.min.js"></script>
<script src="https://cdn.opalrb.com/opal/0.10.1/opal-parser.min.js"></script>
<script src="/js/klipse_plugin.min.js"></script>

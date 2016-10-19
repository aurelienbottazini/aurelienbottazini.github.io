---
tags: ruby javascript
---

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

<pre>
<code class="krb">
Foo.new.fooMethod
</code>
</pre>

<pre>
<code class="krb">
Foo.new.bar
</code>
</pre>

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

function Foo() {
  this.fooMethod = function fooMethod() {
    return 'Hello from Foo';
  };

  const handlers = {
    get(target, key) {
      if(Reflect.has(target, key)) {
        return Reflect.get(target, key);
      }

      return function (...args) {
        return `There's no method called ${key} here.`
      }
    }
  };

  return new Proxy(this, handlers);
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

<script>
window.klipse_settings = {
selector_eval_js: '.kjs',
selector_eval_ruby: '.krb',
codemirror_options_in: {
theme: 'zenburnesque'
}
};
</script>
<script src="http://cdn.opalrb.org/opal/0.10.1/opal.min.js"></script>
<script src="http://cdn.opalrb.org/opal/0.10.1/opal-parser.min.js"></script>
<script src="/js/klipse_plugin.min.js"></script>

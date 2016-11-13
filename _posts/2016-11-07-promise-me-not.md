---
tags: javascript
---
Promises errors are sometimes described as a **pit of despair** mechanism.

What does it mean? It means that by default, promise chains **swallow errors**.

What does it mean (again)? I means that If you have an error thrown somewhere in your code, your promise will catch it and if you did not tell your promise to specifically do something, **the promise won't report the error**. You won't ever know you have an error in your code.

Let's check the behaviour in an old—version 5.12.0—node environment
<pre>
<code id="my-runkit-5-12">
const p = new Promise((resolve, reject) => {
    return reject('Rejected, running in a node environment');
  });
</code>
</pre>

If you run this example, even though the promise is rejected you are not notified of the rejection.

Now let's do it again in a newer—version 6.9.0—node environment.

<pre>
<code id="my-runkit-6-9">
const p = new Promise((resolve, reject) => {
    return reject('Rejected, running in a node environment');
  });
</code>
</pre>
Surprise! This “pit of despair” behaviour is *fixed* in recent versions of node.

Here is the same code but evaluated in your browser.
If you open you console / devtools you will be able to check what's the behaviour of your current web browser. If you see an error in your browser console that's good!
<pre>
<code class="kjs">
const p = new Promise((resolve, reject) => {
    return reject('Rejected, running in a node environment');
  });
</code>
</pre>


So promises used to have a **pit of despair** behaviour with error handling and **this is being fixed**.
Be aware you can see different behaviours with different environments.

<script>
window.klipse_settings = {
selector_eval_js: '.kjs',
codemirror_options_in: {
theme: 'zenburnesque'
}
};
</script>
<script src="/js/klipse_plugin.min.js"></script>
<script src="https://embed.runkit.com" data-node-version="5.12.0" data-element-id="my-runkit-5-12"></script>
<script src="https://embed.runkit.com" data-node-version="6.9.0" data-element-id="my-runkit-6-9"></script>

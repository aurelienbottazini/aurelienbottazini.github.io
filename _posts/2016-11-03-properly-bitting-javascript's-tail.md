---
tags: javascript
---

**All code is editable with live results.**

One—or maybe the most—exiting feature from es2015 is *tail call optimization* or TCO.

Recursion can be problem in JavaScript due to limitations on the call-stack size.
Each time you can a function from within another function, the JavaScript remembers where you did the call. It does that because your function—for example—may require accessing external variables from where it was called.

But since—for performance reasons—there is a limit to the call stack size, your theoretically valid js code can crash because of this limit.

Let's see an example with a function doing a recursive addition:
<pre>
<code class="kjs">
function addMe(n) {
 if(n < 2) {
    return 1;
 }

 return n + addMe(n-1);
}

addMe(10000);
</code>
</pre>

Now let's make a TCO version of it. Our goal here is to give hints to the js engine to detect that it can optimize our function into a TCO one. For the js engine this optimization means: 'oh cool I don't need to remember the previous function call environment, so I will just forget about it since i have everything I know here to do my job.

<pre>
<code class="kjs">
function addMeTCO(n) {
 "use strict";
 function __add(n, acc) {
   if (n < 2) {
     return acc;
   }

   return __add(n-1, acc + n);

 }

 return __add(n, 1);
}

addMeTCO(10000);
</code>
</pre>

There are two simple steps:
1. The first step is to use strict mode. Easy enough.
2. The second one is to make sure that in our return statements, no extra work is happening. We only want to return a function with some parameters. It means we went to something like `n + addMe(n-1)`—note the extra `n +` computation here— to `__add(n, 1)` and `__add(n-1, acc + n)`.

I am now using an accumulator that I pass as a parameter to store my results. Another way to see it is I am using the arguments of my function calls to store the results instead of the extra addition after the function returns.

Yes I know what you are thinking, the function looks a little more complicated now. But it is now possible to use recursion everywhere in javascript. It opens the possibility of an even more functional approach to javascript and with this—and I am a strong believer of it—robustness comes.

<script>
window.klipse_settings = {
selector_eval_js: '.kjs',
codemirror_options_in: {
theme: 'zenburnesque'
}
};
</script>
<script src="/js/klipse_plugin.min.js"></script>

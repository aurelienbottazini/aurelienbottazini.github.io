---
tags: JavaScript
---

**All code is editable with live results.**

## Recursion and TCO post-es2015

One—or maybe the most exiting feature of es2015—is *tail call
optimization* or TCO.

Recursion can be problematic due to limitations on the call-stack
size. Each time you call a function from within another function, the
JavaScript engine remembers where you did the call. It does that
for
[various reasons](https://en.wikipedia.org/wiki/Call_stack#Functions_of_the_call_stack) One
way I like to think of it is the JS engine needs to remember the context
your function runs in, especially local variables.

But since you have a limit to the amount of memory available on your
machine, there is a limit to the call stack size and your theoretically
valid JS code can crash because of this limit.

Let's see an example with a function doing a recursive addition:
<pre>
<code class="kjs">
function addMe(n) {
 if (n < 1) {
    return 1;
 }

 return n + addMe(n-1);
}

addMe(1000000);
</code>
</pre>

Now let's make a TCO version of it. Our goal here is to give hints to
the JS engine to detect that it can optimize our function into a TCO
one. For the JS engine this optimization is seen as: *oh cool I don't
need to remember the previous function call environment, so I will
just reuse it for this new function call.* JS engines can implement this
*forgetting* part differently, what's important is the call stack does
not grow.

**You need a recent browser for this to work, at the time I write this Safari and [Canary](https://www.google.com/chrome/browser/canary.html) support it**

<pre>
<code class="kjs">
function addMeTCO(n) {
 "use strict";
 function __add(n, acc) {
   if (n < 1) {
     return acc;
   }

   return __add(n-1, acc + n);

 }

 return __add(n, 0);
}

addMeTCO(1000000);
</code>
</pre>

There are two simple steps:
1. The first step is to use strict mode. Easy enough.
2. The second one is to make sure that in our return statements, no
   extra work is happening. We only want to return a function with
   some parameters. It means we went to something like `n +
   addMe(n-1)`—note the extra `n +` computation here— to `__add(n, 1)`
   and `__add(n-1, acc + n)`.

I am now using an accumulator that I pass as a parameter to store my
results. Another way to see it is I am using the arguments of my
function calls to store the results instead of the extra addition
after the function returns.

Yes I know what you are thinking, the function looks a little more
complicated now. But it is now possible to use recursion everywhere in
Javascript. It opens the possibility of an even more functional
approach to Javascript and with this—and I am a strong believer of
it—robustness comes.

## Recursion and TCO pre-es2015

If your JS environment does not support TCO you still have some
options available

### You can unroll the recursion call and just use a regular loop.
<pre>

<code class="kjs">
function addMeUnrolled(n) {
  let acc = 0;
  while (n > 0) {
    acc += n;
    n -= 1;
  }

  return acc;
}

addMeUnrolled(1000000);
</code>
</pre>

### You can catch the stack error.

But this is really ugly to have your code depend on errors thrown.

<pre>
<code class="kjs">
function addMeTryCatch(n) {
 var acc = 0;
 function __add() {
   if (n < 1) {
     return acc;
   }
   acc = acc + n;
   n = n - 1;

   return __add();

 }

 while( n > 1) {
   try {
     __add();
   } catch (e) {
     console.log('An error was caught');
   }
 }
 return acc;
}
addMeTryCatch(1000000);
</code>
</pre>

### You can use trampolining

With *trampolining* each partial result represents a function call.
This function call can either returns another partial result or return
the final result.

<pre>
<code class="kjs">
function trampoline(res) {
  while (typeof res == 'function') {
    res = res();
  }

  return res;
}

var addMeTrampoline = (function () {
 function addMe(n, acc) {
   if (n < 1) {
     return acc;
   }

   return function partialResult() {
     return addMe(n-1, acc + n);
   }
 }

 return function(x) {
   return trampoline(addMe(x, 0));
 }
})();

addMeTrampoline(1000000);
</code>
</pre>

<script>
window.klipse_settings = {
selector_eval_js: '.kjs',
codemirror_options_in: {
theme: 'zenburnesque'
}
};
</script>
<script src="/js/klipse_plugin.min.js"></script>

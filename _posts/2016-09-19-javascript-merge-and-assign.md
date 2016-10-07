---
tags: javascript lodash immutable
---

With the new es2015 Object.assign functionality you can easily `merge` objects
together. However there is also a `merge` function available in different popular
libraries.

The difference between merge and assign was source of confusion for me and
I suspect It might be for others. Hopefully this article will clarify
things.

<strong>
Note: All the code is editable with live results.
</strong>

## Object.Assign

Let's start with what we have available in the language: `Object.assign`.
It is shallow. It means it won't merge recursively Object properties.
It only copies from the top level.

So in the following example, the `foo` prop from `Obj1` replaces by the one from `Obj2`.
<pre>
<code class="kjs">
Obj1 = { val: { foo: [1, 2, 3] }};
Obj2 = { val: { foo: [4], }};
testObject = {};
Object.assign(testObject, Obj1, Obj2);
testObject;
</code>
</pre>


Additionally, It copies only direct properties and not ones accessible through the prototype link.
<pre>
<code class="kjs">
prototype = { val: { hi: 'hello' } };
Object.setPrototypeOf(Obj1, prototype);
testObject = {};
Object.assign(testObject, Obj1, Obj2);
testObject;
</code>
</pre>

It copies Symbol properties;
<pre>
<code class="kjs">
testObject = {};
Obj1['not a symbol'] = 'cool';
Obj1[Symbol.for('newProp')] = 'cool';
Object.assign(testObject, Obj1, Obj2);
testObject[Symbol.for('newProp')];
</code>
</pre>

However you may think those symbol properties are not copied since they are not enumerable
<pre>
<code class="kjs">
testObject;
</code>
</pre>

It does not copy non-enumerable properties other than symbols
<pre>
<code class="kjs">
testObject = {};
Object.defineProperty(Obj1, 'notEmurable', {
  value: 'not emurable',
  enumerable: false
});

Object.assign(testObject, Obj1, Obj2);
testObject;
</code>
</pre>

If your property was not writable it becomes writable!
<pre>
<code class="kjs">
testObject = {};
Object.defineProperty(Obj1, 'notWritable', {
  value: 'not writable',
  writable: false
});

Object.assign(testObject, Obj1, Obj2);
testObject.notWritable = 'changed';
testObject;
</code>
</pre>

If your property was a function, `assign` copies the function but be aware it may not be visible in some consoles (not showing on my current version of Google Chrome for example) .
<pre>
<code class="kjs">
testObject = {};
Obj2.myFunction = function myFunction() {
  return 42
}
Object.assign(testObject, Obj1, Obj2);
testObject;
</code>
</pre>

<pre>
<code class="kjs">
testObject.myFunction();
</code>
</pre>

## lodash Assign

`_.assign` is like `Object.assign` but will work in non-es6 environments.

<pre>
<code class="kjs">
testObject = {};
_.assign(testObject, Obj1, Obj2);
testObject;
</code>
</pre>

## lodash Merge

This is where it gets really interesting. `_.merge` will recursively copy object
 properties.
<pre>
<code class="kjs">
Obj1 = { val: { foo: [1, 2, 3] }};
Obj2 = { val: { foo: [4] }};
prototype = { val: { hi: 'hello' } };
Object.setPrototypeOf(Obj1, prototype);

testObject = {};
_.merge(testObject, Obj1, Obj2);
testObject;
</code>
</pre>

Since the copy was recursive, `foo` was not replaced but instead
the `foo` array first element replaces the one from Obj2 `foo`.

It can be good or bad. Maybe you wanted to add 4 to the end of the array?
Of course I could replace it with an Object instead and that will work

<pre>
<code class="kjs">
Obj1 = { val: { foo: {'1': 1, '2': 2, '3': 3} }};
Obj2 = { val: { foo: { '4': 4} }};
prototype = { val: { hi: 'hello' } };
Object.setPrototypeOf(Obj1, prototype);

testObject = {};
_.merge(testObject, Obj1, Obj2);
testObject;
</code>
</pre>

If we forgot the extra typing,that solves our particular problem but maybe that's not
what you wanted to do.
Maybe replacing the first element of the array was what you wanted.
In general you should be careful when you merge deep objects. This is not something trivial to do.

## ImmutableJS

`Immutable merge` returns a new object but is shallow like Object.Assign!
I find this a big source of confusion since Immutable uses _merge_ to _assign_…
<pre>
<code class="kjs">
Obj1 = { val: { foo: ['f', 'o', 'o'] }};
Obj2 = { val: { foo: ['c'], bar:['b', 'a', 'r'] }};
iObj1 = Immutable.fromJS(Obj1);
iObj2 = Immutable.fromJS(Obj2);

iObj1.merge(iObj2);
</code>
</pre>

`Immutable mergeDeep` is ImmutableJS equivalent to `_.merge` except that it does
 not mutate the object of course.
 <pre>
 <code class="kjs">
 iObj1.mergeDeep(iObj2);
 </code>
 </pre>

## Review

`assign` can catch you off guard as some of its behaviour might seem unexpected.
`assign` will copy properties at the top level, won't copy non-enumerable properties,
won't copy prototype properties, all copied properties become writable.

`assign` copies even thought they are not enumerable with many default js functions.

`merge` and `assign` have different behaviours
regarding deep properties. `merge` recursively merges `deep` properties. It might
seem to be what most programmers would expect by default.

However be aware of what you are trying to do,
especially merging responses from an API. `merge` can be the right tool for the job in some occasions, `assign` in others.

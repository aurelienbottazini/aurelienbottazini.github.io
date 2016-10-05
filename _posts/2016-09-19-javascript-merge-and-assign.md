---
tags: javascript lodash immutable
---

With the new es2015 Object.assign functionality you can easily _merge_ objects
together. However there is also a _merge_ function available in different popular
libraries.

The difference between merge and assign was source of confusion for me and
I suspect It might be for others. Hopefully this article will clarify a few
things.

## Object.Assign

Let's start with what we have available in the language: `Object.assign`.
It is shallow. It means it won't merge recursively Object properties.
It only copies from the top level.

So in the following example, the `foo` prop from `Obj1` was replaced by the one from `Obj2`.
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

It does not copy Symbol properties
<pre>
<code class="kjs">
testObject = {};
Obj1['not a symbol'] = 'cool';
Obj1[Symbol('newProp')] = 'cool';
Object.assign(testObject, Obj1, Obj2);
testObject;
</code>
</pre>

It does not copy non-enumerable properties
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

Since the copy was recursive, `foo` was not replaced completely but instead
the `foo` array first element was replaced by the one from Obj2 `foo`.

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

## Conclusion

`assign` can catch you off guard as some of its behaviour might seem unexpected.
I am thinking especially of a non-writable property becoming writable.

`merge` and `assign` are quite similar but their different behaviour regarding
 deep properties can lead to bugs—I'm thinking especially of state management—if you
 don't understand what the difference between the two approaches are.

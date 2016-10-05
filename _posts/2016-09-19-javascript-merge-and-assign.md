---
tags: javascript lodash immutable
---

This was source of confusion for me and I suspect It might be for others.

## Object.Assign

`Object.Assign` is shallow. It means it won't merge recursively Object properties.
It only copies from the top level.
<pre>
<code class="kjs">
Obj1 = { val: { foo: ['f', 'o', 'o'] }};
Obj2 = { val: { foo: ['c'], bar:['b', 'a', 'r'] }};
testObject = {};
Object.assign(testObject, Obj1, Obj2);
testObject;
</code>
</pre>

It copies direct properties and not ones accessible through the prototype link.
<pre>
<code class="kjs">
parent = { val: { hi: 'hello' } };
Object.setPrototypeOf(Obj1, parent);
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

TODO inherited properties

`_.merge` will merge recursively object properties.
<pre>
<code class="kjs">
Obj1 = { val: { foo: ['f', 'o', 'o'] }};
Obj2 = { val: { foo: ['c'], bar:['b', 'a', 'r'] }};

testObject = {};
_.merge(testObject, Obj1, Obj2);
testObject;
</code>
</pre>

## ImmutableJS

TODO mergeIn

`Immutable merge` returns a new object but is shallow like Object.Assign!
<pre>
<code class="kjs">
Obj1 = { val: { foo: ['f', 'o', 'o'] }};
Obj2 = { val: { foo: ['c'], bar:['b', 'a', 'r'] }};
iObj1 = Immutable.fromJS(Obj1);
iObj2 = Immutable.fromJS(Obj2);

iObj1.merge(iObj2);
</code>
</pre>

`Immutable mergeDeep` is ImmutableJS equivalent to `_.merge`
<pre>
<code class="kjs">
iObj1.mergeDeep(iObj2);
</code>
</pre>

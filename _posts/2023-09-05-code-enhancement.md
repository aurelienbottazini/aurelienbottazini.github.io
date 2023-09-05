---
tags: code
---

Yesterday I was talking about how I prefer to avoid build tools and dependencies.
In the Web World, additions to established languages is a recurring pattern.
I prefer variants that are compatible with the initial language.
This helps keeping dependencies and build tools to a minimum.

For example with css with have two *sass* possibilities*.

scss:
```scss
body {
  background: blue;
}
```

sass:
```sass
body
	background: blue
```

**I prefer *scss* because the *scss* snippet I shared is valid *css*.**
It makes it easier to use *css* and switch to *scss* when needed.

Another example with Javascript.

[Typescript](https://www.typescriptlang.org):
```typescript
function sum(x: number, y: number) {
	return x + y;
}
```


[JSDoc](https://jsdoc.app)
```javascript
/**
* @param {integer} x
* @param {integer} y
**/
function sum(x, y) {
	return x + y;
}
```

**I prefer the JSDoc version.**
The JSDoc version is valid JavaScript code.
There is no build step required to use that code.
However you can leverage Typescript tooling to enhance your developer experience.
Typescript understands JSDoc and can take advantage of it.
It is the best of both worlds.
sinful-math
===========

sinful-math for node and the browser
------------------------------------

This project provides simple, safe floating-point math operations with little overhead.  You get basic arithmetic operations without having to store your numbers in special objects.

The functions defined here have their roots in the [sinful.js](http://guipn.github.com/sinful.js/) project.  sinful.js is a functional javascript library that extends the prototypes of the built-in types to provide functional settings similar to Haskell's, and provide for clear, concise and expressive code.  For detailed information on sinful.js, its API, usage, contributors, license, etc., please dive into the [wiki](https://github.com/guipn/sinful.js/wiki/_pages).

###Usage

Adding with floating point precision safety:
```
> var add = require('sinful-math').add;

> 0.1 + 0.2; // ↦ 0.30000000000000004

> add(0.1, 0.2); // ↦ 0.3

```

sinful-math can also apply the math operation to an array:
```
> add([6.0985, -0.035, -0.08]); // ↦ 5.9835

```

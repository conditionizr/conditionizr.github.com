---
layout: default
title: "Conditionizr: Detecting front-end environments and conditionally loading assets, wrapped inside a 1KB API"
intro: "Detecting front-end environments and conditionally loading assets, wrapped inside a 1KB API"
---

## Overview
Conditionizr (.NET Magazine's Open Source Project of the Year finalist) is a standalone JavaScript tool that detects front-end environments and returns an Object with boolean values on given test states. You can use Conditionizr with various public APIs to make your cross platform/device/browser development much easier and manageable. These APIs include adding your own tests, dynamic polyfills (eradicating conditional comments), callbacks for specific environment tests.

## .config()
The config API allows you to easily configure your conditional environments, once tests are added. You have a choice of loading conditional scripts, styles and class names per config test, as well as specifying an asset path to where your files are.

```js
conditionizr.config({
  assets: '/path/to/my/assets/',
  tests: {
    'safari': ['script', 'style', 'class']
  }
});
```

This would then load browser specific tweaks, or you could use the global class override:

```html
<html class="safari">
  <head>
    <script src="assets/conditionizr/safari.js"></script>
    <link href="assets/conditionizr/safari.css" rel="stylesheet">
  </head>
</html>
```

## .add()
Custom tests can be bolted into the Conditionizr core and used with all the APIs, making your conditional coding seamless. Conditionizr will handle all the hard work for you, you just need to provide it a test that returns a boolean, true/false.

```js
conditionizr.add('safari', function () {
  return /constructor/i.test(window.HTMLElement);
});
```

## .on()
Using `.on()` you can create custom callbacks for when conditional tests return true which are your best bet if you can avoid loading an external script and style, for instance if I’ve added a test for Safari, when a user is running Safari, your callback will run. This is preferred as it saves an HTTP request and improves performance.


```js
conditionizr.on('safari', function () {
  // safari
});

```

Conditionizr returns an object for you to also test environment states inside expressions

```js
if (conditionizr.safari) {
  // safari
}
```

You can also ignore an environment using the JavaScript '!' operator

```js
conditionizr.on('!safari', function() {
  // ignore safari
});
```

## .polyfill()
Polyfill and load each allow you to inject custom assets based on a conditional test. All you need is the external URI, and your predefined conditional tests to declare.

```js
conditionizr.polyfill('//html5shiv.googlecode.com/svn/trunk/html5.js', ['ie6', 'ie7', 'ie8']);
```

Using the .load() API instead of .polyfill() is purely for naming conventions to differentiate between polyfills and generic assets.

```js
conditionizr.load('//cdnjs.cloudflare.com/ajax/libs/hammer.js/1.0.5/hammer.min.js', ['ios']);
```

---
layout: default
title: "Conditionizr: Detecting front-end environments and conditionally loading assets, wrapped inside a 1KB API"
intro: "Custom detects, ready to roll"
---

## Chrome
<textarea class="textarea--code">
conditionizr.add('chrome', [], function () {
  return !!window.chrome && !/opera|opr/i.test(navigator.userAgent);
});
</textarea>

## Safari
<textarea class="textarea--code">
conditionizr.add('safari', [], function () {
  return /constructor/i.test(window.HTMLElement);
});
</textarea>

## Firefox
<textarea class="textarea--code">
conditionizr.add('firefox', [], function () {
  return typeof InstallTrigger !== 'undefined';
});
</textarea>

## Opera
<textarea class="textarea--code">
conditionizr.add('opera', [], function () {
  return !!window.opera || /opera|opr/i.test(navigator.userAgent);
});
</textarea>

## IE 11
<textarea class="textarea--code">
conditionizr.add('ie11', [], function () {
  return /(?:\sTrident\/7\.0;.*\srv:11\.0)/i.test(navigator.userAgent);
});
</textarea>

## IE 10
<textarea class="textarea--code">
conditionizr.add('ie10', [], function () {
  var version = false;
  /*@cc_on
    if (/^10/.test(@_jscript_version) && /MSIE 10\.0(?!.*IEMobile)/i.test(navigator.userAgent))
    version = true
  @*/
  return version;
});
</textarea>

## IE 10 Touch
<textarea class="textarea--code">
conditionizr.add('ie10touch', [], function () {
  return /MSIE 10\.0.*Touch(?!.*IEMobile)/i.test(navigator.userAgent);
});
</textarea>

## IE 9
<textarea class="textarea--code">
conditionizr.add('ie9', [], function () {
  var version = false;
  /*@cc_on
    if (/^9/.test(@_jscript_version) && /MSIE 9\.0(?!.*IEMobile)/i.test(navigator.userAgent))
    version = true
  @*/
  return version;
});
</textarea>

## IE 8
<textarea class="textarea--code">
conditionizr.add('ie8', [], function () {
  var version = false;
  /*@cc_on
    if (@_jscript_version > 5.7 && !/^(9|10)/.test(@_jscript_version))
    version = true
  @*/
  return version;
});
</textarea>

## IE 7
<textarea class="textarea--code">
conditionizr.add('ie7', [], function () {
  var version = false;
  /*@cc_on
    if (@_jscript_version == 5.7 && window.XMLHttpRequest && /MSIE 7\.0(?!.*IEMobile)/i.test(navigator.userAgent))
    version = true
  @*/
  return version;
});
</textarea>

## IE 6
<textarea class="textarea--code">
conditionizr.add('ie6', [], function () {
  var version = false;
  /*@cc_on
    if (@_jscript_version == 5.6 || (@_jscript_version == 5.7 && /MSIE 6\.0/i.test(navigator.userAgent)))
    version = true
  @*/
  return version;
});
</textarea>

## Retina
<textarea class="textarea--code">
conditionizr.add('retina', [], function () {
  return !!window.devicePixelRatio >= 1.5;
});
</textarea>

## Touch
<textarea class="textarea--code">
conditionizr.add('touch', [], function () {
  return !!'ontouchstart' in window || !!navigator.msMaxTouchPoints;
});
</textarea>

## iOS
<textarea class="textarea--code">
conditionizr.add('ios', [], function () {
  return /(iPad|iPhone|iPod)/i.test(navigator.userAgent);
});
</textarea>

## Windows Phone 8
<textarea class="textarea--code">
conditionizr.add('winPhone8', [], function () {
  return /Windows Phone 8.0/i.test(navigator.userAgent);
});
</textarea>

## Windows Phone 7.5
<textarea class="textarea--code">
conditionizr.add('winPhone75', [], function () {
  return /Windows Phone 7.5/i.test(navigator.userAgent);
});
</textarea>

## Windows Phone 7
<textarea class="textarea--code">
conditionizr.add('winPhone7', [], function () {
  return /Windows Phone 7.0/i.test(navigator.userAgent);
});
</textarea>

## Mac
<textarea class="textarea--code">
conditionizr.add('mac', [], function () {
  return /mac/i.test(navigator.platform);
});
</textarea>

## Windows
<textarea class="textarea--code">
conditionizr.add('windows', [], function () {
  return /win/i.test(navigator.platform);
});
</textarea>

## Chromium
<textarea class="textarea--code">
conditionizr.add('chromium', [], function () {
  return /cros i686/i.test(navigator.platform);
});
</textarea>

## Linux
<textarea class="textarea--code">
conditionizr.add('linux', [], function () {
  return /linux/i.test(navigator.platform) && !/android|cros/i.test(navigator.userAgent);
});
</textarea>

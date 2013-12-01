/**
 * Avoid `console` errors in browsers that lack a console.
 */
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


// no-js to js
var html = document.documentElement;
html.className = html.className.replace(/(^|\s)no-js(\s|$)/, ' js ');


// Select text in .textarea--code
var textAreas = document.querySelectorAll('.textarea--code');

function selectText(elem) {
  elem.addEventListener('click', function() {
    this.select();
  }, false);
}

for(var i = 0; i < textAreas.length; i++) {
  var textBox = textAreas[i];
  selectText(textBox);
  textBox.style.height = (textBox.scrollHeight) + 'px';
}



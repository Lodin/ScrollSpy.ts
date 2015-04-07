# ScrollSpy.ts
An adaptation of the Mootools Scrollspy ( http://davidwalsh.name/mootools-scrollspy ) plugin for TypeScript and pure JS.

### Usage as JS-library
```js
// all values specified in class constructor are defaults and can be
// omitted
var watcher = new ScrollSpy({
    mode: 'vertical', // how you prefer to scroll: `vertical` or `horizontal` 
    buffer: 0, // distance from `min`/`max` bound where script starts
    container: window, // scrolling element
    onEnter: null, // function performing on entering in active region
    onLeave: null, // function performing on leaving active region
    onTick: null // function performing at scroll every times it happens
});

// Initialize scroll spying
var foo = document.getElementById('foo');
var fooBounds = foo.getBoundingClientRect();

watcher.spy(foo, { min: fooBounds.top, max: fooBounds.top + foo.clientHeight });

// You can spy on different elements by one ScrollSpy object
var bar = document.getElementById('bar');
var barBounds = bar.getBoundingClientRect();

watcher.spy(bar, { min: 0, max: barBounds.top + bar.clientHeight })

// If you do not need spying on some element anymore, you can unspy it
watcher.unspy(foo);

// If you want to clear all watchers, you can do `unspyAll`
watcher.unspyAll();
```

ScrollSpy fires some events on watching element:
* **scrollEnter**: fires every time user enters watching region (between `min` and `max`). Receives parameters:
    * position - an object with current X and Y
* **scrollLeave**: fires every time user leaves watching region. Receives parameters
    * position
* **scrollTick**: fires on each scroll event within watching region. Receives parameters:
    * position,
    * inside - boolean value for whether or not the user is within the watching region
    * enters - number of times the region was entered
    * leaves - number of times the region was leaved

### Copyright
© Vlad Rindevich, 2015

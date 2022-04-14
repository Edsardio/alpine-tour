> This package only supports Alpine v3.x\
> This package needs TailwindCSS\
> This package currently does not work fantastic with the JIT compiler

# Alpine Tour

Add a dynamic tour to your Alpine 3.x components with a custom directive.

## About
This plugin adds a new `x-tour` to Alpine.

## Installation

### NPM
```bash
npm install @edsardio/alpine-tour
```

### JS
Register your `x-tour` directive to Alpine.

```js
import Alpine from "alpinejs";
import Tour from "@edsardio/alpine-tour";

Alpine.plugin(Tour);

window.Alpine = Alpine;
window.Alpine.start();
```

## Usage

### HTML
To create a tour add the directive to the element as following.
The tour will be ordered by the step.
Either bottom, top, left or right will let the directive know where to show the pop-up with the information.
```html
<div x-tour:bottom="{step: 1, title: 'Example title', description: 'This is the description'}"></div>
<div x-tour:top="{step: 2, title: 'Example title', description: 'This is the description'}"></div>
<div x-tour:left="{step: 3, title: 'Example title', description: 'This is the description'}"></div>
<div x-tour:right="{step: 4, title: 'Example title', description: 'This is the description'}"></div>
```

To start the tour add the following.
```html
<button x-tour:start>Start tour</button>
```

The tour can be navigated using the left and right arrow key, and can be closed using the escape button (or the cross in the pop-up).

### Translations

To overwrite the default texts in the tour you can do the following:
```js
window.Alpine.store('tourtranslations', {
    previous: 'Vorige',
    next: 'Volgende',
    finish: 'Afronden'
});
```

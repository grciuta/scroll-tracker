# scroll-tracker

## About

Widget is used to track & display user scrolled content percentage.

*Usualy it's just a top bar :)*

## Install

`npm install scroll-tracker`

## Usage

Initialize your tracker component like:

```js
// your imports
import ScrollTracker from 'scroll-tracker';
// ... some code maybe...
const scrollTracker = new ScrollTracker('#tracker');
// ... and other additional props can be applyed to component (more about it in Props section) ...
// ... Also feel free to checkout example inside of a package ...
```

## Props

| Property | Meaning | Example |
| ---- | ---- | -----:|
| *selector* | Selector of `tracker` instance in HTML | `#tracker` |
| *scrollColors* | JSON object witch consists of percentage number of scrolled length & color which should be appled  | `{0: "red", 25: "rgb(0, 0, 0)", 50: "rgba(0, 0, 0, 0.5)", 75: #ff0000, 100: "green"}` |
| *trackHeadingsItemSelector* | Selector for additional component to display section name on scroll | `#tracker--section` |
| *trackHeadingsSelector* | Selector for elements (usaly *h$ (headers)*) to track on which section is currently scrolled on | `.tracker--heading` |
| *headingChangeEvent* | Function, which is executed when content of section header will change. (**item** represents header tracking DOM; **event(fn)** represents function, which will change headings tracking DOM content to the next one and if some function is passed to it, after the change it will be executed.) | `(item, event) => {}` |
| *hideOnScrolledToTop* | Hides *heading* tracking element, when user scrolls to top | `true/false` |

## Examples
### Simple scroll tracker with changing background

```html
    <!-- -->
    <div class="tracker" id="tracker"></div>
    <!-- -->
```

```js
    import ScrollTracker from '../src/index';
    // ...
    const st = new ScrollTracker('#tracker', {
        0: "red",
        10: "green",
        20: "blue",
        30: "rgb(255, 0, 0)",
        40: "rgb(0, 255, 0)",
        50: "rgb(0, 0, 255)",
        60: "rgb(0, 0, 255, 0.5)",
        70: "rgb(0, 0, 255, 0)",
        80: "#ff0000",
        90: "#00ff00",
        100: "#0000ff",
    });
    // ...
```

### Scroll tracker with heading tracking element

```html
    <!-- -->
    <div class="tracker" id="tracker"></div>
    <div class="tracker--section" id="tracker--section"></div>
    <div>
        <h1 class="tracker--heading">Heading1</h1>
        <h1 class="tracker--heading">Heading2</h1>
        <h1 class="tracker--heading">Heading3</h1>
        <h1 class="tracker--heading">Heading4</h1>
        <h1 class="tracker--heading">Heading5</h1>
    </div>
    <!-- -->
```

```js
    import ScrollTracker from '../src/index';
    // ...
    // '#tracker--section' is a div selector, which content will be changed by h2 DOM content when user scrolls on it
    // '.tracking--heading' is a DOM elements selector
    const st = new ScrollTracker('#tracker', {}, '#tracker--section',  '.tracker--heading');

    // Also if you want to add some animating through CSS classes
    // (or as in this particular case JS)
    // you can append 'OnChange' event function on which you can:
    // * do something before content change.
    // * trigger change event (which will change content).
    //   - on triggering, you can pass function, which will be executed after content change.
    const st = new ScrollTracker('#tracker', {
        0: "red",
        10: "green",
        20: "blue",
        30: "rgb(255, 0, 0)",
        40: "rgb(0, 255, 0)",
        50: "rgb(0, 0, 255)",
        60: "rgb(0, 0, 255, 0.5)",
        70: "rgb(0, 0, 255, 0)",
        80: "#ff0000",
        90: "#00ff00",
        100: "#0000ff",
    }, '#tracker--section', '.tracker--heading', (item, event) => {
        // before change...
        item.style.left = '-150px';
        item.style.opacity = 0;
        setTimeout(() => {
            // triggering change event...
            event(() => {
                // post change event...
                item.style.left = '15px';
                item.style.opacity = 1;
            });
        }, 150);
    });
```
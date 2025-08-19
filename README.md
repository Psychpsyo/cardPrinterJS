# CardPrinterJS
CardPrinterJS is a simple JavaScript library for printing playing cards from the browser.  

I originally made this for [Cross Universe](https://crossuniverse.net) so that's the cards I'll be using in the code examples below.

## Usage

### Basic Usage

Simply copy cardPrinter.mjs into your project and use it like so:
```js
import * as cardPrinter from "./cardPrinter.mjs";

cardPrinter.setCards([
	"https://crossuniverse.net/images/cards/en/U00210.jpg",
	"https://crossuniverse.net/images/cards/en/U00161.jpg",

	/* ... */

	"https://crossuniverse.net/images/cards/en/I00013.jpg",
	"https://crossuniverse.net/images/cards/en/S00129.jpg"
]);
print();
```

If you want the user to be able to use ``Ctrl+P`` at any point on your page, consider calling ``setCards()`` in a ``beforeprint`` event handler:
```js
window.addEventListener("beforeprint", () => {
	cardPrinter.setCards([
		/* your cards go here */
	]);
});
```

### Parameters

The ``setCards()`` function takes the following parameters:

- ``images``  
  An array of either image URLs as strings or ``Image`` objects.  
  You can pass in an array that mixes both.  

- ``width``  
  A number, representing the card's widths in centimeters.  
  The default is ``6.3cm`` which should be fine for most playing cards.  
  You can also pass in a string that'll be used directly as the card's css ``width`` property, allowing you to use other units such as ``in`` or ``mm``.  
  The height of the cards will be determined automatically from their aspect ratio.

- ``backsides``  
  A boolean, indicating whether or not you want to print backsides.  
  When printing backsides, the passed-in cards will be layed out in the opposite direction on the page, so that you can run the same sheets of paper through the printer in reverse and each card face will line up with its corresponding backside.  
  The default is ``false``.


## Known Issues (pretty much only in Chrome)

### Image loading in Chromium-based browsers
Currently, if you are calling ``setCards()`` in a ``beforeprint`` event handler and open the print dialog via the ``print()`` function, Chromium-based browsers sometimes fail to show all the cards in their print preview.  
I have no idea if this affects the actual print but if you care, go and press "I am impacted" on [this Chromium bug](https://issues.chromium.org/issues/40262871). (It's the little +1 button in the top right)

### No regular page printing
Currently, loading ``cardPrinter.mjs`` on a page inserts some css that'll make it impossible to make a regular printout of the page.  
I might add a fix for this if there is demand for it. (just open an issue in that case)

## Contributing

If you want to contribute to Card Printer, simply open a pull request and I'll probably merge it in.

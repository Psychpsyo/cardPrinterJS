// MIT License
//
// Copyright (c) 2024 Psychpsyo
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


{ // setup
const styleElem = document.createElement("style");
styleElem.textContent = `
#cardPrinterDiv {
	display: none;
}

@media print {
	* {
		background: white !important;
	}
	html, body {
		display: block;
	}
	body > :not(#cardPrinterDiv) {
		display: none !important;
	}

	#cardPrinterDiv {
		display: ${navigator.userAgent.toLowerCase().includes("chrome")? "block" : "grid"};
  		grid-template-columns: repeat(auto-fill, var(--card-width));
		justify-content: center;
		gap: 1pt;
	}

	#cardPrinterDiv > img {
		width: var(--card-width);
		break-inside: avoid;
	}
}

@page {
	margin: 1cm;
}`;
document.head.appendChild(styleElem);

const cardPrinterDiv = document.createElement("div");
cardPrinterDiv.id = "cardPrinterDiv";
document.body.appendChild(cardPrinterDiv);
}

// needs to be called at some point before printing, like the beforeprint event handler
export function setCards(images, width = "6.3cm", backsides = false) {
	cardPrinterDiv.innerHTML = "";
	if (width instanceof Number) {
		width = width + "cm";
	}
	cardPrinterDiv.style.setProperty("--card-width", width);
	cardPrinterDiv.style.setProperty("direction", backsides? "rtl" : "ltr");
	for (let image of images) {
		if (!(image instanceof Image)) {
			const src = image;
			image = document.createElement("img");
			image.src = src;
		}
		cardPrinterDiv.appendChild(image);
	}
}
const output = document.querySelector('.output'); // Output is a <img> element
const leftBTN = document.querySelector('.left-btn'); // Hidden button that covers 50 of the width on the left side of the screen
const rightBTN = document.querySelector('.right-btn'); // The same but for the right side

var pageCount = 0; // Stores current page index 

leftBTN.addEventListener('click', goLeft);

rightBTN.addEventListener('click', goRight);

// Updates source of the <img> output element with current page
function update() {
    output.src = imgURLs[pageCount]
}

// Goes back to previous page if one exists
function goLeft() {
    if (imgURLs[pageCount - 1]) {
        pageCount--;
        update();
    }
}

// Same, but for the next page
function goRight() {
    if (imgURLs[pageCount + 1]) {
        pageCount++;
        update();
    }
}
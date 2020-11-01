const output = document.querySelector('.output'); // Output is a <img> element
const leftBTN = document.querySelector('.left-btn');
const rightBTN = document.querySelector('.right-btn');
var pageCount = 0;

leftBTN.addEventListener('click', goLeft);

rightBTN.addEventListener('click', goRight);

function update() {
    output.src = imgURLs[pageCount]
}

function goLeft() {
    if (imgURLs[pageCount - 1]) {
        pageCount--;
        update();
    }
}

function goRight() {
    if (imgURLs[pageCount + 1]) {
        pageCount++;
        update();
    }
}
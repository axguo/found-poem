let words = [];
let font,
    fontsize = 16;
let margin = 20;
let maxWidth;
let maxHeight;
let widths = [];
let heights = [];


let randomWords = [
    "likely",
    "temporary",
    "freight",
    "dirty",
    "slippery hands",
    "inner",
    "holding joy",
    "derive",
    "peeking",
    "public",
    "where?",
    "for me",
    "naive",
    "smoke",
    "grave",
    "catch",
    "intention",
    "recording",
    "our cheek",
    "I",
    "sometimes",
    "a dear",
    "handwritten letters",
    "love to",
    "wouldn't it be",
    "wonderful",
    "to see",
    "a window",
    "a fright",
    "fly aways",
    "love nuggets",
    "feeling today",
    "like that",
    "but maybe",
    "do you?",
    "know",
    "take it",
    "now",
    "a feeling of",
    "urgency",
    "vibrant",
    "fellows",
    "but yes,",
    "tell me",
    "...",
    "?",
    "...",
    "—",
    "mine",
    "is",
    "to be",
    "we are",
    "seams",
    "at the",
    "threads of",
    "silk",
    "and",
    "perfectly",
    "wondering",
    "how",
    "does it",
    "take",
    "under",
    "waiting and",
    "waiting and",
    "waiting for",
    "you",
    "let's go",
    "on a trip",
    "down",
    "to memories",
    "tell me a story",
    "I love",
    "when you are",
    "on",
    "above",
    "it seems",
    "feel",
    "to place",
    "reflective",
    "alert",
    "steadfast",
    "windy",
    "earthy",
    "synonymous",
    "an attempt",
    "at",
    "something",
    "delirious",
    "find me",
    "found me",
    "searching in",
    "ways"
];

function preload() {
    font = loadFont("../../assets/Merriweather-Regular.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    maxWidth = width;
    maxHeight = height;

    for (let i = 0; i < 10; i++) {
        widths.push(width);
        heights.push(height);
    }

    cursor('../../assets/person.png');

    textFont(font);
    textSize(fontsize);
    textAlign(LEFT, TOP);

    createWords();
}

function createWords() {
    for (let i = 0; i < randomWords.length; i++) {
        if (Math.random() < 0.4) {
            placeWord(randomWords[i], 5);
        }
    }
}

function stuffCanvas() {
    let oldWords = words;
    words = [];
    for (let i = 0; i < oldWords.length; i++) {
        let w = oldWords[i];
        if (w.show) {
            words.push(w);
        }
    }
    for (let i = 0; i < oldWords.length; i++) {
        let w = oldWords[i];
        if (!w.show) {
            placeWord(oldWords[i].text, 30);
        }

    }
}

function updateDims() {
    for (let i = 10; i > 0; i--) {
        widths[i] = widths[i - 1];
        heights[i] = heights[i - 1];
    }
    widths[0] = width;
    heights[0] = height;
}

function placeWord(word, tries) {
    if (tries == 0) {
        return;
    }
    let x = Math.random() * width;
    let y = Math.random() * (height - 30) + 30;
    let w = new Word(x, y, word);

    let intersect = false;
    for (let j = 0; j < words.length; j++) {
        if (words[j].intersectWord(w) || w.outOfBounds()) {
            placeWord(word, tries - 1);
            intersect = true;
            break;
        }
    }
    if (!intersect) {
        words.push(w);
    }
}

function draw() {
    background(217, 217, 217);
    updateDims();
    drawWords();
    const allEqual = arr => arr.every(val => val === arr[0]);

    if ((width > maxWidth || height > maxHeight) && allEqual(widths) && allEqual(heights)) {
        maxWidth = width;
        maxHeight = height;
        stuffCanvas();
    }
}

function drawWords() {
    for (let i = 0; i < words.length; i++) {
        w = words[i];

        if (w.intersect(mouseX, mouseY) || w.show) {
            push();
            text(w.text, w.left, w.top);
            pop();
        }
    }
}

class Word {
    constructor(x, y, text) {
        this.left = x;
        this.top = y;
        this.text = text;
        this.bbox = font.textBounds(text, x, y, fontsize);
        this.right = x + this.bbox.w;
        this.bottom = y + this.bbox.h;
        this.show = false;
        this.test = false;
    }
    intersect(x, y) {
        if (this.left - margin < x && this.right + margin > x) {
            if (this.top - margin < y && this.bottom + margin > y) {
                this.show = true;
                return true;
            }
        }
        return false;
    }
    intersectWord(word) {
        let intersect = !(
            this.left >= word.right ||
            this.right <= word.left ||
            this.top >= word.bottom ||
            this.bottom <= word.top
        );
        if (intersect) {
            return true;
        }
        return false;
    }
    outOfBounds() {
        return (this.left < 0 ||
            this.right > width - 10 ||
            this.top < 0 ||
            this.bottom > height - 10
        );
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

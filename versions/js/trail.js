let words = [];
let font,
    fontsize = 16;
let margin = 20;
let trail = [];

let x = []
let y = [];
let segLength = 18;
let letters = [];


let maxWidth;
let maxHeight;
let widths = [];
let heights = [];

let genWords = [
    "whispers",
    "moonlit",
    "dewdrops",
    "enchanting",
    "surreal",
    "suspended in time",
    "effervescent",
    "impressionistic",
    "luminous",
    "radiant",
    "sun-kissed",
    "cosmic",
    "longing",
    "yearning",
    "alchemy of",
    "enchantment",
    "spellbound",
    "haunted",
    "tenderly",
    "passionately",
    "effortlessly",
    "innocently",
    "ruthless",
    "viciously",
    "ferociously",
    "swiftly",
    "loudly",
    "softly",
    "angrily",
    "excitedly",
    "cheerfully",
    "carefully",
    "abruptly",
    "playfully",
    "mysteriously",
    "deliberately",
    "eagerly",
    "lazily",
    "scornfully",
    "foolishly",
    "doubtfully",
    "proudly",
    "greedily",
    "honestly",
    "running",
    "jumping",
    "swimming",
    "singing",
    "dancing",
    "laughing",
    "crying",
    "sneezing",
    "flying",
    "smiling",
    "sleeping",
    "eating",
    "writing",
    "reading",
    "drawing",
    "painting",
    "speaking",
    "listening",
    "watching",
    "thinking",
    "contemplating",
    "meditating",
    "procrastinating",
    "worrying",
    "panicking",
    "fidgeting",
    "daydreaming",
    "pondering",
    "hesitating",
    "stuttering",
    "above",
    "across",
    "after",
    "against",
    "along",
    "among",
    "around",
    "at",
    "before",
    "behind",
    "below",
    "beneath",
    "beside",
    "between",
    "beyond",
    "by",
    "down",
    "during",
    "for",
    "from",
    "in",
    "inside",
    "into",
    "near",
    "of",
    "off",
    "on",
    "over",
    "through",
    "to",
    "under",
    "tangled sheets",
    "screaming clouds",
    "dancing bricks",
    "talking tree",
    "dripping clocks",
    "laughter",
    "growing",
    "nothing",
    "invisible",
    "derive",
    "peeking",
    "statues",
    "sleepwalking",
    "floating",
    "trees",
    "living dreams",
    "dripping",
    "breathing",
    "thunder",
    "rain",
    "streetlight",
    "paused",
    "watching you",
    "coexist"
];

let myWords = [
    "likely",
    "temporary",
    "slippery hands",
    "inner",
    "holding joy",
    "where?",
    "for me",
    "naive",
    "grave",
    "catch",
    "intention",
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
    "waiting and —",
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
    "ways",
    "for,",
    "to be found",
    "at the edge of",
    "a great field",
    "ceremoniously unjust",
    "seashells",
    "unearthed beach",
    "isn't it lovely?",
    "to be",
    "to find",
    "to wonder",
    "peaceful delights",
];

function preload() {
    font = loadFont("../../assets/Merriweather-Regular.ttf");
    // font = loadFont('Georgia.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    cursor(HAND);
    colorMode(RGB, 255, 255, 255, 1);

    maxWidth = width;
    maxHeight = height;

    for (let i = 0; i < 10; i++) {
        widths.push(width);
        heights.push(height);
    }


    textFont(font);
    textSize(fontsize);
    textAlign(LEFT, TOP);

    createWords();
    // frameRate(20);
    setupTrail();
}

function setupTrail() {
    for (let i = 0; i < 1000; i++) {
        x.push(0);
        y.push(0);
    }
}


function createWords() {
    for (let i = 0; i < myWords.length; i++) {
        if (Math.random() < 0.55) {
            placeWord(myWords[i], 3);
        }
    }
    for (let i = 0; i < genWords.length; i++) {
        if (Math.random() < 0.15) {
            placeWord(genWords[i], 3);
        }
    }
}

function placeWord(word, tries) {
    if (tries == 0) {
        return;
    }
    let x = Math.random() * width;
    let y = Math.random() * (height - 30) + 30;;
    let w = new Word(x, y, word, false);

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
            if (w.emoji) {
                placeEmoji(oldWords[i].text, 30);
            } else {
                placeWord(oldWords[i].text, 30);
            }
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


function draw() {
    background(242, 219, 211);
    updateDims();
    drawWords();
    drawLetters();
    const allEqual = (arr) => arr.every((val) => val === arr[0]);

    if (
        (width > maxWidth || height > maxHeight) &&
        allEqual(widths) &&
        allEqual(heights)
    ) {
        maxWidth = width;
        maxHeight = height;
        stuffCanvas();
    }

}

function drawLetters() {
    dragSegment(0, mouseX, mouseY);
    for (let i = 0; i < x.length - 1; i++) {
        dragSegment(i + 1, x[i], y[i]);
    }
}

function drawWords() {
    for (let i = 0; i < words.length; i++) {
        w = words[i];

        if (!w.show) {
            let d = w.distance(mouseX, mouseY);
            let opacity = map(d, 0, 75, 1, 0);
            fill(0, 0, 0, opacity);
        } else {
            noFill();
        }

        if (w.emoji) {
            textFont("Georgia");
            textSize(emojisize);
        } else {
            textFont(font);
            textSize(fontsize);
        }
        text(w.text, w.left, w.top);
    }
}

function mouseClicked() {
    for (let i = 0; i < words.length; i++) {
        w = words[i];
        if (w.intersect(mouseX, mouseY)) {
            w.show = true;
            for (let c = 0; c < w.text.length; c++) {
                letters.push(w.text.charAt(c));
            }
            letters.push(' ');
        }
    }
}


function dragSegment(i, xin, yin) {
    let dx = xin - x[i];
    let dy = yin - y[i];
    let angle = atan2(dy, dx);
    x[i] = xin - cos(angle) * segLength;
    y[i] = yin - sin(angle) * segLength;
    segment(x[i], y[i], angle, i);
}

function segment(x, y, a, i) {
    push();
    translate(x, y);
    rotate(PI - a);
    fill(0);
    if (i < letters.length) {
        text(letters[i], 0, 0);
    }
    // line(0, 0, segLength, 0);
    pop();
}


class Word {
    constructor(x, y, text, emoji, w = 0, h = 0) {
        this.emoji = emoji;
        this.left = x;
        this.top = y;
        this.text = text;
        this.bbox = font.textBounds(text, x, y, fontsize);
        this.right = x + this.bbox.w;
        this.bottom = y + this.bbox.h;
        if (w !== 0) {
            this.right = x + w;
            this.bottom = y + h;
        }
        this.show = false;
        this.test = false;
    }
    intersect(x, y) {
        if (this.left - margin < x && this.right + margin > x) {
            if (this.top - margin < y && this.bottom + margin > y) {
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
            this.test = true;
            word.test = true;
            return true;
        }
        return false;
    }
    distance(x, y) {
        if (this.intersect(x, y)) {
            return 0;
        }
        let dx = Math.min(Math.abs(x - this.left), Math.abs(x - this.right));
        let dy = Math.min(Math.abs(y - this.top), Math.abs(y - this.bottom));
        let d = dist(0, 0, dx, dy);
        return d;
    }
    outOfBounds() {
        return (
            this.left < 0 ||
            this.right > width - 10 ||
            this.top < 0 ||
            this.bottom > height - 10
        );
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

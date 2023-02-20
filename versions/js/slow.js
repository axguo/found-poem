let words = [];
let font,
    fontsize = 16;
let margin = 0;
let emojisize = 30;
let blob;
let test;

let minr = 35;

let maxWidth;
let maxHeight;
let widths = [];
let heights = [];

let emojis = [
    "💌",
    "🧵🪡",
    "🌾🌾🌾",
    "🌙",
    "🌊🐚🌊",
    "🍂",
    "🍃🍃",
    "📜🖋",
    "☁️☁️☁️",
    "🌻",
    "🍃🍃🍃",
    "🍂🍂",
    "💌 💌 💌",
    "🥀",
    "🌸🌺🌼",
    "⏳",
    "🎵🎶",
    "🌄",
    "🕯️🌌",
    "📖🕯️",
    "🌞🌱"
];

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
    noCursor();
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
    blob = { x: width / 2, y: height / 2 };
}


function createWords() {
    for (let i = 0; i < emojis.length; i++) {
        if (Math.random() < 0.2) {
            placeEmoji(emojis[i], 3);
        }
    }
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

function placeEmoji(word, tries) {
    if (tries == 0) {
        return;
    }
    let x = Math.random() * width;
    let y = Math.random() * (height - 30) + 30;;
    let w = new Word(x, y, word, true, word.length * emojisize, emojisize);

    let intersect = false;
    for (let j = 0; j < words.length; j++) {
        if (words[j].intersectWord(w) || w.outOfBounds()) {
            placeEmoji(word, tries - 1);
            intersect = true;
            break;
        }
    }
    if (!intersect) {
        words.push(w);
        return;
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
    background(146, 173, 212);
    moveBlob();
    drawBlob();
    updateDims();
    drawWords();
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

function drawBlob() {
    let radius = minr + noise(frameCount / 100) * 50;
    for (let r = 0; r < radius; r += 0.75) {
        noStroke();
        fill(255, 255, 255, 0.02);
        circle(blob.x, blob.y, r);
    }
}

function drawWords() {
    for (let i = 0; i < words.length; i++) {
        w = words[i];
        if (w.show) {
            fill(255);
        } else {
            let d = w.distance(blob.x, blob.y);
            if (d == 0) {
                w.show = true;
            }
            let opacity = map(d, 0, 200, 1, 0);
            fill(255, 255, 255, opacity);
            // fill(255, 0, 0, 1);
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

function moveBlob() {
    if (keyIsDown(LEFT_ARROW)) {
        blob.x -= 1.5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        blob.x += 1.5;
    }

    if (keyIsDown(UP_ARROW)) {
        blob.y -= 1.5;
    }

    if (keyIsDown(DOWN_ARROW)) {
        blob.y += 1.5;
    }
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


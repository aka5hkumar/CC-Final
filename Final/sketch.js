var whatScreen;
var whichBlock;
var keyList;
var player;

function preload() {
    A = loadSound("assets/A.mp3");
    B = loadSound("assets/B.mp3");
    C = loadSound("assets/C.mp3");
    keyList = [A, B, C];
    player = createSprite(((window.innerWidth) / 2), ((window.innerHeight) / 2), 64, 64);
}

function setup() {
    whatScreen = 0;
    whichBlock = [0, 0, 0, 0];
    createCanvas(window.innerWidth, window.innerHeight);

}

function draw() {
    screenChoose();
}

function screenChoose() {
    if (whatScreen == 0) {
        startScreen();
    } else if (whatScreen == 1) {
        mainScreen();
    } else if (whatScreen == 2) {
        finalScreen();
    } else if (whatScreen == 3) {
        endScreen();
    }
}

function mainScreen() {
    background(255, 0, 0);
    drawSprites();
}

function finalScreen() {
    console.log("Commence the camera")
}

function endScreen() {
    text('fin');
}

function startScreen() {
    var demoRectSize = 100;
    var innerOffset = (width / 6) - (demoRectSize / 3);

    background(0, 0, 0);
    fill(255, 0, 0, 200);
    rect(1 * innerOffset, height / 2, demoRectSize, demoRectSize);
    fill(0, 255, 0, 200);
    rect(3 * innerOffset, height / 2, demoRectSize, demoRectSize);
    fill(0, 0, 255, 200);
    rect(5 * innerOffset, height / 2, demoRectSize, demoRectSize);
}

function keyPressed() {
    if (whatScreen == 0) {
        whatScreen = 1;
    }
}

function mouseClicked() {
    if (whatScreen == 0) {
        whichBlock = get(mouseX, mouseY);
        console.log(whichBlock)
        clickPlay();
    }
}

function clickPlay() {
    var colorBlock;
    for (i = 0; i < 3; i++) {
        if (whichBlock[i] > 0) {
            colorBlock = i;
            keyList[colorBlock].play();
        }
    }
}

var whatScreen;
var whichBlock;
var keyList;
var player;
var barriers;
var overlap;

function preload() {
    A = loadSound("assets/A.mp3");
    B = loadSound("assets/B.mp3");
    C = loadSound("assets/C.mp3");
    keyList = [A, B, C];
    player = createSprite(((window.innerWidth) / 2), ((window.innerHeight) / 2), 50, 50);
}

function setup() {
    whatScreen = 0;
    whichBlock = [0, 0, 0, 0];
    createCanvas(window.innerWidth, window.innerHeight);
    barriers=new Group();


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

function startScreen() {
    var demoRectSize = 100;
    var innerOffset = (width / 6) - (demoRectSize / 3);
  camera.position.y = height / 2;
    background(0, 0, 0);
    fill(255, 0, 0, 200);
    rect(1 * innerOffset, height / 2, demoRectSize, demoRectSize);
    fill(0, 255, 0, 200);
    rect(3 * innerOffset, height / 2, demoRectSize, demoRectSize);
    fill(0, 0, 255, 200);
    rect(5 * innerOffset, height / 2, demoRectSize, demoRectSize);
}

function mainScreen() {
    background(255, 0, 0);
    if (frameCount % 60 == 0) {
        var blockSize = random(50, 300);
        var block = createSprite(player.position.x / 2, player.position.y / 2, 50, 50);
        barriers.add(block);

        //get rid of passed pipes
        for (var i = 0; i < barriers.length; i++)
            if (barriers[i].position.x < player.position.x - width / 2)
                block[i].remove();
    }
    camera.position.x = player.position.x + width / 4;
    drawSprite(player);
    drawSprites(barriers);
    if (player.overlap(barriers))
    {
      console.log("death");
    }
}

function finalScreen() {
    console.log("Commence the camera")
}

function endScreen() {
    text('fin');
}


function keyPressed() {
    if (whatScreen == 0) {
        whatScreen = 1;
    }
    if (whatScreen == 1) {
        if (keyCode === ENTER) {
            whatScreen = 2;
        }
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

function mouseDragged()
{
  player.position.x=mouseX;
  player.position.y=mouseY;
}

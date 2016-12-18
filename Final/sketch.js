// Code from trackingjs.com and p5 play examples 

var whatScreen;
var whichBlock;
var keyList;
var player;
var barriers;
    var i = 0;
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
    innerCanvas = createCanvas(window.innerWidth, window.innerHeight);
    barriers = new Group();


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
        simonScreen();
    } else if (whatScreen == 3) {
        endScreen();
    }
}

function simonScreen() {
    var randoms = []
    for (var i = 0; i < 3; i++) {
        var rand = random(0, 3);
        randoms[i] = rand;
        console.log(randoms);
    }
    setInterval(playSounds(), 5000);
}

function playSounds()
{

var start=millis()

          keyList[i].play();
if (start-millis()>3000)
{
i++
}
if(i>=3)
{
  i=0;
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
        var block = createSprite(player.position.x + 200, 0, blockSize, blockSize);
        barriers.add(block);
    }
    if (frameCount % 60 == 0) {
        var block = createSprite(player.position.x + 150, window.innerHeight - 200, 50, 200);
        barriers.add(block);
    }
    camera.position.x = player.position.x + width / 4;
    drawSprite(player);
    drawSprites(barriers);
    if (player.collide(barriers)) {
        console.log("death");

    }
}

function finalScreen() {
    tracking();
    rect(0, 0, window.innerWidth - 100, window.innerHeight)
    rect(0, 0, window.innerWidth - 100, window.innerHeight)
    rect(width / 2, 0, 50, 50)
    rect(width / 2, height / 2, 50, 50);
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
            window.location.href = "color_camera.html";
        }
    }

    // if (keyCode=== ARROW_FORWARD)

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

function mouseDragged() {
  player.position.x = mouseX;
  player.position.y = mouseY;
}

function tracking() {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var tracker = new tracking.ColorTracker();

    tracking.track('#video', tracker, {
        camera: true
    });

    tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        event.data.forEach(function(rect) {
            if (rect.color === 'custom') {
                rect.color = tracker.customColor;
            }

            context.strokeStyle = rect.color;
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
            console.log(rect.color);
        });
    });

    initGUIControllers(tracker);
};

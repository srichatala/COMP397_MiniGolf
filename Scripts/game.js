//Author:Srinivasarao Chatala
//Date-Created:04/25/2015
//Last-modified-by: Sri Chatala
//Last-modified-Date: 05/07/2015
//Description:This game is all about mini golf, player clicks on white ball to make a goal.
//            white ball should not touch the red ball while making the goal. 
//            if the player touches the red ball game will be over. In each layer, 
//            one red ball will be increased to make game more difficult to make goal.


//Global variables
var canvas;
var stage;
var titleImg;
var imageBall;
var play;
var instructions;
var score, scoreText;
var level, levelText;
var circle;
var playbutton;
var instrButton;
var ballInstr;
var bgrnd;
var title;
var instructionsText;
var backbutton, backhome;
var blocksFront, blocksMiddle, blocksBack;
var playAgain, playAgainButton;
var circleDest;
var boundingCircle1, boundingCircle2;
var blockCircle1, blockCircle2, blockCircle3;
var circleLevel2;
var circleLevel3;
var intersect;


//initial function to load the game
function init() {

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    score = 0;
    level = 1;
    //register sounds
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound("assets/sounds/bgGame.mp3", "background");
    createjs.Sound.registerSound("assets/sounds/bob.mp3", "hit");
    createjs.Sound.registerSound("assets/sounds/PressPlay.mp3", "goal");
    createjs.Sound.registerSound("assets/sounds/TunnelCollision.mp3", "die");

    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", tick);

    mainInfo();
}
function tick() {
	//play background music of the game
    createjs.Sound.play("background");
    stage.update();
}

//Ball roating on startup screeen
function ballImg() {

    bgrnd = new createjs.Bitmap(imageBall);
    createjs.Tween.get(bgrnd, { loop: true })
    .to({ x: 420 }, 1000, createjs.Ease.getPowInOut(4))
    .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
    .to({ alpha: 0, y: 350 }, 100)
    .to({ alpha: 1, y: 280 }, 500, createjs.Ease.getPowInOut(2))
    .to({ x: 50 }, 800, createjs.Ease.getPowInOut(2));
    stage.addChild(bgrnd);
}

//Startup screen images
function mainInfo() {
    play = new Image();
    play.src = "assets/images/play.png";
    play.onload = playImg;

    instructions = new Image();
    instructions.src = "assets/images/Instructions.png";
    instructions.onload = instrImg;

    imageBall = new Image();
    imageBall.src = "assets/images/ball.png";
    imageBall.onload = ballImg;

    titleImg = new Image();
    titleImg.src = "assets/images/title.png";
    titleImg.onload = nameImg;

    backbutton = new Image();
    backbutton.src = "assets/images/back.png";

    playAgain = new Image();
    playAgain.src = "assets/images/playagain.png";
}
//Play button event to start the game
function playImg() {
    playbutton = new createjs.Bitmap(play);
    playbutton.x = 230;
    playbutton.y = 150;
    playbutton.addEventListener("click", gameStart);
    playbutton.addEventListener("mouseout", buttonOutplayImg);
    playbutton.addEventListener("mouseover", buttonOverplayImg);
    stage.addChild(playbutton);
}

function buttonOutplayImg() {
    playbutton.alpha = 1;
}

function buttonOverplayImg() {
    playbutton.alpha = 0.5;
}
function instrImg() {
    instrButton = new createjs.Bitmap(instructions);
    instrButton.x = 230;
    instrButton.y = 250;
    instrButton.addEventListener("click", instructionsInfo);
    instrButton.addEventListener("mouseout", buttonOutinstrImg);
    instrButton.addEventListener("mouseover", buttonOverinstrImg);
    stage.addChild(instrButton);
}
function buttonOutinstrImg() {
    instrButton.alpha = 1;
}

function buttonOverinstrImg() {
    instrButton.alpha = 0.5;
}
function instructionsInfo() {
    stage.removeAllChildren();
    instructionsDetails();
}

//List all instructions of the game
function instructionsDetails() {
    //instructions text
    instructionsText = new createjs.Text("Instructions:\n\n1.Click on white ball to make goal\n\n2.For each goal player will get 1000 points\n\n3.White ball tocuhes the red ball game over\n\n4.In each level one red ball will be increased", "30px impact", "#ffffff");
    instructionsText.x = 25;
    instructionsText.y = 15;
    stage.addChild(instructionsText);
    //back to home button
    backhome = new createjs.Bitmap(backbutton);
    backhome.x = 500;
    backhome.y = 340;
    stage.addChild(backhome);
    //rorating ball
    ballInstr = new createjs.Bitmap("assets/images/ball.png");
    var width = 200;
    var height = 100
    ballInstr.regX = width / 2;
    ballInstr.regY = height / 2;
    ballInstr.x = 100;
    ballInstr.y = 300;
    stage.addChild(ballInstr);
    createjs.Ticker.setFPS(50);
    //Event to call back home   
    createjs.Ticker.addEventListener("tick", ballInstrEvent);
    backhome.addEventListener("click", backhomeEvent);
    backhome.addEventListener("mouseout", buttonOutback);
    backhome.addEventListener("mouseover", buttonOverback);
}
function ballInstrEvent() {
    ballInstr.rotation += 0.05;
}
function buttonOutback() {
    backhome.alpha = 1;
}

function buttonOverback() {
    backhome.alpha = 0.5;
}
//back home button event
function backhomeEvent() {
    stage.removeAllChildren();
    mainInfo();
}
//Display logo of the game on startup screen
function nameImg() {
    title = new createjs.Bitmap(titleImg);
    title.x = 25;
    title.y = 150;
    stage.addChild(title);
    stage.update();
}

//start the game
function gameStart() {
    stage.removeAllChildren();
    main();
}

//function to find the radius of the circle
function getBoundingCircleRadius(sprite) {
    var radiusInfo = Math.sqrt(((sprite.image.width / 2 * sprite.image.width / 2)
                    + (sprite.image.height / 2 * sprite.image.height / 2)));
    radiusInfo = radiusInfo - 15;
    return radiusInfo;
}

//create bound circle of each image in the game
function createBoundingCircle(sprite) {
    var g = new createjs.Graphics();
    var radius = getBoundingCircleRadius(sprite);
    g.drawCircle(sprite.x, sprite.y, radius);
    return new createjs.Shape(g);
}
//function to find intersecting point
function circlesIntersect(c1X, c1Y, c1Radius, c2X, c2Y, c2Radius) {
    var distanceX = c2X - c1X;
    var distanceY = c2Y - c1Y;

    var magnitude = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    return magnitude < c1Radius + c2Radius;
}

//function to start the game from level1
function main() {

    //display score label
    scoreText = new createjs.Text("Score:" + score, "20px Impact", "#fff");
    scoreText.x = 25;
    scoreText.y = 25;
    stage.addChild(scoreText);

    //display level label
    levelText = new createjs.Text("Level:" + level, "20px Impact", "#fff");
    levelText.x = 500;
    levelText.y = 25;
    stage.addChild(levelText);

    //display red ball to stop play not to make a goal
    blocksFront = new createjs.Bitmap("assets/images/wall.png");
    blocksFront.regX = 50; 
    blocksFront.regY = 50; 
    blocksFront.x = 300;
    blocksFront.y = 0;
    createjs.Tween.get(blocksFront, { loop: true })
    .to({ x: 300, y: 400 }, 700, createjs.Ease.getPowInOut(1))
    .to({ x: 300, y: 0 }, 700, createjs.Ease.getPowInOut(1));
    blocksFront.image.onload = function () {
        blockCircle1 = createBoundingCircle(blocksFront);
        stage.addChild(blockCircle1);
    }
    stage.addChild(blocksFront);


    //image to of black hole to make a goal
    circleDest = new createjs.Bitmap("assets/images/dest.png");
    circleDest.regX = 30;
    circleDest.regY = 40;
    circleDest.x = 500;
    circleDest.y = 200;
    circleDest.image.onload = function () {
        boundingCircle2 = createBoundingCircle(circleDest);
        stage.addChild(boundingCircle2);
    }
    stage.addChild(circleDest);

    //white ball to make a goal
    circle = new createjs.Bitmap("assets/images/ball1.png");
    circle.regX = 30;
    circle.regY = 40;
    circle.x = 50;
    circle.y = 200;
    circle.image.onload = function () {
        boundingCircle1 = createBoundingCircle(circle);
        stage.addChild(boundingCircle1);
    }
    //white ball click event to make a goal
    circle.addEventListener("click", goal);
    stage.addChild(circle);

}
//to call the ticker 
function goal() {
    //play the sound when clicks on ball
    createjs.Sound.play("hit");
    createjs.Ticker.setFPS(50);
    createjs.Ticker.addEventListener("tick", Level1Event);
}
//function to pass the ball to make a goal
function Level1Event() {
    circle.x += 10;
    stage.removeChild(boundingCircle1);
    boundingCircle1 = createBoundingCircle(circle);

    stage.addChild(boundingCircle1);
    stage.addChild(boundingCircle2);
    stage.addChild(blockCircle1);
    if (circlesIntersect(circle.x, circle.y, getBoundingCircleRadius(circle),
      blocksFront.x, blocksFront.y, getBoundingCircleRadius(blocksFront))) {
        createjs.Sound.play("die");
        gameLost();
        intersect = 1;
    }
    if (intersect == undefined) {
        if (circlesIntersect(circle.x, circle.y, getBoundingCircleRadius(circle),
        circleDest.x, circleDest.y, getBoundingCircleRadius(circleDest))) {
            createjs.Sound.play("hit");
            successinfo();
        }
    }
}
//function to showup level completed message
function successinfo() {
    score += 1000;
    level += 1;
    stage.removeAllChildren();
    var levelbutton = new createjs.Text("Click here to go level-" + level, "40px Impact", "#fff");
    levelbutton.x = 110;
    levelbutton.y = 180;
    levelbutton.addEventListener("click", mainLevel2);
    stage.addChild(levelbutton);
}
//function to prepare all the objects in level2
function mainLevel2() {
    stage.removeAllChildren();
    scoreText = new createjs.Text("Score:" + score, "20px Impact", "#fff");
    scoreText.x = 25;
    scoreText.y = 25;
    stage.addChild(scoreText);

    levelText = new createjs.Text("Level:" + level, "20px Impact", "#fff");
    levelText.x = 500;
    levelText.y = 25;
    stage.addChild(levelText);

    blocksFront = new createjs.Bitmap("assets/images/wall.png");
    blocksFront.regX = 50; // Half image width
    blocksFront.regY = 50; // Half image height
    blocksFront.x = 300;
    blocksFront.y = 0;
    createjs.Tween.get(blocksFront, { loop: true })
    .to({ x: 300, y: 400 }, 1000, createjs.Ease.getPowInOut(1))
    .to({ x: 300, y: 0 }, 1000, createjs.Ease.getPowInOut(1));
    blocksFront.image.onload = function () {
        blockCircle1 = createBoundingCircle(blocksFront);
        stage.addChild(blockCircle1);
    }
    stage.addChild(blocksFront);

    blocksBack = new createjs.Bitmap("assets/images/wall.png");
    blocksBack.regX = 50; // Half image width
    blocksBack.regY = 50; // Half image height
    blocksBack.x = 380;
    blocksBack.y = 400;
    createjs.Tween.get(blocksBack, { loop: true })
    .to({ x: 380, y: 0 }, 700, createjs.Ease.getPowInOut(1))
    .to({ x: 380, y: 400 }, 700, createjs.Ease.getPowInOut(1));
    blocksBack.image.onload = function () {
        blockCircle2 = createBoundingCircle(blocksBack);
        stage.addChild(blockCircle2);
    }
    stage.addChild(blocksBack);



    // hole = new createjs.Graphics().beginStroke('#000').beginFill('#000').drawCircle(0, 0, 13);
    circleDest = new createjs.Bitmap("assets/images/dest.png");
    circleDest.regX = 30; // Half image width
    circleDest.regY = 40; // Half image height
    circleDest.x = 500;
    circleDest.y = 200;
    circleDest.image.onload = function () {
        boundingCircle2 = createBoundingCircle(circleDest);
        stage.addChild(boundingCircle2);
    }
    stage.addChild(circleDest);

    circleLevel2 = new createjs.Bitmap("assets/images/ball1.png");
    circleLevel2.regX = 30; // Half image width
    circleLevel2.regY = 40; // Half image height
    circleLevel2.x = 50;
    circleLevel2.y = 200;
    circle.image.onload = function () {
        boundingCircle1 = createBoundingCircle(circleLevel2);
        stage.addChild(boundingCircle1);
    }
    circleLevel2.addEventListener("click", level2Goal);
    stage.addChild(circleLevel2);
}
//call the level2 event
function level2Goal() {
    createjs.Sound.play("hit");
    createjs.Ticker.setFPS(50);
    createjs.Ticker.addEventListener("tick", Level2Event);
}
//function to check the collision of the objects or goal
function Level2Event() {
    circleLevel2.x += 10;
    stage.removeChild(boundingCircle1);
    boundingCircle1 = createBoundingCircle(circleLevel2);

    stage.addChild(boundingCircle1);
    stage.addChild(boundingCircle2);
    stage.addChild(blockCircle1);
    stage.addChild(blockCircle2);
    if (circlesIntersect(circleLevel2.x, circleLevel2.y, getBoundingCircleRadius(circleLevel2),
     blocksFront.x, blocksFront.y, getBoundingCircleRadius(blocksFront))) {
        createjs.Sound.play("die");
        gameLost();
        intersect = 1;
    }
    if (circlesIntersect(circleLevel2.x, circleLevel2.y, getBoundingCircleRadius(circleLevel2),
    blocksBack.x, blocksBack.y, getBoundingCircleRadius(blocksBack))) {
        createjs.Sound.play("die");
        gameLost();
        intersect = 1;
    }
    if (intersect == undefined) {
        if (circlesIntersect(circleLevel2.x, circleLevel2.y, getBoundingCircleRadius(circleLevel2),
            circleDest.x, circleDest.y, getBoundingCircleRadius(circleDest))) {
            createjs.Sound.play("goal");
            Level2Complete();
        }
    }
}
//function to showup level completed message
function Level2Complete() {
    score += 1000;
    level += 1;
    stage.removeAllChildren();
    var levelbutton = new createjs.Text("Click here to go level-"+level, "40px Impact", "#fff");
    levelbutton.x = 110;
    levelbutton.y = 180;
    stage.addChild(levelbutton);
    levelbutton.addEventListener("click", mainLevel3)
}

//function to call level3
function mainLevel3() {
    stage.removeAllChildren();
    scoreText = new createjs.Text("Score:" + score, "20px Impact", "#fff");
    scoreText.x = 25;
    scoreText.y = 25;
    stage.addChild(scoreText);

    levelText = new createjs.Text("Level:" + level, "20px Impact", "#fff");
    levelText.x = 500;
    levelText.y = 25;
    stage.addChild(levelText);

    blocksFront = new createjs.Bitmap("assets/images/wall.png");
    blocksFront.regX = 50; 
    blocksFront.regY = 50; 
    blocksFront.x = 280;
    blocksFront.y = 0;
    createjs.Tween.get(blocksFront, { loop: true })
    .to({ x: 280, y: 400 }, 3500, createjs.Ease.getPowInOut(1))
    .to({ x: 280, y: 0 }, 3500, createjs.Ease.getPowInOut(1));
    blocksFront.image.onload = function () {
        blockCircle1 = createBoundingCircle(blocksFront);
        stage.addChild(blockCircle1);
    }
    stage.addChild(blocksFront);

    blocksBack = new createjs.Bitmap("assets/images/wall.png");
    blocksBack.regX = 50; 
    blocksBack.regY = 50; 
    blocksBack.x = 350;
    blocksBack.y = 400;
    createjs.Tween.get(blocksBack, { loop: true })
    .to({ x: 350, y: 0 }, 2500, createjs.Ease.getPowInOut(1))
    .to({ x: 350, y: 400 }, 2500, createjs.Ease.getPowInOut(1));
    blocksBack.image.onload = function () {
        blockCircle2 = createBoundingCircle(blocksBack);
        stage.addChild(blockCircle2);
    }
    stage.addChild(blocksBack);

    blocksMiddle = new createjs.Bitmap("assets/images/wall.png");
    blocksMiddle.regX = 50; 
    blocksMiddle.regY = 50;
    blocksMiddle.x = 420;
    blocksMiddle.y = 0;
    createjs.Tween.get(blocksMiddle, { loop: true })
    .to({ x: 420, y: 400 }, 1500, createjs.Ease.getPowInOut(1))
    .to({ x: 420, y: 0 }, 1500, createjs.Ease.getPowInOut(1));
    blocksMiddle.image.onload = function () {
        blockCircle3 = createBoundingCircle(blocksMiddle);
        stage.addChild(blockCircle3);
    }
    stage.addChild(blocksMiddle);


    circleDest = new createjs.Bitmap("assets/images/dest.png");
    circleDest.regX = 30;
    circleDest.regY = 40;
    circleDest.x = 500;
    circleDest.y = 200;
    circleDest.image.onload = function () {
        boundingCircle2 = createBoundingCircle(circleDest);
        stage.addChild(boundingCircle2);
    }
    stage.addChild(circleDest);

    circleLevel3 = new createjs.Bitmap("assets/images/ball1.png");
    circleLevel3.regX = 30; 
    circleLevel3.regY = 40; 
    circleLevel3.x = 50;
    circleLevel3.y = 200;
    circleLevel3.image.onload = function () {
        boundingCircle1 = createBoundingCircle(circleLevel3);
        stage.addChild(circleLevel3);
    }

    circleLevel3.addEventListener("click", level3Goal);
    stage.addChild(circleLevel3);
}
//function to the level event
function level3Goal() {
    createjs.Sound.play("hit");
    createjs.Ticker.setFPS(50);
    createjs.Ticker.addEventListener("tick", Level3Event);
}
//function to check the collision or goal
function Level3Event() {
    circleLevel3.x += 10;
    stage.removeChild(boundingCircle1);
    boundingCircle1 = createBoundingCircle(circleLevel3);

    stage.addChild(boundingCircle1);
    stage.addChild(boundingCircle2);
    stage.addChild(blockCircle1);
    stage.addChild(blockCircle2);
    stage.addChild(blockCircle3);
    if (circlesIntersect(circleLevel3.x, circleLevel3.y, getBoundingCircleRadius(circleLevel3),
                 blocksFront.x, blocksFront.y, getBoundingCircleRadius(blocksFront))) {
        createjs.Sound.play("die");
        gameLost();
        intersect = 1;
    }
    if (circlesIntersect(circleLevel3.x, circleLevel3.y, getBoundingCircleRadius(circleLevel3),
                    blocksMiddle.x, blocksMiddle.y, getBoundingCircleRadius(blocksMiddle))) {
        createjs.Sound.play("die");
        gameLost();
        intersect = 1;
    }
    if (circlesIntersect(circleLevel3.x, circleLevel3.y, getBoundingCircleRadius(circleLevel3),
                blocksBack.x, blocksBack.y, getBoundingCircleRadius(blocksBack))) {
        createjs.Sound.play("die");
        gameLost();
        intersect = 1;
    }
    if (intersect == undefined) {
        if (circlesIntersect(circleLevel3.x, circleLevel3.y, getBoundingCircleRadius(circleLevel3),
            circleDest.x, circleDest.y, getBoundingCircleRadius(circleDest))) {
            createjs.Sound.play("goal");
            gameOver();
        }
    }
}
//function to show game lost details
function gameLost() {
    stage.removeAllChildren();
    var finalScore = new createjs.Text("FinalScore:" + score, "30px Impact", "#fff");
    finalScore.x = 220;
    finalScore.y = 100;
    stage.addChild(finalScore);
    var congrats = new createjs.Text("you lost the game", "30px Impact", "#639ad3");
    congrats.x = 200;
    congrats.y = 140;
    stage.addChild(congrats);
    var gameover = new createjs.Text("Game Over", "40px Impact", "#e2e400");
    gameover.x = 230;
    gameover.y = 180;
    stage.addChild(gameover);
    playAgainButton = new createjs.Bitmap(playAgain);
    playAgainButton.x = 235;
    playAgainButton.y = 230;

    playAgainButton.addEventListener("click", playAgainEvent);
    playAgainButton.addEventListener("mouseout", buttonOutplayAgain);
    playAgainButton.addEventListener("mouseover", buttonOverplayAgain);
    stage.addChild(playAgainButton);
}
//function to shoe gameover details
function gameOver() {
    stage.removeAllChildren();
    score += 1000;
    level += 1;
    var finalScore = new createjs.Text("FinalScore:" + score, "30px Impact", "#fff");
    finalScore.x = 220;
    finalScore.y = 100;
    stage.addChild(finalScore);
    var congrats = new createjs.Text("Congratulations you won the game", "30px Impact", "#639ad3");
    congrats.x = 120;
    congrats.y = 140;
    stage.addChild(congrats);
    var gameover = new createjs.Text("Game Over", "40px Impact", "#e2e400");
    gameover.x = 230;
    gameover.y = 180;
    stage.addChild(gameover);
    playAgainButton = new createjs.Bitmap(playAgain);
    playAgainButton.x = 235;
    playAgainButton.y = 230;

    playAgainButton.addEventListener("click", playAgainEvent);
    playAgainButton.addEventListener("mouseout", buttonOutplayAgain);
    playAgainButton.addEventListener("mouseover", buttonOverplayAgain);
    stage.addChild(playAgainButton);
}

//function to call the play gain event
function playAgainEvent() {
    location.reload();
    stage.removeAllChildren();
    score = 0;
    level = 0;
    main();
}

function buttonOutplayAgain() {
    playAgainButton.alpha = 1;
}

function buttonOverplayAgain() {
    playAgainButton.alpha = 0.5;
}
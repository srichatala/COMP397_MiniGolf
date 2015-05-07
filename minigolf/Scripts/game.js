//Author:Srinivasarao Chatala
//Date-Created:04/25/2015
//Last-modified-by: Sri Chatala
//Last-modified-Date: 05/05/2015
//Description:


//Global variables
var canvas;
var stage;
var titleImg;
var imageBall;
var play;
var instructions;
var score;
var scoreText;
var level;
var levelText;
var circle;
var playbutton;
var instrButton;
var bgrnd;
var title;
var instructionsText;
var backbutton;
var backhome;
var blocksFront;
var blocksMiddle;
var blocksBack;
var playAgain;
var playAgainButton;
var boundingCircle1, boundingCircle2;
var blockCircle1, blockCircle2, blockCircle3;
var circleLevel2;
var circleLevel3;


//initial function to load the game
function init() {

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    score = 0;
    level = 1;
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound("assets/sounds/bgGame.mp3", "background");
    createjs.Sound.registerSound("assets/sounds/bob.mp3", "hit");
    createjs.Sound.registerSound("assets/sounds/PressPlay.mp3", "goal");
    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", tick);

    mainInfo();
}
function tick(e) {
    stage.update();
    createjs.Sound.play("background");
}
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
function gameStart() {
    stage.removeAllChildren();
    main();
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
function instructionsDetails() {
    instructionsText = new createjs.Text("Instructions:\n\n1.Click on white ball to make goal\n\n2.For each goal player will get 1000 points\n\n3.White ball tocuhes the red ball game over\n\n4.In each level one red ball will be increased", "30px impact", "#ffffff");
    instructionsText.x = 25;
    instructionsText.y = 15;
    stage.addChild(instructionsText);
    backhome = new createjs.Bitmap(backbutton);
    backhome.x = 500;
    backhome.y = 340;
    stage.addChild(backhome);
    backhome.addEventListener("click", backhomeEvent);
    backhome.addEventListener("mouseout", buttonOutback);
    backhome.addEventListener("mouseover", buttonOverback);
}
function buttonOutback() {
    backhome.alpha = 1;
}

function buttonOverback() {
    backhome.alpha = 0.5;
}
function backhomeEvent() {
    stage.removeAllChildren();
    mainInfo();
}
function nameImg() {
    title = new createjs.Bitmap(titleImg);
    title.x = 25;
    title.y = 150;
    stage.addChild(title);
    stage.update();
}
function getBoundingCircleRadius(sprite) {
    var radiusInfo = Math.sqrt(((sprite.image.width / 2 * sprite.image.width / 2)
                    + (sprite.image.height / 2 * sprite.image.height / 2)));
    radiusInfo = radiusInfo - 15;
    return radiusInfo;
}
function createBoundingCircle(sprite) {
    var g = new createjs.Graphics();
    var radius = getBoundingCircleRadius(sprite);
    g.drawCircle(sprite.x, sprite.y, radius);
    return new createjs.Shape(g);
}
function circlesIntersect(c1X, c1Y, c1Radius, c2X, c2Y, c2Radius) {
    var distanceX = c2X - c1X;
    var distanceY = c2Y - c1Y;

    var magnitude = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    return magnitude < c1Radius + c2Radius;
}
function main() {
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
    .to({ x: 300, y: 400 }, 3000, createjs.Ease.getPowInOut(1))
    .to({ x: 300, y: 0 }, 3000, createjs.Ease.getPowInOut(1));
    blocksFront.image.onload = function () {
        blockCircle1 = createBoundingCircle(blocksFront);
        stage.addChild(blockCircle1);
    }
    stage.addChild(blocksFront);



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

    // ball = new createjs.Graphics().beginStroke('#000').beginFill('#fff').drawCircle(0, 0, 10);
    circle = new createjs.Bitmap("assets/images/ball1.png");
    circle.regX = 30; // Half image width
    circle.regY = 40; // Half image height
    circle.x = 50;
    circle.y = 200;
    circle.image.onload = function () {
        boundingCircle1 = createBoundingCircle(circle);
        stage.addChild(boundingCircle1);
    }

    

    // circle.addEventListener("click", goal);
    //createjs.Ticker.setFPS(60);
    //createjs.Ticker.addEventListener("tick", wallTick);
    circle.addEventListener("click", goal);
    stage.addChild(circle);

}
function goal() {
    createjs.Sound.play("hit");
    createjs.Ticker.setFPS(50);
    createjs.Ticker.addEventListener("tick", onTick);
}
function onTick() {
    circle.x += 10;
    //circle.rotation = circle.rotation + 1;
    stage.removeChild(boundingCircle1);
    boundingCircle1 = createBoundingCircle(circle);

    stage.addChild(boundingCircle1);
    stage.addChild(boundingCircle2);
    stage.addChild(blockCircle1);

    if (circlesIntersect(circle.x, circle.y, getBoundingCircleRadius(circle),
          circleDest.x, circleDest.y, getBoundingCircleRadius(circleDest))) {
        createjs.Sound.play("goal");
        successinfo();
    }
}
function successinfo() {
    score += 1000;
    level += 1;
    stage.removeAllChildren();
    var levelbutton = new createjs.Text("Click here to go next level", "40px Impact", "#fff");
    levelbutton.x = 130;
    levelbutton.y = 180;
    levelbutton.addEventListener("click", mainLevel2);
    stage.addChild(levelbutton);
}
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
    .to({ x: 300, y: 400 }, 2500, createjs.Ease.getPowInOut(1))
    .to({ x: 300, y: 0 }, 2500, createjs.Ease.getPowInOut(1));
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
    .to({ x: 380, y: 0 }, 2000, createjs.Ease.getPowInOut(1))
    .to({ x: 380, y: 400 }, 2000, createjs.Ease.getPowInOut(1));
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
    circleLevel2.addEventListener("click", goal2);
    stage.addChild(circleLevel2);
}
function goal2() {
    createjs.Sound.play("hit");
    createjs.Ticker.setFPS(50);
    createjs.Ticker.addEventListener("tick", onTick2);
}
function onTick2() {
    circleLevel2.x += 10;
    //circle.rotation = circle.rotation + 1;
    stage.removeChild(boundingCircle1);
    boundingCircle1 = createBoundingCircle(circleLevel2);

    stage.addChild(boundingCircle1);
    stage.addChild(boundingCircle2);
    stage.addChild(blockCircle1);
    stage.addChild(blockCircle2);
    if (circlesIntersect(circleLevel2.x, circleLevel2.y, getBoundingCircleRadius(circleLevel2),
            circleDest.x, circleDest.y, getBoundingCircleRadius(circleDest))) {
        createjs.Sound.play("goal");
        SuccessLevel();


    }// else if (circlesIntersect(circle.x, circle.y, getBoundingCircleRadius(circle),
    //            blocksFront.x, blocksFront.y, getBoundingCircleRadius(blocksFront))) {
    //    gameLost();
    //}
    //stage.update();

}
function SuccessLevel() {
    score += 1000;
    level += 1;
    stage.removeAllChildren();
    var levelbutton = new createjs.Text("Click here to go next level", "40px Impact", "#fff");
    levelbutton.x = 130;
    levelbutton.y = 180;
    stage.addChild(levelbutton);
    levelbutton.addEventListener("click", mainLevel3)
}
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
    blocksFront.regX = 50; // Half image width
    blocksFront.regY = 50; // Half image height
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
    blocksBack.regX = 50; // Half image width
    blocksBack.regY = 50; // Half image height
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
    blocksMiddle.regX = 50; // Half image width
    blocksMiddle.regY = 50; // Half image height
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

    // ball = new createjs.Graphics().beginStroke('#000').beginFill('#fff').drawCircle(0, 0, 10);
    circleLevel3 = new createjs.Bitmap("assets/images/ball1.png");
    circleLevel3.regX = 30; // Half image width
    circleLevel3.regY = 40; // Half image height
    circleLevel3.x = 50;
    circleLevel3.y = 200;
    circleLevel3.image.onload = function () {
        boundingCircle1 = createBoundingCircle(circleLevel3);
        stage.addChild(circleLevel3);
    }

    circleLevel3.addEventListener("click", goal3);
    stage.addChild(circleLevel3);
}
function goal3() {
    createjs.Sound.play("hit");
    createjs.Ticker.setFPS(50);
    createjs.Ticker.addEventListener("tick", onTick3);
}
function onTick3() {
    circleLevel3.x += 15;
    //circle.rotation = circle.rotation + 1;
    stage.removeChild(boundingCircle1);
    boundingCircle1 = createBoundingCircle(circleLevel3);

    stage.addChild(boundingCircle1);
    stage.addChild(boundingCircle2);
    stage.addChild(blockCircle1);
    stage.addChild(blockCircle2);
    stage.addChild(blockCircle3);
    if (circlesIntersect(circleLevel3.x, circleLevel3.y, getBoundingCircleRadius(circleLevel3),
            circleDest.x, circleDest.y, getBoundingCircleRadius(circleDest))) {
        createjs.Sound.play("goal");
        gameOver();


    }// else if (circlesIntersect(circle.x, circle.y, getBoundingCircleRadius(circle),
    //            blocksFront.x, blocksFront.y, getBoundingCircleRadius(blocksFront))) {
    //    gameLost();
    //}
    //stage.update();
}

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
    
    playAgainButton.addEventListener("click", playAgain1);
    playAgainButton.addEventListener("mouseout", buttonOutplayAgain);
    playAgainButton.addEventListener("mouseover", buttonOverplayAgain);
    stage.addChild(playAgainButton);
}
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
function playAgainEvent() {
    stage.removeAllChildren();
    score = 0;
    level = 0;
    mainInfo();
}

function buttonOutplayAgain() {
    playAgainButton.alpha = 1;
}

function buttonOverplayAgain() {
    playAgainButton.alpha = 0.5;
}
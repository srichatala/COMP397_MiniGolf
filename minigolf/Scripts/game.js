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
var ball;
var hole;
var score;
var scoreText;
var level = 0;
var levelText;
var circle;
var nextLevel;
var playbutton;
var instrButton;
var bgrnd;
var title;
var instructionsText;
var backbutton;
var backhome;

//initial function to load the game
function init() {

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    score = 0;
    createjs.Sound.initializeDefaultPlugins();

    var audioPath = "assets/";
    var sounds = [
        { id: "background", src: "bgGame.ogg" },
        { id: "click", src: "bob.ogg" }
    ];

    createjs.Sound.alternateExtensions = ["mp3"];
    // after load is complete
    createjs.Sound.play("background");
    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", tick);

    mainInfo();
}
function tick(e) {
    stage.update();
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
    stage.update();
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
}
function playImg() {
    playbutton = new createjs.Bitmap(play);
    playbutton.x = 230;
    playbutton.y = 150;
    stage.addChild(playbutton);
    stage.update();
    playbutton.addEventListener("click", gameStart);
    playbutton.addEventListener("mouseout", buttonOutplayImg);
    playbutton.addEventListener("mouseover", buttonOverplayImg);
}
function buttonOutplayImg() {
    playbutton.alpha = 1;
}

function buttonOverplayImg() {
    playbutton.alpha = 0.5;
}
function gameStart() {
    stage.removeChild(playbutton);
    stage.removeChild(instrButton);
    stage.removeChild(bgrnd);
    stage.removeChild(title);
    main();
}
function instrImg() {
    instrButton = new createjs.Bitmap(instructions);
    instrButton.x = 230;
    instrButton.y = 250;
    stage.addChild(instrButton);
    stage.update();
    instrButton.addEventListener("click", instructionsInfo);
    instrButton.addEventListener("mouseout", buttonOutinstrImg);
    instrButton.addEventListener("mouseover", buttonOverinstrImg);
}
function buttonOutinstrImg() {
    instrButton.alpha = 1;
}

function buttonOverinstrImg() {
    instrButton.alpha = 0.5;
}
function instructionsInfo() {
    stage.removeChild(playbutton);
    stage.removeChild(instrButton);
    stage.removeChild(bgrnd);
    stage.removeChild(title);
    instructionsDetails();
}
function instructionsDetails() {
    instructionsText = new createjs.Text("Instructions:\n\n1.Click on white ball to make goal\n\n2.For each goal player will get 1000\n   points", "40px impact", "#ffffff");
    instructionsText.x = 25;
    instructionsText.y = 15;
    stage.addChild(instructionsText);
    backhome = new createjs.Bitmap(backbutton);
    backhome.x = 500;
    backhome.y = 340;
    stage.addChild(backhome);
    stage.update();
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
    stage.removeChild(instructionsText);
    stage.removeChild(backhome);
    mainInfo();
}
function nameImg() {
    title = new createjs.Bitmap(titleImg);
    title.x = 25;
    title.y = 150;
    stage.addChild(title);
    stage.update();
}
function main() {
    scoreText = new createjs.Text("0", "20px Impact", "#fff");
    scoreText.text = "Score: "
    scoreText.x = 25;
    scoreText.y = 25;
    stage.addChild(scoreText);
    levelText = new createjs.Text("Level:1", "20px Impact", "#fff");
    levelText.x = 500;
    levelText.y = 25;
    stage.addChild(levelText);
    hole = new createjs.Graphics().beginStroke('#000').beginFill('#000').drawCircle(0, 0, 13);
    var circle1 = new createjs.Shape(hole);
    circle1.x = 500;
    circle1.y = 200;
    stage.addChild(circle1);
    ball = new createjs.Graphics().beginStroke('#000').beginFill('#fff').drawCircle(0, 0, 10);
    circle = new createjs.Shape(ball);
    circle.x = 150;
    circle.y = 200;
    stage.addChild(circle);

    circle.addEventListener("click", goal);
}
function goal() {
    createjs.Tween.get(circle, { loop: false })
   .to({ x: 500, y: 200 }, 1000, createjs.Ease.getPowInOut(1))
   .to({ alpha: 0, y: 200 }, 500, createjs.Ease.getPowInOut(1));

    createjs.Ticker.setFPS(1000);


}
function updateScore() {
    nextLevel = new createjs.Text("Level-2", "20px Impact", "#fff");
    nextLevel.x = canvas.width / 2;
    nextLevel.y = canvas.height / 3;
    stage.addChild(nextLevel);
}
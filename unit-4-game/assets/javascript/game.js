//Global Variables

var targetScore = 0;
var yourScore = 0;

var redValue = 0;
var greenValue = 0;
var purpleValue = 0;
var blueValue = 0; 

var winCount = 0;
var lossCount = 0;

//Functions

function startGame() {
    yourScore = 0;
    targetScore = Math.floor(Math.random() * (120 - 19 + 1)) + 19;
    redValue = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    greenValue = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    purpleValue = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    blueValue = Math.floor(Math.random() * (12 - 1 + 1)) + 1;

    console.log("Target Score: " + targetScore);
    console.log("Red: " + redValue);
    console.log("Green: " + greenValue);
    console.log("Purple: " + purpleValue);
    console.log("Blue: " + blueValue);

    $("#targetScore").html(targetScore);
    $("#yourScore").html(yourScore);
}

function checkScore() {
    if (yourScore > targetScore) {
        alert("You Lose!");
        lossCount++;
        $("#losses").html(lossCount);
        startGame();
    }

    else if(yourScore === targetScore) {
        alert("You Won!")
        winCount++;
        $("#wins").html(winCount);
        startGame();
    }
}

//Main Game

startGame();

$("#red").on("click", function () {
    yourScore = yourScore + redValue;
    $("#yourScore").html(yourScore);
    checkScore();
})

$("#green").on("click", function () {
    yourScore = yourScore + greenValue;
    $("#yourScore").html(yourScore);
    checkScore();
})

$("#purple").on("click", function () {
    yourScore = yourScore + purpleValue;
    $("#yourScore").html(yourScore);
    checkScore();
})

$("#blue").on("click", function () {
    yourScore = yourScore + blueValue;
    $("#yourScore").html(yourScore);
    checkScore();
})
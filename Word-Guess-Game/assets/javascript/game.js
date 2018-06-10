//Hangman Pokemon edition (first 150, well some of them anyway)

//Global Variables

var wordsList = ["pikachu", "eevee", "bulbasaur", "charmander", "squirtle", "meowth",
"vaporeon", "jolteon", "flareon", "charizard", "blastoise", "vulpix", "butterfree"];

var chosenPokemon = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];
var letterGuessed = "";

var winCount = 0;
var lossCount = 0;
var numGuesses = 10;

//Functions

function startGame() {

  numGuesses = 10;
  chosenPokemon = wordsList[Math.floor(Math.random() * wordsList.length)];
  lettersInWord = chosenPokemon.split("");
  numBlanks = lettersInWord.length;
  blanksAndSuccesses = [];
  wrongGuesses = [];

  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  document.getElementById("guessesLeft").innerHTML = numGuesses;
  document.getElementById("dashes").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("lettersGuessed").innerHTML = wrongGuesses.join(" ");
}

function letterChecker(letter) {

  var letterInWord = false;

  for (var i = 0; i < numBlanks; i++) {
    if (chosenPokemon[i] === letter) {
      letterInWord = true;
    }
  }

  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenPokemon[j] === letter) {
        blanksAndSuccesses[j] = letter;
      }
    }
  }

  else {
    wrongGuesses.push(letter);
    numGuesses--;
  }

}

function roundOver() {

  document.getElementById("guessesLeft").innerHTML = numGuesses;
  document.getElementById("dashes").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("lettersGuessed").innerHTML = wrongGuesses.join(" ");


  if (lettersInWord.toString() === blanksAndSuccesses.toString()) {
    winCount++;
    alert("You win!");
    document.getElementById("winCount").innerHTML = winCount;
    startGame();
  }

  else if (numGuesses === 0) {
    lossCount++;
    alert("You lose");
    document.getElementById("lossCount").innerHTML = lossCount;
    startGame();
  }

}

//Call functions

startGame();

document.onkeyup = function(event) {
  userGuess = String.fromCharCode(event.which).toLowerCase();
  letterChecker(userGuess);
  roundOver();
};

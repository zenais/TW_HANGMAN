const { WORDS_TO_GUESS, HANGMAN_PICS } = require("./constants");
const constants = require("./constants");
// In node.js: install a prompt library by running: `npm install prompt-sync` in the current folder
const prompt = require("prompt-sync")();

// Here you see an example how to get your
// constants from constants.js
// for(let figure of constants.HANGMAN_PICS)
// {
//     console.log(figure);
// }

// how to use the prompt - e.g.:
// const name = prompt('What is your name?');

//THOMAS
//add array for letters
let usedLetters = [];
let revealedLetters = [];
//add variable lives
let lives = constants.HANGMAN_PICS.length;
//console.log(`Lives: ${constants.HANGMAN_PICS.length}`); //CONTROL
//add variable random Word from content.js
let randomWord =
  WORDS_TO_GUESS[Math.floor(Math.random() * WORDS_TO_GUESS.length)];
//console.log(randomWord); //CONTROL
// console.log(`Letters / TopScore: ${randomWord.length}`); //CONTROL
// let x = randomWord.toLowerCase().split(''); //CONTROL
// console.log(`Second Letter: ${x[2]}`); //CONTROL
let arrayRandomWord = putCharactersToArray();
//console.log(arrayRandomWord); //CONTROL
//add variable for looping
let loopGoesOn = true;
//add variable for score
let topScore = 0;
let letter = "";
//add Loop (Gameplay)

while (loopGoesOn === true) {
  console.clear();
  displayHangman();
  // letter = prompt('Guess a letter!');
  letter = letter.toLowerCase();
  if (letter === "quit") {
    console.log(`GOOD-BYE`);
    loopGoesOn = false;
  } else if (letter === "") {
    null;
  } else if (letter.length !== 1) {
    console.log(`Your entry is invalid!`);
  } else if (usedLetters.includes(letter)) {
    console.log(`You already revealed this letter. Choose another one!`);
  } else if (arrayRandomWord.includes(letter.toLowerCase()) === true) {
    console.log(`"${letter}" is correct`);
    usedLetters.push(letter);
    topScore = topScore + countLettersInArray(letter);
    //console.log(countLettersInArray(letter)); //CONTROL
  } else if (arrayRandomWord.includes(letter.toLowerCase()) === false) {
    console.log(`"${letter}" is wrong`);
    usedLetters.push(letter);
    lives = lives - 1;
  }
  if (lives <= 0) {
    console.log(`GAME OVER`);
    loopGoesOn = false;
  }
  if (topScore === randomWord.length) {
    console.log(`YOU WIN`);
    loopGoesOn = false;
    break;
  }
  letter = prompt("Guess a letter!");
}

///////// TODO:
// insert Animation, but using console.clear to stay at the same positoin in terminal
// add difficulty levels eg. word with character (3-5) easy, (5-8) normal, >8hard
// The art sequence is adapted to the starting value of the lives parameter(at least between 3 and 7) – this means that the game over art is always the same.
// display undercores and show revealed letters
// put stuff from loop in functions at the end
// clean code

// Add functions:
function displayHangman() {
  let picNo = HANGMAN_PICS.length - lives;
  console.log(`Guess all the letters!`);
  console.log(HANGMAN_PICS[picNo]);
}
function checkEntry() {}
function checkRepetition() {}
function checkLives() {
  // + display GAME OVER
}
function quitGame() {}
function putCharactersToArray() {
  // let chars = randomWord.toLowerCase().split('');
  // let array =[]
  // for (i = 0; i < randomWord.length; i++) {
  //     array.push(chars[i]);
  // }
  // return array;
  return randomWord.toLowerCase().split("");
}

// why count letters
function countLettersInArray(inputLetter) {
  let sameLetters = 0;
  for (i = 0; i < arrayRandomWord.length; i++) {
    if (arrayRandomWord[i] === inputLetter) {
      sameLetters = sameLetters + 1;
    }
  }
  return sameLetters;
}

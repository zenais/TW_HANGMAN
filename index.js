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

let usedLetters = []; //add array for letters
let lives = constants.HANGMAN_PICS.length; //add variable lives
//console.log(`Lives: ${constants.HANGMAN_PICS.length}`); //CONTROL
let randomWord = WORDS_TO_GUESS[Math.floor(Math.random() * WORDS_TO_GUESS.length)];
// let randomWord = 'Bruck an der Leitha'; //CONTROL
// let randomWord = 'Bad Ischl'; //CONTROLL
// let randomWord = 'Drosendorf-Zissersdorf'; //CONTROL
// let randomWord = 'St. Valentin'; //CONTROL
//console.log(randomWord); //CONTROL
// let x = randomWord.toLowerCase().split(''); //CONTROL
// console.log(`Second Letter: ${x[2]}`); //CONTROL
let arrayRandomWord = randomWord.toLowerCase().split("");
//console.log(arrayRandomWord); //CONTROL

let arrayDisplayStatus = displayUnderscores(); //add display line
let loopGoesOn = true; //add variable for looping
let topScore = 0; //add variable for score
let letter = ""; //add nothing so Startscreen doesnt display invaled input from beginning
letter = letter.toLowerCase(); //so input is always lower case

//add Loop (Gameplay)

//###########INTRO SCREEN#############
console.clear();
// display intro screen and ask for difficulty level e/n/h
let startDifficulty = introScreen();
let wordList = [];
if (startDifficulty === "e"){
  for (let word of WORDS_TO_GUESS){
    if (word.length <= 5 ) wordList.push(word);
  }
}else if (startDifficulty === "n"){
  for (let word of WORDS_TO_GUESS){
    if (word.length <= 5 ) wordList.push(word);
  }
}
console.log(wordList);
prompt();

//####################################

while (loopGoesOn === true) {
 
  console.clear(); //so image of hangman stays at the same position in terminal
  
  displayHangman();

  console.log(`${arrayDisplayStatus.join("")} \n`);

  if (letter === "quit") {
    quitGame();
    break;
  } else if (letter === "") {
    null; //add nothing so Startscreen doesnt display invaled input from beginning
  } else if (letter.length !== 1 || /^[A-Za-z]/.test(letter) === false) {
    ifInputInvalid();
  } else if (usedLetters.includes(letter)) {
    ifUsedLetter();
  } else if (arrayRandomWord.includes(letter.toLowerCase()) === true) {
    ifLetterCorrect();
  } else if (arrayRandomWord.includes(letter.toLowerCase()) === false) {
    ifLetterWrong();
  }
  if (lives <= 0) {
    displayGameOver();
    break;
  }
  if (topScore === onlyCountLettersInArray(arrayRandomWord)) {
    displayGameWin();
    break;
  }

  letter = prompt("Guess a letter!");
  
  checkStatus();
}

function introScreen() {
  let level = "n";

  while (true) {
    console.log(constants.INTRO_SCREEN);
    console.log(
      "Pick difficulty level \n" +
      "EASY \t 3 - 5 letters (e)\n" +
      "NORMAL \t 6 - 9 letters t(n)\n" +
      "HARD \t 10 -  letters(h)\n");
    level = prompt("e/n/h  :  ");
    if (level === "e" || level === "n" || level === "h") {
      break;
    }
  };
  return level;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// TODO:
// The art sequence is adapted to the starting value of the lives parameter(at least between 3 and 7) – this means that the game over art is always the same.
// put stuff from loop in functions at the end
// clean code


///////////////////////////////////////////////////////////////////////////////////////////////////////
// Add functions:
function displayHangman() {
  let picNo = HANGMAN_PICS.length - lives;
  console.log(`Guess all the letters! \n("quit" to exit game) \n`);
  console.log(HANGMAN_PICS[picNo]);
}
function checkEntry() {}
function checkRepetition() {}
function checkLives() {
  // + display GAME OVERgit
}
function quitGame() {
  console.log(`GOOD-BYE`);
  loopGoesOn = false;
}

// why count letters
function amountOfSameLetters() {
  let sameLetters = 0;
  for (i = 0; i < arrayRandomWord.length; i++) {
    if (arrayRandomWord[i] === letter) {
      sameLetters = sameLetters + 1;
    }
  }
  return sameLetters;
}
function displayUnderscores() {
  let array = [];
  for (i = 0; i < arrayRandomWord.length; i++) {
    if (arrayRandomWord[i] === ' ') {
      array.push('  ');
    } else if (arrayRandomWord[i] === '-') {
      array.push('- ');
    } else if (arrayRandomWord[i] === '.') {
      array.push('. ');
    } else {
      array.push('_ ');
    }
  }
  return array;
}
function checkStatus() {
  let array = randomWord.split("");

  for (i = 0; i < randomWord.length; i++) {
    if (arrayRandomWord[i] === letter) {
      arrayDisplayStatus[i] = array[i] +' ';
    }
  }
}
function onlyCountLettersInArray(array) {
  let n = 0

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== ' ' && array[i] !== '.' && array[i] !== '-' ) {
      n = n + 1;
    }
  }

  return n;
}
function ifInputInvalid() {
  console.log(`Your entry "${letter}" is invalid!`);
}
function ifUsedLetter() {
  console.log(`You already revealed this letter. Choose another one!`);
}
function ifLetterCorrect() {
  console.log(`"${letter}" is correct`);
  usedLetters.push(letter);
  topScore = topScore + amountOfSameLetters();
  //console.log(amountOfSameLetters()); //CONTROL
}
function ifLetterWrong() {
  console.log(`"${letter}" is wrong`);
  usedLetters.push(letter);
  lives = lives - 1;
}
function displayGameOver() {
  //console.log(`GAME OVER`);
  //GAME OVER console line replaced with ascii art
  console.log(constants.LOSE_SCREEN);
  loopGoesOn = false;
}
function displayGameWin() {
  //console.log(`YOU WIN`);
  //YOU WIN console line replaced with ascii art
  console.log(constants.HAPPY_HANGMAN_PIC);
  console.log(constants.WIN_SCREEN); 
  loopGoesOn = false;
}
const { WORDS_TO_GUESS, HANGMAN_PICS } = require("./constants");
const constants = require("./constants");
// In node.js: install a prompt library by running: `npm install prompt-sync` in the current folder
const prompt = require("prompt-sync")({sigint: true});


let usedLetters = []; //add array for letters
let lives = constants.HANGMAN_PICS.length; //add variable lives

//console.log(`Lives: ${constants.HANGMAN_PICS.length}`); //CONTROL
//console.log(randomWord); //CONTROL
// let x = randomWord.toLowerCase().split(''); //CONTROL
// console.log(`Second Letter: ${x[2]}`); //CONTROL


//###########INTRO SCREEN#############
console.clear();
// display intro screen and ask for difficulty level e/n/h
let difficulty = introScreen();
let wordList = generateWordlist(difficulty); 
let randomWord = wordList[Math.floor(Math.random() * wordList.length)];

//####################################

let arrayRandomWord = randomWord.toLowerCase().split("");

//console.log(arrayRandomWord); //CONTROL

let arrayDisplayStatus = displayUnderscores(); //add display line
let loopGoesOn = true; //add variable for looping
let topScore = 0; //add variable for score
let letter = ""; //add nothing so Startscreen doesnt display invaled input from beginning
let consoleMessage = '';
//add Loop (Gameplay)


while (loopGoesOn === true) {
  displayHangman();
  //console.log(lives); //CONTROL
  console.log(`${arrayDisplayStatus.join("")} \n`);
  console.log(consoleMessage);

  letter = prompt("Guess a letter! ");
  letter = letter.toLowerCase(); //so input is always lower case
  
  if (letter === "quit") {
    quitGame();
    break;
  } else if (letter === "") {
    null; //add nothing so Startscreen doesnt display invaled input from beginning
    consoleMessage = '';
  } else if (letter.length !== 1 || /^[A-Za-z]/.test(letter) === false) {
    consoleMessage = ifInputInvalid();
  } else if (usedLetters.includes(letter)) {
    consoleMessage = ifUsedLetter();
  } else if (arrayRandomWord.includes(letter.toLowerCase()) === true) {
    consoleMessage = ifLetterCorrect();
  } else if (arrayRandomWord.includes(letter.toLowerCase()) === false) {
    consoleMessage = ifLetterWrong();
  }
  console.clear(); //so image of hangman stays at the same position in terminal
  if (lives <= 1) {
    displayGameOver();
    break;
  }
  if (topScore === onlyCountLettersInArray(arrayRandomWord)) {
    displayGameWin();
    break;
  }
  
  checkStatus();
}

function generateWordlist(difficulty) {
  let wordListTmp = [];
  if (difficulty === "e") {
    for (let word of WORDS_TO_GUESS) {
      if (word.length <= 5)
        wordListTmp.push(word);
    }
  } else if (difficulty === "n") {
    for (let word of WORDS_TO_GUESS) {
      if (word.length > 5 && word.length < 10)
        wordListTmp.push(word);
    }
  } else if (difficulty === "h") {
    for (let word of WORDS_TO_GUESS) {
      if (word.length >= 10)
        wordListTmp.push(word);
    }
  }
  return wordListTmp;
 }

function introScreen() {
  let level = "n";
  
  while (true) {
    console.log(constants.INTRO_SCREEN);
    console.log(
      "(\"quit\" to exit game) \n" +
      "Pick difficulty level \n" +
      "EASY \t 3 - 5 letters (e)\n" +
      "NORMAL \t 6 - 9 letters t(n)\n" +
      "HARD \t 10 -  letters(h)\n");
    level = prompt("e/n/h  :  ");
    if (level === "e" || level === "n" || level === "h") {
      break;
    } else if (level === "quit"){
      process.exit(1);
    } else (prompt("No such option available"));
  };
  return level;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// TODO:
// The art sequence is adapted to the starting value of the lives parameter(at least between 3 and 7) – this means that the game over art is always the same.
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
  //console.log(`GOOD-BYE`);
  loopGoesOn = false;
  return ('GOOD-BYE')
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
  return `Your entry "${letter}" is invalid!`;
}
function ifUsedLetter() {
  return `You already revealed this letter. Choose another one!`;
}
function ifLetterCorrect() {
  usedLetters.push(letter);
  topScore = topScore + amountOfSameLetters();
  //console.log(amountOfSameLetters()); //CONTROL
  return `"${letter}" is correct`;
}
function ifLetterWrong() {
  usedLetters.push(letter);
  lives = lives - 1;
  return `"${letter}" is wrong`;
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
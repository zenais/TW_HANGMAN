const { WORDS_TO_GUESS, HANGMAN_PICS } = require("./constants");
const constants = require("./constants");
// In node.js: install a prompt library by running: `npm install prompt-sync` in the current folder
const prompt = require("prompt-sync")({ sigint: true });

let usedLetters = []; //add array for letters
let lives = constants.HANGMAN_PICS.length; //add variable lives

//console.log(`Lives: ${constants.HANGMAN_PICS.length}`); //CONTROL
//console.log(randomWord); //CONTROL
// let x = randomWord.toLowerCase().split(''); //CONTROL
// console.log(`Second Letter: ${x[2]}`); //CONTROL

//###########INTRO SCREEN#############
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
let consoleMessage = "";
//add Loop (Gameplay)

console.clear();

while (loopGoesOn === true) {
  displayHangman();
  //console.log(lives); //CONTROL
  console.log(`${arrayDisplayStatus.join("")} \n`);
  console.log(consoleMessage);

  letter = prompt("Guess a letter! ");
  //letter = letter.toLowerCase(); //so input is always lower case

  if (letter.toLowerCase() === "quit") {
    quitGame();
    break;
  } else if (letter === "") {
    null; //add nothing so Startscreen doesnt display invaled input from beginning
    consoleMessage = "";
  } else if (letter.length !== 1 || /^[A-Za-z]/.test(letter) === false) {
    consoleMessage = ifInputInvalid();
  } else if (usedLetters.includes(letter.toLowerCase())) {
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

//////////////////////////////////////////////////////////////////////////////
///////////////// FUNCTIONS //////////////////////////////////////////////////

/* FUNCTION generateWordlist
purpose:    function goes through values in WORDS_TO_GUESS list,
            and assigns them to a new array (wordListTmp) in accordance
            to difficulty.
arguments: wordListTmp - copy of values from WORDS_TO_GUESS
returns:   array of copied values */
function generateWordlist(difficulty) {
  let wordListTmp = [];
  if (difficulty === "e") {
    for (let word of WORDS_TO_GUESS) {
      if (word.length <= 5) wordListTmp.push(word);
    }
  } else if (difficulty === "n") {
    for (let word of WORDS_TO_GUESS) {
      if (word.length > 5 && word.length < 10) wordListTmp.push(word);
    }
  } else if (difficulty === "h") {
    for (let word of WORDS_TO_GUESS) {
      if (word.length >= 10) wordListTmp.push(word);
    }
  }
  return wordListTmp;
}

/* FUNCTION introScreen
purpose:  this function ask user for input in form of
          a letter (e/n/h) or "quit". And displays all 
          the options on console screen
return:   return value is a character e, n or h  */
function introScreen() {
  let level = "n";

  while (true) {
    console.clear();
    console.log(constants.INTRO_SCREEN);
    console.log(
      '("quit" to exit game) \n' +
        "Pick difficulty level \n" +
        "EASY \t 3 - 5 letters \t(e)\n" +
        "NORMAL \t 6 - 9 letters \t(n)\n" +
        "HARD \t >10   letters \t(h)\n"
    );
    level = prompt("e/n/h  :  ");
    level = level.toLowerCase();
    
    if (level === "e" || level === "n" || level === "h") {
      break;
    } else if (level === "quit") {
      console.log(`GOOD-BYE`);
      process.exit(1);
    } else prompt("No such option available ");
  }
  return level;
}

//purpose: displays HANGMAN image depending on lives status
function displayHangman() {
  let picNo = HANGMAN_PICS.length - lives;
  console.log(`Guess all the letters! \n("quit" to exit game) \n`);
  console.log(HANGMAN_PICS[picNo]);
}
//purpose: dislpays Good-bye and sets loop to false
function quitGame() {
  console.log(`GOOD-BYE`);
  loopGoesOn = false;
  //return ('GOOD-BYE')
}

//purpose: counts same letter in arrayRandomWord, later to use for subtraction from topscore
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
    if (arrayRandomWord[i] === " ") {
      array.push("  ");
    } else if (arrayRandomWord[i] === "-") {
      array.push("- ");
    } else if (arrayRandomWord[i] === ".") {
      array.push(". ");
    } else {
      array.push("_ ");
    }
  }
  return array;
}
function checkStatus() {
  let array = randomWord.split("");

  for (i = 0; i < randomWord.length; i++) {
    if (arrayRandomWord[i] === letter) {
      arrayDisplayStatus[i] = array[i] + " ";
    }
  }
}
function onlyCountLettersInArray(array) {
  let n = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== " " && array[i] !== "." && array[i] !== "-") {
      n = n + 1;
    }
  }
  return n;
}
function ifInputInvalid() {
  return `Your entry "${letter}" is invalid!`;
}
function ifUsedLetter() {
  return `You already revealed "${letter}". Choose another letter!`;
}
function ifLetterCorrect() {
  usedLetters.push(letter.toLowerCase());
  topScore = topScore + amountOfSameLetters();
  //console.log(amountOfSameLetters()); //CONTROL
  return `"${letter}" is correct`;
}
function ifLetterWrong() {
  usedLetters.push(letter.toLowerCase());
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

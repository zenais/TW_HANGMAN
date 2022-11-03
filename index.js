const { WORDS_TO_GUESS, HANGMAN_PICS } = require("./constants");
const constants = require("./constants");
const prompt = require("prompt-sync")({ sigint: true });

let usedLetters = []; //add array for letters
let lives = constants.HANGMAN_PICS.length; //add variable lives

//###########INTRO SCREEN#############
let difficulty = introScreen();
let wordList = generateWordlist(difficulty);
let randomWord = wordList[Math.floor(Math.random() * wordList.length)];
//####################################

let arrayRandomWord = randomWord.toLowerCase().split("");

let arrayDisplayStatus = displayUnderscores(); //add display line
let loopGoesOn = true; //add variable for looping
let topScore = 0; //add variable for score
let letter = ""; //add nothing so Startscreen doesnt display invaled input from beginning
let consoleMessage = "";

console.clear();

while (loopGoesOn === true) {
  displayHangman();
  console.log(`${arrayDisplayStatus.join("")} \n`);
  console.log(consoleMessage);

  letter = prompt("Guess a letter! ");

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
//purpose: creates array; adds underscore-values in array
//if arrayRandomWord-values are not space, minus or dot; adds space, minus and dots as it is in array
//argument: null
//return: array with underscore values
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
//purpose: creates array out of randomWord; if values from arrayRandomWord equal to letter it changes arrayDisplayStatus-value to randomWord value
function checkStatus() {
  let array = randomWord.split("");

  for (i = 0; i < randomWord.length; i++) {
    if (arrayRandomWord[i] === letter) {
      arrayDisplayStatus[i] = array[i] + " ";
    }
  }
}
//purpose: create variable; counts n if array value is not space, dot or minus to compare with topScore
//argument: array
//return: number of same letters
function onlyCountLettersInArray(array) {
  let n = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== " " && array[i] !== "." && array[i] !== "-") {
      n = n + 1;
    }
  }
  return n;
}
//purpose: display if input invalid
function ifInputInvalid() {
  return `Your entry "${letter}" is invalid!`;
}
function ifUsedLetter() {
  return `You already revealed "${letter}". Choose another letter! \nUsed letters ${usedLetters.join(", ")}`;
}
//purpose: adds and sorts correct letter into usedLetters-array; counts topScore
//argument: null
//return: correct letter text; 
function ifLetterCorrect() {
  usedLetters.push(letter.toLowerCase());
  usedLetters.sort();
  topScore = topScore + amountOfSameLetters();
  return `"${letter}" is correct`;
}
//purpose: adds and sorts correct letter into usedLetters-array; counts lives
//argument: null
//return: wrong letter text; 
function ifLetterWrong() {
  usedLetters.push(letter.toLowerCase());
  usedLetters.sort();
  lives = lives - 1;
  return `"${letter}" is wrong`;
}
//purpose: displays dead hangman; sets loop to false
function displayGameOver() {
  console.log(constants.LOSE_SCREEN);
  loopGoesOn = false;
}
//purpose: displays happy hangman; sets loop to false
function displayGameWin() {
  console.log(constants.WIN_SCREEN);
  loopGoesOn = false;
}

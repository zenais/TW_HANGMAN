const { WORDS_TO_GUESS, HANGMAN_PICS } = require("./constants");
const constants = require("./constants");
// In node.js: install a prompt library by running: `npm install prompt-sync` in the current folder
const prompt = require("prompt-sync")({sigint: true});

// Here you see an example how to get your
// constants from constants.js
// for(let figure of constants.HANGMAN_PICS)
// {
//     console.log(figure);
// }

// how to use the prompt - e.g.:
// const name = prompt('What is your name?');

//THOMAS
<<<<<<< HEAD

let usedLetters = []; //add array for letters
let lives = constants.HANGMAN_PICS.length; //add variable lives
//console.log(`Lives: ${constants.HANGMAN_PICS.length}`); //CONTROL
let randomWord = WORDS_TO_GUESS[Math.floor(Math.random() * WORDS_TO_GUESS.length)];
// let randomWord = 'Bruck an der Leitha'; //CONTROL
// let randomWord = 'Bad Ischl'; //CONTROLL
// let randomWord = 'Drosendorf-Zissersdorf'; //CONTROL
// let randomWord = 'St. Valentin'; //CONTROL
=======
//add array for letters
let usedLetters = [];
// let revealedLetters = [];
//add variable lives
let lives = constants.HANGMAN_PICS.length;
//console.log(`Lives: ${constants.HANGMAN_PICS.length}`); //CONTROL
//add variable random Word from content.js
//WORDS_TO_GUESS[Math.floor(Math.random() * WORDS_TO_GUESS.length)];
>>>>>>> branchZinaida2.0
//console.log(randomWord); //CONTROL
// let x = randomWord.toLowerCase().split(''); //CONTROL
// console.log(`Second Letter: ${x[2]}`); //CONTROL
<<<<<<< HEAD
let arrayRandomWord = randomWord.toLowerCase().split("");
=======
// let arrayRandomWord = putCharactersToArray();

//###########INTRO SCREEN#############
console.clear();
// display intro screen and ask for difficulty level e/n/h
let difficulty = introScreen();
let wordList = generateWordlist(difficulty); 
let randomWord = wordList[Math.floor(Math.random() * wordList.length)];
let arrayRandomWord = putCharactersToArray(randomWord);

//####################################
>>>>>>> branchZinaida2.0
//console.log(arrayRandomWord); //CONTROL

let arrayDisplayStatus = displayUnderscores(); //add display line
let loopGoesOn = true; //add variable for looping
let topScore = 0; //add variable for score
let letter = ""; //add nothing so Startscreen doesnt display invaled input from beginning
letter = letter.toLowerCase(); //so input is always lower case
let consoleMessage = '';
//add Loop (Gameplay)

<<<<<<< HEAD
//###########INTRO SCREEN#############
console.clear();
// display intro screen and ask for difficulty level e/n/h
// let startDifficulty = introScreen();
let wordList = [];
// if (startDifficulty === "e"){
//   for (let word of WORDS_TO_GUESS){
//     if (word.length <= 5 ) wordList.push(word);
//   }
// }else if (startDifficulty === "n"){
//   for (let word of WORDS_TO_GUESS){
//     if (word.length <= 5 ) wordList.push(word);
//   }
// }
// console.log(wordList);
// prompt();

//####################################
=======
>>>>>>> branchZinaida2.0

while (loopGoesOn === true) {
  displayHangman();
  //console.log(lives); //CONTROL
  console.log(`${arrayDisplayStatus.join("")} \n`);
  console.log(consoleMessage);

  letter = prompt("Guess a letter!");
  
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
<<<<<<< HEAD
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
=======
    console.log(`"${letter}" is correct`);
    usedLetters.push(letter);
    //revealedLetters.push(letter);
    // checkStatus();
    // for (i = 0; i < arrayRandomWord.length; i++) {
      //   if arrayRandomWord[i] === letter {
        
        //   }
        // }
        topScore = topScore + countLettersInArray(letter);
        //console.log(countLettersInArray(letter)); //CONTROL
      } else if (arrayRandomWord.includes(letter.toLowerCase()) === false) {
        console.log(`"${letter}" is wrong`);
        usedLetters.push(letter);
        lives = lives - 1;
      }
  if (lives <= 0) {
    //console.log(`GAME OVER`);
    //GAME OVER console line replaced with ascii art
    console.clear();
    console.log(constants.LOSE_SCREEN);
    loopGoesOn = false;
    break;
  }
  if (topScore === randomWord.length) {
    //console.log(`YOU WIN`);
    //YOU WIN console line replaced with ascii art
    console.clear();
    console.log(constants.HAPPY_HANGMAN_PIC);
    console.log(constants.WIN_SCREEN); 
    loopGoesOn = false;
>>>>>>> branchZinaida2.0
    break;
  }
  
<<<<<<< HEAD
  checkStatus();
=======
  letter = prompt("Guess a letter!");
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
>>>>>>> branchZinaida2.0
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
<<<<<<< HEAD
      level = prompt("e/n/h  :  ");
      if (level === "e" || level === "n" || level === "h") {
        break;
    }
=======
    level = prompt("e/n/h  :  ");
    if (level === "e" || level === "n" || level === "h") {
      break;
    } else if (level === "quit"){
      process.exit(1);
    } else (prompt("No such option available"));
>>>>>>> branchZinaida2.0
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
<<<<<<< HEAD
function quitGame() {
  //console.log(`GOOD-BYE`);
  loopGoesOn = false;
  return ('GOOD-BYE')
=======
function quitGame() {}
function putCharactersToArray(randomWord) {
  // let chars = randomWord.toLowerCase().split('');
  // let array =[]
  // for (i = 0; i < randomWord.length; i++) {
  //     array.push(chars[i]);
  // }
  // return array;
  return randomWord.toLowerCase().split("");
>>>>>>> branchZinaida2.0
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
<<<<<<< HEAD
    if (arrayRandomWord[i] === letter) {
      arrayDisplayStatus[i] = array[i] +' ';
=======
    if (arrayRandomWord[i] === letter /* && revealedLetters.includes(letter) */) {
      arrayDisplayStatus[i] = letter +' ';
>>>>>>> branchZinaida2.0
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
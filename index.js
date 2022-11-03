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
//add array for letters
let usedLetters = [];
// let revealedLetters = [];
//add variable lives
let lives = constants.HANGMAN_PICS.length;
//console.log(`Lives: ${constants.HANGMAN_PICS.length}`); //CONTROL
//add variable random Word from content.js
//WORDS_TO_GUESS[Math.floor(Math.random() * WORDS_TO_GUESS.length)];
//console.log(randomWord); //CONTROL
// console.log(`Letters / TopScore: ${randomWord.length}`); //CONTROL
// let x = randomWord.toLowerCase().split(''); //CONTROL
// console.log(`Second Letter: ${x[2]}`); //CONTROL
// let arrayRandomWord = putCharactersToArray();

//###########INTRO SCREEN#############
console.clear();
// display intro screen and ask for difficulty level e/n/h
let difficulty = introScreen();
let wordList = generateWordlist(difficulty); 
let randomWord = wordList[Math.floor(Math.random() * wordList.length)];
let arrayRandomWord = putCharactersToArray(randomWord);

//####################################
//console.log(arrayRandomWord); //CONTROL

//add display line
let arrayDisplayStatus = displayUnderscores();
//add variable for looping
let loopGoesOn = true;
//add variable for score
let topScore = 0;
let letter = "";
letter = letter.toLowerCase();
//add Loop (Gameplay)


while (loopGoesOn === true) {
  // insert image of hangman, image shall stay at the same positoin in terminal
  console.clear();
  
  displayHangman();
  console.log(arrayDisplayStatus.join(""));
  // letter = prompt('Guess a letter!');
  if (letter === "quit") {
    console.log(`GOOD-BYE`);
    loopGoesOn = false;
    break;
  } else if (letter === "") {
    null;
  } else if (letter.length !== 1 && /^[A-Za-z]/.test(letter)) {
    console.log(`Your entry "${letter}" is invalid!`);
  } else if (usedLetters.includes(letter)) {
    console.log(`You already revealed this letter. Choose another one!`);
  } else if (arrayRandomWord.includes(letter.toLowerCase()) === true) {
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
    break;
  }


  
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
    else (prompt("No such option available"));
  };
  return level;
}

///////// TODO:
// add difficulty levels eg. word with character (3-5) easy, (5-8) normal, >8hard
// The art sequence is adapted to the starting value of the lives parameter(at least between 3 and 7) – this means that the game over art is always the same.
// display undercores and show revealed letters
// put stuff from loop in functions at the end
// clean code

// Add functions:
function displayHangman() {
  let picNo = HANGMAN_PICS.length - lives;
  console.log(`Guess all the letters! \n ("quit" to exit game)`);
  console.log(HANGMAN_PICS[picNo]);
}
function checkEntry() {}
function checkRepetition() {}
function checkLives() {
  // + display GAME OVERgit
}
function quitGame() {}
function putCharactersToArray(randomWord) {
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
  for (i = 0; i < randomWord.length; i++) {
    if (arrayRandomWord[i] === letter /* && revealedLetters.includes(letter) */) {
      arrayDisplayStatus[i] = letter +' ';
    }
  }
}

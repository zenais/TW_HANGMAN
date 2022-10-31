const constants = require('./constants');
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



// Test bitte löschen nach lesen!




//THOMAS
//add array for letters
let LETTERS = []; 
//add variabel lives
let lives = constants.HANGMAN_PICS.length;



//add Loop (Gameplay)
/* while (lives > 0) {
    let letter = prompt('Guess a letter!');
    if (letter != /^[A-Za-z]{1}/) {
        console.log(`Your entry is invalid!`)
    } else {
        letter = 0
    }
} */

















// Add functions:
function displayHangman () {

} 
function checkEntry () {

}
function checkRepetition () {

}
function checkLives () {
    // + display GAME OVER
}
function quitGame () {

}
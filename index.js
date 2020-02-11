const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// Valid string inputs ------------------------------------------------------
const correctAnswer = ['yes', 'y', 'ys'];
const wrongAnswer = ['no', 'n'];
const highAnswer = ['higher', 'h', 'high'];
const lowAnswer = ['lower', 'l', 'low'];
const playComputerGuessing = ['computer', 'comp', 'c'];
const playPlayerGuessing = ['player', 'play', 'p'];
const validGameTypeInput = [...playComputerGuessing, ...playPlayerGuessing];
let setRangeMax = process.argv.slice(3);
let setRangeMin = process.argv.slice(2, 3);

// Function list ------------------------------------------------------------

// readline function
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Sanatizes string input
function sanitizeString(string) {
  string = string
    .trim()
    .toString()
    .toLowerCase();
  return string;
}

// Creates a random integer between two numbers as efficiently as possible, for computer guessing
function binarySearchAlgorithm(min, max) {
  return Math.floor((max - min) / 2 + min);
}

// Computer uses this to randomly guess a number in range
function randomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Starts the game
chooseGameType();

//Sets up if computer guesses or player guesses
async function chooseGameType() {
  console.log(`\nPlease type one of these to choose a game type: ${validGameTypeInput.join(', ')}.\n`);

  // Sets up chooseGameType to be checked if valid input
  let gameTypeInput = '';

  // Sanitizes user input to choose game type
  while (!validGameTypeInput.includes(sanitizeString(gameTypeInput))) {
    // User input enables game type
    gameTypeInput = await ask('Would you (player) like to guess the number or have me (computer) guess the number? ');

    // Chooses which game type is initiated
    if (playComputerGuessing.includes(sanitizeString(gameTypeInput))) {
      computerStart(); // Chooses computer will guess
    }

    if (playPlayerGuessing.includes(sanitizeString(gameTypeInput))) {
      playerStart(); // Chooses player will guess
    }
  }
}

// note: use array indexing to see if ^^^ that will work

// Computer guesses your number ---------------------------------------------
async function computerStart() {
  console.log("\nLet's play a game where you (human) make up a number\nand I (computer) try to guess it.\n");

  // Game setup -------------------------------------------------------------
  setRangeMin = +setRangeMin; // changes from object to a number
  setRangeMax = +setRangeMax;
  let guessCounter = 0;

  const secretNumber = await ask('What is your secret number? ');

  // Initializes first random number guessed
  let computerGuess = binarySearchAlgorithm(setRangeMin, setRangeMax);

  // Sets up guessQuestion to include correct answer
  let guessQuestion = '';

  // Game logic -------------------------------------------------------------
  while (!correctAnswer.includes(sanitizeString(guessQuestion))) {
    guessQuestion = await ask(`Is your number ${computerGuess}? `);
    guessCounter += 1;

    if (wrongAnswer.includes(sanitizeString(guessQuestion))) {
      let highOrLow = await ask('Is it higher or lower? ');

      // Start HighOrLow if loop branch
      if (highAnswer.includes(sanitizeString(highOrLow))) {
        console.log('Looks like I need to guess higher.');

        setRangeMin = computerGuess + 1;

        computerGuess = randomInteger(setRangeMin, setRangeMax);
      } else if (lowAnswer.includes(sanitizeString(highOrLow))) {
        console.log('Looks like I need to guess lower.');

        setRangeMax = computerGuess - 1;

        computerGuess = randomInteger(setRangeMin, setRangeMax);
      } else {
        console.log('You will need to input higher or lower.');
      }
      // End HighOrLow if loop branch
    }
  }
  // End of while loop
  console.log(`Ha HA! I have guessed your number in ${guessCounter} guesses!`);
  process.exit();
}

// Player guesses the computers number --------------------------------------
async function playerStart() {
  console.log("\nLet's play a game where I (computer) make up a number\nand you (human) try to guess it.\n");

  // Game setup -------------------------------------------------------------
  setRangeMin = +setRangeMin; // Changes from object to number
  setRangeMax = +setRangeMax;

  console.log('I (computer) will now guess a number between that range!');

  // Sets computers number
  const computerSecretNumber = randomInteger(setRangeMin, setRangeMax);

  let playerGuess = null;

  // Game logic -------------------------------------------------------------
  while (playerGuess !== computerSecretNumber) {
    playerGuess = await ask(`Is your number: `);

    if (playerGuess < computerSecretNumber) {
      console.log('You need to guess higher!');
    } else if (playerGuess > computerSecretNumber) {
      console.log('You need to guess lower!');
    } else {
      console.log('YES! ARE YOU A PYSCHIC? HOW DID YOU GUESS MY NUMBER?');
      process.exit();
    }
  }
}

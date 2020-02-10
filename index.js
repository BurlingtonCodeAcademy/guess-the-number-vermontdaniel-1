const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
// Valid string inputs -----------------------------
const correctAnswer = "yes" || "y" || "ys";
const wrongAnswer = "no" || "n";
const highAnswer = "higher" || "h" || "high";
const playComputerGuessing = "computer";
const playPlayerGuessing = "player";

// Function list -----------------------------------
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
} // Sanatizes string input
function sanitizeString(string) {
  string = string
    .toString()
    .trim()
    .toLowerCase();
  return string;
} // Creates a random integer between two numbers
function randomInteger(min, max) {
  return Math.floor((max - min) / 2 + min);
}

// Starts the game
chooseGameType();

//Sets up if computer guesses or player guesses
async function chooseGameType() {
  console.log(
    "\nPlease type either computer, to have the computer guess the number \nor player for the player to guess the number.\n"
  );
  let chooseType = await ask(
    "Would you like to guess the number or have me (computer) guess the number? "
  );
  if (chooseType === playComputerGuessing) {
    computerStart();
  } else if (chooseType === playPlayerGuessing) {
    playerStart();
  }
}
// Computer guesses your number
async function computerStart() {
  console.log(
    "\nLet's play a game where you (human) make up a number\nand I (computer) try to guess it.\n"
  );
  // Game setup
  let setRangeMin = await ask("What is the minimum number I can guess to? ");
  setRangeMin = +setRangeMin; // changes setRangeMin to a number
  let setRangeMax = await ask("What is the maximum number I can guess to? ");
  setRangeMax = +setRangeMax; // changes setRangeMax to a number
  const secretNumber = await ask("What is your secret number? ");
  let computerGuess = randomInteger(setRangeMin, setRangeMax);
  let guessQuestion = null;

  while (guessQuestion !== correctAnswer) {
    guessQuestion = await ask(`Is your number ${computerGuess}? `);

    if (guessQuestion === sanitizeString(wrongAnswer)) {
      let highOrLow = await ask("Is it higher or lower? ");
      // Start HighOrLow if loop branch
      if (highOrLow === sanitizeString(highAnswer)) {
        console.log("Looks like I need to guess higher.");
        setRangeMin = computerGuess + 1;
        computerGuess = randomInteger(setRangeMin, setRangeMax);
      } else {
        console.log("Looks like I need to guess lower.");
        setRangeMax = computerGuess - 1;
        computerGuess = randomInteger(setRangeMin, setRangeMax);
      }
      // End HighOrLow if loop branch
    }
  }

  console.log("YES! ARE YOU A PYSCHIC? HOW DID YOU GUESS MY NUMBER?");
  process.exit();
}
// Player guesses the computers number
async function playerStart() {
  console.log(
    "\nLet's play a game where I (computer) make up a number\nand you (human) try to guess it.\n"
  );

  //Game setup
  let setRangeMin = await ask(
    "What is the minimum number you want to guess to? "
  );
  setRangeMin = +setRangeMin;
  let setRangeMax = await ask(
    "What is the maximum number you want to guess to? "
  );
  setRangeMax = +setRangeMax;
  console.log("I (computer) will now guess a number between that range!");
  const computerSecretNumber = randomInteger(setRangeMin, setRangeMax);
  let playerGuess = null;

  while (playerGuess !== computerSecretNumber) {
    playerGuess = await ask(`Is your number: `);

    if (playerGuess < computerSecretNumber) {
      console.log("You need to guess higher!");
    } else if (playerGuess > computerSecretNumber) {
      console.log("You need to guess lower!");
    } else {
      console.log("Yes that is my number!");
      process.exit();
    }
  }
}


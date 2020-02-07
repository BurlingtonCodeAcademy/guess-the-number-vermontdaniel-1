const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
// Valid string inputs
const correctAnswer = "yes" || "y";
const wrongAnswer = "no" || "n";
const highAnswer = "higher" || "h";
const lowAnswer = "lower" || "l";

// Functions --------------------------------
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
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}

start();

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  // Game setup
  let setRangeMin = await ask("What is the minimum number I can guess to? ");
  let setRangeMax = await ask("What is the maximum number I can guess to? ");
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  // computerGuess does not work as intended, filled in as 1, 100
  let computerGuess = randomInteger(1, 100);

  while (computerGuess !== secretNumber) {
    let guessQuestion = await ask(`Is your number ${computerGuess} `);
  }
  if (guessQuestion === correctAnswer) {
    console.log("YES! ARE YOU A PYSCHIC? HOW DID YOU GUESS MY NUMBER?");
  } else if (guessQuestion === wrongAnswer) {
    let highOrLow = await ask("Is it higher or lower? ");
    if (highOrLow === highAnswer) {
      console.log("You need to guess higher.");
    } else {
      console.log("You need to guess lower.");
    }
  }
  process.exit();
}

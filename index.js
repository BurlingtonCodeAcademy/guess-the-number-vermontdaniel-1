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
  return Math.floor(Math.random() * (max - min)) + min;
}

start();

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  // Game setup
  let setRangeMin = await ask("What is the minimum number I can guess to? ");
  setRangeMin = +setRangeMin;
  let setRangeMax = await ask("What is the maximum number I can guess to? ");
  setRangeMax = +setRangeMax;
  let secretNumber = await ask("What is your secret number? ");
  let computerGuess = randomInteger(setRangeMin, setRangeMax);
  let guessQuestion = await ask(`Is your number ${computerGuess}? `);

  while (guessQuestion !== sanitizeString(correctAnswer))

  if (guessQuestion === sanitizeString(wrongAnswer)) {
    let highOrLow = await ask("Is it higher or lower? ");

    if (highOrLow === sanitizeString(highAnswer)) {
      console.log("You need to guess higher.");
      setRangeMin = computerGuess;
      guessQuestion = await ask(`Is your number ${computerGuess}? `);
    } else {
      console.log("You need to guess lower.");
      setRangeMax = computerGuess;
      guessQuestion = await ask(`Is your number ${computerGuess}? `);
    }
  }  
  console.log("YES! ARE YOU A PYSCHIC? HOW DID YOU GUESS MY NUMBER?");
  process.exit();
}

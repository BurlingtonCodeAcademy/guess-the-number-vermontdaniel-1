const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
// Valid string inputs
const correctAnswer = "yes" || "y";
const wrongAnswer = "no" || "n";
const highAnswer = "higher" || "h";

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
    "\nLet's play a game where you (human) make up a number\nand I (computer) try to guess it.\n"
  );
  // Game setup
  let setRangeMin = await ask("What is the minimum number I can guess to? ");
  setRangeMin = +setRangeMin;
  let setRangeMax = await ask("What is the maximum number I can guess to? ");
  setRangeMax = +setRangeMax;
  const secretNumber = await ask("What is your secret number? ");
  let computerGuess = randomInteger(setRangeMin, setRangeMax);
  let guessQuestion = null;

  while (guessQuestion !== correctAnswer || computerGuess === secretNumber) {
    guessQuestion = await ask(`Is your number ${computerGuess}? `);

    if (guessQuestion === sanitizeString(wrongAnswer)) {
      let highOrLow = await ask("Is it higher or lower? ");
      // Start HighOrLow if loop branch
      if (highOrLow === sanitizeString(highAnswer)) {
        console.log("Looks like I need to guess higher.");
        setRangeMin = computerGuess;
        computerGuess = randomInteger(setRangeMin, setRangeMax);
      } else {
        console.log("Looks like I need to guess lower.");
        setRangeMax = computerGuess;
        computerGuess = randomInteger(setRangeMin, setRangeMax);
      }
      // End HighOrLow if loop branch
    }
  }
  console.log("YES! ARE YOU A PYSCHIC? HOW DID YOU GUESS MY NUMBER?");
  process.exit();
}

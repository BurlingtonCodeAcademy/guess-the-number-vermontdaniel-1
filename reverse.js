const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

// Function list -----------------------------------
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
} // Sanitizes string input
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

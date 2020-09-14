// v 1.0.0
const startButton = document.querySelector(".other");
const gameContainer = document.querySelector(".game-container");
const words = document.getElementById("words");
const seconds = document.getElementById("seconds");
const scoreSheet = document.getElementById("score");
const showInput = document.querySelector(".my-input > h4");
const input = document.getElementById("input");
const submit = document.forms[0];
const select = document.querySelector("select");
const difficultyOptions = document.querySelectorAll("option");

// select.addEventListener("click", (e) => {
//   e.preventDefault();
// });
// PENDING!!!!
// difficultyOptions.forEach((value) => {
//   value.addEventListener("select", (e) => {
//     e.preventDefault();
//     console.log(e);
//   });
// });

showInput.innerText = "Value displays here";

// ?words used
const wordsUsed = [
  "genetologist",
  "pneumonia",
  "africa",
  "jean",
  "santa",
  "second",
  "matter",
  "primary",
  "main",
  "judgemental",
  "clarify",
  "amnesia",
  "physics",
  "sick",
  "height",
  "christ",
  "teevo",
  "rhapsody",
  "oyakhilome",
];

let computerWords, addonTime;
let score = 0;
// ?randomise words
function randomWords() {
  computerWords = wordsUsed[Math.floor(Math.random() * wordsUsed.length)];
  words.innerText = computerWords;

  // ?time structure with words
  /*addonTime = computerWords.length > 7 ? computerWords.length + 4 : computerWords.length;*/
}

// toggle startbutton
function toggleFunc() {
  gameContainer.classList.toggle("active");
  if (gameContainer.className === "game-container active") {
    startButton.innerHTML = "<h2>Stop</h2>";
  } else {
    startButton.innerHTML = "<h2>Get Started</h2>";
  }
}

let int, s;
// ?start timer
function startTimer(f) {
  // ?for every word six seconds is given //// to be upgraded to ?seconds given depending on length of words.
  s = 9;
  s += f;
  int = setInterval(() => {
    s--;
    if (s <= 0) {
      stopGame();
    }
    seconds.innerText = `${s}s`;
  }, 1000);
}

// ?stop timer
function stopTimer() {
  clearInterval(int);
}

// ?display input value
function inputValue() {
  if (input.value !== "") {
    showInput.innerText = input.value;
  } else {
    showInput.innerText = "Value displays here";
  }
  checkForResult();
}

// ?start game
function startGame() {
  toggleFunc();
  randomWords();
  startTimer(0);
}

// ?stop game
function stopGame() {
  stopTimer();
  setTimeout(toggleFunc, 2000);
}

// ? correct word // proceed
function proceed() {
  randomWords();
  input.value = "";
  showInput.innerText = "Value displays here";
  input.focus();
  s += 4;
  score += 3;
  scoreSheet.innerText = score;
}

function checkForResult() {
  if (input.value === computerWords) {
    proceed();
  }
}

// ?event listener
// ?start button
startButton.addEventListener("click", startGame);

// ?oninput
input.addEventListener("input", inputValue);

// ?onsubmit
submit.addEventListener("submit", (e) => {
  e.preventDefault();
  checkForResult();
});

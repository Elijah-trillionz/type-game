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
const gameOver_div = document.querySelector(".game-over-content");
const bodyContainer = document.querySelector(".body-container");

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
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

let computerWords, addonTime;
let score = 0;
let difficultyLevel = "Easy";
// ?randomise words
function randomWords() {
  computerWords = wordsUsed[Math.floor(Math.random() * wordsUsed.length)];
  words.innerText = computerWords;

  // ?time structure with words
  /*addonTime = computerWords.length > 7 ? computerWords.length + 4 : computerWords.length;*/
}

// toggle startbutton
function toggleFunc() {
  gameContainer.classList.add("active");
  if (gameContainer.className === "game-container active") {
    startButton.innerHTML = "<h2>Stop</h2>";
    startButton.removeEventListener("click", startGame);
    startButton.addEventListener("click", () => {
      stopGame(false);
    });
  }
}

function changeDifficulty() {
  checkForResult(false, select.value);
}

let int, s;
// ?start timer
function startTimer(f) {
  // ?for every word six seconds is given //// to be upgraded to ?seconds given depending on length of words.
  s = 0;
  s += f;
  int = setInterval(() => {
    s--;
    if (s <= 0) {
      stopGame(true);
    }
    seconds.innerText = `${s}s`;
  }, 1000);
}

// ?show alerts
function alertInfo(header, text, btnText, btnEvent) {
  gameOver_div.querySelector("h3").innerText = header;
  gameOver_div.querySelector("p").innerHTML = text;
  if (btnEvent) {
    gameOver_div.querySelector("button").style.display = "block";
    gameOver_div.querySelector("button").innerText = btnText;
    gameOver_div.querySelector("button").addEventListener("click", () => {
      location.reload();
    });
  }
}

// ?display input value
function inputValue() {
  if (input.value !== "") {
    showInput.innerText = input.value;
  } else {
    showInput.innerText = "Value displays here";
  }
  checkForResult(true, select.value);
}

// ?start game
function startGame() {
  toggleFunc();
  randomWords();
  startTimer(9);
}

// ?stop game
function stopGame(btn) {
  // stop timer
  clearInterval(int);
  // show alert with info
  gameOver_div.classList.add("active");
  bodyContainer.classList.add("active");
  const scoreInfo = `${
    btn ? "You ran out of time" : "You stopped the game while"
  } spelling "${computerWords}". <br><br><b>Your Score: </b><p>${score}</p>`;
  alertInfo(
    "Game Over",
    scoreInfo,
    btn ? "Try Again" : null,
    btn ? true : false
  );
}

// ? correct word // proceed
function proceed(difficultyLvl) {
  randomWords();
  input.value = "";
  showInput.innerText = "Value displays here";
  input.focus();
  switch (difficultyLvl) {
    case "Easy":
      s += 4;
      break;
    case "Hard":
      s += 3;
      break;
    case "Very Hard":
      s += 2;
      break;
    default:
      s += 4;
  }
  console.log(s);
  score += 3;
  scoreSheet.innerText = score;
}

function checkForResult(x, difficultyLvl) {
  if (x !== true) {
    return;
  }
  if (input.value === computerWords) {
    proceed(difficultyLvl);
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

// on selection
select.addEventListener("change", changeDifficulty);

// Creating the score object to track the game score
const score = {
  wins: 0,
  losses: 0,
  ties: 0,
};

// Adding an event listener to check if data is available in the local storage
window.addEventListener("storage", updateScore(), true);
// Generating the computer move [Using random number]
// Then comparing user and computer moves
function generateComputerMove(userMove) {
  // Using random method to generate random value
  const randNumber = Math.random();
  // Creating a variable to hold computer move
  let computerMove = "";
  // Checking the random value to assign a move
  // Assumption [dividing random range into 3 sections]
  if (randNumber >= 0 && randNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randNumber >= 1 / 3 && randNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randNumber >= 2 / 3 && randNumber < 1) {
    computerMove = "Scissors";
  }

  // Printing the generated computer move
  console.log(randNumber, " - ", computerMove);

  // Calling the moves comaprison function
  compareMoves(computerMove, userMove);
}

// Creating a function to compare moves
function compareMoves(computerChioce, userChoice) {
  // Creating a variable to store comaprison result
  let theResult = "";

  // Comparing user and computer moves
  if (computerChioce === userChoice) {
    theResult = "Tie.";
  } else if (computerChioce === "Rock" && userChoice === "Paper") {
    theResult = "You win.";
  } else if (computerChioce === "Rock" && userChoice === "Scissors") {
    theResult = "You lose.";
  } else if (computerChioce === "Paper" && userChoice === "Rock") {
    theResult = "You lose.";
  } else if (computerChioce === "Paper" && userChoice === "Scissors") {
    theResult = "You win.";
  } else if (computerChioce === "Scissors" && userChoice === "Rock") {
    theResult = "You win.";
  } else if (computerChioce === "Scissors" && userChoice === "Paper") {
    theResult = "You lose.";
  }

  // Updating the game score
  if (theResult === "You win.") {
    score.wins += 1;
  } else if (theResult === "Tie.") {
    score.ties += 1;
  } else if (theResult === "You lose.") {
    score.losses += 1;
  }

  // Storing the current score in the Local Storage Object
  // localStorage object works with "String" typed data, so we need to convert
  // the score object into string before adding it
  localStorage.setItem("score", JSON.stringify(score));
  // Displaying the result
  displayResults(theResult, computerChioce, userChoice);
}

// Creating a function to reset the game score
function resetCounters() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  // Clearing the local storage
  localStorage.removeItem("score");
  // Informing the user
  displayResults();
}

// Creaing a function to display game details
function displayResults(
  aResult = "New Game",
  aComputerChoice = "No Moves",
  aUserChoice = "No Moves"
) {
  // Linking with the paragraphs
  let theResultDisplay = document.querySelector(".jsResult");
  let theMovesDisplay = document.querySelector(".jsMoves");
  let theScoreDisplay = document.querySelector(".jsScore");
  theResultDisplay.innerHTML = aResult;
  theMovesDisplay.innerHTML = `You
        <img class="moveIcon" src="//images/${aUserChoice}Final.png" alt="Rock"/>
        <img class="moveIcon" src="//images/${aComputerChoice}Final.png" alt="Rock"/>
        Computer`;
  theScoreDisplay.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Adding a function to update the score object using the local storage
function updateScore() {
  // Getting the data from the local Storage object
  let newScore = JSON.parse(localStorage.getItem("score"));
  // Checking if the score object is not null
  if (newScore === null) {
    alert("There is no saved score.");
  } else {
    alert("Saved score available");
    // Updating the score object
    score.wins = newScore.wins;
    score.ties = newScore.ties;
    score.losses = newScore.losses;
    displayResults();
  }
}

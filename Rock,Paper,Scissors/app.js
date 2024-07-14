let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const useerScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  //   console.log("draw game");
  msg.innerText = "Game was draw. Play again";
  msg.style.backgroundColor = "#081b31";
};

const showwinner = (userWin, userchoice, compChoice) => {
  if (userWin) {
    userScore++;
    useerScorePara.innerText = userScore;
    // console.log("You win!");
    msg.innerText = `You win! Your ${userchoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    // console.log("you lose");
    msg.innerText = `You lose. ${compChoice} beats your ${userchoice}`;
    msg.style.backgroundColor = "red";
  }
};

const palyGame = (userchoice) => {
  console.log("User choice = ", userchoice);
  //Generate computer choice
  const compChoice = genCompChoice();
  //   console.log("Computer choice = ", compChoice);

  if (userchoice === compChoice) {
    //draw game
    drawGame();
  } else {
    let userWin = true;
    if (userchoice === "rock") {
      //scissors, paper
      userWin = compChoice === "paper" ? false : true;
      //   showwinner(userWin, userchoice, compChoice);
    } else if (userchoice === "paper") {
      //rock, scissors
      userWin = compChoice === "scissors" ? false : true;
      //   showwinner(userWin, userchoice, compChoice);
    } else {
      //paper, rock
      userWin = compChoice === "rock" ? false : true;
    }
    showwinner(userWin, userchoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userchoice = choice.getAttribute("id");
    palyGame(userchoice);
  });
});

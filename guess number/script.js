"use strict";

// console.log(document.querySelector(".message").textContent);

// document.querySelector(".message").textContent = "Correct Number!";
// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 17;

// console.log(document.querySelector(".guess").value);
// document.querySelector(".guess").value = 5;

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

const displayMessage = function(meassag){
  document.querySelector(".message").textContent = meassag;
}

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  if (!guess) {
    displayMessage("⛔No namber");


    //  WHEN PLAYER WINS
  }else if(guess === secretNumber){
    displayMessage("🎉Correct Number!")
    document.querySelector(".number").textContent = secretNumber;
    document.body.style.backgroundColor = ("#60b347");
    document.querySelector(".number").style.width = "30rem";
    let highscore = Number(document.querySelector(".highscore").textContent); 
    if(highscore < score){
      highscore = score;
      document.querySelector(".highscore").textContent = score;
    }

    //WHEN GUESS WRONG
  }else if(guess !== secretNumber){
    if(score > 1){
      displayMessage(guess > secretNumber ? "📈Too high!" : "📉Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    }else{
      displayMessage("💥You lost hte game");
      document.querySelector(".score").textContent = 0;
    }
  }
});

  //  AGAIN THE GAME
document.querySelector(".again").addEventListener("click", function(){
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.body.style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = " ";
  displayMessage("Start guessing...")
  document.querySelector(".score").textContent = "20";
  score = 20;

})


let header = document.getElementById("header");
let highScoreBtn = document.getElementById("high-score");
let timer = document.getElementById("timer");
//This span will change the countdown time//
let countdown = document.getElementById("countdown");
let quizContainer = document.getElementById("quiz-container");
let startSection = document.getElementById("start");
let instructions = document.getElementById("instructions");
let startBtn = document.getElementById("start-quiz");
let questionSection = document.getElementById("quiz-questions");
let questions = document.getElementById("questions");
let answers = document.getElementById("answers");
let endSection = document.getElementById("end");
let gameOver = document.getElementById("game-over");
let finalScore = document.getElementById("final-score");
let textInput = document.getElementById("name");
let submitBtn = document.getElementById("submit");

startBtn.addEventListener("click", startGame);

let countdownStart = 60;
let countdownEnd = 0;
let timeLeft = countdownStart;


function startGame() {
    console.log("clicked");

    let countdownInterval;
    let timeLeft = 60;

    countdownInterval = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
        } else {
            countdown.textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);

    function showQuestions() {
        const currentSection = document.querySelector(".start");
        const nextSection = document.querySelector(".quiz_questions");
        
        currentSection.style.display = "none";
        nextSection.style.display = "block";
    }
    setTimeout(showQuestions, );
}



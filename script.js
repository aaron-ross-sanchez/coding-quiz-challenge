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
let questionArea = document.getElementById("questions");
let answers = document.getElementById("answers");
let endSection = document.getElementById("end");
let gameOver = document.getElementById("game-over");
let score = document.getElementById("score");
let initials = document.getElementById("initials");
let finalScore = document.getElementById("final-score");

let textInput = document.getElementById("name");
let submitBtn = document.getElementById("submit");

startBtn.addEventListener("click", startGame);

let countdownStart = 60;
let countdownEnd = 0;
let timeLeft = countdownStart;


let currentQuestionIndex = 0;
let questions = [
    { 
		prompt: `Inside which HTML 
				element do we put 
				the JavaScript?`, 
		options: [ 
			"<javascript>", 
			"<js>", 
			"<script>", 
			"<scripting>", 
		], 
		answer: "<script>", 
	}
]

function startGame() {
    console.log("clicked");

    let countdownInterval;
    let timeLeft = 1;

    countdownInterval = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            showGameOver();

        } else {
            countdown.textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);

    function showQuestions() {
        startSection.style.display = "none";
        questionSection.style.display = "flex";
    }
    setTimeout(showQuestions, );
}

function showGameOver() {
    startSection.style.display = "none";
    questionSection.style.display = "none";
    timer.style.display = "none";
    endSection.classList.remove('hide_end');

    // endSection.style.display = "flex";
    // endSection.style.flexDirection = "column";
    // gameOver.style.fontSize = "42px";
    // score.style.fontSize = "20px";
    // initials.style.padding = "20px";
    // initials.style.fontSize = "20px";
}
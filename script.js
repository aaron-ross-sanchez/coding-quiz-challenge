//Structural DOM
let header = document.getElementById("header");
let quizContainer = document.getElementById("quiz-container");

//Button DOM
let highScoreBtn = document.getElementById("high-score");
let submitBtn = document.getElementById("submit");
let startBtn = document.getElementById("start-quiz");

//Constant Text DOM
let timer = document.getElementById("timer");
let score = document.getElementById("score");
let initials = document.getElementById("initials");

//Text Input DOM
let textInput = document.getElementById("name");

//Changing Element DOM
let countdown = document.getElementById("countdown");
let finalScore = document.getElementById("final-score");
let questionArea = document.getElementById("questions");

//Section DOM
let startSection = document.getElementById("start");
let questionSection = document.getElementById("quiz-questions");
let endSection = document.getElementById("end");

//Text DOM
let instructions = document.getElementById("instructions");


//This might not be necessary if I store the answers in the question array
let answers = document.getElementById("answers");

// got rid of this ID, keeping incase I need to debug and was wrong
// let gameOver = document.getElementById("game-over");


//When the user clicks the Start button, the startGame function will run
//This is where it all starts
//This will jump down to the function startGame()
startBtn.addEventListener("click", startGame);

//Variables defined for a consistent countdown
let countdownStart = 59;
let countdownEnd = 0;
let timeLeft = countdownStart;

//Questions
//This is an array
let questions = [
    //This is an object
    { 
		prompt: `Which tag is used to define an unordered list in HTML?`, 
		options: [ 
			"<ol>", 
			"<li>", 
			"<ul>", 
			"<unordered>", 
		], 
		answer: "<ul>", 
        review: "<ul> is used to create unordered lists in HTML. <ol> is used to create ordered lists, while <li> creates list items for either list type.",
	}, 
    {
        prompt: `Which CSS property is used to change the text color of an element?`,
        options: [
            "color", 
			"text-color", 
			"font-color", 
			"style-color",
        ],
        answer: "color",
        review: "The color property is used to change the text color. The other 'properties' are not real.",
    },
    {
        prompt: `Which keyword is used to declare a variable in JavaScript?`,
        options: [
            "let", 
			"var", 
			"const", 
			"All of the Above",
        ],
        answer: "All of the Above",
        review: "Let, var, and const all declare variables in JavaScript",
    },
    {
        prompt: `Which operator is used for a strict equality comparison in JavaScript?`,
        options: [
            "=", 
			"!==", 
			"===", 
			"==",
        ],
        answer: "===",
        review: "=== checks both the value and type equality, whicle == just checks value.",
    },
    {
        prompt: `What does HTML stand for?`,
        options: [
            "Hyper Text Markup Language", 
			"Hyper Typography Marks Lots", 
			"Higher Type Markup Language", 
			"Hyper Text Modify Language",
        ],
        answer: "Hyper Text Markup Language",
        review: "HTML stands for Hyper Text Markup Language",
    }
]

//This sets the first question to appear to be the first one
let currentQuestionIndex = 0;

//This function is in the checkAnswer() and startGame()
function displayQuestion() {
    //this will initially clear the questionArea that was defined at the beginning of the file
    questionArea.innerHTML = '';

    //Creates a div called questionDiv
    let questionDiv = document.createElement("div");
    //Adds a class to questionDiv
    questionDiv.classList.add("questionArray");

    //Creates a paragraph elemenent called prompt
    let prompt = document.createElement("p");
    //This replaces the initial value of prompt with the value from the prompt variable in the question objects, depending on the question it is on.
    prompt.textContent = questions[currentQuestionIndex].prompt;
    prompt.classList.add("prompt");
    //This makes prompt a child of questionDiv
    questionDiv.appendChild(prompt);

    //Creates an unordered list called optionsList
    let optionsList = document.createElement("ul");
    optionsList.classList.add("optionsList");

    //This is a forEach loop that will create multiple optionItem's depending on if the program looped through all of the options in the question array
    questions[currentQuestionIndex].options.forEach(option => {
        //This makes every optionItem a button
        let optionItem = document.createElement("button");
        optionItem.classList.add("optionItem");
        //This replaces tbhe optionItems with the actual options from the question array
        optionItem.textContent = option;
        //This will run the function checkAnswer once an optionItem is clicked. It will check if the option selected is correct (true)
        optionItem.addEventListener("click", function() {
            checkAnswer(option);
        });
        optionsList.appendChild(optionItem);
    });

    //This makes optionsList a child of questionDiv
    questionDiv.appendChild(optionsList);
    //This makes questionDiv a child of questionArea
    questionArea.appendChild(questionDiv);
}

//This is the checkAnswer function, and the value option that was run through the function during the event listener wil be the value selected answer
function checkAnswer(selectedAnswer) {
    //defines the variable correctAnswer as the answer variable from the question array, and it will take into accound the currentQuestionIndex
    let correctAnswer = questions[currentQuestionIndex].answer;
    
    //Creates new element and class, a div called containerDiv
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("containerDiv");

    //Creates new element and class, a div called feedback
    let feedback = document.createElement("div");
    feedback.classList.add("feedback");

    //Creates new element and class, a button called nextButton
    let nextButton = document.createElement("button");
    nextButton.classList.add("nextButton");

    //Creates new element and class, a div called divider
    let divider = document.createElement("div");
    divider.classList.add("divider");

    //Creates new element and class, a div called explanation
    let explanation = document.createElement("div");
    explanation.classList.add("explanation");

    //conditional statement.
    //If the selectedAnswer is the correctAnswer
    if (selectedAnswer === correctAnswer) {
        //the feedback will say "Correct!"
        feedback.textContent = "Correct!";
        //the review variable from the questions array objects will be printed in the explanation div
        explanation.textContent = questions[currentQuestionIndex].review;
        //10 seconds/points will be added to the time/score
        timeLeft += 10;
        //this was a test for myself to make sure the funciton worked
        console.log("Correct!");
    // else this will happen
    } else {
        feedback.textContent = "Incorrect!";
        explanation.textContent = questions[currentQuestionIndex].review;
        //10 seconds/points will be reduced from the time/score
        timeLeft -= 10;
        console.log("Incorrect");
    }

    let optionsList = document.querySelector(".optionsList");
    if (optionsList) {
        optionsList.style.display = "none";
    }

    //feedback.classList.add("feedback");
    containerDiv.appendChild(feedback);
    containerDiv.appendChild(nextButton);

    questionArea.appendChild(containerDiv);
    questionArea.appendChild(divider);
    questionArea.appendChild(explanation);

    nextButton.textContent = "Next";
    nextButton.addEventListener("click", function() {
        feedback.style.display = "none";
        nextButton.style.display = "none";
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showGameOver();
        }
    });
}

//this declares the function startGame
function startGame() {
    //the first thing coded is a console.log to see if the addEventListener worked
    console.log("clicked");

    //variables defined for the if statement of the quiz timer
    let countdownInterval;

    //this redefines the value as countdownInterval to "repeatedly calls a function" "with a fixed time delay between each call"
    countdownInterval = setInterval(function () {
        //This code says that if the timeLeft is less than or equal to zero, then the countdownInterval setInterval stops and the showGameOver function is ran
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            showGameOver();
        //If the timeLeft is greater than 0, the code in else will run
        } else {
            //"This line updates the text displayed in the HTML element represented by countdown to show the value stored in the timeLeft variable."
            countdown.textContent = timeLeft;
            //"This decrements the 'timeLeft' variable by 1, reducing the countdown value by 1."     
            timeLeft--;
        }
    //This code will run every 1000 miliseconds, or ~1 second
    }, 1000);

    function showQuestions() {
        startSection.style.display = "none";
        questionSection.classList.remove("hide_middle");
        displayQuestion();
    }
    setTimeout(showQuestions, 0);
}

function showGameOver() {
    startSection.style.display = "none";
    questionSection.style.display = "none";
    timer.style.display = "none";
    endSection.classList.remove(".hide_end");
    endSection.classList.add("endSection");
    finalScore.textContent = timeLeft;
}

textInput.addEventListener("click",function() {
    this.placeholder = "";
});

submitBtn.addEventListener("click", function () {
    const inputText = textInput.value;
    const scoreValue = parseInt(finalScore.textContent);
    const existingScores = JSON.parse(localStorage.getItem("scores")) || [];
    existingScores.push({ score: scoreValue, initials: inputText});
    existingScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("scores", JSON.stringify(existingScores));
    window.location.href = "highscore.html";
});

var urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('runFunction')) {
    startGame();
}
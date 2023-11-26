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
let countdownStart = 60;
let countdownEnd = 0;
let timeLeft = countdownStart;

//Questions
//This is an array
let questions = [
    //This is an object
    { 
		prompt: `Click C?`, 
		options: [ 
			"<A>", 
			"<B>", 
			"<C>", 
			"<D>", 
		], 
		answer: "<C>", 
        review: "This is where the explanation of the concept will go",
	}, 
    {
        prompt: `Click B?`,
        options: [
            "<A>", 
			"<B>", 
			"<C>", 
			"<D>",
        ],
        answer: "<B>",
        review: "This is where the explanation of the concept will go",
    },
    {
        prompt: `Click D?`,
        options: [
            "<A>", 
			"<B>", 
			"<C>", 
			"<D>",
        ],
        answer: "<D>",
        review: "This is where the explanation of the concept will go",
    },
    {
        prompt: `Click A?`,
        options: [
            "<A>", 
			"<B>", 
			"<C>", 
			"<D>",
        ],
        answer: "<A>",
        review: "This is where the explanation of the concept will go",
    }
]

//this declares the function questionArray
//this needs to be called in the third line of showQuestions() 
//function questionArray() {
    //this creates a for loop to go through all of the questions in that array
    //defines i variable as 0, will loop as long as i is less than the length of the question array, variable i will increase by 1 every loop
    //for (let i=0; i<questions.length; i++) {
        //this is the code that will be looped
        //creates a new element div for every object in questions
        //let questionDiv = document.createElement("div");
        //this creates a class for the new div element
        //questionDiv.classList.add("questionArray");

        //creates a new element p for every object in questions
        //let prompt = document.createElement("p");
        //This will add the prompt item in the question array to the new element that was created
        //The i variable was defined in the for loop
        //prompt.textContent = questions[i].prompt;
        //prompt.classList.add("prompt")
        //This will add the prompt to the questionDiv, making it the div's child
        //questionDiv.appendChild(prompt);

        //creates a new element ul for every object in questions
        //let optionsList = document.createElement("ul");
        //this creates a class for the new ul element
        //optionsList.classList.add("optionsList");
        //now I need to create a for loop to create the needed amount of li for the ul
        //variable a set to 0
        //the for loop will repeat until a is no longer less than the length of the options array of the objects in the questions array depending on the current index of the previous for loop
        //a will increase by 1 every time the for loop is completed
        
        //for (let a=0; a<questions[i].options.length; a++) {
            //creates a variable that will create a new list item every loop
            //let optionItem = document.createElement("button");
            //optionItem.classList.add("optionItem")
            //this will add the current item in the option array that the for loop is on, as well as the current item in the questions array that the previous for loop is running
            //optionItem.textContent = questions[i].options[a];
            //this will add each list item to the unordered list created before this
            //optionsList.appendChild(optionItem);
            //the for loop will end when the length of the options array is reached
        //}
        //this adds the options list to the questionDiv element that was created at the beginning of the for loop
        //this changes every question
        //questionDiv.appendChild(optionsList);

        //this adds the questionDiv to the previously defined questionArea at the start of the document
        //questionArea.appendChild(questionDiv);
    //}
//}

let currentQuestionIndex = 0;

function displayQuestion() {
    questionArea.innerHTML = '';

    let questionDiv = document.createElement("div");
    questionDiv.classList.add("questionArray");

    let prompt = document.createElement("p");
    prompt.textContent = questions[currentQuestionIndex].prompt;
    prompt.classList.add("prompt");
    questionDiv.appendChild(prompt);

    let optionsList = document.createElement("ul");
    optionsList.classList.add("optionsList");

    questions[currentQuestionIndex].options.forEach(option => {
        let optionItem = document.createElement("button");
        optionItem.classList.add("optionItem");
        optionItem.textContent = option;
        optionItem.addEventListener("click", function() {
            checkAnswer(option);
        });
        optionsList.appendChild(optionItem);
    });

    questionDiv.appendChild(optionsList);
    questionArea.appendChild(questionDiv);
}

function checkAnswer(selectedAnswer) {
    let correctAnswer = questions[currentQuestionIndex].answer;
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("containerDiv");

    let feedback = document.createElement("div");
    feedback.classList.add("feedback");

    let nextButton = document.createElement("button");
    nextButton.classList.add("nextButton");

    let divider = document.createElement("div");
    divider.classList.add("divider");

    let explanation = document.createElement("div");
    explanation.classList.add("explanation");

    if (selectedAnswer === correctAnswer) {
        feedback.textContent = "Correct!";
        explanation.textContent = questions[currentQuestionIndex].review;
        timeLeft += 10;
        console.log("Correct!");
    } else {
        feedback.textContent = "Incorrect!";
        explanation.textContent = questions[currentQuestionIndex].review;
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
    // if (document.addEventListener("click", function(){
    //     console.log("THIS IS WORKING")
    // }){
    //     this.placeholder = "Enter Text Here";
    // } else {

    // }
    // )
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
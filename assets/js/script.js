const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const scoreButton = document.getElementById('score-btn');
const hideScoreButton = document.getElementById('hide-score-btn')
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const timerEl = document.getElementById('timer');
const submitEl = document.getElementById('submit');
const initialsEl = document.getElementById('initials');
const scoreEl = document.querySelector('.final-container');
const finalScoreEl = document.getElementById('final-score');
const scoreForm = document.getElementById('score-form');
const hiScoreEl = document.querySelector('.hi-score-container')
const scoreListEl = document.getElementById('score-list')
var userScores = [];


// const scoreEl = document.getElementById('score');

let randomQuestions;
let currentQuestionIndex;
let quizDone = false;
let timer;
let timerCount;
// let score;


startButton.addEventListener('click', startQuiz)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion();
})

scoreForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var userTime = timerCount;
    
    var newScore = {
        initials: initialsEl.value.trim(),
        score: userTime
    };
    console.log(newScore);
    userScores.push(newScore);
    initialsEl.value="";

    saveScores();
});

scoreButton.addEventListener('click', renderScores)

hideScoreButton.addEventListener('click', hideScores)



function startQuiz() {
    startButton.classList.add('hide')
    if (scoreEl.classList.contains('hide')) {
        console.log("it's hidden!")
    } else {
        scoreEl.classList.add('hide')
    };
    // scoreEl.classList.add('hide')
    quizDone = false;
    randomQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    timerCount = 100;
    questionContainer.classList.remove('hide')
    setNextQuestion();
    startTimer();
}

function endQuiz() {
    questionContainer.classList.add('hide');
    var scoreResponse = "Your score was " + timerCount;
    finalScoreEl.textContent = scoreResponse;
    showScore();
    resetQuestion();
}

function setNextQuestion() {
    resetQuestion()
    showQuestion(randomQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', function (e) {
            selectAnswer(e);
            checkAnswer(e);
        });
        answerButtons.appendChild(button)
    })
}

function resetQuestion() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtons.firstChild) {
        answerButtons.removeChild
        (answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(randomQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        quizDone = true;
        startButton.innerText = 'Try Again'
        startButton.classList.remove('hide');
        endQuiz();
        // scoreEl.classList.remove('hide');
    }
    
}

function checkAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    if (correct) {
        console.log('Correct! Before I understood the assignment you used to get 1 point for this!')
    } else {
        timerCount -= 10;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = "Time:" + timerCount;
        if (timerCount >= 0) {
            if (quizDone && timerCount > 0) {
                clearInterval(timer);
                endQuiz();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function showScore() {
    scoreEl.classList.remove('hide');
}

function saveScores() {
    console.log(userScores);
    localStorage.setItem("userScores", JSON.stringify(userScores));
}

function renderScores() {
    scoreListEl.innerHTML = "";
    for (var i=0; i < userScores.length; i++) {
        var listScore = userScores[i];

        var li = document.createElement('li');
        li.textContent = listScore.initials + ": " + listScore.score;
        console.log(li)
        scoreListEl.appendChild(li);
    }
    hiScoreEl.classList.remove('hide');
}

function hideScores() {
    hiScoreEl.classList.add('hide');
}

function init() {
    var storedScores = JSON.parse(localStorage.getItem("userScores"));

    if (storedScores !== null) {
        userScores = storedScores;
    }
}

init ();

const questions = [
    {
        question: 'Which of the following is not a primitive data type in JavaScript?',
        answers: [
            { text: 'Number', correct: false},
            { text: 'String', correct: false},
            { text: 'Boolean', correct: false},
            { text: 'Object', correct: true}
        ]
    },
    {
        question: 'What does the "typeof" operator do in JavaScript?',
        answers: [
            { text: 'Returns the data of a variable', correct: true},
            { text: 'Checks if a variable is defined', correct: false},
            { text: 'Assigns a value to a variable', correct: false},
            { text: 'Concatenates two strings', correct: false}
        ]
    },
    {
        question: 'What is the output of the following code: console.log(2 + "2");',
        answers: [
            { text: '"4"', correct: false},
            { text: '"22"', correct: true},
            { text: '4', correct: false},
            { text: '22', correct: false}
        ]
    },
    {
        question: 'Which of the following is not a comparison operator in JavaSCript?',
        answers: [
            { text: '==', correct: false},
            { text: '===', correct: false},
            { text: '!=', correct: false},
            { text: '=<', correct: true}
        ]
    },
    {
        question: 'What does the "NaN" value represent in JavaScript?',
        answers: [
            { text: 'Not a number', correct: true},
            { text: 'Null value', correct: false},
            { text: 'Undefined value', correct: false},
            { text: 'Boolean value', correct: false}
        ]
    }
]
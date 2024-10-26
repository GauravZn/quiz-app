    const questions = [

        {
            question: "What is the capital of India?",
            answers:[
                {text: "Mumbai", correct: false},
                {text: "New Delhi", correct: true},
                {text: "Kolkata", correct: false},
                {text: "Chhenai", correct: false},
            ]
        },
        {
            question: "Who is known as the Father of Nation?",
            answers:[
                {text: "Jawahar Lal Nehru", correct: false},
                {text: "Bhagat Singh", correct: false},
                {text: "Bal Gangadhar Tilak", correct: false},
                {text: "M. K. Gandhi", correct: true},
            ]
        },
        {
            question: "What is the color of a Banana?",
            answers:[
                {text: "Yellow", correct: true},
                {text: "Pink", correct: false},
                {text: "Blue", correct: false},
                {text: "Brown", correct: false},
            ]
        },
        {
            question: "Who is the Prime Minister of India?",
            answers:[
                {text: "Donald Trump", correct: false},
                {text: "Narendra Modi", correct: true},
                {text: "Shinzo Abe", correct: false},
                {text: "Kim Jong Un", correct: false},
            ]
        },
        {
            question: "Who is Justin Bieber?",
            answers:[
                {text: "A pop star", correct: true},
                {text: "A YouTuber", correct: false},
                {text: "A Journalist", correct: false},
                {text: "A Historian", correct: false},
            ]
        }

    ];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let score = 0;
let currentQuestionIndex = 0;

function startQuiz(){

    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();
     
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{

        const but = document.createElement("button");
        but.innerHTML = answer.text;
        but.classList.add("btn");
        answerButtons.appendChild(but);

        if (answer.correct) {
            but.dataset.correct = true;
        }
        but.addEventListener("click",selectAns);

    });
}

function resetState(){
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAns(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(but=>{

        if (but.dataset.correct === 'true') {
            but.classList.add("correct");
        }
        but.disabled = true;

    });

    nextButton.style.display = 'block';
}

function showScore(){
     resetState();
     questionElement.innerHTML = `Your score: ${score} out of ${questions.length}`;

     nextButton.innerHTML = "Restart";
     nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex<questions.length) {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{

    if (currentQuestionIndex<questions.length) {
        handleNextButton();
    }
    else{
        startQuiz();
    }

});

startQuiz();
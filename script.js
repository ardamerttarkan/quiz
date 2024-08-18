const questions = [
    {
        question: "Hangisi Türk Otomobilidir?",
        answers: [
            { text: "Mercedes", correct: false },
            { text: "BMW", correct: false },
            { text: "Togg", correct: true },
            { text: "Audi", correct: false }
        ]
    },
    {
        question: "Hangisi Türk dizisidir?",
        answers: [
            { text: "Fringe", correct: false },
            { text: "Kurtlar Vadisi", correct: true },
            { text: "Silo", correct: false },
            { text: "Breaking Bad", correct: false }
        ]

    },
    {question: "Hangisi Marmara Bölgesi Şehridir ?",
        answers: [
            { text: "Tokat", correct: false },
            { text: "İzmir", correct: false },
            { text: "Sinop", correct: false },
            { text: "Yalova", correct: true }
        ]
    },
    {
        question: "Hangisi Edm alt dalı değildir",
        answers: [
            { text: "Techno", correct: false },
            { text: "Bigroom", correct: false },
            { text: "Rock", correct: true },
            { text: "Slp House", correct: false }
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex =0;
let score = 0; 

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Sonraki Soru";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
});
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }




}


function selectAnswer(e){
   const selectedButton = e.target;
   const isCorrect = selectedButton.dataset.correct === "true"; 
   if(isCorrect){
       selectedButton.classList.add("correct");
       score++;
   }   
   else{
       selectedButton.classList.add("incorrect");
   }
    Array.from(answerButton.children).forEach(button => {
         if(button.dataset.correct === "true"){
             button.classList.add("correct");
         }
         button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `Skorunuz  ${score} Doğru. Toplam:    ${questions.length} Soru`;
    nextButton.innerHTML = "Yeniden Oyna";
    nextButton.style.display = "block";
}


function handleNectButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNectButton();
        
    }
    else{
        startQuiz();
    }
});


startQuiz();
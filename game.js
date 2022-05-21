const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const progressbar = document.getElementById('progress-bar-full');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let selectedanswerarray = [];
let selectedquestions = [];
let progressvalue = 0
let availableQuestions = [];
localStorage.removeItem('mostRecentScore');

let questions = []
/*
// for questions created by me
fetch('questions.json').then(res => {
    return res.json()
}).then(loadedQuestion => {
    console.log(loadedQuestion)
    questions = loadedQuestion;
    startQuiz();
}).catch(err =>{
    console.error(err);
});*/

//for questions from open trivia db

let file = ""
function MainFunc(){
let store = localStorage.getItem('Quiz-Type');
if(store){
    file = 'trivia'+store.toLowerCase().substring(0,4)+'questions.json';
    //console.log(file);
}

fetch(file).then(res=>{
    return res.json()
}).then(loadedQuestions =>{
    questions = loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestions = {
            question:loadedQuestion.question
        }
        const answerchoices = [...loadedQuestion.incorrect_answers];
        formattedQuestions.answer = Math.floor(Math.random() * 4)+1;
        answerchoices.splice(formattedQuestions.answer - 1,0,loadedQuestion.correct_answer);
        answerchoices.forEach((choice,index)=>{
            formattedQuestions["choice"+(index+1)] = choice;
        });
        return formattedQuestions;
    });
    startQuiz();
}).catch(err =>{
    console.error(err);
    //window.location.assign('index.html')
    return
});

}






const CORRECTBONUS = 10;
const MAXQUESTION = 10;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    //console.log(questions)
    getNewQuestion();
    setTimeout(()=>{
        loader.classList.add('hidden');
        game.classList.remove('hidden');
    },1000)
    
    

};
getNewQuestion = () =>{
    if (questionCounter >= MAXQUESTION || availableQuestions.length == 0 ){
        localStorage.setItem('mostRecentScore',score);
        sessionStorage.setItem('selectedQuestion',JSON.stringify(selectedquestions));
        sessionStorage.setItem('selectedAnswer',JSON.stringify(selectedanswerarray));
        return window.location.assign('/end.html');
    }
    
    questionCounter++;
    questionCounterText.innerHTML = questionCounter + '/'+MAXQUESTION;
    progressvalue = (questionCounter/MAXQUESTION) * 100;
    progressbar.style.width = progressvalue + '%';
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    selectedquestions.push(currentQuestion);
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        //console.log(number)
        choice.innerText = currentQuestion['choice'+ number];
    });
    availableQuestions.splice(questionIndex,1)
    acceptingAnswers = true;
}; 
choices.forEach(choice =>{
    choice.addEventListener('click',e =>{
        if(!acceptingAnswers) return;


        acceptingAnswers = false;
        const selectedchoice = e.target;
        const selectedanswer = selectedchoice.dataset['number'];
        selectedanswerarray.push(selectedanswer);
        const classtoApply = selectedanswer == currentQuestion.answer? 'correct':'incorrect'

        selectedchoice.parentElement.classList.add(classtoApply);
        if(classtoApply == 'correct'){
            score += CORRECTBONUS;
            scoreText.innerHTML = score;
        }
        setTimeout(()=>{
            
            selectedchoice.parentElement.classList.remove(classtoApply);
            getNewQuestion();

        },500)
        
    })
})

MainFunc()


const selectedQuestions = JSON.parse(sessionStorage.getItem('selectedQuestion'));
const selectedAnswers = JSON.parse(sessionStorage.getItem('selectedAnswer'));
console.log(selectedAnswers)
let counterlength = selectedQuestions != null ? selectedQuestions.length - 1 : 0;
let counter = 0;
const backbtn = document.getElementById('backbtn');
const frontbtn = document.getElementById('frontbtn');
const question = document.getElementById('question');
const quest = document.getElementById('Quest');
const choices = Array.from(document.getElementsByClassName('choice-text'));
back = () =>{
counter --;
choices.forEach(choice=>{
            choice.classList.remove('correct');
            choice.classList.remove('incorrect');
});
frontbtn.innerHTML = "Next";
if(counter == 0){
    
    backbtn.disabled = true;
    mainfunction();
}else{
    mainfunction();
} 
}
forward = () =>{
    
    counter = counter + 1;
    console.log(counter);
    choices.forEach(choice=>{
        choice.classList.remove('correct');
        choice.classList.remove('incorrect');
    });
    if(counter == counterlength){
        frontbtn.innerHTML = "Done";
        mainfunction();    
    }
    else{
        if(counter == counterlength + 1){
            window.location.assign('/end.html')
        }else{
        backbtn.disabled = false;
        
        mainfunction();
    }
    }
     
}
mainfunction = () =>{

    let currentQuestion = selectedQuestions[counter];
    let currentAnswer = parseInt(selectedAnswers[counter]);
    quest.innerHTML = 'Question '+(counter + 1)+'/'+(counterlength + 1);
    question.innerHTML = currentQuestion.question;
    choices.forEach(choice=>{
        let num = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice'+num];
        if(num == currentAnswer){
            if(currentQuestion.answer == currentAnswer){
                choice.classList.add('correct');
            }
            else{
                choice.classList.add('incorrect');
            }
        }
        if(num == currentQuestion.answer){
            choice.classList.add('correct');
        }
    });

}
startCheck = () =>{
    mainfunction()
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');

}
if(selectedQuestions != null && selectedAnswers != null){
startCheck()
}else{
    window.location.assign('/index.html');
}
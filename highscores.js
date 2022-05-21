const highScoreList = document.getElementById('highScoresList');
const highscores = JSON.parse(localStorage.getItem('highScore')) || [];

// if(highscores){
// highScoreList.innerHTML = highscores.map(score =>{
//     return '<li class="highscore">'+score.name +' - '+ score.score+'</l1>'
// }).join("");
// }


highscores.forEach(score =>{
    highScoreList.innerHTML += '<li class="high-score">'+score.name +' - '+ score.score+'</l1>'
});

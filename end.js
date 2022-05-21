const username = document.getElementById('username');
const savebutton = document.getElementById('savebutton');
const scoreText = document.getElementById('score');
const recentscore = localStorage.getItem('mostRecentScore');

const highscore = JSON.parse(localStorage.getItem('highScore')) || [];
scoreText.innerHTML = recentscore != null ? recentscore : 0;

const MAX_HIGHSCORE = 5;
username.addEventListener('keyup',e =>{
savebutton.disabled = !username.value;
})
savehighscore = (e) =>{
    e.preventDefault();
    const scores = {
        score: recentscore,
        name: username.value
    }
    highscore.push(scores);
    highscore.sort((a,b)=> b.score - a.score);

    highscore.splice(MAX_HIGHSCORE);
    localStorage.setItem('highScore',JSON.stringify(highscore))
    localStorage.removeItem('mostRecentScore');
    window.location.assign('/');
}


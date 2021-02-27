window.onload = () => {audioGameOver.pause()};
let mario = document.querySelector('.mario');
let dragon = document.querySelector('.dragon');
let cross = true;
let score = 0;
audio = new Audio('gameplay.mp3');
audioGameOver = new Audio('gameover.mp3');
audioJump = new Audio('jump.mp3')
document.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        document.querySelector('.startScreen').classList.add('hide');
        document.querySelector('.start').classList.remove('hide');
        dragon.classList.add('dragonmove');
        document.querySelector('.gameover').classList.add('hide');
        score = 0;
        updateScore(score);
        audio.play();
        audioGameOver.pause();
    }
    if (e.keyCode == 38) {
        mario.classList.add('jump');
        audioJump.play();
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 600);
    };
    if (e.keyCode == 39) {
        mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = mx + 144 + 'px';
    };
    if (e.keyCode == 37) {
        mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = (mx - 144) + 'px';
    };
});
setInterval(() => {
    mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    dx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    my = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));
    dy = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('top'));
    distanceX = Math.abs(mx - dx);
    distanceY = Math.abs(my - dy);
    if (distanceX < 95 && distanceY < 110) {
        dragon.classList.remove('dragonmove');
        document.querySelector('.gameover').classList.remove('hide');
        document.querySelector('.totalScore').innerText = `Total Score : ${score}`;
        dragon.style.animationDuration = '5s';
        audio.pause();
        audioGameOver.play();


    } else if (distanceX < 100 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            animationDuration = parseFloat(window.getComputedStyle(dragon, null).getPropertyValue('animation-duration'));
            if(dragon.style.animationDuration > '2s'){
                newAnimationDur = animationDuration - 0.1;
            dragon.style.animationDuration = newAnimationDur + 's';
            }   
        }, 700);
    }

}, 100);
function updateScore(scr) {
    document.querySelector('.score').innerHTML = `Score : ${scr}`
}
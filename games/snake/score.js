export let gameScore = 0;

export function update() {
    let scoreElement = document.querySelector('.score__number');
    gameScore++;
    scoreElement.innerHTML = gameScore;
}

export function checkRecord(gameScore, gameRecord) {
    return gameScore > gameRecord;
}
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, snakeIntersection, getSnakeHead } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';
import { checkRecord, gameScore } from './score.js';

let lastRenderTime = 0;
let gameOver = false;
let gameRecord = localStorage.getItem('gameRecord');
const gameBoard = document.getElementById('game-board');

init();

function main(currentTime) {
    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')) {
            window.location = '/';
        }

        if (checkRecord(gameScore, gameRecord)) {
            localStorage.setItem('gameRecord', gameScore);
        } 
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();
}
 
window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead(getSnakeHead())) || snakeIntersection();
}

function init() {
    let recordElement = document.querySelector('.score__record');
    recordElement.innerHTML = gameRecord;
}
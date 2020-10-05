import { LEVEL, OBJECT_TYPE } from './setup';
// classes
import GameBoard from './GameBoard';

// DOM Element
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

// Game Constants
const POWER_PILL_TIME = 10000;
const GLOBAL_SPEED = 80;
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

// Initial setup
let score = 0;
let timer = null;
let gameWin = false;
let PowerPillActive = false;
let PowerPillTimer = null;

function gameOver(pacman, grid) {


}

function checkCollision(pacman, ghosts) {

}

function gameLoop(pacman, ghosts) {

}

function startGame() {
    
}
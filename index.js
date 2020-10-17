import { LEVEL, OBJECT_TYPE } from './setup';
import { randomMovement } from './ghostmoves';
// classes
import GameBoard from './GameBoard';
import Pacman from './Pacman';
import Ghost from './Ghost';

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
    gameBoard.moveCharacter(pacman);

    ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
}

function startGame() {
    gameWin = false;
    PowerPillActive = false;
    score = 0;

    startButton.classList.add('hide');

    gameBoard.createGrid(LEVEL);

    const pacman = new Pacman(2, 287);
    gameBoard.addObject(388, [OBJECT_TYPE.PACMAN]);
    document.addEventListener('keydown', (e) => 
        pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    );

    const ghosts = [
        // speed and driection
        new Ghost(5, 200, randomMovement, OBJECT_TYPE.BLINKY),
        new Ghost(7, 199, randomMovement, OBJECT_TYPE.PINKY),
        new Ghost(3, 198, randomMovement, OBJECT_TYPE.INKY),
        new Ghost(2, 197, randomMovement, OBJECT_TYPE.CLYDE),
    ];

    // Gameloop
  timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

// Initialize game

startButton.addEventListener('click', startGame);
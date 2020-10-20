import { LEVEL, OBJECT_TYPE } from './src/setup';
import { randomMovement } from './src/ghostmoves';

// Classes
import GameBoard from './src/GameBoard';
import Pacman from './src/Pacman';
import Ghost from './src/Ghost';

// Sounds
import soundDot from './sounds/munch.wav';
import soundPill from './sounds/pill.wav';
import soundGameStart from './sounds/game_start.wav';
import soundGameOver from './sounds/death.wav';
import soundGhost from './sounds/eat_ghost.wav';

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
let powerPillActive = false;
let powerPillTimer = null;

// Audio
function playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
}

function gameOver(pacman, grid) {
    playAudio(soundGameOver);

    document.removeEventListener('keydown', (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    );
        gameBoard.showGameStatus(gameWin);

        clearInterval(timer);

       startButton.classList.remove('hide');

}

function checkCollision(pacman, ghosts) {
    const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);
    if (collidedGhost) {
        // pacman eats ghost
        if (pacman.powerPill) {
            playAudio(soundGhost);
            gameBoard.removeObject(collidedGhost.pos, [
                OBJECT_TYPE.GHOST,
                OBJECT_TYPE.SCARED,
                collidedGhost.name
            ]);
            collidedGhost.pos = collidedGhost.startPos;
            score += 100; // For every ghost that is eaten gives 100 points
        } else {
            gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
            gameBoard.rotateDiv(pacman.pos, 0);
            gameOver(pacman, gameGrid);
        }
    }
}

function gameLoop(pacman, ghosts) {
    gameBoard.moveCharacter(pacman);
    checkCollision(pacman, ghosts);

    ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
    checkCollision(pacman, ghosts);

    // Check if pacman eats a dot
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
        playAudio(soundDot);

        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
        gameBoard.dotCount--;
        score += 10; // For every dot that is eaten gives 10 points
    }
    // Check if pacman eats a powerPill
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
        playAudio(soundPill);

        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

        pacman.powerPill = true;
        score += 50; // For every powerPill that is eaten gives 50 points

        clearTimeout(powerPillTimer);
        powerPillTimer = setTimeout(
            () => (pacman.powerPill = false),
            POWER_PILL_TIME
        ); 
    }

    // change ghost scare mode depending on powerPill
    if (pacman.powerPill !== powerPillActive) {
        powerPillActive = pacman.powerPill;
        ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
    }

    // check if all dots have been eaten
    if (gameBoard.dotCount === 0) {
        gameWin = true;
        gameOver(pacman, gameGrid);
    }

    // show the score
    scoreTable.innerHTML = score;

}

function startGame() {
    playAudio(soundGameStart);

    gameWin = false;
    powerPillActive = false;
    score = 0;

    startButton.classList.add('hide');

    gameBoard.createGrid(LEVEL);

    const pacman = new Pacman(2, 388);
    gameBoard.addObject(388, [OBJECT_TYPE.PACMAN]);
    document.addEventListener('keydown', (e) => 
        pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    );

    const ghosts = [
        // speed and driection
        new Ghost(6, 200, randomMovement, OBJECT_TYPE.BLINKY),
        new Ghost(2, 199, randomMovement, OBJECT_TYPE.PINKY),
        new Ghost(3, 198, randomMovement, OBJECT_TYPE.INKY),
        new Ghost(2, 197, randomMovement, OBJECT_TYPE.CLYDE)
    ];

    // Gameloop
  timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

// Initialize game

startButton.addEventListener('click', startGame);
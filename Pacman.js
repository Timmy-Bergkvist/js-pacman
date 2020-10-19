

//@line 1 "src/GameBoard.js"
// ==========================================================================

class GameBoard {
    constructor(DOMGrid) {
        this.dotCount = 0;
        this.grid = [];
        this.DOMGrid = DOMGrid;
    }

    showGameStatus(gameWin) {
        // Show game win or game over
        const div = document.createElement('div');
        div.classList.add('game-status');
        div.innerHTML = `${gameWin ? 'WIN!' : 'GAME OVER!'}`;
        this.DOMGrid.appendChild(div);
    }

    createGrid(level) {
        this.dotCount = 0;
        this.grid = [];
        this.DOMGrid.innerHTML = '';
        // First set correct amount of columns based on Grid Size and Cell Size
        this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);`;

        level.forEach((square, i) => {
            const div = document.createElement('div');
            div.classList.add('square', CLASS_LIST[square]);
            div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
            this.DOMGrid.appendChild(div);
            this.grid.push(div);

            // Add dots
            if (CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++;
        });
    }

    addObject(pos, classes) {
        this.grid[pos].classList.add(...classes);
    }

    removeObject(pos, classes) {
        this.grid[pos].classList.remove(...classes);
    }
    // Can have an arrow function here cause of this binding
    objectExist(pos, object) {
        return this.grid[pos].classList.contains(object);
      };

    rotateDiv(pos, deg) {
        this.grid[pos].style.transform = `rotate(${deg}deg)`;
    }

    moveCharacter(character) {
        if (character.shouldMove()) {
          const { nextMovePos, direction } = character.getNextMove(
            this.objectExist.bind(this)
          );
          const { classesToRemove, classesToAdd } = character.makeMove();
    
          if (character.rotation && nextMovePos !== character.pos) {
            // Rotate
            this.rotateDiv(nextMovePos, character.dir.rotation);
            // Rotate the previous div back
            this.rotateDiv(character.pos, 0);
          }
    
          this.removeObject(character.pos, classesToRemove);
          this.addObject(nextMovePos, classesToAdd);
    
          character.setNewPos(nextMovePos, direction);
        }
      }
    
      static createGameBoard(DOMGrid, level) {
        const board = new this(DOMGrid);
        board.createGrid(level);
        return board;
      }
}

//@line 1 "src/Ghost.js"
// ==========================================================================

class Ghost {
    constructor(speed = 5, startPos, movement, name) {
        this.name = name;
        this.movement = movement;
        this.startPos = startPos;
        this.pos = startPos;
        this.dir = DIRECTIONS.ArrowRight;
        this.speed = speed;
        this.timer = 0;
        this.isScared = false;
        this.rotation = false;
    }
    
    shouldMove() {
        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++;
    }

    getNextMove(objectExist) {
        const { nextMovePos, direction } = this.movement(
            this.pos,
            this.dir,
            objectExist
        );
        return { nextMovePos, direction };
    }

    makeMove() {
        const classesToRemove = [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, this.name];
        let classesToAdd = [OBJECT_TYPE.GHOST, this.name];

        if (this.isScared) classesToAdd = [...classesToAdd, OBJECT_TYPE.SCARED];

        return { classesToRemove, classesToAdd };
    }

    setNewPos(nextMovePos, direction) {
        this.pos = nextMovePos;
        this.dir = direction;
    }
}

//@line 1 "src/ghostmoves.js"
// ==========================================================================

// Random movement
export function randomMovement(position, direction, objectExist) {
    let dir = direction;
    let nextMovePos = position + dir.movement;
    // Change an array from the direction object keys
    const keys = Object.keys(DIRECTIONS);

    while (
        objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
        objectExist(nextMovePos, OBJECT_TYPE.WALLUR) ||
        objectExist(nextMovePos, OBJECT_TYPE.WALLUL) ||
        objectExist(nextMovePos, OBJECT_TYPE.WALLULR) ||
        objectExist(nextMovePos, OBJECT_TYPE.WALLDR) ||
        objectExist(nextMovePos, OBJECT_TYPE.WALLDL) ||
        objectExist(nextMovePos, OBJECT_TYPE.WALLDLR) ||
        objectExist(nextMovePos, OBJECT_TYPE.WALLUDR) ||
        objectExist(nextMovePos, OBJECT_TYPE.WALLUDl) ||
        objectExist(nextMovePos, OBJECT_TYPE.GHOST)
    ) {
        // Get a random key from that array
        const key = keys[Math.floor(Math.random() * keys.length)];
        // Set the new direction
        dir = DIRECTIONS[key];
        // Set the next move
        nextMovePos = position + dir.movement;
    }
    return { nextMovePos, direction: dir };
}

//@line 1 "src/Pacman.js"
// ==========================================================================

class Pacman {
    constructor(speed, startPos) {
        this.pos = startPos;
        this.speed = speed;
        this.dir = null; // Direction
        this.timer = 0;
        this.powerPill = false;
        this.rotation = true;
    }

    shouldMove() {
        // Pacman does not move before a key is pressed
        if (!this.dir) return;

        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++;
    }

    getNextMove(objectExist) {
        let nextMovePos = this.pos + this.dir.movement;
        // If Pacman collide with a wall
        if (
            objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
            objectExist(nextMovePos, OBJECT_TYPE.WALLUR) ||
            objectExist(nextMovePos, OBJECT_TYPE.WALLUL) ||
            objectExist(nextMovePos, OBJECT_TYPE.WALLULR) ||
            objectExist(nextMovePos, OBJECT_TYPE.WALLDR) ||
            objectExist(nextMovePos, OBJECT_TYPE.WALLDL) ||
            objectExist(nextMovePos, OBJECT_TYPE.WALLDLR) ||
            objectExist(nextMovePos, OBJECT_TYPE.WALLUDR) ||
            objectExist(nextMovePos, OBJECT_TYPE.WALLUDl) ||
            objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
        ) {
            nextMovePos = this.pos;
        }

        return { nextMovePos, direction: this.dir };
    }

    makeMove() {
        const classesToRemove = [OBJECT_TYPE.PACMAN];
        const classesToAdd = [OBJECT_TYPE.PACMAN];

        return { classesToRemove, classesToAdd };
    }

    setNewPos(nextMovePos) {
        this.pos = nextMovePos;
    }

    handleKeyInput = (e, objectExist) => {
        let dir;

        if (e.keyCode >= 37 && e.keyCode <= 40) {
            dir = DIRECTIONS[e.key];
        } else {
            return;
        }

        const nextMovePos = this.pos + dir.movement;
        if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return;
        this.dir = dir;
    };
}

//@line 1 "src/setup.js"
// ==========================================================================

export const GRID_SIZE = 21;
export const CELL_SIZE = 20;
export const DIRECTIONS = {
  ArrowLeft: {
    code: 37,
    movement: -1,
    rotation: 180
  },
  ArrowUp: {
    code: 38,
    movement: -GRID_SIZE,
    rotation: 270
  },
  ArrowRight: {
    code: 39,
    movement: 1,
    rotation: 0
  },
  ArrowDown: {
    code: 40,
    movement: GRID_SIZE,
    rotation: 90
  }
};

export const OBJECT_TYPE = {
  BLANK: 'blank',
  WALL: 'wall',
  WALLUR: 'wallur', // ur = Up right
  WALLUL: 'wallul', // ul = Up left
  WALLULR: 'wallulr', // ulr = Up left right
  WALLDR: 'walldr', // dr = down right
  WALLDL: 'walldl', // dl = down left
  WALLDLR: 'walldlr', // dlr = down left right
  WALLUDR: 'walludr', // udr = up down right
  WALLUDl: 'walludl', // udl = up down left
  DOT: 'dot',
  BLINKY: 'blinky',
  PINKY: 'pinky',
  INKY: 'inky',
  CLYDE: 'clyde',
  PILL: 'pill',
  PACMAN: 'pacman',
  GHOST: 'ghost',
  SCARED: 'scared',
  GHOSTLAIR: 'lair',
};

// Lookup array for classes
export const CLASS_LIST = [
  OBJECT_TYPE.BLANK, // = 0
  OBJECT_TYPE.WALL, // = 1
  OBJECT_TYPE.DOT, // = 2
  OBJECT_TYPE.BLINKY, // = 3
  OBJECT_TYPE.PINKY, // = 4
  OBJECT_TYPE.INKY, // = 5
  OBJECT_TYPE.CLYDE, // = 6
  OBJECT_TYPE.PILL, // = 7
  OBJECT_TYPE.PACMAN, // = 8
  OBJECT_TYPE.GHOSTLAIR, // = 9
  OBJECT_TYPE.WALLUR, // ur = up right 10
  OBJECT_TYPE.WALLUL, // ul = up left 11
  OBJECT_TYPE.WALLULR, // ulr = up left right 12
  OBJECT_TYPE.WALLDR, // dr = dr = down right 13
  OBJECT_TYPE.WALLDL, // dl = up down left 14
  OBJECT_TYPE.WALLDLR, // dlr = down left right 15
  OBJECT_TYPE.WALLUDR, // udr = up down right 16
  OBJECT_TYPE.WALLUDl, // udl = up down left 17
];

// prettier-ignore
export const LEVEL = [
  11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 11, 10, 2, 11, 1, 1, 10, 2, 1, 2, 11, 1, 1, 10, 2, 11, 10, 2, 1,
  1, 7, 13, 14, 2, 13, 1, 1, 14, 2, 15, 2, 13, 1, 1, 14, 2, 13, 14, 7, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 17, 16, 2, 12, 2, 17, 1, 1, 1, 1, 1, 16, 2, 12, 2, 17, 16, 2, 1,
  1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1,
  13, 1, 1, 10, 2, 1, 1, 1, 16, 0, 15, 0, 17, 1, 1, 1, 2, 11, 1, 1, 14,
  0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0,
  0, 0, 0, 1, 2, 1, 0, 12, 9, 9, 9, 9, 9, 12, 0, 1, 2, 1, 0, 0, 0,
  11, 1, 1, 14, 2, 15, 0, 1, 9, 9, 9, 9, 9, 1, 0, 15, 2, 13, 1, 1, 10,
  1, 0, 0, 0, 2, 0, 0, 1, 9, 9, 9, 9, 9, 1, 0, 0, 2, 0, 0, 0, 1,
  13, 1, 1, 10, 2, 12, 0, 1, 9, 9, 9, 9, 9, 1, 0, 12, 2, 11, 1, 1, 14,
  0, 0, 0, 1, 2, 1, 0, 13, 1, 1, 1, 1, 1, 14, 0, 1, 2, 1, 0, 0, 0,
  0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0,
  11, 1, 1, 14, 2, 15, 0, 17, 1, 1, 1, 1, 1, 16, 0, 15, 2, 13, 1, 1, 10,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 17, 10, 2, 17, 1, 1, 16, 2, 15, 2, 17, 1, 1, 16, 2, 11, 16, 2, 1,
  1, 7, 2, 1, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 1, 2, 7, 1,
  1, 16, 2, 15, 2, 12, 2, 17, 1, 1, 1, 1, 1, 16, 2, 12, 2, 15, 2, 17, 1,
  1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1,
  1, 2, 17, 1, 1, 1, 1, 1, 16, 2, 15, 2, 17, 1, 1, 1, 1, 1, 16, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14,
];

//@line 1 "src/index.js"
// ==========================================================================

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
let soundGhost     = new Audio('./sounds/eat_ghost.wav');
let soundDot       = new Audio('./sounds/munch.wav');
let soundPill      = new Audio('./sounds/pill.wav');
let soundGameStart = new Audio('./sounds/game_start.wav');
let soundGameOver  = new Audio('./sounds/death.wav');


function playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
}



function gameOver(pacman, grid) {
    soundGameOver.play();

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
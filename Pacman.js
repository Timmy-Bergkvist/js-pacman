import { OBJECT_TYPE, DIRECTIONS } from './setup';

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

export default Pacman;
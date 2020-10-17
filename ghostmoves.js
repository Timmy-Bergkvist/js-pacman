import { DIRECTIONS, OBJECT_TYPE } from './setup';

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
        // Get a random key from the key array
        const key = keys[Math.floor(Math.random() * keys.length)]
        // Set the next move
        dir = DIRECTIONS[key];
        // Set the next move
        nextMovePos = position + dir.movement;
    }
    return { nextMovePos, direction: dir };
}

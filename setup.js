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
  OBJECT_TYPE.BLANK,
  OBJECT_TYPE.WALL,
  OBJECT_TYPE.DOT,
  OBJECT_TYPE.BLINKY,
  OBJECT_TYPE.PINKY,
  OBJECT_TYPE.INKY,
  OBJECT_TYPE.CLYDE,
  OBJECT_TYPE.PILL,
  OBJECT_TYPE.PACMAN,
  OBJECT_TYPE.GHOSTLAIR,
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
  1, 0, 0, 0, 2, 0, 0, 1, 9, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0, 1,
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

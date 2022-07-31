import { ITetromino } from "../types";

const tetrominos = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
];

const color = ["cyan", "yellow", "purple", "green", "red", "blue", "orange"];

export const buildTetramino = () => {
  const rand = Math.floor(Math.random() * 7);
  const rand2 = Math.floor(Math.random() * 7);
  const tetramino: ITetromino[] = [
    {
      matrix: tetrominos[rand],
      color: color[rand],
      pos: { x: 0, y: 0 },
    },
    {
      matrix: tetrominos[rand2],
      color: color[rand2],
      pos: { x: 0, y: 0 },
    },
  ];
  return tetramino;
};

export const buildNextTetramino = (tetromino: ITetromino[]) => {
  const rand = Math.floor(Math.random() * 7);
  tetromino.unshift({
    matrix: tetrominos[rand],
    color: color[rand],
    pos: { x: 0, y: 0 },
  });
  return tetromino;
};

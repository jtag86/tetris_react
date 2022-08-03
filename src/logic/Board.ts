import { IBoard, IDefaultCell, IField, IPos, ITetromino } from "../types";

export const buildBoard = (rows: number, columns: number) => {
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => 0)
  );

  const obj: IBoard = {
    rows: builtRows,
    size: { rows, columns },
  };

  return obj;
};

export const nextBoard = (
  rows: number,
  columns: number,
  player: ITetromino[],
  field: IField
) => {
  let builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => 0)
  );

  builtRows = transferBoard(player, builtRows, field);

  return {
    rows: builtRows,
    size: { rows, columns },
  };
};

const transferBoard = (
  player: ITetromino[],
  builtRows: number[][],
  field: IField
) => {
  field.rows.map((row, y) =>
    row.map((column, x) => {
      return (builtRows[y][x] = column);
    })
  );

  const playerX = player[1].pos.x;
  const playerY = player[1].pos.y;

  player[1].matrix.map((row, y) =>
    row.map((column, x) => {
      if (column === 0) return true;
      return (builtRows[playerY + y][playerX + x] = column);
    })
  );

  return builtRows;
};

export const isBottom = (board: IBoard, nextPlayer: ITetromino) => {
  const playerY = nextPlayer.pos.y;
  const lenY = board.rows.length - 1;

  return nextPlayer.matrix.every((row, y) =>
    row.every((column) => {
      if (column === 0) return true;
      return playerY + y <= lenY;
    })
  );
};

export const isTop = (field: IField) => {
  return field.rows.every((row, y) =>
    row.every((column) => {
      if (column === 0) return true;
      return y!==0
    })
  );
};

export const isWithinBoard = (board: IBoard, nextPlayer: ITetromino) => {
  const playerX = nextPlayer.pos.x;
  const lenX = board.rows[0].length;

  return nextPlayer.matrix.every((row) =>
    row.every((column, x) => {
      if (column === 0) return true;
      return playerX + x >= 0 && playerX + x < lenX;
    })
  );
};

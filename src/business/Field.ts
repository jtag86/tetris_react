import { Dispatch, SetStateAction } from "react";
import { IField, ITetromino } from "../types";

export const buildField = (rows: number, columns: number) => {
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => 0)
  );

  const obj: IField = {
    rows: builtRows,
    size: { rows, columns },
  };

  return obj;
};

export const isOnField = (field: IField, nextPlayer: ITetromino) => {
  const playerY = nextPlayer.pos.y;
  const playerX = nextPlayer.pos.x;
  return nextPlayer.matrix.every((row, y) =>
    row.every((column, x) => {
      if (column === 0) return true;
      if(playerX + x <0 || playerX + x >= field.size.columns-1) return true
      return field.rows[playerY + y][playerX + x] === 0;
    })
  );
};

export const transferField = (
  player: ITetromino,
  field: IField,
  setField: Dispatch<SetStateAction<IField>>
) => {
  const playerX = player.pos.x;
  const playerY = player.pos.y;

  player.matrix.map((row, y) =>
    row.map((column, x) => {
      if (column === 0) return true;
      field.rows[playerY + y][playerX + x] = column;
    })
  );
};

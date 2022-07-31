import { IBoard, ITetromino } from "../types";
import { Action } from "./Input";
import React from "react";
import { IPos } from "../types";
import { isWithinBoard } from "./Board";

export const attemptMovement = (
  action: Action | null,
  board: IBoard,
  player: ITetromino[],
  setPlayer: React.Dispatch<React.SetStateAction<ITetromino[]>>
) => {
  let direction: IPos = { x: 0, y: 0 };
  switch (action) {
    case Action.ArrowLeft:
      direction = { x: -1, y: 0 };
      break;
    case Action.ArrowRight:
      direction = { x: 1, y: 0 };
      break;
    case Action.ArrowDown:
      direction = { x: 0, y: 1 };
      break;
    case Action.ArrowUp:
      player[1] = rotatePlayer(player, board);
      break;
  }
  const [updatedPlayer] = movePlayer(player, board, direction);
  setPlayer({ ...updatedPlayer });
};

const movePlayer = (player: ITetromino[], board: IBoard, direction: IPos) => {
  const movedTetramino = {
    ...player[1],
    pos: {
      x: player[1].pos.x + direction.x,
      y: player[1].pos.y + direction.y,
    },
  };

  const isOnBoard = isWithinBoard(player, board, movedTetramino);

  if (isOnBoard) {
    player[1] = movedTetramino;
  }
  return [player] as const;
};

const rotatePlayer = (player: ITetromino[], board: IBoard) => {
  const tetramino: ITetromino = JSON.parse(JSON.stringify(player[1]));
  let len = tetramino.matrix.length - 1;
  const rotatedMatrix = tetramino.matrix.map((row, i) =>
    row.map((val, j) => tetramino.matrix[len - j][i])
  );

  const rotatedTetramino = {
    ...player[1],
    matrix: rotatedMatrix,
  };

  const isOnBoard = isWithinBoard(player, board, rotatedTetramino);

  console.log(isOnBoard);
  if (isOnBoard) {
    player[1] = rotatedTetramino;
  }

  return player[1];
};

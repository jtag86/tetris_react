import { IBoard, IField, ITetromino } from "../types";
import { Action } from "./Input";
import React, { Dispatch, SetStateAction } from "react";
import { IPos } from "../types";
import { isBottom, isWithinBoard } from "./Board";
import { isOnField, transferField } from "./Field";

export const attemptMovement = (
  action: Action | null,
  board: IBoard,
  player: ITetromino[],
  setPlayer: React.Dispatch<React.SetStateAction<ITetromino[]>>,
  addPlayer: () => void,
  field: IField,
  setField: React.Dispatch<React.SetStateAction<IField>>
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
      rotatePlayer(player, setPlayer, board);
      break;
  }
  movePlayer(player, setPlayer, addPlayer, board, direction, field, setField);
};

const movePlayer = (
  player: ITetromino[],
  setPlayer: Dispatch<SetStateAction<ITetromino[]>>,
  addPlayer: () => void,
  board: IBoard,
  direction: IPos,
  field: IField,
  setField: React.Dispatch<React.SetStateAction<IField>>
) => {
  const movedTetramino = {
    ...player[1],
    pos: {
      x: player[1].pos.x + direction.x,
      y: player[1].pos.y + direction.y,
    },
  };

  const isOnBottom = isBottom(board, movedTetramino);

  if (!isOnBottom) {
    transferField(player[1], field, setField);
    addPlayer();
    return
  }


  const isField = isOnField(field, movedTetramino);
  if(!isField) {

    if(direction.x !==0) return 
    transferField(player[1], field, setField);
    addPlayer();
    return
  }

  const isOnBoard = isWithinBoard(board, movedTetramino);

  if (isOnBoard) {
    player[1] = movedTetramino;
    setPlayer([...player])
    return
  }
};

const rotatePlayer = (player: ITetromino[], setPlayer: Dispatch<SetStateAction<ITetromino[]>>, board: IBoard) => {
  let len = player[1].matrix.length - 1;
  const rotatedMatrix = player[1].matrix.map((row, i) =>
    row.map((val, j) => player[1].matrix[len - j][i])
  );

  const rotatedPlayer = {
    ...player[1],
    matrix: rotatedMatrix,
  };

  const isOnBottom = isBottom(board, rotatedPlayer);
  if (!isOnBottom) {
    return player;
  }

  const isOnBoard = isWithinBoard(board, rotatedPlayer);

  if (isOnBoard) {
    player[1] = rotatedPlayer;
    setPlayer([...player])
  }

};

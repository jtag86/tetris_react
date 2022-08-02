import { IBoard, IField, IRemovedRows, ITetromino } from "../types";
import { Action } from "./Input";
import React, { Dispatch, SetStateAction } from "react";
import { IPos } from "../types";
import { isBottom, isWithinBoard } from "./Board";
import { isOnField, removeLines, transferField } from "./Field";
import { isTop } from "./Board";

export const attemptMovement = (
  action: Action | null,
  board: IBoard,
  player: ITetromino[],
  setPlayer: React.Dispatch<React.SetStateAction<ITetromino[]>>,
  addPlayer: () => void,
  field: IField,
  setField: React.Dispatch<React.SetStateAction<IField>>,
  stopGameOver: () => void,
  startDelay: () => void,
  stopDelay: () => void,
  removedLines: IRemovedRows,
  setRemovedLines: Dispatch<SetStateAction<IRemovedRows>>
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
      rotatePlayer(player, setPlayer, board, field);
      break;
  }
  movePlayer(
    player,
    setPlayer,
    addPlayer,
    board,
    direction,
    field,
    setField,
    stopGameOver,
    startDelay,
    stopDelay,
    removedLines,
    setRemovedLines
  );
};

const movePlayer = (
  player: ITetromino[],
  setPlayer: Dispatch<SetStateAction<ITetromino[]>>,
  addPlayer: () => void,
  board: IBoard,
  direction: IPos,
  field: IField,
  setField: Dispatch<SetStateAction<IField>>,
  stopGameOver: () => void,
  startDelay: () => void,
  stopDelay: () => void,
  removedLines: IRemovedRows,
  setRemovedLines: Dispatch<SetStateAction<IRemovedRows>>
) => {
  const movedTetramino = {
    ...player[1],
    pos: {
      x: player[1].pos.x + direction.x,
      y: player[1].pos.y + direction.y,
    },
  };

  removeLines(
    field,
    setField,
    startDelay,
    stopDelay,
    removedLines,
    setRemovedLines,
  );
  const isOnBottom = isBottom(board, movedTetramino);

  if (!isOnBottom) {
    transferField(player[1], field, setField);
    addPlayer();
    return;
  }

  const isOnTop = isTop(field);
  if (!isOnTop) {
    stopGameOver();
  }
  const isField = isOnField(field, movedTetramino);
  if (!isField) {
    if (direction.x !== 0) return;
    transferField(player[1], field, setField);
    addPlayer();
    return;
  }

  const isOnBoard = isWithinBoard(board, movedTetramino);

  if (isOnBoard) {
    player[1] = movedTetramino;
    setPlayer([...player]);
    return;
  }
};

const rotatePlayer = (
  player: ITetromino[],
  setPlayer: Dispatch<SetStateAction<ITetromino[]>>,
  board: IBoard,
  field: IField
) => {
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
    return;
  }

  const isField = isOnField(field, rotatedPlayer);
  if (!isField) {
    setPlayer([...player]);
    return;
  }

  const isOnBoard = isWithinBoard(board, rotatedPlayer);
  if (isOnBoard) {
    player[1] = rotatedPlayer;
    setPlayer([...player]);
    return;
  }
};

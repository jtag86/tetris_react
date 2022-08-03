import { warn } from "console";
import { Dispatch, SetStateAction, useState } from "react";
import { IField, IRemovedRows, ITetromino } from "../types";
import cleanRowSound from '../assets/sound/cleanRow.wav'
import hitTetraminoSound from '../assets/sound/hitTetramino.wav';

const cleanRow = new Audio(cleanRowSound);
const hitTetramino = new Audio(hitTetraminoSound);

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
      if(playerX + x < 0 || playerX + x > field.size.columns-1) return true
      return field.rows[playerY + y][playerX + x] === 0;
    })
  );
};

export const transferField = (
  player: ITetromino,
  field: IField,
  setCleanedRows: Dispatch<SetStateAction<number>>,
) => {
  const playerX = player.pos.x;
  const playerY = player.pos.y;
  const rows = JSON.parse(JSON.stringify(field.rows));

  player.matrix.map((row, y) =>
    row.map((column, x) => {
      if (column === 0) return true;
      rows[playerY + y][playerX + x] = column;
    })
  );
  const newField = {
    ...field,
    rows: rows,
  }
  return removeRows(newField, setCleanedRows);
};

export const removeRows = (
  field: IField,
  setCleanedRows: Dispatch<SetStateAction<number>>,
) => {
  
  field.rows = field.rows.filter((row) => {
    const currentRow = row.every((column) => column)
    return !currentRow
  })

  let rowsNum = field.size.rows - field.rows.length;
  rowsNum ? cleanRow.play() : hitTetramino.play() 

  const tempRowsNum = rowsNum;
  setCleanedRows(prevRows => prevRows+tempRowsNum)
  while(rowsNum) {
    rowsNum--
    field.rows.unshift(Array.from({length: field.size.columns}, () => 0))
  }
  return field  
}

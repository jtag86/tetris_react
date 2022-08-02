import { Dispatch, SetStateAction, useState } from "react";
import { IField, IRemovedRows, ITetromino } from "../types";

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

export const removeLines = (
  field: IField,
  setField: Dispatch<SetStateAction<IField>>,
  startDelay: () => void,
  stopDelay: () => void,
  removedLines: IRemovedRows,
  setRemovedLines: Dispatch<SetStateAction<IRemovedRows>>,
) => {

  let rows= field.rows.map((row, y) => {

    const temp = row.every((column, x) => {
      return column !==0      
    })
    return temp ? y : -1
  }) 

  rows = rows.filter(item => item >= 0)

  if(!removedLines.handling && rows.length){
    const newRemovedLines = {
      ...removedLines,
      row: rows[0],
      cells: field.size.columns-1,
      handling: true,
    }
    
    setRemovedLines({...newRemovedLines})
  } 
  if(removedLines.handling) {
    const row = removedLines.row;
    const column = removedLines.cells;
     
    field.rows[row][column] = 0;
    if(removedLines.cells >=0) {
      removedLines.cells--;
    } else {
      removedLines.handling = false;
    }

    setRemovedLines({...removedLines})
  }
  setField({...field})
}

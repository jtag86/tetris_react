import { useState, useEffect } from "react";

import { buildBoard, nextBoard } from "../business/Board";
import { IField, ITetromino } from "../types";

export const useBoard = (rows: number, columns: number, player: ITetromino[], field: IField) => {
  const [board, setBoard] = useState(buildBoard(rows, columns));

  useEffect(() => {
    setBoard(nextBoard(rows, columns, player, field))  
  }, [player], );

  return [board] as const;
};

import { useState, useEffect } from "react";

import { buildBoard, nextBoard } from "../business/Board";
import { ITetromino } from "../types";

export const useBoard = (rows: number, columns: number, player: ITetromino[]) => {
  const [board, setBoard] = useState(buildBoard(rows, columns));

  useEffect(() => {
    setBoard(nextBoard(rows, columns, player))  
  }, [player], );

  return [board] as const;
};

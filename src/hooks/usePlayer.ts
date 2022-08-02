import { useState, useCallback } from "react";
import { buildTetramino } from "../business/Tetromino";
import { ITetromino } from "../types";
import { buildNextTetramino } from '../business/Tetromino';

const usePlayer = () => {
  const [player, setPlayer] = useState<ITetromino[]>(buildTetramino());
  const addPlayer = useCallback(() => {
    setPlayer(prevPlayer => buildNextTetramino(player));
  }, []);

  return [player, setPlayer, addPlayer] as const;
};

export default usePlayer;

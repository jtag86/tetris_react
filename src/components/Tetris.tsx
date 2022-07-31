import React from "react";
import { useBoard } from "../hooks/useBoard";
import usePlayer from "../hooks/usePlayer";
import Board from "./Board";
import GameController from "./GameController";

type Props = {
  rows: number;
  columns: number;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
};

const Tetris: React.FC<Props> = ({ rows, columns, setGameOver }) => {
  const [player, setPlayer, addPlayer] = usePlayer();
  const [board] = useBoard(rows, columns, player);

  return (
    <>
      <GameController 
        board={board} 
        player={player}
        setPlayer={setPlayer}
        addPlayer={addPlayer}
      />
      <Board board={board} />
    </>
  );
};

export default Tetris;

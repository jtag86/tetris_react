import React, { useState } from "react";
import { useBoard } from "../hooks/useBoard";
import usePlayer from "../hooks/usePlayer";
import Board from "./Board";
import GameController from "./GameController";
import useField from "../hooks/useField";
import Stats from "./Stats";

type Props = {
  rows: number;
  columns: number;
  startGameOver: () => void;
  stopGameOver: () => void;
};

const Tetris: React.FC<Props> = ({
  rows,
  columns,
  startGameOver,
  stopGameOver,
}) => {
  const [player, setPlayer, addPlayer] = usePlayer();
  const [field, setField] = useField(rows, columns);
  const [board] = useBoard(rows, columns, player, field);
  const [cleanedRows, setCleanedRows] = useState(0);

  return (
    <>
      <Stats scores={cleanedRows} player={player[0]}/>
      <Board board={board} />
 
      <GameController
        board={board}
        player={player}
        setPlayer={setPlayer}
        addPlayer={addPlayer}
        field={field}
        setField={setField}
        stopGameOver={stopGameOver}
        setCleanedRows={setCleanedRows}
      />
   </>
  );
};

export default Tetris;

import React from "react";
import { useBoard } from "../hooks/useBoard";
import usePlayer from "../hooks/usePlayer";
import Board from "./Board";
import GameController from "./GameController";
import useField from "../hooks/useField";
import { useDelay } from "../hooks/useDelay";

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
  const [delay, startDelay, stopDelay] = useDelay();

  return (
    <>
      <GameController
        board={board}
        player={player}
        setPlayer={setPlayer}
        addPlayer={addPlayer}
        field={field}
        setField={setField}
        stopGameOver={stopGameOver}
        delay={delay}
        startDelay={startDelay}
        stopDelay={stopDelay}
      />
      <Board board={board} />
    </>
  );
};

export default Tetris;

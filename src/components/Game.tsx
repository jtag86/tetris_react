import React from "react";
import styled from "styled-components";
import { useGameOver } from "../hooks/useGameOver";
import Menu from "./Menu";
import Tetris from "./Tetris";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 10px;
`;

type Props = {
  rows: number;
  columns: number;
};

const Game: React.FC<Props> = ({ rows, columns }) => {
  const [gameOver, setGameOver, restartGameOver] = useGameOver();

  return (
    <Wrapper>
      {false ? (
        <Menu handleClick={restartGameOver} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </Wrapper>
  );
};

export default Game;

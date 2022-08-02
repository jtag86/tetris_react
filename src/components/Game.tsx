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
  const [gameOver, startGameOver, stopGameOver] = useGameOver();

  return (
    <Wrapper>
      {false? (
        <Menu handleClick={startGameOver} />
      ) : (
        <Tetris
          rows={rows}
          columns={columns}
          startGameOver={startGameOver}
          stopGameOver={stopGameOver}
        />
      )}
    </Wrapper>
  );
};

export default Game;

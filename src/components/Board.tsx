import styled from "styled-components";
import { IBoard, IDefaultCell } from "../types";
import Cell from "./Cell";

const Wrapper = styled.div<{ rows: number; columns: number }>`
  margin: auto;
  width: ${({columns}) => columns * 23}px;
  height: ${({rows}) => rows * 23}px;
  border: 5px solid black;
  border-radius: 3px;
  display: grid;
  grid-gap: 2px;
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
`;

type Props = {
  board: IBoard;
};

const Board: React.FC<Props> = ({ board }) => {
  return (
    <Wrapper rows={board.size.rows} columns={board.size.columns}>
      {board.rows.map((row) =>
        row.map((cell, x) => <Cell key={x} cell={cell} />)
      )}
    </Wrapper>
  );
};

export default Board;

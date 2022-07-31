import styled from "styled-components";
import { IBoard, IDefaultCell } from "../types";
import BoardCell from "./BoardCell";

const Wrapper = styled.div<{ rows: number; columns: number }>`
  margin: auto;
  width: ${({columns}) => columns * 30}px;
  height: ${({rows}) => rows * 30}px;
  background-color: rgb(32, 0, 64);
  border: 10px solid rgb(32, 0, 64);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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
        row.map((cell, x) => <BoardCell key={x} cell={cell} />)
      )}
    </Wrapper>
  );
};

export default Board;

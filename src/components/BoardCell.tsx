import React from "react";
import styled from "styled-components";
import { IDefaultCell } from "../types";

interface Props {
  cell: IDefaultCell;
}

const handleBackground = (cellStyle: string) => {
  switch (cellStyle) {
    case "cyan":
      return "cyan";
    case "yellow":
      return "yellow";
    case "purple":
      return "purple";
    case "green":
      return "green";
    case "red":
      return "red";
    case "blue":
      return "blue";
    case "orange":
      return "orange";
    default:
      return "CornflowerBlue";
  }
};

const Cell = styled.div<{ cellStyle: string }>`
  background-color: ${({ cellStyle }) => handleBackground(cellStyle)};
  border-radius: 5px;
`;

const BoardCell: React.FC<Props> = ({ cell }) => {
  return <Cell cellStyle={cell.style} />;
};

export default BoardCell

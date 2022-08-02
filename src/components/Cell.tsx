import React from "react";
import styled from "styled-components";
import { IDefaultCell } from "../types";

interface Props {
  cell: number;
}

const handleBackground = (cellStyle: number) => {
  switch (cellStyle) {
    case 1:
      return "cyan";
    case 2:
      return "yellow";
    case 3:
      return "purple";
    case 4:
      return "green";
    case 5:
      return "red";
    case 6:
      return "blue";
    case 7:
      return "orange";
    default:
      return "CornflowerBlue";
  }
};

const StyledCell = styled.div<{ cellStyle: number}>`
  background-color: ${({ cellStyle }) => handleBackground(cellStyle)};
  border-radius: 5px;
`;

const Cell: React.FC<Props> = ({ cell }) => {
  return <StyledCell cellStyle={cell} />;
};

export default Cell

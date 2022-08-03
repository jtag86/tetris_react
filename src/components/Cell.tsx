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
      return "Orchid";
    case 4:
      return "Lime";
    case 5:
      return "red";
    case 6:
      return "NavajoWhite";
    case 7:
      return "orange";
    default:
      return "#347B98";
  }
};

const StyledCell = styled.div<{ cellStyle: number}>`
  background-color: ${({ cellStyle }) => handleBackground(cellStyle)};
  border-radius: 4px;
`;

const Cell: React.FC<Props> = ({ cell }) => {
  return <StyledCell cellStyle={cell} />;
};

export default Cell

import { IBoard, IDefaultCell, IPos, ITetromino } from "../types";

const defaultCell: IDefaultCell = {
  style: "",
};

export const buildBoard = (rows: number, columns: number) => {
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  const obj: IBoard = {
    rows: builtRows,
    size: { rows, columns },
  };

  return obj;
};

export const nextBoard = (
  rows: number,
  columns: number,
  player: ITetromino[]
) => {
  let builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  builtRows = transferBoard(player, builtRows);

  return {
    rows: builtRows,
    size: { rows, columns },
  };
};

const transferBoard = (player: ITetromino[], builtRows: IDefaultCell[][]) => {
  const playerX = player[1].pos.x;
  const playerY = player[1].pos.y;

  player[1].matrix.map((row, y) =>
    row.map((column, x) => {
      if(column !== 1) return
      let style: string;
      column === 1 ? (style = player[1].color) : (style = "green");
      return (builtRows[playerY + y][playerX + x] = { style });
    })
  );
  return builtRows;
};

export const isWithinBoard = (
  player: ITetromino[],
  board: IBoard,
  nextPlayer: ITetromino
) => {
  
  const playerX = nextPlayer.pos.x;
  const playerY = nextPlayer.pos.y;
  const lenY = board.rows.length;
  const lenX = board.rows[0].length;

  return nextPlayer.matrix.every((row, y) =>
    row.every((column, x) => {
      if (column !== 1) return true;
      return playerX + x >= 0 && playerX + x < lenX;
    })
  );
};

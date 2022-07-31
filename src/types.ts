export interface IDefaultCell {
  style: string
}

export interface IPos {
  x: number,
  y: number,
}

interface ISize {
  rows: number,
  columns: number
}

export interface IBoard {
  rows: IDefaultCell[][],
  size: ISize
}

export interface ITetromino {
  matrix: number[][],
  color: string,
  pos: IPos
}

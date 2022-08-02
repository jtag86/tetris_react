export interface IDefaultCell {
  style: number
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
  rows:number[][],
  size: ISize
}

export interface IField {
  rows: number[][],
  size: ISize,
}

export interface ITetromino {
  matrix: number[][],
  pos: IPos
}

export type cell = {
  ship: boolean,
  clicked: boolean
}

export type Board = cell[][]

export interface room  {
  roomCode: string,
  host: string,
  player: string,
  state: string,
  hostBoard: Board,
  playerBoard: Board,
  turn: number,
  playerReady: boolean,
  hostReady: boolean
}



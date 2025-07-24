export interface cell  {
  ship: boolean,
  clicked: boolean
}
export type Board = cell[][]

export type RoomID = string
export type PlayerID = string;
export type State = "waitingRoom" | "placingShips" | "game" | "endGame" | "none";

export type Room  = {
  hostID: PlayerID,
  playerID: PlayerID,
  state: State,
  hostBoard: Board,
  playerBoard: Board,
  turn: PlayerID,
  playerReady: boolean,
  hostReady: boolean,
  playerShipsPlaced: number,
  hostShipsPlaced: number,
}

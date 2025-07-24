export type cell = {
  ship: boolean,
  clicked: boolean
}

export type Board = cell[][]

export type RoomID = string
export type PlayerID = string;
export type State = "waitingRoom" | "placingShips" | "game" | "endGame" | "none";
export type Turn = "me" | "opponent";

export type room = {
  roomID: RoomID,
  state: State,
  ownBoard: Board,
  oppBoard: Board,
  turn: Turn,
  ownShipsPlaced: number
}



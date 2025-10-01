import { ref, toRaw } from 'vue'
import type { Board, cell, PlayerID, RoomID, Role, State } from './types.ts'
const serverURL = 'http://localhost:8000'
const BOARD_SIZE = 10
const ownBoard = ref<Board>([])
const opponentBoard = ref<Board>([])
const emptyCell: cell = { ship: false, clicked: false }
const ownID = ref<PlayerID>(' ')
const roomID = ref<RoomID>(' ')
const cellDisplay = { clickedShip: 'X', water: '', clickedWater: '·' }
const ownCellBackground = { ship: '#59486d', water: 'none' }
const role = ref<Role>('none')
const state = ref<State>('waitingRoom')
const shipsPlaced = ref<number>(0)
const ready = ref<boolean>(false)
const SHIPS = 1
const turn = ref<boolean>(false)

for (let i = 0; i < BOARD_SIZE; i++) {
  ownBoard.value.push([])
  opponentBoard.value.push([])
  for (let j = 0; j < BOARD_SIZE; j++) {
    ownBoard.value[i].push(structuredClone(toRaw(emptyCell)))
    opponentBoard.value[i].push(structuredClone(toRaw(emptyCell)))
  }
}

export {
  serverURL,
  ownBoard,
  opponentBoard,
  ownID,
  roomID,
  role,
  cellDisplay,
  ownCellBackground,
  state,
  shipsPlaced,
  ready,
  SHIPS,
  turn,
}

import { rooms, BOARD_SIZE } from '../serverData.ts'
import type { Board, PlayerID, Room, RoomID, cell } from '../serverTypes.ts'
import { toRaw, ref } from 'vue'
import random from 'random-string-generator'

const emptyBoard = ref<Board>([])
const emptyCell: cell = { ship: false, clicked: false }

for (let i = 0; i < BOARD_SIZE; i++) {
  emptyBoard.value.push([])
  for (let j = 0; j < BOARD_SIZE; j++) {
    emptyBoard.value[i].push(structuredClone(toRaw(emptyCell)))
  }
}

const emptyRoom: Room = {
  hostID: '0',
  playerID: '0',
  state: 'none',
  hostBoard: structuredClone(toRaw(emptyBoard.value)),
  playerBoard: structuredClone(toRaw(emptyBoard.value)),
  turn: 'none',
  playerReady: false,
  hostReady: false,
  playerShipsPlaced: 0,
  hostShipsPlaced: 0,
}

function generateRoomID(): RoomID {
  const roomID = ref<RoomID>('')
  roomID.value = random(12)
  while (rooms.value[roomID.value]) {
    roomID.value = random(12)
  }

  return roomID.value
}

export function createNewRoom(hostID: PlayerID): RoomID {
  const roomID = generateRoomID()
  console.log(`Room ID: ${roomID}`)
  rooms.value[roomID] = {
    ...emptyRoom,
    hostID: hostID,
    turn: hostID,
    state: 'waitingRoom'
  }
  return roomID
}

export function authorizeOrAddPlayer(roomID: RoomID, playerID: PlayerID): boolean {
  console.log('authorizeOrAddPlayer called')
  console.log(rooms.value[roomID])
  if (rooms.value[roomID].playerID == playerID) {
    console.log('already a player')
    return true
  } else if (rooms.value[roomID].playerID == '0') {
    console.log('assigning player')
    rooms.value[roomID].playerID = playerID
    return true
  }
  return false
}

export function authorizeHost(roomID: RoomID, playerID: PlayerID): boolean {
  return rooms.value[roomID].hostID == playerID
}

export function authorizePlayer(roomID: RoomID, playerID: PlayerID): boolean {
  return rooms.value[roomID].playerID == playerID
}

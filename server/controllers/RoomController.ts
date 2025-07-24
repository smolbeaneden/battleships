import { rooms, BOARD_SIZE } from '../serverData.ts'
import type {Board, PlayerID, Room, RoomID} from '../serverTypes.ts'
import type {cell} from "../../src/data/types";
import {toRaw, ref} from "vue";
import random from 'random-string-generator'

const emptyBoard = ref<Board>([]);
const  emptyCell: cell = {ship: false, clicked: false}

for(let i = 0; i < BOARD_SIZE; i++) {
  emptyBoard.value.push([]);
  for(let j = 0; j < BOARD_SIZE; j++) {
    emptyBoard.value[i].push(structuredClone(toRaw(emptyCell)));
  }
}

const emptyRoom: Room = {
  hostID: "0",
  playerID: "0",
  state: "none",
  hostBoard: structuredClone(toRaw(emptyBoard.value)),
  playerBoard: structuredClone(toRaw(emptyBoard.value)),
  turn: "none",
  playerReady: false,
  hostReady: false,
  playerShipsPlaced: 0,
  hostShipsPlaced: 0,
}

function generateRoomID(): RoomID {
  const roomID= ref<RoomID>('');
  roomID.value = random(12)
  while(rooms[roomID.value]){
    roomID.value = random(12)
  }
    return roomID.value;
}

export function createNewRoom(hostID: PlayerID): RoomID {
  const roomID = generateRoomID();
  rooms.value[roomID] = emptyRoom;
  rooms.value[roomID].hostID .turn = hostID
  rooms.value[roomID].turn = hostID
  rooms.value[roomID].state = "waitingRoom";
  return roomID
}

export function authorizeUser(roomID: RoomID, playerID: PlayerID): any {
  if(rooms.value[roomID].hostID == playerID){
    return true;
  }
  else if (rooms.value[roomID].playerID != '0'){
    rooms.value[roomID].playerID = playerID;
    return true;
  }
  return false;
}

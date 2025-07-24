import {ref, toRaw} from 'vue';
import {type Board, type cell, type PlayerID, type RoomID} from './types.ts'
const BOARD_SIZE = 10;
const ownBoard = ref<Board>([]);
const opponentBoard = ref<Board>([]);
const  emptyCell: cell = {ship: false, clicked: false}
const ownID = ref<PlayerID>(' ')
const roomID = ref<RoomID>(' ')
for (let i = 0 ; i < BOARD_SIZE ;i++){
  ownBoard.value.push([]);
  opponentBoard.value.push([]);
  for (let j = 0 ; j < BOARD_SIZE; j++){
    ownBoard.value[i].push(structuredClone(toRaw(emptyCell)));
    opponentBoard.value[i].push(structuredClone(toRaw(emptyCell)));
  }
}

export {
  ownBoard,
  opponentBoard,
  ownID,
  roomID,
}

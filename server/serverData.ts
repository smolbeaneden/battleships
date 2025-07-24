import {ref} from 'vue';
import {type PlayerID, type Room} from './serverTypes.ts'

const BOARD_SIZE = 10;
const SHIPS = 16;

const rooms = ref<Room[]>([]);
const users = ref<PlayerID[]>([]);

export {
  BOARD_SIZE,
  SHIPS,
  rooms,
  users,
}

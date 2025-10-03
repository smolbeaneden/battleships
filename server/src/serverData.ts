import { ref } from 'vue'
import type { PlayerID, Room, RoomID } from './serverTypes.ts'

const BOARD_SIZE = 10
const SHIPS = 16

const rooms = ref<Record<RoomID, Room>>({})
const users = ref<PlayerID[]>([])

export { BOARD_SIZE, SHIPS, rooms, users }

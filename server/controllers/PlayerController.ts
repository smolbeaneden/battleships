import type {PlayerID} from '../serverTypes.ts'
import {users} from '../serverData.ts'
import {ref} from "vue";
import random from 'random-string-generator'


export function generatePlayerID(): PlayerID {
  const playerID = ref<PlayerID>(' ')
  playerID.value = random(12)
  while(users[playerID.value]){
    playerID.value = random(12)
  }
  users.value.push(playerID.value);
  return playerID.value;
}

export function deletePlayerID(id: PlayerID): boolean{
  const userIndex = users.value.indexOf(id);
  if(userIndex !== -1){
    users.value.splice(userIndex, 1);
    return true
  }
  return false;
}

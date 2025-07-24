import type {RoomID, PlayerID} from "@/data/types.ts";
import {ownID, roomID} from '@/data/DataStore'
import axios from "axios";
export function authorizeUser(): boolean {
  let authorized = false;
  try{
    axios.get(`http://localhost:8000/room/:${roomID.value}/${ownID}`)
      .then((response) => {
        console.log(response)
        authorized = response.data
        console.log('auth:', authorized);
      })
  }
  catch(error){
    console.log(error)
  }
  return authorized;
}


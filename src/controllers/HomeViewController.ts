import { type PlayerID } from "@/data/types"
import {router} from '@/router/index.ts'
import axios from "axios";
import {roomID} from "@/data/DataStore.ts";

export async function createRoom(hostID: PlayerID):Promise<boolean> {
  try{
    axios.post('http://localhost:8000/room/new', hostID)
      .then((response) => {
        console.log('Room ID:', response.data)
        roomID.value = response.data;
        router.push({path: response.data})
      })
  }
  catch(error){
    console.log(error)
  }
  return true;
}

import type {State} from '@/data/types.ts'
import {roomID} from "@/data/DataStore.ts";
import axios from "axios";

export function getGameState(): State | undefined{
  let state;
  try{
    axios.get(`http://localhost:8000/game/:${roomID.value}/state`)
      .then((response) => {
        console.log(response)
        state = response.data
        console.log('State:', state)
      })
  }
  catch(error){
    console.log(error)
  }
  return state;
}


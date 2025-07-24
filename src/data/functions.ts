import {ownID} from './DataStore.ts'
import axios from "axios";

export async function init(): Promise<boolean>{
  try{
    axios.get('http://localhost:8000/player/new')
      .then((response) => {
        console.log(response)
        ownID.value = response.data
        console.log('User ID:', ownID.value)
      })
  }
  catch(error){
    console.log(error)
  }

  return true;
}

export async function leaveSite(): Promise<boolean>{
  try{
    axios.delete(`http://localhost:8000/player/${ownID.value}`)
      .then((response) => {
        console.log(response.data)
      })
  }
  catch(error){
    console.log(error)
  }

  return true;
}


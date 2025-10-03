import { ownID, role, serverURL, roomID, state } from './DataStore.ts'
import type { JsonOptions } from 'vite'
import router from '../router'
import { authorizeOrAddPlayer } from '../../../server/controllers/RoomController.ts'
import type { RoomID, State, Board } from 'UI/src/data/types.ts'
const myHeaders = { Authorization: ownID.value.toString() }
import { ref, onMounted, onUnmounted } from 'vue'

type Response = {
  data: JsonOptions
  ok: boolean
}

export async function get(endpoint: string): Promise<Response | void> {
  let returnValue = undefined
  try {
    const response = await fetch(`${serverURL}/${endpoint}`, {
      headers: myHeaders,
    })
    console.log(response)
    returnValue = await response.json()
  } catch (error) {
    console.log(error)
  }
  return returnValue
}

// async function foo() {
//   let promise = new Promise((resolve) => {
//     resolve(5)
//   })
//   const result = await promise;
// }

export async function post(endpoint: string, input: string): Promise<Response | void> {
  let returnValue = undefined
  try {
    const response = await fetch(`${serverURL}/${endpoint}`, {
      method: 'POST',
      body: input,
      headers: myHeaders,
    })
    console.log(response)
    returnValue = await response.json()
  } catch (error) {
    console.log(error)
  }
  return returnValue
}


export async function put(endpoint: string, input: Board | string | Record<string, number> | boolean ): Promise<Response | void> {
  let returnValue = undefined
  try {
    const response = await fetch(`${serverURL}/${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(input),
      headers: myHeaders,
    })
    console.log(response)
    returnValue = await response.json()
  } catch (error) {
    console.log(error)
  }
  return returnValue
}

export async function deleteRequest(endpoint: string): Promise<Response | void> {
  let returnValue = undefined
  try {
    const response = await fetch(`${serverURL}/${endpoint}`, {
      method: 'DELETE',
      headers: myHeaders,
    })
    console.log(response)
    returnValue = await response.json()
  } catch (error) {
    console.log(error)
  }
  return returnValue
}

export async function joinRoom(code: RoomID): Promise<boolean> {
  console.log(code)
  console.log(ownID.value)
  const response = (await get(`room/${code}/${ownID.value}/join`)) as Response | void
  console.log(response)
  if (response?.data) {
    role.value = 'player'
    roomID.value = code
    await router.push({ path: code })
    return true
  }
  alert("Couldn't Join Room")
  return false
}

export async function authorizeOrAddUser(roomID: RoomID) {
  if (role.value == 'host' || role.value == 'player') {
    return true
  }
  return await joinRoom(roomID)
}

export async function changeState(newState: State): Promise<boolean> {
  const response = await put(`room/${roomID.value}/state`, newState)
  console.log(response)
  return true;
}

export function usePolling(method, timeInterval) {
  const interval: any = ref(null)
  const callMethod = ref(method)
  const isPolling = ref(false)

  const clear = () => {
    clearInterval(interval.value)
    interval.value = null
    isPolling.value = false
  }

  const fetchData = (poll = true) => {
    callMethod.value()

    if (poll) {
      // start interval
      interval.value = setInterval(() => {
        callMethod.value()
      }, timeInterval)
    } else {
      clear()
    }
  }

  const start = () => {
    console.log('start')
    // clear any existing polling calls
    clear()
    // set polling flag to true
    isPolling.value = true
    // fetch data
    fetchData()
  }

  onMounted(() => isPolling.value && fetchData())
  onUnmounted(clear)

  return {
    start,
    clear,
  }
}

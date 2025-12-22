<script setup lang="ts">
/*
הערות
make components of boards
<T>
format, ctrl + something
colors of cells make accessible
isShip
check ok
separate css
without css variables
 */
import {
  ownBoard,
  opponentBoard,
  cellDisplay,
  ownCellBackground,
  roomID,
  role,
  turn,
  END_GAME,
  winner
} from '../../data/DataStore'
import Popup from '../../components/Popup.vue'
import { usePolling, get, put } from '../../data/fetchFunctions'
import type { cell, Board } from '../../data/types'
import { ref, onMounted, toRaw } from 'vue'
console.log(opponentBoard.value)
interface Response {
  data: string;
  ok: boolean;
}

const { start, clear } = usePolling(checkTurn, 1000)
onMounted(start)

type CellProperties = Record<string, string>

const inactiveCellProperties = ref<CellProperties>({"cursor": 'auto', "hoverBackground": "none", "activeColor": "solid 1px #5c525a"})
const activeCellProperties =ref<CellProperties>({"cursor": "pointer", "hoverBackground": "#5c525a", "activeColor": "solid 2px #afa4a4"})

const cellProperties = ref<CellProperties>(structuredClone(toRaw(inactiveCellProperties.value)))

function changeCellProperties(cellsType: "active" | "inactive") {
  if(cellsType == "active") {
    cellProperties.value = structuredClone(toRaw(activeCellProperties.value))
  } else {
    cellProperties.value = structuredClone(toRaw(inactiveCellProperties.value))
  }
  return;
}

if (role.value == 'host') {
  turn.value = true;
  console.log("user is host")
  changeCellProperties("active")
}

function shipDisplay(cell: cell): string {
  if (cell.isShip && cell.clicked) {
    return cellDisplay.clickedShip
  }
  if (cell.clicked) {
    return cellDisplay.clickedWater
  }
  return cellDisplay.water
}

function getOwnCellBackground(isShip: boolean): string {
  return isShip ? ownCellBackground.ship : ownCellBackground.water;
}

interface BoardResponse {
  data: Board;
  ok: boolean;
}
async function fetchBoard(board: "mine" | "opponent") {
  console.log(board);
  if (board === "mine") {
    const response = await get<BoardResponse>(`room/${roomID.value}/${role.value}/board`)
    console.log("Full response:", response) // Check the entire response
    console.log("Response data:", response.data) // Check if data exists

    if (response && response.data) {
      ownBoard.value = response.data
    } else {
      console.error("No data in response:", response)
    }
  } else if (board === "opponent") {
    const response = await get<BoardResponse>(`room/${roomID.value}/${role.value === 'host' ? 'player' : 'host'}/board`)
    console.log("Full response:", response)
    console.log("Response data:", response.data)

    if (response && response.data) {
      opponentBoard.value = response.data
    } else {
      console.error("No data in response:", response)
    }
  }
}

  async function checkTurn() {
    const response = await get<Response>(`game/${roomID.value}/turn`); //comes out false....
    console.log(response.data);
    console.log(turn.value)
    if (response.data !== turn.value.toString()) {
      console.log({ 'turn is changing': response.data == 'true' })
      turn.value = response.data == 'true'

      if (turn.value) {
        await fetchBoard("mine")
        changeCellProperties("active")
        clear()
        await checkEndGame()
      }
    }
  }

  async function updateTurn(): Promise<void> {
    await put<Response>(`game/${roomID.value}/turn`, turn.value)
  }

  async function attack(y: number, x: number): Promise<boolean> {
    if (turn.value && opponentBoard.value[y][x].clicked != true) {
      turn.value = false
      changeCellProperties("inactive")
      const response = (await put<Response>(`game/${roomID.value}/attack`, { x, y }))
      if (response.data === 'true') {
        opponentBoard.value[y][x].isShip = true
      }
      opponentBoard.value[y][x].clicked = true
      await fetchBoard("opponent")
      await updateTurn()
      await checkEndGame()
      if (!END_GAME.value){
        start()
      }

      return true;
    }
  }

interface endGameResponse {
  data: {
    end: boolean
    winner: boolean
  }
  ok: boolean
}

  async function checkEndGame(): Promise<boolean>{
    const response = await get<endGameResponse>(`game/${roomID.value}/end`);
    console.log(response.data);
    if (response.data.end) {
      response.data.winner ? winner.value = true: winner.value = false;
      END_GAME.value = true;
      changeCellProperties("inactive")
      clear()
    }
    return true;
  }

</script>

<template>
  <h1 v-if="turn">Your Turn!</h1>
  <h1 v-else>Wait for your turn...</h1>
  <div class="boards">
    <div>
      <h2>My Board</h2>
      <div class="grid">
        <div v-for="(row, i) in ownBoard" :key="i">
          <div
            v-for="(cell, j) in row"
            :key="j"
            class="myCell"
            :style="{ 'background-color': getOwnCellBackground(cell.isShip) }"
          >
            {{ shipDisplay(cell) }}
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2>Opponent's Board</h2>
      <div class="grid">
        <div v-for="(row, i) in opponentBoard" :key="i">
          <div
            v-for="(cell, j) in row"
            :key="j"
            class="oppCell"
            :style="{
              '--cursor': cellProperties.cursor,
              '--hover-background-color': cellProperties.hoverBackground,
              '--active-color': cellProperties.activeColor,
            }"
            @click="attack(i, j)"
          >
            {{ shipDisplay(cell) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <Popup v-if="END_GAME" />
</template>

<style scoped src="./GameCourse.css"/>

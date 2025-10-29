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
} from '../../data/DataStore'
import { usePolling, get, put } from '../../data/fetchFunctions'
import type { cell, Board } from '../../data/types'
import { ref, onMounted } from 'vue'

interface Response {
  data: string;
  ok: boolean;
}

type CellProperties = Record<string, string>

const inactiveCellProperties = ref<CellProperties>({"cursor": 'auto', "hoverBackground": "none", "activeColor": "solid 1px #5c525a"})
const activeCellProperties =ref<CellProperties>({"cursor": "pointer", "hoverBackground": "#5c525a", "activeColor": "solid 2px #afa4a4"})

const cellProperties = ref<CellProperties>(inactiveCellProperties.value)

function changeCellProperties(cellsType: "active" | "inactive") {
  if(cellsType === "active") {
    cellProperties.value = activeCellProperties.value
  } else {
    cellProperties.value = inactiveCellProperties.value
  }
  return;
}

if (role.value == 'host') {
  turn.value = true;
  changeCellProperties("active")
}

const { start, clear } = usePolling(checkTurn, 1000)
onMounted(start)



function shipDisplay(cell: cell): string {
  if (cell.ship && cell.clicked) {
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
  if (board === "mine") {
    const response = await get<BoardResponse>(`/room/${roomID.value}/board/${role.value}`)
    ownBoard.value = response.data
  } else {
    const response = await get<BoardResponse>(`room/${roomID.value}/board/${role.value == 'host' ? 'player' : 'host'}`)
    opponentBoard.value = response.data
  }
}
async function checkTurn() {
  const response = await get<Response>(`game/${roomID.value}/turn`);
  console.log(response.data);
  if (response.data !== turn.value.toString()) {
    console.log('turn is changing')
    turn.value = response.data == 'true'

    if (turn.value) {
      await fetchBoard("mine")
      changeCellProperties("active")
      clear()
    } else {
      await fetchBoard("opponent")
      changeCellProperties("inactive")
    }
  }
}

async function updateTurn(): Promise<void> {
  await put<Response>(`game/${roomID.value}/turn`, turn.value)
}

async function attack(y: number, x: number): Promise<boolean> {
  turn.value = false
  changeCellProperties("inactive")
  const response = (await put<Response>(`game/${roomID.value}/attack`, {x, y}))
  if (response.data === 'true') {
    opponentBoard.value[y][x].ship = true
  }
  opponentBoard.value[y][x].clicked = true
  await updateTurn()
  start()
  return true;
}
</script>

<template>
  <h1 v-if="turn == true">Your Turn!</h1>
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
            :style="{ 'background-color': getOwnCellBackground(cell.ship) }"
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
  <!--  <Popup />-->
</template>

<style scoped src="./GameCourse.css"/>

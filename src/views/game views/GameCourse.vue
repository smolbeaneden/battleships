<script setup lang="ts">
import {
  ownBoard,
  opponentBoard,
  cellDisplay,
  ownCellBackground,
  roomID,
  turn
} from '@/data/DataStore.ts'
import { usePolling, get, put } from '@/data/fetchFunctions'
import type { cell } from '@/data/types'
import { ref, onMounted } from 'vue'

const cursor = ref<string>('auto')
const hoverBackground = ref<string>('none')

function shipDisplay(cell: cell): string {
  if (cell.ship && cell.clicked) {
    return cellDisplay.clickedShip
  } else if (cell.clicked) {
    return cellDisplay.clickedWater
  }
  return cellDisplay.water
}

function getOwnCellBackground(ship: boolean): string {
  if (ship) {
    return ownCellBackground.ship
  }
  return ownCellBackground.water
}

type Response = {
  data: string
  ok: boolean
}

const { start, clear } = usePolling(checkTurn,1000)
onMounted(start)
async function checkTurn() {
  const response = await get(`room/${roomID.value}/turn`) as Response
  if(response.data !== turn.value.toString()){
    console.log("turn is changing")
    turn.value = (response.data == "true")
    if(turn.value){
      cursor.value = 'pointer'
      hoverBackground.value = '#5c525a'
      clear()
    }
    else{
      cursor.value = 'auto'
      hoverBackground.value = 'none'
    }

  }
}

async function updateTurn(): void {
  const response = await put(`game/${roomID.value}/turn`, turn.value)
}


async function attack(y: number, x:number): Promise<boolean> {
  const response = await put(`game/${roomID.value}/attack`, {x, y}) as Response
  if (response.data == "true") {
    opponentBoard.value[y][x].ship = true
  }
  turn.value = false
  updateTurn()
  return true
}


</script>

<template>
  <div class="boards">
    <div>
      <h2>My Board</h2>
      <div class="grid">
        <div v-for="(row, i) in ownBoard" :key="i">
          <div
            v-for="(cell, j) in row"
            :key="j"
            class="myCell"
            :style="{ '--bg-color': getOwnCellBackground(cell.ship) }"
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
            :style="{ '--cursor': cursor, '--hover-background-color': hoverBackground }"
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

<style scoped>
:root {
  --bg-color: rgba(255, 255, 255, 0);
}
.boards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
}
h2 {
  text-align: center;
}
.grid {
  display: inline-grid;
  grid-template-columns: repeat(10, 1fr);
  border: 1px solid lightgray;
}
.myCell {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  width: 0.7em;
  height: 0.7em;
  text-align: center;
  border: solid 1px #5c525a;
  background-color: var(--bg-color);
}

.oppCell {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  width: 0.7em;
  height: 0.7em;
  text-align: center;
  border: solid 1px #5c525a;
  transition:
    border-color 0.25s,
    background-color 0.15s;
}
.oppCell:hover {
  cursor: var(--cursor);
  background-color: var(--hover-background-color);
}
.oppCell:active {
  border: solid 2px #afa4a4;
}
</style>

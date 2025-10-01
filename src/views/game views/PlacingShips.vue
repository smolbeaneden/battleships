<script setup lang="ts">
import { ownBoard, ownID, roomID, shipsPlaced, role, state,ready, SHIPS } from '@/data/DataStore.ts'
import { put, usePolling, get } from '@/data/fetchFunctions.ts'
import StartButton from '@/components/Button.vue'
import { onMounted } from 'vue'

console.log(ownBoard.value)

type Response = {
  data: boolean
  ok: boolean
}

function shipDisplay(ship: boolean): string {
  if (ship) {
    return 'x'
  }
  return ''
}

function placeShip(x: number, y: number): void {
  if (shipsPlaced.value < SHIPS && !ownBoard.value[x][y].ship) {
    ownBoard.value[x][y].ship = true
    shipsPlaced.value++
    console.log(ownBoard.value)
  }

}

async function checkOtherPlayerReady(): Promise<void> {
  if (ready.value){
    const response = await get(`room/${roomID.value}/${role.value}/ready`) as Response | void
    console.log(response);
    if (response?.data) {
      state.value = "game"
      console.log("clearing")
      clear()
    }
  }
}

const { start, clear } = usePolling(checkOtherPlayerReady, 1000)
onMounted(start)

async function sendBoard() {
  console.log("sending")
  const response = await put(`room/${roomID.value}/${ownID.value}/board`, ownBoard.value)
  console.log(response);
  ready.value = true
}
</script>

<template>
  <h1>Place Ships</h1>
  <h2>{{ shipsPlaced }}/{{ SHIPS }}</h2>
  <div class="grid">
    <div v-for="(row, i) in ownBoard" :key="i">
      <div v-for="(cell, j) in row" :key="j" class="cell" @click="placeShip(i, j)">
        {{ shipDisplay(cell.ship) }}
      </div>
    </div>
  </div>
  <start-button v-if="shipsPlaced == SHIPS" title="Ready" @click="sendBoard"></start-button>
</template>

<style scoped>
.grid {
  display: inline-grid;
  grid-template-columns: repeat(10, 1fr);
  border: 1px solid lightgray;
}
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  width: 1em;
  height: 1em;
  text-align: center;
  border: solid 1px #5c525a;
  transition:
    border-color 0.25s,
    background-color 0.25s;
}
.cell:hover {
  cursor: pointer;
  background-color: #5c525a;
}

.cell:active {
  border: solid 2px #afa4a4;
}
</style>

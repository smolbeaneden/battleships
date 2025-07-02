<script setup lang="ts">
import {ownBoard} from '@/logic/data.ts';
import {ref} from 'vue';
import StartButton from '@/components/StartButton.vue'
console.log(ownBoard.value)
function shipDisplay(ship: boolean): string {
  if (ship) {
    return 'x'
  }
  return ''
}
const SHIPS = 16;
const shipsPlaced = ref<number>(0)

function placeShip(x:number,y:number):void{
  if (shipsPlaced.value<SHIPS && !ownBoard.value[x][y].ship){
    ownBoard.value[x][y].ship = true;
    console.log("bye")
    shipsPlaced.value++
  }
  console.log(ownBoard.value)
}
</script>

<template>
  <h1>Place Ships</h1>
  <h2> {{shipsPlaced}}/{{SHIPS}}</h2>
  <div class="grid">
    <div v-for="(row, i) in ownBoard" :key="i" >
      <div v-for="(cell, j) in row" :key="j" class="cell" @click="placeShip(i,j)">
        {{shipDisplay(cell.ship)}}
      </div>
    </div>
  </div>
  <start-button v-if='shipsPlaced == SHIPS' title="Ready"></start-button>

</template>

<style scoped>
.grid{

  display: inline-grid;
  grid-template-columns: repeat(10, 1fr);
  border: 1px solid lightgray;

}
.cell{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  width: 1em;
  height: 1em;
  text-align: center;
  border: solid 1px #5c525a;
  transition: border-color 0.25s, background-color 0.25s;

}
.cell:hover{
  cursor: pointer;
  background-color: #5c525a;
}

.cell:active{
  border: solid 2px #afa4a4;

}
</style>

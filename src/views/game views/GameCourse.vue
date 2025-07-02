<script setup lang="ts">
import {ownBoard, opponentBoard} from '@/data/DataStore.ts'
import {ref} from 'vue';
import Popup from '@/components/Popup.vue'
const cursor = ref<string>('pointer')
const hoverBackground = ref<string>('#5c525a')
function shipDisplay(ship: boolean): string{
  if (ship) {
    return 'x'
  }
  return ''
}
</script>

<template>
  <div class="boards">
    <div>
      <h2>My Board</h2>
      <div class="grid">
        <div v-for="(row, i) in ownBoard" :key="i" >
          <div v-for="(cell, j) in row" :key="j" class="myCell" >
            {{shipDisplay(cell.ship)}}
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2>Opponent's Board</h2>
      <div class="grid">
        <div v-for="(row, i) in opponentBoard" :key="i" >
          <div v-for="(cell, j) in row" :key="j" class="oppCell" :style="{'--cursor': cursor, '--hover-background-color': hoverBackground}">
            {{shipDisplay(cell.ship)}}
          </div>
        </div>
      </div>
    </div>
  </div>
  <Popup/>


</template>

<style scoped>

.boards{
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
}
h2{
  text-align: center;
}
.grid{
  display: inline-grid;
  grid-template-columns: repeat(10, 1fr);
  border: 1px solid lightgray;

}
.myCell{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  width: 0.7em;
  height: 0.7em;
  text-align: center;
  border: solid 1px #5c525a;
}


.oppCell{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  width: 0.7em;
  height: 0.7em;
  text-align: center;
  border: solid 1px #5c525a;
  transition: border-color 0.25s, background-color 0.15s;
}
.oppCell:hover{
  cursor: var(--cursor);
  background-color: var(--hover-background-color);
}
.oppCell:active{
  border: solid 2px #afa4a4;
}
</style>

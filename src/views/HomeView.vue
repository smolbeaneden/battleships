<script setup lang="ts">
import {ref} from 'vue'
import StartButton from '@/components/StartButton.vue'
const inputCode = ref<string>('')


function checkCode(code: string): boolean{

}
</script>

<template>
  <div class="grid-cols-1">
    <h1>Battleships</h1>
      <h2> Online Game</h2>
    <div class="image">
      <img src="../assets/battleship.png" alt="Battleship" />
    </div>
    <div class="grid">
        <StartButton title="Start Game" path="startGame" />
<!--        <div>-->
<!--          <input v-model="inputCode">-->
          <StartButton title="Join a Game" path="game" @click="checkCode()" />
<!--        </div>-->

    </div>
  </div>


</template>

<style scoped>
h1{
  font-size: 4rem;
  color: white;
  text-align: center;

}
h2{
  color: white;
  text-align: center;
}
.image{
  display: flex;
  justify-content: center;
}
.grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
}


</style>

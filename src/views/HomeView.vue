<script setup lang="ts">
import {ref} from 'vue'
import {router} from '@/router/index.ts'
import Button from '@/components/Button.vue'
const inputCode = ref<string>('game')

function joinRoom(code: string): void {
  console.log(code)
  router.push({path: inputCode.value})
}

function createRoom(): void {
  router.push({path: inputCode.value})
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
        <Button title="Start Game" @click="createRoom()" />
        <div>
          <input :v-model="inputCode"/>
          <Button title="Join a Game" @click="joinRoom(inputCode)" />
        </div>

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

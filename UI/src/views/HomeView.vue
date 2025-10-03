<script setup lang="ts">
import { ref } from 'vue'
import { ownID, roomID, role } from 'UI/src/data/DataStore.ts'
import { router } from 'UI/src/router'
import Button from 'UI/src/components/Button.vue'
import type { PlayerID } from 'UI/src/data/types.ts'
import { post, joinRoom } from 'UI/src/data/fetchFunctions.ts'
import type { JsonOptions } from 'vite'

const inputCode = ref<string>('')

type Response = {
  data: JsonOptions
  ok: boolean
}

async function createRoom(hostID: PlayerID): Promise<boolean> {
  console.log(hostID)
  console.log(ownID.value)
  const response = (await post('room/new', hostID)) as Response | void
  if (response) {
    console.log('roomID:', response.data)
    roomID.value = response.data.toString()
    role.value = 'host'
    await router.push({ path: roomID.value })
  }
  return true
}
</script>

<template>
  <div class="grid-cols-1">
    <h1>Battleships</h1>
    <h2>Online Game</h2>
    <div class="image">
      <img src="../assets/battleship.png" alt="Battleship" />
    </div>
    <div class="grid">
      <Button class="start-button" title="Start Game" @click="createRoom(ownID)" />
      <div>
        <input
          v-model="inputCode"
          placeholder="Enter game code..."
          @keyup.enter="joinRoom(inputCode)"
        />
        <Button class="join-button" title="Join a Game" @click="joinRoom(inputCode)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 4rem;
  color: white;
  text-align: center;
}
h2 {
  color: white;
  text-align: center;
}
.image {
  display: flex;
  justify-content: center;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
}
.start-button {
  margin: 2px;
  width: 95%;
  box-shadow: inset 10px 45px 30px 2px rgba(0, 0, 0, 0.4);
}
.join-button {
  margin-bottom: 2px;
  width: 95%;
  box-shadow: inset 10px 16px 25px 2px rgba(0, 0, 0, 0.4);
}

input {
  margin-top: 2px;
  width: 95%;
  box-shadow: inset 1px 1px 15px 5px rgba(0, 0, 0, 0.4);
}
</style>

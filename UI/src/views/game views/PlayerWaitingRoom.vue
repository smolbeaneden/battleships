<script setup lang="ts">
import { usePolling, get } from 'UI/src/data/fetchFunctions.ts'
import { onMounted } from 'vue'
import {roomID, state} from 'UI/src/data/DataStore.ts'

type Response = {
  data: string
  ok: boolean
}

const { start, clear } = usePolling(checkGameState, 1000)
onMounted(start)

async function checkGameState(): Promise<boolean> {
  const response = await get(`room/${roomID.value}/state`) as Response | void
  console.log(response?.data)
  if (response?.data == "placingShips") {
    state.value = "placingShips"
    console.log(state.value)
    clear();
  }
  return true;
}

</script>

<template>
  <div class="heading">Waiting for host to start the game...</div>
</template>

<style scoped>
.heading {
  font-size: 4rem;
  color: white;
  text-align: center;
}
</style>

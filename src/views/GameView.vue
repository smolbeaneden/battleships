<script setup lang="ts">
import HostWaitingRoom from '@/views/game views/HostWaitingRoom.vue'
import PlayerWaitingRoom from '@/views/game views/PlayerWaitingRoom.vue'
import PlacingShips from '@/views/game views/PlacingShips.vue'
import GameCourse from '@/views/game views/GameCourse.vue'
import { ownID, roomID, role, state } from '@/data/DataStore.ts'
import { joinRoom } from '@/data/fetchFunctions.ts'
import router from '@/router'

if (role.value !== 'host' && role.value !== 'player') {
  setTimeout(async () => {
    if (router.currentRoute.value.name) {
      const path = router.currentRoute.value.path.split('/')[1]
      console.log(ownID.value)
      await joinRoom(path)
    }
  }, 1000)
}
</script>

<template>
  <div v-if="state == 'waitingRoom'">
    <HostWaitingRoom v-if="role == 'host'" />
    <PlayerWaitingRoom v-else-if="role == 'player'" />
  </div>
  <PlacingShips v-else-if="state == 'placingShips'" />
  <GameCourse v-else-if="state == 'game'" />
</template>

<style scoped></style>

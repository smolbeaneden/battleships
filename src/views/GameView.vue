<script setup lang="ts">
import HostWaitingRoom from '@/views/game views/HostWaitingRoom.vue';
import PlayerWaitingRoom from '@/views/game views/PlayerWaitingRoom.vue'
import PlacingShips from '@/views/game views/PlacingShips.vue'
import GameCourse from '@/views/game views/GameCourse.vue'
import {authorizeUser} from "@/controllers/WaitingRoomController.ts";
import {getGameState} from "@/controllers/GameController.ts";
</script>

<template>
  <HostWaitingRoom v-if="authorizeUser() && getGameState()==`waitingRoom` " />
  <PlayerWaitingRoom v-else-if="false"/>
  <PlacingShips v-else-if="false" />
  <GameCourse v-else-if="false" />
</template>

<style scoped>

</style>

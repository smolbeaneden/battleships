<script setup lang="ts">
import HostWaitingRoom from '@/views/game views/HostWaitingRoom.vue';
import PlayerWaitingRoom from '@/views/game views/PlayerWaitingRoom.vue'
import PlacingShips from '@/views/game views/PlacingShips.vue'
import GameCourse from '@/views/game views/GameCourse.vue'
</script>

<template>
  <HostWaitingRoom v-if="false"/>
  <PlayerWaitingRoom v-else-if="false"/>
  <PlacingShips v-else-if="false" />
  <GameCourse v-else-if="true" />
</template>

<style scoped>

</style>

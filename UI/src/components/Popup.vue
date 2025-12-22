<script setup lang="ts">
import { ref } from 'vue'
import { winner } from '../data/DataStore'
const show = ref<boolean>(true)

function popupText(): string {
  if (winner.value){
    return 'You Won!'
  }
  return 'You Lost...'

}
</script>

<template>
  <div v-if="show" class="popup">
    <div class="popup-content">{{ popupText() }}</div>
  </div>
</template>

<style scoped>
.popup {
  visibility: visible;
  width: 25em;
  height: 30em;
  background-color: rgba(43, 43, 43, 0.76);
  color: #fff;
  text-align: center;
  border-radius: 7px;

  position: absolute;
  z-index: 1;
  bottom: 5%;
  left: 35%;
  margin-left: -80px;
  padding: 12em 0;
}
.popup-content {
  font-size: 3em;
}
</style>

<script setup lang="ts">
import StartButton from '@/components/Button.vue';
import {router} from '@/router'
function startGame(): void {
return
}

async function copyContent(): Promise<void> {
  try {
    await navigator.clipboard.writeText(window.location.href);
    console.log('Content copied to clipboard');
    alert("Copied to clipboard");
  } catch (err) {
    console.error('Failed to copy: ', err);
    alert("Failed to copy");
  }
}
</script>

<template>
  <div v-if="false">
    <div class="heading">Waiting for a player to join </div>
    <br/>
    <div class="heading">room code: </div>
    <div class="code">{{router.currentRoute.value.name}}</div>
    <div class="center">
      <StartButton title="Copy link to share" @click="copyContent()"/>
    </div>
  </div>

  <div v-else class="items-center text-center justify-center">
    <div class="heading">A player has joined!</div>
    <br/>
    <div class="heading">You may begin the game! </div>
    <br/>
    <div class="center">
      <StartButton title="Start Game" @click="startGame"/>
    </div>
  </div>
</template>

<style scoped>
.heading {
  font-size: 2rem;
  color: white;
  text-align: center;
}
.center {
  display: flex;
  place-content: center;
}
.code{
  font-size: 2rem;
  color: #ff2929;
  text-align: center;
}
</style>

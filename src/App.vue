<script setup lang="ts">
import { RouterView } from 'vue-router';
import {onMounted, onBeforeUnmount} from "vue";
import axios from 'axios'
import {leaveSite, init} from "./data/functions.ts";

// async function post(): Promise<boolean>{
//   try{
//     axios.post('http://localhost:8000', {text: "text1"})
//       .then((response) => {
//         console.log(response.data)
//       })
//   }
//   catch(error){
//     console.log(error)
//   }
//
//   return true;
// }
// post();

init();

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
})
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
})

function handleBeforeUnload(): void {
  leaveSite();
}
</script>

<template>
  <RouterView/>
</template>

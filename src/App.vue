<script setup lang="ts">
import { RouterView } from 'vue-router';
import axios from 'axios'
async function post(): Promise<boolean>{
  try{
    axios.post('/api', {text: "text1"})
      .then((response) => {
        console.log(response.data)
      })
  }
  catch(error){
    console.log(error)
  }
  return true;
}
post();
</script>

<template>
  <RouterView/>
</template>

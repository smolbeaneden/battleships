<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'
import { deleteRequest } from './data/fetchFunctions'
import { ownID, serverURL } from './data/DataStore'

function deleteCookie(name: string): void {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  console.log('deleteCookie')
}

async function init(): Promise<boolean> {
  deleteCookie('sessionId')
  try {
    const response = await fetch(`${serverURL}/player/new`, {
      credentials: 'include',
    })
    ownID.value = (await response.json()).ID
  } catch (error) {
    console.log(error, 'error')
  }
  console.log('ID: ', ownID.value)
  return true
}

init()

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

function handleBeforeUnload(): void {
  deleteRequest(`player/${ownID.value}`)
}
</script>

<template>
  <RouterView />
</template>

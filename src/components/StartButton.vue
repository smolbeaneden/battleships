<script setup lang="ts">
const { path = '/' } = defineProps<{ path?: string; title: string }>()
</script>

<template>
  <router-link class="link" :to="{path: path}">{{ title }}</router-link>
</template>
<style scoped>
.link {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1.2em;
  font-weight: 500;
  font-family: inherit;
  color: white;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  margin: 0.5em;
}

.link:hover {
  border-color: #646cff;
}

.link:focus,
.link:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>

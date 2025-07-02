<script setup lang="ts">
 defineProps({ title: String })
</script>

<template>
  <button>{{ title }}</button>
</template>
<style scoped>
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1.2em;
  font-weight: 500;
  font-family: inherit;
  color: white;
  background-color: #2a2a2a;
  cursor: pointer;
  transition: border-color 0.25s;
  margin: 0.5em;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>

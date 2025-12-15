<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
</template>

<style>
#app {
  color: var(--text-main);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}
</style>
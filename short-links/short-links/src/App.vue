<script setup lang="ts">
import { RouterView } from 'vue-router';
import { api } from '@/api';
import { onMounted } from 'vue';
import TheHeader from './components/layouts/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <main class="max-w-[80%] w-full mx-auto">
    <RouterView />
  </main>
</template>

<style>
@import '@/assets/reset.css';
@import '@/assets/app.css';
</style>

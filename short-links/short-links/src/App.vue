<script setup lang="ts">
import { RouterView } from 'vue-router';
import { api } from '@/api';
import { onMounted } from 'vue';

onMounted(() => {
  getShortLink();
});

async function getShortLink(): Promise<void> {
  const response = await api.squeezeSqueezePost({
    link: 'https://github.com/acacode/swagger-typescript-api',
  });
  console.log(response.data);
  //
}
</script>

<template>
  <RouterView />
</template>

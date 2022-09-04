<template>
  <div class="fixed p-5 bottom-10 left-10 bg-primary text-white rounded opacity-70">
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

export interface Props {
  msg: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="flex items-center gap-x-4 cursor-pointer rounded"
    :class="{
      'bg-primary': sortingType,
    }"
  >
    <div class="color-gray text-lg font-bold">
      {{ label }}
    </div>
    <SortIcon
      class="w-4 h-4 shrink-0"
      :class="{
        '-scale-y-100': sortingType === SortingType.ASC,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { SortIcon } from '@/components/icons';
import { SortingType } from '.';

export interface Props {
  label: string;
  sortingType?: SortingType;
}

const props = defineProps<Props>();
</script>

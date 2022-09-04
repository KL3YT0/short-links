<template>
  <input
    :type="type"
    :value="modelValue"
    @input="onInput"
    :disabled="disabled"
    :placeholder="placeholder"
    class="w-full h-7 px-3 border-2 border-primary rounded focus:outline-0 text-gray text-sm"
  />
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

export interface Props {
  modelValue: string | number;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
}

const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

function onInput(event: any): void {
  if (!event.target) {
    return;
  }

  emits('update:modelValue', event.target.value);
}
</script>

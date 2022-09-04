<template>
  <div
    class="w-full transition-all duration-75"
    :class="{ 'hover:opacity-60': !disabled }"
  >
    <button
      @click.prevent="emits('click')"
      :type="type"
      :class="classes"
      :disabled="disabled"
    >
      {{ label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

export interface Props {
  variant: 'primary' | 'secondary';
  label: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(['click']);

const classes = computed(() => {
  const classes = [
    'px-5',
    'w-[100%]',
    'h-8',
    'border-none',
    'font-bold',
    'rounded-lg',
  ];

  if (props.variant === 'primary') {
    classes.push(...['text-secondary']);
    if (props.disabled) {
      classes.push(...['bg-gray', 'cursor-not-allowed']);
    } else {
      classes.push(...['bg-primary', 'cursor-pointer']);
    }
  }
  if (props.variant === 'secondary') {
    classes.push(...['bg-secondary', 'text-white', 'cursor-pointer']);
  }

  return classes;
});
</script>

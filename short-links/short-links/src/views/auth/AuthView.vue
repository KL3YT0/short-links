<template>
  <div class="pt-50">
    <form class="flex flex-col gap-y-4 w-70 mx-auto my-auto">
      <div class="text-center text-xl text-gray font-bold">Авторизация</div>

      <div class="flex flex-col gap-y-2">
        <p class="text-gray font-bold">Введите Email:</p>
        <TheInput v-model="state.email" />
      </div>

      <div class="flex flex-col gap-y-2">
        <p class="text-gray font-bold">Введите пароль</p>
        <TheInput v-model="state.password" type="password" />
      </div>

      <p class="text-red text-center">
        {{ state.error }}
      </p>

      <div class="flex flex-col gap-y-5 w-45 mx-auto">
        <TheButton
          variant="primary"
          v-on:click="makeAuth"
          label="Войти"
          type="submit"
          :disabled="!formIsReady"
          class="mx-auto"
        />

        <TheButton
          @click="router.push({ name: 'register' })"
          variant="secondary"
          label="Зарегистрироваться"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/api';
import type { HTTPValidationError } from '@/api/api';
import { TheInput, TheButton } from '@/components/helpers';
import { useAuthStore } from '@/stores/auth';

interface State {
  email: string;
  password: string;
  error: string;
}

const router = useRouter();
const authStore = useAuthStore();

const state = reactive<State>({
  email: '',
  password: '',
  error: '',
});

async function makeAuth(): Promise<void> {
  try {
    await authStore.makeAuth(state.email, state.password);
    router.push({ name: 'statistics' });
  } catch (err) {
    state.error = 'Ошибка авторизации';
  }
}

const formIsReady = computed((): boolean => {
  if (!state.email) {
    return false;
  }

  if (!state.password) {
    return false;
  }

  return true;
});
</script>

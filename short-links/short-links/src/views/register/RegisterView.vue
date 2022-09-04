<template>
  <div class="pt-50">
    <form class="flex flex-col gap-y-4 w-70 mx-auto my-auto">
      <div class="text-center text-xl text-gray font-bold">Регистрация</div>

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
          v-on:click="makeRegister"
          label="Зарегистрироваться"
          type="submit"
          :disabled="!formIsReady"
          class="mx-auto"
        />

        <TheButton
          @click="router.push({ name: 'auth' })"
          variant="secondary"
          label="Войти"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { HTTPValidationError } from '@/api/api';
import { TheInput, TheButton } from '@/components/helpers';
import { EMAIL_REGEXP } from '@/constants';

interface State {
  email: string;
  password: string;
  error: '';
}

const router = useRouter();

const state = reactive<State>({
  email: '',
  password: '',
  error: '',
});

async function makeRegister(): Promise<void> {
  try {
    await api.registerRegisterPost({
      username: state.email,
      password: state.password,
    });

    router.push({ name: 'auth' });
  } catch (err) {
    //
  }
}

const formIsReady = computed((): boolean => {
  if (!state.email) {
    return false;
  }

  if (!state.password) {
    return false;
  }

  if (!EMAIL_REGEXP.test(state.email)) {
    return false;
  }

  return true;
});
</script>

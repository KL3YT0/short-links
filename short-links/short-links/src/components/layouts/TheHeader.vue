<template>
  <div class="flex items-center justify-center w-full h-12 bg-primary">
    <div class="flex justify-between items-center max-w-[80%] w-full">
      <p class="font-bold text-center text-secondary text-sm">
        Сервис создания
        <br />
        коротких ссылок
      </p>
      <button
        @click="logOut"
        class="bg-transparent border-none font-bold text-center text-red text-sm cursor-pointer"
      >
        Выйти
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function logOut(): void {
  localStorage.removeItem('access_token');
  localStorage.removeItem('token_type');

  router.push({ name: 'auth' });
}
</script>

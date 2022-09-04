<template>
  <div class="py-10">
    <div class="flex flex-col gap-y-5">
      <div class="text-xl text-center text-secondary font-bold">
        Создайте свою сокращенную ссылку
      </div>

      <div>
        <p class="text-gray mb-2">Ваша ссылка:</p>
        <TheInput v-model="state.link" placeholder="Введите ссылку" />
      </div>

      <div>
        <p class="text-gray mb-2">Сокращенная ссылка:</p>
        <TheInput :model-value="state.short" :disabled="true" />
      </div>

      <div class="w-35 mx-auto">
        <TheButton
          @click="getShort"
          label="Сократить"
          :disabled="!Boolean(state.link)"
          variant="primary"
        />
      </div>

      <div class="w-35 mx-auto">
        <TheButton
          @click="copyToClipboard(state.short)"
          variant="primary"
          label="Скопировать"
          :disabled="!Boolean(state.short)"
        />
      </div>
    </div>

    <div class="mt-10">
      <div class="text-xl text-center text-secondary font-bold">Статистика</div>
      <div class="flex flex-col gap-y-4">
        <div class="grid grid-cols-6 border-b-2 border-primary">
          <div class="break-all col-span-3 p-2 color-gray text-lg font-bold">
            Оригинальная ссылка
          </div>
          <div class="col-span-2 p-2 color-gray text-lg font-bold">
            Сокращенная ссылка
          </div>
          <div class="col-span-1 p-2 color-gray text-lg font-bold">
            Кол-во переходов
          </div>
        </div>

        <div
          v-for="link in state.statistics"
          :key="link.id"
          class="grid grid-cols-6"
        >
          <div class="break-all col-span-3 p-2 color-gray text-lg">
            {{ link.target }}
          </div>
          <div class="col-span-2 p-2 color-gray text-lg">
            {{ makeLinkFromShort(link.short) }}
          </div>
          <div class="col-span-1 p-2 color-gray text-lg">
            {{ link.counter }}
          </div>
        </div>

        <div class="w-35 mx-auto">
          <TheButton
            @click="loadMore"
            :disabled="state.inProcess || !state.hasMore"
            label="Показать еще"
            variant="primary"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api, baseUrl } from '@/api';
import { onMounted, reactive, watch } from 'vue';
import { TheInput, TheButton } from '@/components/helpers';
import { getAuthorization } from '@/utils';
import type { Link } from '@/api/api';

export interface State {
  link: string;
  short: string;
  statistics: Link[];
  offset: 0;
  inProcess: boolean;
  hasMore: boolean;
}

const LIMIT = 4;

const state = reactive<State>({
  link: '',
  short: '',
  statistics: [],
  offset: 0,
  inProcess: true,
  hasMore: true,
});

onMounted(() => {
  loadMore();
});

async function getShort(): Promise<void> {
  const authorization = getAuthorization();

  if (authorization) {
    try {
      const response = await api.squeezeSqueezePost(
        { link: state.link },
        {
          headers: {
            Authorization: authorization,
          },
        }
      );

      state.short = makeLinkFromShort(response.data.short);
    } catch (err) {
      console.log(err);
    }
  }
}

async function loadMore(): Promise<void> {
  const authorisation = getAuthorization();

  if (authorisation) {
    try {
      const response = await api.statisticsStatisticsGet(
        { limit: LIMIT, offset: state.offset * LIMIT },
        {
          headers: {
            Authorization: authorisation,
          },
        }
      );

      state.statistics = [...state.statistics, ...response.data];

      if (response.data.length === LIMIT) {
        state.offset++;
      } else {
        state.hasMore = false;
      }
    } catch (err) {
      console.log(err);
    } finally {
      state.inProcess = false;
    }
  }
}

async function copyToClipboard(value: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(value);
  } catch (err) {
    console.log(err);
  }
}

function makeLinkFromShort(short: string): string {
  return `${baseUrl}/s/${short}`;
}

watch(
  () => [...state.link],
  () => {
    state.short = '';
  }
);
</script>

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
          <div
            @click="changeSortingParams('target')"
            class="flex items-center gap-x-4 break-all col-span-3 p-2"
          >
            <SortBy
              :sorting-type="state.sort.target"
              label="Оригинальная ссылка"
            />
          </div>

          <div
            @click="changeSortingParams('short')"
            class="flex items-center gap-x-4 break-all col-span-2 p-2"
          >
            <SortBy :sorting-type="state.sort.short" label="Короткая ссылка" />
          </div>

          <div
            @click="changeSortingParams('counter')"
            class="flex items-center gap-x-4 break-all col-span-1 p-2"
          >
            <SortBy
              :sorting-type="state.sort.counter"
              label="Кол-во переходов"
            />
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

        <div class="flex">
          <div class="w-35 mx-auto">
            <TheButton
              @click="state.offset--, state.hasMore = true"
              :disabled="state.inProcess || state.offset === 0"
              label="Предыдущая страница"
              variant="primary"
            />
          </div>

          <div class="w-10">
            <TheInput :model-value="state.offset" :disabled="true" />
          </div>

          <div class="w-35 mx-auto">
            <TheButton
              @click="state.offset++"
              :disabled="state.inProcess || !state.hasMore"
              label="Следующая страница"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api, baseUrl } from '@/api';
import { onMounted, reactive, watch } from 'vue';
import { TheInput, TheButton, SortBy } from '@/components/helpers';
import { getAuthorization } from '@/utils';
import type { Link } from '@/api/api';
import { SortingType } from '@/components/helpers/sort-by';
import { createNotification } from '@/components/helpers/notification';

export interface Sort {
  target: SortingType | undefined;
  short: SortingType | undefined;
  counter: SortingType | undefined;
}

export interface State {
  link: string;
  short: string;
  statistics: Link[];
  offset: number;
  offsetError: boolean;
  inProcess: boolean;
  hasMore: boolean;
  sort: Sort;
}

type SortingFields = keyof Sort;

const LIMIT = 8;

const state = reactive<State>({
  link: '',
  short: '',
  statistics: [],
  offset: 0,
  offsetError: false,
  inProcess: true,
  hasMore: true,
  sort: {
    target: undefined,
    short: undefined,
    counter: undefined,
  },
});

onMounted(() => {
  loadPage();
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

      loadPage();
    } catch (err) {
      console.log(err);
    }
  }
}

type OrderTypes =
  | 'asc_counter'
  | 'desc_counter'
  | 'asc_short'
  | 'asc_target'
  | 'desc_short'
  | 'desc_target';

async function loadPage(): Promise<void> {
  const authorisation = getAuthorization();

  function getSortParams(): OrderTypes[] {
    const params: OrderTypes[] = [];

    if (state.sort.counter) {
      if (state.sort.counter === SortingType.ASC) {
        params.push('asc_counter');
      }
      if (state.sort.counter === SortingType.DESC) {
        params.push('desc_counter');
      }
    }

    if (state.sort.target) {
      if (state.sort.target === SortingType.ASC) {
        params.push('asc_target');
      }
      if (state.sort.target === SortingType.DESC) {
        params.push('desc_target');
      }
    }

    if (state.sort.short) {
      if (state.sort.short === SortingType.ASC) {
        params.push('asc_short');
      }
      if (state.sort.short === SortingType.DESC) {
        params.push('desc_short');
      }
    }

    return params;
  }

  if (authorisation) {
    const order = getSortParams();

    try {
      const response = await api.statisticsStatisticsGet(
        { limit: LIMIT, offset: state.offset * LIMIT, order },
        {
          headers: {
            Authorization: authorisation,
          },
        }
      );

      state.statistics = response.data;

      if (response.data.length < LIMIT) {
        state.hasMore = false;
      }
    } catch (err) {
      console.log(err);
    } finally {
      state.inProcess = false;
    }
  }
}

function changeSortingParams(field: SortingFields) {
  const type = state.sort[field];

  if (type === SortingType.ASC) {
    state.sort[field] = SortingType.DESC;
  } else if (type === SortingType.DESC) {
    state.sort[field] = undefined;
  } else {
    state.sort[field] = SortingType.ASC;
  }
}

async function copyToClipboard(value: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(value);
    createNotification('Ссылка скопирована в буфер обмена');
  } catch (err) {
    console.log(err);
  }
}

function makeLinkFromShort(short: string): string {
  return `${baseUrl}/s/${short}`;
}

watch(
  () => [state.link],
  () => {
    state.short = '';
  }
);

watch(
  () => [state.offset, { ...state.sort }],
  () => {
    state.inProcess = true;
    loadPage();
  }
);
</script>

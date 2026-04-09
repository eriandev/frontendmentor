<script lang="ts">
  import { formatDate, tempValue, weatherIconByCode } from '@/utils/format'
  import type { Current } from '@/utils/types'

  interface Props {
    title: string
    data?: Current
    tempKey: 'c' | 'f'
  }

  const { title, data, tempKey }: Props = $props()
</script>

<article
  class={[
    'flex min-h-[250px] w-full flex-col items-center justify-center gap-y-4 rounded-2xl px-8 py-12 text-white md:flex-row',
    {
      'bg-card-dark': !data,
      'bg-card-main-small bg-cover bg-center bg-no-repeat md:justify-between md:bg-card-main-large': data,
    },
  ]}
>
  {#if data}
    {@const weatherIcon = weatherIconByCode(data?.code)}

    <header class="flex flex-col gap-y-2 text-center md:text-left">
      <h2 class="text-2xl font-bold">{title}</h2>
      <span class="text-gray-300">{formatDate(data.time)}</span>
    </header>

    <div class="flex items-center justify-between">
      {#if weatherIcon}
        <img alt={weatherIcon} src="/frontendmentor/weather-app/images/{weatherIcon}.webp" class="size-24" />
      {/if}
      {#if data.temp}
        <span class="text-[5rem]">{tempValue(data.temp, tempKey)}</span>
      {/if}
    </div>
  {:else}
    <div class="grid justify-items-center gap-y-2 text-gray-300">
      <div class="loader w-12 aspect-[2]"></div>
      <span class="font-normal">Loading...</span>
    </div>
  {/if}
</article>

<style>
  .loader {
    background:
      no-repeat radial-gradient(circle closest-side, #eee 90%, #eee0) 0% 50%,
      no-repeat radial-gradient(circle closest-side, #eee 90%, #eee0) 50% 50%,
      no-repeat radial-gradient(circle closest-side, #eee 90%, #eee0) 100% 50%;
    background-size: calc(100% / 3) 50%;
    animation: l3 1s infinite linear;
  }

  @keyframes l3 {
    20% {
      background-position:
        0% 0%,
        50% 50%,
        100% 50%;
    }
    40% {
      background-position:
        0% 100%,
        50% 0%,
        100% 50%;
    }
    60% {
      background-position:
        0% 50%,
        50% 100%,
        100% 0%;
    }
    80% {
      background-position:
        0% 50%,
        50% 50%,
        100% 100%;
    }
  }
</style>

<script lang="ts">
  import { tempValue, weatherIconByCode, weekdayName } from '@/utils/format'
  import type { Daily, TempKey } from '@/utils/types'

  interface Props {
    title: string
    data?: Daily[]
    tempKey: TempKey
  }

  const { data = Array.from({ length: 7 }, () => ({}) as Daily), title, tempKey }: Props = $props()
</script>

<section class="flex flex-col gap-y-4 pt-4 text-white">
  <h4 class="text-lg">{title}</h4>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] gap-4">
    {#each data as { code, tempMax, tempMin, time }, i (title + i)}
      {@const weatherIcon = weatherIconByCode(code)}

      <article class="flex min-h-32 flex-col rounded-2xl border border-card-border bg-card-dark p-2 text-center">
        {#if time}
          <span class="text-gray-300">{weekdayName(time, { format: 'short' })}</span>
        {/if}
        {#if weatherIcon}
          <img alt={weatherIcon} src="/frontendmentor/weather-app/images/{weatherIcon}.webp" class="mx-auto size-18" />
        {/if}
        {#if tempMax && tempMin}
          <div class="flex w-full justify-between">
            <span>{tempValue(tempMax, tempKey)}</span>
            <span class="text-gray-300">{tempValue(tempMin, tempKey)}</span>
          </div>
        {/if}
      </article>
    {/each}
  </div>
</section>

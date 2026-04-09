<script lang="ts">
  import Select from '@/components/select.svelte'
  import { weather } from '@/logic/use-weather.svelte'
  import { formatTime, tempValue, weatherIconByCode, weekdayName } from '@/utils/format'
  import type { Hour, Hourly, Option, TempKey } from '@/utils/types'

  interface Props {
    title: string
    data?: Hourly[]
    tempKey: TempKey
  }

  const { title, data, tempKey }: Props = $props()
  const defaultHours = Array.from({ length: 10 }, () => ({}) as Hour)

  let hours = $state<Hour[]>(defaultHours)
  let options = $derived<Option[]>(
    data
      ?.flatMap(({ date }) => (date ? [{ label: weekdayName(new Date(date)), value: date }] : []))
      .sort((a, b) => {
        const d1 = new Date(a.value)
        const d2 = new Date(b.value)

        return ((d1.getDay() + 6) % 7) - ((d2.getDay() + 6) % 7)
      }) ?? [],
  )

  function onChange(option: Option) {
    hours = data?.find(({ date }) => date === option.value)?.hours ?? []
  }
</script>

<section
  class="grid h-full w-full grid-rows-[fit-content(100%)_auto] gap-y-4 rounded-2xl border border-card-border bg-card-dark p-4 text-white"
>
  <header class="grid grid-cols-[fit-content(100%)_1fr] items-center justify-between gap-x-5">
    <h4 class="text-lg">{title}</h4>
    <Select disabled={!$weather.hourly} {options} {onChange} />
  </header>

  <div class="scroll-container grid h-full max-h-120 gap-y-4 overflow-y-auto">
    {#each hours as { time, code, temp }, index (index)}
      {@const weatherIcon = weatherIconByCode(code)}
      <article
        class="flex min-h-16 items-center justify-between rounded-lg border border-card-border bg-card-light py-2 pr-4 pl-1"
      >
        <div class="flex items-center gap-x-0.5 pt-1.5 leading-none">
          {#if weatherIcon}
            <img alt={weatherIcon} src="/frontendmentor/weather-app/images/{weatherIcon}.webp" class="size-12" />
          {/if}
          {#if time}
            <span class="text-lg">{formatTime(time)}</span>
          {/if}
        </div>
        {#if temp}
          <span>{tempValue(temp, tempKey)}</span>
        {/if}
      </article>
    {/each}
  </div>
</section>

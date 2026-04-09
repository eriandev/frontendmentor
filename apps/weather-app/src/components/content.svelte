<script lang="ts">
  import Specs from '@/components/specs.svelte'
  import { search } from '@/logic/use-search.svelte'
  import { weather } from '@/logic/use-weather.svelte'
  import MainCard from '@/components/main-card.svelte'
  import { measures } from '@/logic/use-measures.svelte'
  import DailyForecast from '@/components/daily-forecast.svelte'
  import HourlyForecast from '@/components/hourly-forecast.svelte'

  const title = $derived(`${$search.selected?.name}, ${$search.selected?.country}`)
</script>

<section
  class={[
    { hidden: !$search.selected, 'flex lg:grid': $search.selected },
    "flex-col gap-x-6 gap-y-8 lg:grid-cols-3 lg:[grid-template-areas:'double_double_one']",
  ]}
>
  <article class="grid gap-y-4 [grid-area:double]">
    <MainCard {title} data={$weather.current} tempKey={$measures.temp} />
    <Specs data={$weather.current} tempKey={$measures.temp} lengthKey={$measures.length} speedKey={$measures.speed} />
    <DailyForecast title="Daily forecast" data={$weather.daily} tempKey={$measures.temp} />
  </article>
  <article class="[grid-area:one]">
    <HourlyForecast title="Hourly forecast" data={$weather.hourly} tempKey={$measures.temp} />
  </article>
</section>

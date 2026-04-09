<script lang="ts">
  import { lengthValue, speedValue, tempValue } from '@/utils/format'
  import type { Current, LengthKey, SpeedKey, TempKey } from '@/utils/types'

  interface Props {
    data?: Current
    tempKey: TempKey
    speedKey: SpeedKey
    lengthKey: LengthKey
  }

  const { data, lengthKey, tempKey, speedKey }: Props = $props()
  const specs = $derived([
    { title: 'Feels Like', value: 'feelsLike', calculateValue: (v: number) => tempValue(v, tempKey) },
    { title: 'Humidity', value: 'humidity', calculateValue: (v: number) => `${v}%` },
    { title: 'Wind', value: 'windSpeed', calculateValue: (v: number) => speedValue(v, speedKey) },
    { title: 'Precipitation', value: 'precipitation', calculateValue: (v: number) => lengthValue(v, lengthKey) },
  ] as const)
</script>

<section class="grid grid-cols-2 gap-3 sm:grid-cols-4">
  {#each specs as { title, value, calculateValue } (title + value)}
    <article class="flex h-max flex-col gap-y-2 rounded-2xl border border-card-border bg-card-dark p-4">
      <span class="text-gray-300">{title}</span>
      <span class="text-2xl text-white">
        {typeof data?.[value] === 'number' ? calculateValue(data[value]) : '—'}
      </span>
    </article>
  {/each}
</section>

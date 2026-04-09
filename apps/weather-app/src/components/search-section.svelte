<script lang="ts">
  import Icon from 'shared/components/icon.svelte'
  import { search } from '@/logic/use-search.svelte'
  import { weather } from '@/logic/use-weather.svelte'
  import type { Result } from '@/utils/types'

  async function handleSearchWeather(result: Result) {
    const { latitude, longitude } = result

    search.updateSelected(result)
    await weather.update({ latitude, longitude })
  }
</script>

<section class="mx-auto w-full text-white lg:max-w-[640px]">
  <form class="relative gap-x-4 grid md:grid-cols-[auto_fit-content(100%)] gap-y-2" onsubmit={search.submit}>
    <div class="flex items-center gap-x-3 rounded-2xl bg-neutral-800 px-6 py-3 text-lg font-medium">
      <Icon name="search" size={18} />
      <input bind:value={search.term} placeholder="Search for a place..." class="w-full outline-none" />
    </div>

    {#if $search.loading}
      <div
        role="listbox"
        class="absolute top-full left-0 z-100 mt-2 grid min-w-full rounded-xl border border-card-border bg-card-dark px-2 py-1.5"
      >
        <div class="rounded flex items-center gap-x-2 p-2 text-left bg-card-dark">
          <Icon name="loading" size={16} class="animate-spin" />
          <span class="text-sm">Search in progress</span>
        </div>
      </div>
    {/if}

    {#if search.results.length > 0 && !$search.loading}
      <div
        role="listbox"
        class="absolute top-full left-0 z-100 mt-2 grid min-w-full rounded-xl border border-card-border bg-card-dark p-1.5"
      >
        {#each search.results as result (result.id)}
          {@const isSelected = $search.selected?.id === result.id}

          <button
            role="option"
            tabindex="-1"
            aria-selected={isSelected}
            class={[
              'cursor-pointer rounded-lg border border-card-dark p-2 text-left hover:border-card-border hover:bg-card-light',
              { 'bg-card-light': isSelected, 'bg-card-dark': !isSelected },
            ]}
            onclick={() => handleSearchWeather(result)}
          >
            {result.name}{result.admin1 ? ` ${result.admin1}` : ''}, {result.country_code}
          </button>
        {/each}
      </div>
    {/if}
    <button class="w-full cursor-pointer rounded-xl bg-blue-500 px-8 py-2 text-lg text-gray-200 hover:bg-blue-700">
      Search
    </button>
  </form>
</section>

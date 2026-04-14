<script lang="ts">
  import { onMount } from 'svelte'
  import Icon from 'shared/components/icon.svelte'
  import { $ as domSelector } from 'shared/utils/dom'
  import { useCountries } from '@/logic/use-countries.svelte'

  const countries = useCountries()

  let open = $state(false)
  let contentRef = $state<HTMLDivElement>()
  let selected = $state<string | null>(null)
  let triggerRef = $state<HTMLButtonElement>()
  let searchInput = $state<HTMLInputElement | null>(null)
  const labelText = $derived(selected ?? 'Filter by Region')

  function handleClickOutside(e: MouseEvent) {
    if (contentRef && !contentRef.contains(e.target as Node) && !triggerRef?.contains(e.target as Node)) {
      open = false
    }
  }

  function handleChange(option: string) {
    open = false
    if (searchInput) searchInput.value = ''
    selected = selected === option ? null : option
    countries.changeFilter(selected)
  }

  onMount(() => {
    searchInput = domSelector('#search-input')
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  })
</script>

<div class="relative flex items-center font-semibold select-none">
  <button
    aria-expanded={open}
    aria-haspopup="listbox"
    bind:this={triggerRef}
    class="bg-select flex w-60 cursor-pointer items-center justify-between rounded-lg bg-white px-8 py-4 text-left wrap-anywhere text-ellipsis capitalize shadow-md dark:bg-dark-mode-elements"
    onclick={() => (open = !open)}
  >
    <span>{labelText}</span>
    <Icon name={open ? 'chevron-up' : 'chevron-down'} width={16} height={8} />
  </button>

  {#if open}
    <div
      bind:this={contentRef}
      role="listbox"
      class="absolute top-full left-0 z-100 mt-2 grid min-w-full rounded-lg bg-white shadow-md dark:bg-dark-mode-elements"
    >
      {#each $countries.regions as region, index (region)}
        {@const isSelected = selected === region}

        <button
          role="option"
          tabindex="-1"
          aria-selected={isSelected}
          class={[
            'cursor-pointer rounded px-8 py-2 text-left capitalize hover:underline',
            { 'pt-4': index === 0, 'pb-4': index === $countries.regions.length - 1, underline: isSelected },
          ]}
          onclick={() => handleChange(region)}
        >
          {region}
        </button>
      {/each}
    </div>
  {/if}
</div>

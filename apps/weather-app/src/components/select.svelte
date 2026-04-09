<script lang="ts">
  import { onMount } from 'svelte'
  import Icon from 'shared/components/icon.svelte'
  import type { Option } from '@/utils/types'

  interface Props {
    options: Option[]
    disabled?: boolean
    defaultText?: string
    onChange?: (selected: Option) => void
  }

  let { defaultText = 'Select an option', disabled = false, options = [], onChange = () => {} }: Props = $props()

  let open = $state(false)
  let contentRef = $state<HTMLDivElement>()
  let selected = $state<Option | null>(null)
  let triggerRef = $state<HTMLButtonElement>()

  function handleClickOutside(e: MouseEvent) {
    if (contentRef && !contentRef.contains(e.target as Node) && !triggerRef?.contains(e.target as Node)) {
      open = false
    }
  }

  function handleChange(option: Option) {
    open = false
    selected = option

    onChange(option)
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  })
</script>

<div class={['relative flex items-center', { 'justify-self-end': disabled }]}>
  <button
    aria-expanded={open}
    aria-haspopup="listbox"
    bind:this={triggerRef}
    class={[
      'flex w-full cursor-pointer items-center justify-between rounded-xl bg-select px-4 py-2 text-left wrap-anywhere text-ellipsis text-white',
      { 'gap-x-2.5': disabled },
    ]}
    onclick={() => (open = !open)}
  >
    {#if disabled}
      -
    {:else if selected}
      {selected.label}
    {:else}
      {defaultText}
    {/if}

    <Icon name="dropdown" width={13} height={8} />
  </button>

  {#if open && !disabled}
    <div
      bind:this={contentRef}
      role="listbox"
      class="absolute top-full left-0 z-100 mt-2 grid min-w-full rounded-xl border border-card-border bg-card-dark px-2 py-1.5"
    >
      {#each options as option (option.label + option.value)}
        {@const isSelected = selected?.value === option.value}

        <button
          role="option"
          tabindex="-1"
          aria-selected={isSelected}
          class={[
            'rounded p-2 text-left hover:bg-card-light',
            { 'bg-card-light': isSelected, 'bg-card-dark': !isSelected },
          ]}
          onclick={() => handleChange(option)}
        >
          {option.label}
        </button>
      {/each}
    </div>
  {/if}
</div>

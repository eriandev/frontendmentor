<script lang="ts">
  import { onMount, tick } from 'svelte'
  import Icon from 'shared/components/icon.svelte'
  import { measures } from '@/logic/use-measures.svelte'

  type Option = {
    value: string
    label: string
    disabled?: boolean
  }

  type Section = {
    key: string
    title: string
    options: Option[]
  }

  interface Props {
    label: string
    sections: Section[]
    defaultValue?: Record<string, string>
  }

  let open = $state(false)
  let dropdownStyle = $state('')
  let animationFrameId = $state(1)
  let contentRef = $state<HTMLDivElement>()
  let triggerRef = $state<HTMLButtonElement>()

  const { label, sections, defaultValue = {} }: Props = $props()

  let selectedValue = $state<Record<string, string>>(defaultValue)

  function toggle() {
    open ? closeDropdown() : openDropdown()
  }

  function selectItem(sectionKey: string, optionValue: string) {
    measures.update(sectionKey, optionValue)
    selectedValue = {
      ...selectedValue,
      [sectionKey]: optionValue,
    }

    console.info({ selectedValue })
  }

  function updatePositionRaf() {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = requestAnimationFrame(updatePosition)
  }

  async function openDropdown() {
    open = true

    await tick()
    contentRef?.getBoundingClientRect()
    updatePosition()

    window.addEventListener('scroll', updatePositionRaf, { capture: true })
    window.addEventListener('resize', updatePositionRaf)
  }

  function closeDropdown() {
    open = false

    window.removeEventListener('scroll', updatePositionRaf, { capture: true })
    window.removeEventListener('resize', updatePositionRaf)
  }

  function updatePosition() {
    if (!triggerRef || !contentRef) return

    const dropdownWidth = contentRef.offsetWidth
    const dropdownHeight = contentRef.offsetHeight
    const rect = triggerRef.getBoundingClientRect()
    const shouldAlignRight = rect.left + dropdownWidth > window.innerWidth

    let top = rect.bottom + 6
    let left = shouldAlignRight ? rect.right - dropdownWidth : rect.left

    if (rect.bottom + dropdownHeight > window.innerHeight) top = rect.top - dropdownHeight - 6

    dropdownStyle = `top: ${top}px; left: ${left}px;`
  }

  function handleClickOutside(e: MouseEvent) {
    if (contentRef && !contentRef.contains(e.target as Node) && !triggerRef?.contains(e.target as Node)) {
      closeDropdown()
    }
  }

  onMount(() => {
    updatePositionRaf()
    updatePosition()
    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
      window.removeEventListener('resize', updatePositionRaf)
      window.removeEventListener('scroll', updatePositionRaf, { capture: true })
    }
  })
</script>

<button
  bind:this={triggerRef}
  class="flex cursor-pointer items-center gap-x-2.5 rounded-xl bg-neutral-800 px-4 py-2 text-white"
  onclick={toggle}
>
  <Icon name="units" size={16} />
  <span>{label}</span>
  <Icon name="dropdown" width={13} height={8} />
</button>

{#if open}
  <div
    bind:this={contentRef}
    style={dropdownStyle}
    class="fixed z-30 w-48 overflow-x-hidden overflow-y-auto rounded-xl border-card-border bg-card-dark p-2 whitespace-nowrap text-white"
  >
    {#each sections as { key, options, title }, i (key)}
      <div class="py-1.5">
        <div class="px-2.5 py-1.5 text-xs opacity-60">
          {title}
        </div>

        {#each options as { label, value, disabled } (label + value)}
          <button
            class={[
              'flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 hover:bg-card-light',
              { 'bg-card-light': selectedValue[key] === value, 'pointer-events-none opacity-40': disabled },
            ]}
            onclick={() => !disabled && selectItem(key, value)}
          >
            <span>{label}</span>

            {#if selectedValue[key] === value}
              <Icon name="checkmark" size={16} />
            {/if}
          </button>
        {/each}
      </div>

      {#if i < sections.length - 1}
        <hr class="mx-2 h-px bg-card-border opacity-10" />
      {/if}
    {/each}
  </div>
{/if}

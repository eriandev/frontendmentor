<script lang="ts">
  import { onMount } from 'svelte'
  import { themes } from '@/utils/consts'
  import Icon from 'shared/components/icon.svelte'
  import type { Theme } from '@/utils/types'

  let selected = $state<Theme>('light')
  let currentTheme = $derived(themes[selected])

  function toogle(theme: Theme) {
    selected = theme
    localStorage.setItem('theme', theme)
    document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark')
  }

  onMount(() => {
    const theme = localStorage.getItem('theme') as Theme | null
    toogle(theme ?? 'light')
  })
</script>

<button
  class="flex cursor-pointer items-center gap-x-3 font-semibold"
  onclick={() => toogle(selected === 'light' ? 'dark' : 'light')}
>
  <Icon name={currentTheme.icon} size={20} />
  <span>{currentTheme.label}</span>
</button>

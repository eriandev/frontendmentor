<script lang="ts">
  import { onMount } from 'svelte'
  import { useCountries } from '@/logic/use-countries.svelte'

  const countries = useCountries()

  onMount(() => {
    if ($countries.currentList.length < 1) countries.updateList((prevState) => prevState)
  })
</script>

<section
  class={[
    {
      'justify-items-center': $countries.currentList.length >= 4,
      'justify-items-start px-6': $countries.currentList.length < 4,
    },
    'mx-auto grid h-full max-w-7xl grid-cols-[repeat(auto-fit,minmax(268px,1fr))] items-center gap-y-10 pb-24 md:gap-y-16 xl:grid-cols-4',
  ]}
>
  {#each $countries.currentList as { capital, cca3, flag, name, population, region }, index (cca3)}
    <article class="card">
      <a
        href="/frontendmentor/countries-api-with-color-theme-switcher/country/{cca3.toLowerCase()}"
        class="grid-row-[minmax(0,160px)_auto] grid h-full"
      >
        <header class="card-header">
          <img
            width={260}
            height={160}
            alt={flag.alt}
            src={flag.png}
            class="h-full w-full object-cover"
            loading={index <= 7 ? 'eager' : 'lazy'}
            fetchpriority={index <= 7 ? 'high' : undefined}
            onerror={(e) => {
              console.info({ name })
              const target = e.currentTarget as HTMLImageElement
              target.onerror = null
              target.src = flag.svg
            }}
          />
        </header>

        <div class="card-body">
          <h2 class="text-lg font-extrabold">{name}</h2>

          <ul class="grid">
            <li class="flex gap-x-1">
              <span class="font-semibold">Population:</span>
              <span>{population}</span>
            </li>
            <li class="flex gap-x-1">
              <span class="font-semibold">Region:</span>
              <span>{region}</span>
            </li>
            {#if capital}
              <li class="flex gap-x-1">
                <span class="font-semibold">Capital:</span>
                <span>{capital}</span>
              </li>
            {/if}
          </ul>
        </div>
      </a>
    </article>
  {/each}
</section>

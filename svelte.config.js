import { vitePreprocess } from '@astrojs/svelte'

export default {
  customElements: true,
  preprocess: vitePreprocess(),
}

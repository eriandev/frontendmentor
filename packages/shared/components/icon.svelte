<script lang="ts">
  import { InlineSvg } from '@usesvelte/inline-svg'
  import type { SVGAttributes } from 'svelte/elements'

  interface Props extends SVGAttributes<SVGSVGElement> {
    name: string
    size?: number
    width?: number
    height?: number
  }

  const { name, size, width, height, ...restProps }: Props = $props()
</script>

<InlineSvg {name} width={size ?? width} height={size ?? width} {...restProps} />

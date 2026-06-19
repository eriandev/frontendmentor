<script module lang="ts">
  export interface IconProps extends SVGAttributes<SVGSVGElement> {
    name: string
    size?: number
  }
</script>

<script lang="ts">
  import { InlineSvg } from '@usesvelte/inline-svg'
  import type { SVGAttributes } from 'svelte/elements'

  const { name, size, width, height, ...restProps }: IconProps = $props()
</script>

<InlineSvg {name} width={size ?? width} height={size ?? width} {...restProps} />

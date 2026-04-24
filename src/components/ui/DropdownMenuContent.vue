<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { DropdownMenuPortal, DropdownMenuContent as RadixDropdownMenuContent } from 'radix-vue'

const props = withDefaults(defineProps<{
  class?: string
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}>(), {
  align: 'center',
  sideOffset: 4,
})

const classes = computed(() =>
  cn(
    'z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    props.class
  )
)
</script>

<template>
  <DropdownMenuPortal>
    <RadixDropdownMenuContent :align="align" :side-offset="sideOffset" :class="classes">
      <slot />
    </RadixDropdownMenuContent>
  </DropdownMenuPortal>
</template>
<!-- [AI_END LINES=31 TIMESTAMP=2025-06-15 12:00:00] -->

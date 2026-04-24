<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { SelectPortal, SelectContent as RadixSelectContent, SelectViewport } from 'radix-vue'

const props = withDefaults(defineProps<{
  class?: string
  position?: 'popper' | 'item-aligned'
}>(), {
  position: 'popper',
})

const classes = computed(() =>
  cn(
    'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    props.position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
    props.class
  )
)
</script>

<template>
  <SelectPortal>
    <RadixSelectContent :position="position" :class="classes">
      <SelectViewport class="p-1" :class="position === 'popper' ? 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]' : ''">
        <slot />
      </SelectViewport>
    </RadixSelectContent>
  </SelectPortal>
</template>
<!-- [AI_END LINES=33 TIMESTAMP=2025-06-15 12:00:00] -->

<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { DropdownMenuItem as RadixDropdownMenuItem } from 'radix-vue'

const props = defineProps<{
  class?: string
  disabled?: boolean
}>()

const classes = computed(() =>
  cn(
    'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    props.class
  )
)
</script>

<template>
  <RadixDropdownMenuItem :class="classes" :disabled="disabled">
    <slot />
  </RadixDropdownMenuItem>
</template>
<!-- [AI_END LINES=24 TIMESTAMP=2025-06-15 12:00:00] -->

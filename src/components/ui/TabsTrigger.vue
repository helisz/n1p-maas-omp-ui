<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { TabsTrigger } from 'radix-vue'

const props = defineProps<{
  value: string
  class?: string
  disabled?: boolean
}>()

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
    props.class
  )
)
</script>

<template>
  <TabsTrigger :value="value" :disabled="disabled" :class="classes">
    <slot />
  </TabsTrigger>
</template>
<!-- [AI_END LINES=26 TIMESTAMP=2025-06-15 12:00:00] -->

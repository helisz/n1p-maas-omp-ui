<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { TabsContent } from 'radix-vue'

const props = defineProps<{
  value: string
  class?: string
}>()

const classes = computed(() =>
  cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', props.class)
)
</script>

<template>
  <TabsContent :value="value" :class="classes"><slot /></TabsContent>
</template>
<!-- [AI_END LINES=19 TIMESTAMP=2025-06-15 12:00:00] -->

<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  for?: string
}>()

const classes = computed(() =>
  cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', props.class)
)
</script>

<template>
  <label :for="props.for" :class="classes"><slot /></label>
</template>
<!-- [AI_END LINES=15 TIMESTAMP=2025-06-15 12:00:00] -->

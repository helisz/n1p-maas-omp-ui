<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: string
  value?: number
  max?: number
}>(), {
  value: 0,
  max: 100,
})

const classes = computed(() =>
  cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', props.class)
)

const percentage = computed(() => Math.min(100, Math.max(0, (props.value / props.max) * 100)))
</script>

<template>
  <div :class="classes" role="progressbar" :aria-valuenow="value" :aria-valuemax="max">
    <div
      class="h-full bg-primary transition-all"
      :style="{ width: `${percentage}%` }"
    />
  </div>
</template>
<!-- [AI_END LINES=24 TIMESTAMP=2025-06-15 12:00:00] -->

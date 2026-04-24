<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: string
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md',
})

const sizeClasses = {
  sm: 'h-7 w-7',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
}

const classes = computed(() =>
  cn('relative flex shrink-0 overflow-hidden rounded-full', sizeClasses[props.size], props.class)
)
</script>

<template>
  <span :class="classes"><slot /></span>
</template>
<!-- [AI_END LINES=23 TIMESTAMP=2025-06-15 12:00:00] -->

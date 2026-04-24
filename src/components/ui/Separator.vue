<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: string
  orientation?: 'horizontal' | 'vertical'
}>(), {
  orientation: 'horizontal',
})

const classes = computed(() =>
  cn(
    'shrink-0 bg-border',
    props.orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
    props.class
  )
)
</script>

<template>
  <div :class="classes" role="separator" />
</template>
<!-- [AI_END LINES=21 TIMESTAMP=2025-06-15 12:00:00] -->

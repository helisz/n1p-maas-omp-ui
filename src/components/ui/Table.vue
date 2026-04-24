<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
const classes = computed(() => cn('w-full caption-bottom text-sm', props.class))
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table :class="classes"><slot /></table>
  </div>
</template>
<!-- [AI_END LINES=12 TIMESTAMP=2025-06-15 12:00:00] -->

<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
const classes = computed(() =>
  cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', props.class)
)
</script>

<template>
  <tr :class="classes"><slot /></tr>
</template>
<!-- [AI_END LINES=11 TIMESTAMP=2025-06-15 12:00:00] -->

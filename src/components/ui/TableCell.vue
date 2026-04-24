<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
const classes = computed(() =>
  cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5', props.class)
)
</script>

<template>
  <td :class="classes"><slot /></td>
</template>
<!-- [AI_END LINES=12 TIMESTAMP=2025-06-15 12:00:00] -->

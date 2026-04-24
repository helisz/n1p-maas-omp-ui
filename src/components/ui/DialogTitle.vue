<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { DialogTitle } from 'radix-vue'

const props = defineProps<{ class?: string }>()
const classes = computed(() => cn('text-lg font-semibold leading-none tracking-tight', props.class))
</script>

<template>
  <DialogTitle :class="classes"><slot /></DialogTitle>
</template>
<!-- [AI_END LINES=12 TIMESTAMP=2025-06-15 12:00:00] -->

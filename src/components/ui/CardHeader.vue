<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import type { ClassValue } from 'clsx'

const props = defineProps<{ class?: ClassValue }>()
const classes = computed(() => cn('flex flex-col space-y-1.5 p-6', props.class))
</script>

<template>
  <div :class="classes"><slot /></div>
</template>
<!-- [AI_END LINES=10 TIMESTAMP=2025-06-15 12:00:00] -->
